import { Controller, UseGuards } from '@nestjs/common'
import { CartService } from './cart.service'
import { MessagePattern } from '@nestjs/microservices'
import { CART_PATTERN } from '@src/utils/enums/cart.enum'
import { Roles } from '@src/utils/decorators/role.decorator'
import { role } from '@src/utils/enums/role.enum'
import { JwtAuthGuard } from '@src/utils/guards/jwt.guard'
import { RolesGuard } from '@src/utils/guards/roles.guard'

@Controller()
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @MessagePattern(CART_PATTERN.cart_create)
    async createCart(data) {
        return this.cartService.createCart(data)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @MessagePattern(CART_PATTERN.cart_get_all)
    async getAllCart({ page = 1, size = 10 }) {
        const take = size
        const skip = (page - 1) * size
        return this.cartService.getAllCart({ take, skip })
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @MessagePattern(CART_PATTERN.cart_get_one)
    async getCart(id: string) {
        return this.cartService.getCart(id)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @MessagePattern(CART_PATTERN.cart_update)
    async updateCart(data) {
        return this.cartService.updateCart(data)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(role.admin, role.customer)
    @MessagePattern(CART_PATTERN.cart_delete)
    async deleteCart(id: string) {
        return this.cartService.deleteCart(id)
    }
}
