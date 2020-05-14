import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

describe('UpdateUserAvatar', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  let updateProfile: UpdateProfileService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile of the user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago Marinho',
      email: 'tgmarinho@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Tiago Mariano',
      email: 'tgmariano@gmail.com',
    });

    expect(updatedUser.name).toBe('Tiago Mariano');
    expect(updatedUser.email).toBe('tgmariano@gmail.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Thiago Marinho',
      email: 'tgmarinho@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@sample.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Thiago Marinho',
        email: 'tgmarinho@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago Marinho',
      email: 'tgmarinho@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Tiago Mariano',
      email: 'tgmariano@gmail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without inform the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago Marinho',
      email: 'tgmarinho@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Tiago Mariano',
        email: 'tgmariano@gmail.com',
        // old passwd is not informed
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago Marinho',
      email: 'tgmarinho@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Tiago Mariano',
        email: 'tgmariano@gmail.com',
        old_password: 'xx-wrong-password-xx',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non_existing_user_id_',
        name: 'Tiago Mariano',
        email: 'tgmariano@gmail.com',
        old_password: 'xx-wrong-password-xx',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
