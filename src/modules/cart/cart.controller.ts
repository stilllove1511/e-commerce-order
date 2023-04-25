import { Controller, UseGuards } from '@nestjs/common'
import { CartService } from './cart.service'
import { MessagePattern } from '@nestjs/microservices'
import { CART_PATTERN } from '@src/utils/enums/cart.enum'
import { Roles } from '@src/utils/decorators/role.decorator'
import { role } from '@src/utils/enums/role.enum'
import { JwtAuthGuard } from '@src/utils/guards/jwt.guard'
import { RolesGuard } from '@src/utils/guards/roles.guard'
import * as jwt from 'jsonwebtoken'

@Controller()
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @MessagePattern(CART_PATTERN.cart_create)
    async createCart(data) {
        const decoded = jwt.decode(data.token)
        data.user = decoded
        return this.cartService.createCart(data)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @MessagePattern(CART_PATTERN.cart_get_all)
    async getAllCart({ page = 1, size = 10, token }) {
        const take = size
        const skip = (page - 1) * size
        const user = jwt.decode(token)
        return this.cartService.getAllCart({ take, skip, user })
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @MessagePattern(CART_PATTERN.cart_get_one)
    async getCart(id: string, token) {
        const user = jwt.decode(token)
        return this.cartService.getCart({ id, user })
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @MessagePattern(CART_PATTERN.cart_update)
    async updateCart(data) {
        const decoded = jwt.decode(data.token)
        data.user = decoded
        return this.cartService.updateCart(data)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @MessagePattern(CART_PATTERN.cart_delete)
    async deleteCart(id: string, token: string) {
        const user = jwt.decode(token)
        return this.cartService.deleteCart({ id, user })
    }
}
