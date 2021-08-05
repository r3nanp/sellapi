/* eslint-disable @typescript-eslint/ban-types */
export interface Decrypter {
  decrypt: (ciphertext: string) => Promise<string | object> // Make agnostic
}
