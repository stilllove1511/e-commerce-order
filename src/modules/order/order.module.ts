import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from '@src/core/database/entities/order.entity'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrdertModule {}
