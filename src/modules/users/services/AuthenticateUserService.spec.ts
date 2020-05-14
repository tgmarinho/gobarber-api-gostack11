import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/implementations/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  let authenticateUser: AuthenticateUserService;
  let fakeCacheProvider: FakeCacheProvider;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate user', async () => {
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    const user = await createUser.execute({
      name: 'Thiago Marinho',
      email: 'tgmarinho@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'tgmarinho@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'tgmarinho@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    await createUser.execute({
      name: 'Thiago Marinho',
      email: 'tgmarinho@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'tgmarinho@gmail.com',
        password: 'xxxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
