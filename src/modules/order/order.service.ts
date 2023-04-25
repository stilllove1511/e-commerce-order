import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Cart } from '@src/core/database/entities/cart.entity'
import { Order } from '@src/core/database/entities/order.entity'
import { ERROR_CODE } from '@src/utils/enums/error_code.enum'
import { response } from 'express'
import { Repository } from 'typeorm'

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    async createOrder(data) {
        let response
        await this.orderRepository.manager.transaction(
            async (transactionalEntityManager) => {
                const userId = data.userId
                const cartId = data.cartId
                const cart = await transactionalEntityManager.findOneBy(Cart, {
                    id: cartId,
                })
                delete cart.id
                let order = new Order()
                order.userId = userId
                order = { ...cart, ...order }
                await transactionalEntityManager.softDelete(Cart, cartId)
                const result = await transactionalEntityManager.save(
                    Order,
                    order,
                )
                response = {
                    code: ERROR_CODE.SUCCESS,
                    data: result,
                }
            },
        )
        return response
    }

    async getAllOrder({ take, skip, user }) {
        const userId = user.id
        const result = await this.orderRepository.findAndCount({
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

    async getOrder({ id, user }) {
        const userId = user.id
        const result = await this.orderRepository.findOne({
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
                message: 'order not exist',
            }
        }
    }

    async updateOrder(data) {
        const band = await this.orderRepository.findOneBy({
            id: data.id,
        })
        if (band) {
            await this.orderRepository.save(data)
            return {
                code: ERROR_CODE.SUCCESS,
            }
        } else {
            return {
                code: ERROR_CODE.FAIL,
                message: 'order is not exist',
            }
        }
    }

    async deleteOrder(id) {
        const result = await this.orderRepository.softDelete(id)
        return {
            code: ERROR_CODE.SUCCESS,
            data: result,
        }
    }
}
