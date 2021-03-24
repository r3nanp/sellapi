import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('user_tokens')
export class UserTokens {
  constructor() {
    if (!this.id && !this.token) {
      this.id = uuidv4()
      this.token = uuidv4()
    }
  }

  @PrimaryColumn()
  readonly id: string

  @Column()
  readonly token: string

  @Column()
  readonly user_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
