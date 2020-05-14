import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/implementations/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  let fakeNotificationsRepository: FakeNotificationsRepository;
  let createAppointment: CreateAppointmentService;
  let fakeCacheProvider: FakeCacheProvider;

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'userLogged',
      provider_id: '12321312',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12321312');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2060, 4, 12, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'userLogged',
      provider_id: '12321312',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'userLogged',
        provider_id: '12321312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: 'userLogged',
        provider_id: '12321312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as proider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: 'userLogged',
        provider_id: 'userLogged',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm.', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: 'userLogged',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: 'userLogged',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
