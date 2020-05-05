import { Router } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/respositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();
  const authenticateUserService = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

export default sessionsRouter;
