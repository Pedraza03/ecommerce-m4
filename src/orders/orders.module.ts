import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orderdetails.entity';
import { Orders } from 'src/entities/orders.entity';
import { Users } from 'src/entities/users.entity';
import { Products } from 'src/entities/products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetails, Orders, Users, Products]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
