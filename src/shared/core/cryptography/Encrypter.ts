export interface Encrypter {
  encrypt: (expiresIn: string, subject: string) => Promise<string>
}
