import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common'
import { CartService } from './cart.service'
import { Roles } from '@src/utils/decorators/role.decorator'
import { role } from '@src/utils/enums/role.enum'
import { JwtAuthGuard } from '@src/utils/guards/jwt.guard'
import { RolesGuard } from '@src/utils/guards/roles.guard'
import * as jwt from 'jsonwebtoken'

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @Post('create')
    async createCart(@Body() data) {
        const decoded = jwt.decode(data.token)
        data.user = decoded
        return this.cartService.createCart(data)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @Post('get-all-cart')
    async getAllCart(@Body() { page = 1, size = 10, token }) {
        const take = size
        const skip = (page - 1) * size
        const user = jwt.decode(token)
        return this.cartService.getAllCart({ take, skip, user })
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @Post('get-cart/:id')
    async getCart(@Param() id: string, @Req() req: any) {
        const token = req.headers.authorization.split(' ')[1]
        const user = jwt.decode(token)
        return this.cartService.getCart({ id, user })
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @Post('update-cart')
    async updateCart(@Body() data, @Req() req: any) {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.decode(token)
        data.user = decoded
        return this.cartService.updateCart(data)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @Post('delete-cart/:id')
    async deleteCart(@Param() id: string, @Req() req: any) {
        const token = req.headers.authorization.split(' ')[1]
        const user = jwt.decode(token)
        return this.cartService.deleteCart({ id, user })
    }
}
