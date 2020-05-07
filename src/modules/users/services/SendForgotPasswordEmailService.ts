// import User from '@modules/users/infra/typeorm/entities/User';
// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(
      email,
      'pedido de recuperacao de senha recebido',
    );
  }
}

export default SendForgotPasswordEmailService;
