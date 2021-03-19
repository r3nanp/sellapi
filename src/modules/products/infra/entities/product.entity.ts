import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid4 } from 'uuid'

@Entity('products')
export class Product {
  constructor() {
    if (!this.id) {
      this.id = uuid4()
    }
  }

  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column('decimal')
  price: number

  @Column('int')
  quantity: number

  @CreateDateColumn()
  created_at: Date

  @CreateDateColumn()
  updated_at: Date
}
