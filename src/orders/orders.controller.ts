import { Body, Controller, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/ordes.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('ORDERS')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  
  @ApiBearerAuth()
  @Get(`:id`)
  @Roles(Role.User,Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getOrder(@Param(`id`) id: string){
    return this.ordersService.getOrder(id)
  }
  @ApiBearerAuth()
  @Post()
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  addOrder(@Body() order: CreateOrderDTO){
    const { userId, products} = order
    return this.ordersService.addOrder(userId, products)
  }
}
