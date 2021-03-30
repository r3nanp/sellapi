import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Customer } from '@modules/customers/infra/typeorm/entities/customer.entity'
import { OrdersProducts } from './orders_products.entity'

@Entity('orders')
export class Order {
  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }

  @PrimaryColumn()
  readonly id: string

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer

  @OneToMany(() => OrdersProducts, orders_products => orders_products.order, {
    cascade: true
  })
  orders_products: OrdersProducts[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
