import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { OrdersProducts } from '@modules/orders/infra/typeorm/entities/orders_products.entity'
import type { IProduct } from '@modules/products/domain/models/Product'

@Entity('products')
export class Product implements IProduct {
  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }

  @PrimaryColumn()
  readonly id: string

  @OneToMany(() => OrdersProducts, orders_products => orders_products.product)
  orders_products: OrdersProducts[]

  @Column()
  name: string

  @Column('decimal')
  price: number

  @Column('int')
  quantity: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
