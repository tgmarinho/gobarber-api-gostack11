import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabity: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabity = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list providers availables in the month', async () => {
    const promissesCreateAppointmentInBusinessHours = Array.from(
      { length: 10 },
      (_, index) => {
        return fakeAppointmentsRepository.create({
          provider_id: 'provider',
          user_id: 'loogedUser',
          date: new Date(2020, 3, 20, index + 8, 0, 0),
        });
      },
    );

    await Promise.all(promissesCreateAppointmentInBusinessHours);

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'loogedUser',
      date: new Date(2020, 3, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailabity.execute({
      provider_id: 'provider',
      year: 2020,
      month: 4,
    });

    await expect(availability).toEqual(
      expect.arrayContaining([
        {
          day: 19,
          available: true,
        },
        {
          day: 20,
          available: false,
        },
        {
          day: 21,
          available: true,
        },
        {
          day: 22,
          available: true,
        },
      ]),
    );
  });
});
