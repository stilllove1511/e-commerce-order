import { Controller } from '@nestjs/common'
import { OrderService } from './order.service'
import { MessagePattern } from '@nestjs/microservices'
import { ORDER_PATTERN } from '@src/utils/enums/order.enum'

@Controller()
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @MessagePattern(ORDER_PATTERN.order_create)
    async createOrder(data) {
        return this.orderService.createOrder(data)
    }

    @MessagePattern(ORDER_PATTERN.order_get_all)
    async getAllOrder({ page = 1, size = 10 }) {
        const take = size
        const skip = (page - 1) * size
        return this.orderService.getAllOrder({ take, skip })
    }

    @MessagePattern(ORDER_PATTERN.order_get_one)
    async getOrder(id: string) {
        return this.orderService.getOrder(id)
    }

    @MessagePattern(ORDER_PATTERN.order_update)
    async updateOrder(data) {
        return this.orderService.updateOrder(data)
    }

    @MessagePattern(ORDER_PATTERN.order_delete)
    async deleteOrder(id: string) {
        return this.orderService.deleteOrder(id)
    }
}
