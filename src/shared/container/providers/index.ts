import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import CustomMailProvider from './MailProvider/implementations/CustomMailProvider';

import ITemplateMailProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HbsMailTemplateProvider from './MailTemplateProvider/implementations/HbsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<ITemplateMailProvider>(
  'MailTemplateProvider',
  HbsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethreal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(CustomMailProvider),
);
