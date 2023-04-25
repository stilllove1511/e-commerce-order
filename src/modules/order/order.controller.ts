import { Controller, UseGuards } from '@nestjs/common'
import { OrderService } from './order.service'
import { MessagePattern } from '@nestjs/microservices'
import { ORDER_PATTERN } from '@src/utils/enums/order.enum'
import { Roles } from '@src/utils/decorators/role.decorator'
import { role } from '@src/utils/enums/role.enum'
import { JwtAuthGuard } from '@src/utils/guards/jwt.guard'
import { RolesGuard } from '@src/utils/guards/roles.guard'
import * as jwt from 'jsonwebtoken'
@Controller()
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @MessagePattern(ORDER_PATTERN.order_create)
    async createOrder(data) {
        const decoded = jwt.decode(data.token)
        data.user = decoded
        return this.orderService.createOrder(data)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @MessagePattern(ORDER_PATTERN.order_get_all)
    async getAllOrder({ page = 1, size = 10, token }) {
        const take = size
        const skip = (page - 1) * size
        const user = jwt.decode(token)
        return this.orderService.getAllOrder({ take, skip, user })
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @MessagePattern(ORDER_PATTERN.order_get_one)
    async getOrder(id: string, token) {
        const user = jwt.decode(token)
        return this.orderService.getOrder({ id, user })
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin)
    @MessagePattern(ORDER_PATTERN.order_update)
    async updateOrder(data) {
        return this.orderService.updateOrder(data)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin)
    @MessagePattern(ORDER_PATTERN.order_delete)
    async deleteOrder(id: string) {
        return this.orderService.deleteOrder(id)
    }
}
