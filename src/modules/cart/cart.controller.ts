import { Controller } from '@nestjs/common'
import { CartService } from './cart.service'
import { MessagePattern } from '@nestjs/microservices'
import { CART_PATTERN } from '@src/utils/enums/cart.enum'

@Controller()
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @MessagePattern(CART_PATTERN.cart_create)
    async createCart(data) {
        return this.cartService.createCart(data)
    }

    @MessagePattern(CART_PATTERN.cart_get_all)
    async getAllCart({ page = 1, size = 10 }) {
        const take = size
        const skip = (page - 1) * size
        return this.cartService.getAllCart({ take, skip })
    }

    @MessagePattern(CART_PATTERN.cart_get_one)
    async getCart(id: string) {
        return this.cartService.getCart(id)
    }

    @MessagePattern(CART_PATTERN.cart_update)
    async updateCart(data) {
        return this.cartService.updateCart(data)
    }

    @MessagePattern(CART_PATTERN.cart_delete)
    async deleteCart(id: string) {
        return this.cartService.deleteCart(id)
    }
}
