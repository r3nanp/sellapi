import { inject, injectable } from 'tsyringe'
import path from 'path'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { IUser } from '../domain/models/User'
import { IUserRepository } from '../domain/repositories/IUserRepository'
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository'
import { EtherealMailFakeProvider } from '@shared/adapters/implementations/mail/EtherealMailFakeProvider'
import mailConfig from '@config/mail'

type Request = Pick<IUser, 'email'>

@injectable()
export class SendForgotPasswordEmailService implements Service<Request, void> {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('UserTokens')
    private userTokenRepository: IUserTokensRepository
  ) {}

  async execute({ email }: Request): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found.')
    }

    const { token } = await this.userTokenRepository.generate(user.id)

    const mail = new EtherealMailFakeProvider(mailConfig.config.ethereal)

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )

    await mail.sendEmail({
      to: email,
      from: {
        name: 'Staff SellAPI',
        email: 'staff@sellapi.com'
      },
      subject: '[SellAPI] Recuperação de senha',
      body: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_URL}/reset_password?token=${token}`
        }
      }
    })
  }
}
