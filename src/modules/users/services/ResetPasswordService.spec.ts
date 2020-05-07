import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago Marinho',
      email: 'tgmarinho@gmail.com',
      password: '123456',
    });

    const userToken = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: '123123',
      token: userToken.token,
    });

    const userUpdated = await fakeUsersRepository.findById(user.id);

    expect(userUpdated?.password).toBe('123123');
  });
});

// Hash
// 2h duration
// user token inexistente
// user inexistente
