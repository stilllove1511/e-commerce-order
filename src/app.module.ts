import { Module } from '@nestjs/common'
import { ORMModule } from './core/database/orm.module'
import { ConfigModule } from '@nestjs/config'
import { OrdertModule } from './modules/order/order.module'
import { CarttModule } from './modules/cart/cart.module'

@Module({
    imports: [ConfigModule.forRoot(), ORMModule, OrdertModule, CarttModule]
})
export class AppModule {}
