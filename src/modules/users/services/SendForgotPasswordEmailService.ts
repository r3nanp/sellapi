import { getCustomRepository } from 'typeorm'

import { Service } from '@shared/core/Service'
import { AppError } from '@shared/errors/AppError'
import { UserTokensRepository } from '../infra/typeorm/repositories/UserTokensRepository'
import { UserRepository } from '../infra/typeorm/repositories/UserRepository'
import { EtherealMailFakeProvider } from '@shared/adapters/implementations/mail/EtherealMailFakeProvider'
import mailConfig from '@config/mail'

interface Request {
  email: string
}

export class SendForgotPasswordEmailService implements Service<Request, void> {
  async execute({ email }: Request): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository)
    const userTokenRepository = getCustomRepository(UserTokensRepository)

    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found.')
    }

    const generatedToken = await userTokenRepository.generate(user.id)

    const mail = new EtherealMailFakeProvider(mailConfig.config.ethereal)

    await mail.sendEmail({
      to: email,
      from: {
        name: 'Staff SellAPI',
        email: 'staff@sellapi.com'
      },
      subject: 'Recuperação de senha',
      body: `Solicitação de redefinição de senha recebida: ${generatedToken?.token}`
    })
  }
}
