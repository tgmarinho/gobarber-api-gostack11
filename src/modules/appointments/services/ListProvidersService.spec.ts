import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/implementations/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

describe('ListProviderService', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let listProviders: ListProvidersService;
  let fakeCacheProvider: FakeCacheProvider;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Thiago Marinho',
      email: 'tgmarinho@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Diego Fernandes',
      email: 'diegofernandes@gmail.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Usuário logado',
      email: 'ulogged@gmail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    await expect(providers).toEqual([user1, user2]);
  });
});
