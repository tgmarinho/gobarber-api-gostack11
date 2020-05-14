interface IMailConfig {
  driver: 'ethreal' | 'custom';
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
} as IMailConfig;
