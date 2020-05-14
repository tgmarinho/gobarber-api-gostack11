import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import IMailProvider from './models/IMailProvider';

import CustomMailProvider from './implementations/CustomMailProvider';
import EtherealMailProvider from './implementations/EtherealMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  custom: container.resolve(CustomMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
