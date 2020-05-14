interface IMailConfig {
  driver: 'ethereal' | 'custom';
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
} as IMailConfig;
