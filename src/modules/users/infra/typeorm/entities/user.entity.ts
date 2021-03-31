import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { v4 as uuidv4 } from 'uuid'

@Entity('users')
export class User {
  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }

  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string

  @Column()
  avatar: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null
    }

    return process.env.NODE_ENV === 'production'
      ? `${process.env.PROD_URL}/files/${this.avatar}`
      : `${process.env.DEV_URL}/files/${this.avatar}`
  }
}
