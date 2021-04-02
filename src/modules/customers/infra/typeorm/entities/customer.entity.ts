import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import type { ICustomer } from '@modules/customers/domain/models/Customer'

@Entity('customers')
export class Customer implements ICustomer {
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

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
