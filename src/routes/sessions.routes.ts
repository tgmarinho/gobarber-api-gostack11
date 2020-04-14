import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user } = await authenticateUserService.execute({ email, password });

    return response.json({ user });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionsRouter;
