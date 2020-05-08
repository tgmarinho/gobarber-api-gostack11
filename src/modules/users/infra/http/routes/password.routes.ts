import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();

const passwordController = new ForgotPasswordController();
const resetController = new ResetPasswordController();

passwordRouter.post('/forgot', passwordController.create);
passwordRouter.post('/reset', resetController.create);

export default passwordRouter;
