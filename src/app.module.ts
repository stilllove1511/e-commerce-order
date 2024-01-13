import { Module } from '@nestjs/common'
import { ORMModule } from './core/database/orm.module'
import { ConfigModule } from '@nestjs/config'
import { OrderModule } from './modules/order/order.module'
import { CartModule } from './modules/cart/cart.module'
import { EurekaModule } from 'nestjs-eureka'

@Module({
    imports: [
        ConfigModule.forRoot(),
        ORMModule,
        OrderModule,
        CartModule,
        EurekaModule.forRoot({
            eureka: {
                host: process.env.EUREKA_HOST,
                port: process.env.EUREKA_PORT,
                registryFetchInterval: 1000,
                servicePath: '/eureka/apps/',
                maxRetries: 3,
            },
            service: {
                name: 'product-service',
                port: +process.env.PORT,
            },
            clientLogger: {
                debug: () => false,
                error: console.log,
                info: () => false,
                warn: console.log,
            },
        }),
    ],
})
export class AppModule {}
