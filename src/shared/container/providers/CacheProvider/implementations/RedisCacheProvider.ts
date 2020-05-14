import Redis, { Redis as IRedis } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCachePRovider implements ICacheProvider {
  private client: IRedis;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }
    const parsedData = JSON.parse(data) as T;
    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = this.client.keys(`${prefix}:*`);

    const pipeline = this.client.pipeline();

    (await keys).forEach(key => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
