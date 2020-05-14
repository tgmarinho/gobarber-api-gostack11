import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

describe('ShowUserAvatar', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let showProfile: ShowProfileService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago Marinho',
      email: 'tgmarinho@gmail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Thiago Marinho');
    expect(profile.email).toBe('tgmarinho@gmail.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
