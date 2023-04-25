import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Cart } from '@src/core/database/entities/cart.entity'
import { ERROR_CODE } from '@src/utils/enums/error_code.enum'
import { Repository } from 'typeorm'

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
    ) {}

    async createCart(data) {
        let result = await this.cartRepository.save(data)
        return {
            code: ERROR_CODE.SUCCESS,
            data: result,
        }
    }

    async getAllCart({ take, skip, user }) {
        const userId = user.id
        const result = await this.cartRepository.findAndCount({
            take,
            skip,
            where: { userId },
        })
        const total = result[1]
        const data = result[0]
        return {
            code: ERROR_CODE.SUCCESS,
            data: { total, data },
        }
    }

    async getCart({ id, user }) {
        const userId = user.id
        const result = await this.cartRepository.findOne({
            where: { userId, id },
        })
        if (result) {
            return {
                code: ERROR_CODE.SUCCESS,
                data: result,
            }
        } else {
            return {
                code: ERROR_CODE.FAIL,
                message: 'cart not exist',
            }
        }
    }

    async updateCart(data) {
        const cartId = data.id
        const userId = data.user.id
        const cart = await this.cartRepository.findOne({
            where: {
                userId,
                id: cartId,
            },
        })
        if (cart) {
            await this.cartRepository.save(data)
            return {
                code: ERROR_CODE.SUCCESS,
            }
        } else {
            return {
                code: ERROR_CODE.FAIL,
                message: 'update fail',
            }
        }
    }

    async deleteCart({ id, user }) {
        const userId = user.id
        await this.cartRepository.findOneOrFail({
            where: {
                id,
                userId,
            },
        })
        const result = await this.cartRepository.softDelete(id)
        return {
            code: ERROR_CODE.SUCCESS,
            data: result,
        }
    }
}
