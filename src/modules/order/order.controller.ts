import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common'
import { OrderService } from './order.service'
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
    @Post('create')
    async createOrder(@Body() data) {
        const decoded = jwt.decode(data.token)
        data.user = decoded
        return this.orderService.createOrder(data)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @Post('get-all-order')
    async getAllOrder(@Body() { page = 1, size = 10, token }) {
        const take = size
        const skip = (page - 1) * size
        const user = jwt.decode(token)
        return this.orderService.getAllOrder({ take, skip, user })
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @Post('get-order/:id')
    async getOrder(@Param() id:string, @Req() req: any) {
        const token = req.headers.authorization.split(' ')[1]
        const user = jwt.decode(token)
        return this.orderService.getOrder({ id, user })
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin)
    @Post('update-order')
    async updateOrder(@Body() data) {
        return this.orderService.updateOrder(data)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin)
    @Post('delete-order/:id')
    async deleteOrder(@Param() id: string) {
        return this.orderService.deleteOrder(id)
    }
}
