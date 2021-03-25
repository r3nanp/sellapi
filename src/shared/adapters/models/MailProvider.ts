interface IMessage {
  from: {
    name: string
    email: string
  }
  to: string
  subject: string
  body: string
}

export interface MailProvider {
  sendEmail(message: IMessage): Promise<void>
}
