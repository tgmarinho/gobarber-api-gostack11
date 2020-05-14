/* eslint-disable no-console */
import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class CustomMailProvider implements IMailProvider {
  private client: Transporter;

  // should setting email from gmail for sample via smtp
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: 'account.smtp.host',
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: ISendMailDTO): Promise<void> {
    console.log(' custom working');
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Gobarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: { name: to.name, address: to.email },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
