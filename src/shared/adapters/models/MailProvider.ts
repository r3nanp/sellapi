import { IParseMailTemplate } from '@config/mailTemplate'

interface IMessage {
  from: {
    name: string
    email: string
  }
  to: string
  subject: string
  body: IParseMailTemplate | string
}

export interface MailProvider {
  sendEmail(message: IMessage): Promise<void>
}
