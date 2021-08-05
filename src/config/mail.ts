import SMTPTransport from 'nodemailer/lib/smtp-transport'

interface MailConfig {
  driver: 'ethereal' | 'mailtrap'

  config: {
    ethereal: SMTPTransport.Options
    mailtrap: object
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'mailtrap',

  config: {
    ethereal: {
      host: 'smtp.ethereal.email',
      port: 587,
      ssl: false,
      tls: true,
      auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS
      }
    },
    mailtrap: {
      host: 'smtp.mailtrap.io',
      port: 2525,
      ssl: false,
      tls: true,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    }
  }
} as MailConfig
