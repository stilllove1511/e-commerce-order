import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cart } from '@src/core/database/entities/cart.entity'
import { CartService } from './cart.service'
import { CartController } from './cart.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Cart])],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule {}
