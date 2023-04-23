import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ORMModule } from './core/database/orm.module'
import { ConfigModule } from '@nestjs/config'
import { OrdertModule } from './modules/order/order.module'
import { CarttModule } from './modules/cart/cart.module'

@Module({
    imports: [ConfigModule.forRoot(), ORMModule, OrdertModule, CarttModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
