import { ORDER_STATUS_CODE } from '@src/utils/enums/orderStatusCode.enum'
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Column,
} from 'typeorm'
@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date

    @DeleteDateColumn()
    deletedAt?: Date

    @Column()
    productId: string

    @Column()
    quantity: number

    @Column({ default: ORDER_STATUS_CODE.processing })
    statusCode: string
}
