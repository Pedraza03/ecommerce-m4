import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orderdetails.entity';
import { Orders } from 'src/entities/orders.entity';
import { Products } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderDetails) private orderDetailsRepository:Repository<OrderDetails>,
        @InjectRepository(Orders) private ordersRepository:Repository<Orders>,
        @InjectRepository(Users) private usersRepository:Repository<Users>,
        @InjectRepository(Products) private productsRepository:Repository<Products>
    ) {}

    async getOrder(id: string){
        const orderUser = await this.usersRepository.findOne({
            where:{id},
            relations: {
                orders:{
                    orderDetails: {
                        products: true
                    }
                }
            }
        })
        if(!orderUser){
            return 'Order no existe'
        }

        const orderDetails = orderUser.orders.map(order => order.orderDetails).flat();

        return { orderDetails };
    }

    async addOrder(userId: string, products: any){
        let total = 0;
        const user = await this.usersRepository.findOneBy({id: userId})

        if(!user){
            throw new NotFoundException();
        }
        const order = new Orders()
        order.date = new Date()
        order.user = user

        const newOrder = await this.ordersRepository.save(order)

        const productsArray = await Promise.all(
            products.map(async(element) =>{
                const products = await this.productsRepository.findOneBy({
                    id: element.id
                })

                if (!products) {
                    throw new NotFoundException();
                }
        
                total += Number(products.price)
        
                await this.productsRepository.update(
                    {id: element.id},
                    {stock: products.stock -1},
                )
                return products
            }),
        );

        const orderDetail = new OrderDetails();

        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;

        await this.orderDetailsRepository.save(orderDetail)

        return await this.ordersRepository.find({
            where: {id:newOrder.id},
            relations:{
                orderDetails: true
            }
            
        })
    }
}
