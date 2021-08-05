import nodemailer, { Transporter } from 'nodemailer'
import { MailProvider } from '@shared/adapters/models/MailProvider'
import { IParseMailTemplate, MailTemplate } from '@config/mailTemplate'

interface Message {
  from: {
    name: string
    email: string
  }
  to: string
  subject: string
  body: IParseMailTemplate
}

export class EtherealMailFakeProvider implements MailProvider {
  private transporter: Transporter
  private mailTemplate: MailTemplate

  /* The mailconfig type is object to make the configuration agnostic */
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(mailConfig: object) {
    this.transporter = nodemailer.createTransport(mailConfig)
    this.mailTemplate = new MailTemplate()
  }

  async sendEmail(message: Message): Promise<void> {
    await this.transporter.sendMail({
      from: {
        name: message.from.name,
        address: message.from.email
      },
      to: message.to,
      subject: message.subject,
      html: await this.mailTemplate.parse(message.body)
    })
  }
}
