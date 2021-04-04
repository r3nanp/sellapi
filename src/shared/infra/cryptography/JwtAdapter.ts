import { Encrypter } from '@shared/core/cryptography/Encrypter'
import { Decrypter } from '@shared/core/cryptography/Decrypter'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(expiresIn: string, subject: string): Promise<string> {
    return jwt.sign({}, this.secret, {
      subject,
      expiresIn
    })
  }

  async decrypt(ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}
