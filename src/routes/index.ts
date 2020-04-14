import { Router } from 'express';
import appointmentsRoutes from './appointments.routes';
import usersRoutes from './users.routes';
import sessionsRoutes from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
