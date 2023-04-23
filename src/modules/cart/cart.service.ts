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

    async getAllCart({ take, skip }) {
        const result = await this.cartRepository.findAndCount({
            take,
            skip,
        })
        const total = result[1]
        const data = result[0]
        return {
            code: ERROR_CODE.SUCCESS,
            data: { total, data },
        }
    }

    async getCart(id) {
        const result = await this.cartRepository.findOneBy({ id })
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
        const band = await this.cartRepository.findOneBy({
            id: data.id,
        })
        if (band) {
            await this.cartRepository.save(data)
            return {
                code: ERROR_CODE.SUCCESS,
            }
        } else {
            return {
                code: ERROR_CODE.FAIL,
                message: 'cart is not exist',
            }
        }
    }

    async deleteCart(id) {
        const result = await this.cartRepository.softDelete(id)
        return {
            code: ERROR_CODE.SUCCESS,
            data: result,
        }
    }
}
