import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = container.resolve(AuthenticateUserService);

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

export default sessionsRouter;
