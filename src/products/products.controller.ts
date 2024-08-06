import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Products } from 'src/entities/products.entity';
import { Role } from 'src/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('PRODUCTS')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getProducts(@Query(`page`) page:number, @Query(`limit`) limit:number) {
    if (page && limit){
      return this.productsService.getProducts(page,limit );  
    }
    return this.productsService.getProducts(1, 3);
  }
  @ApiBearerAuth()
  @Get('seeder')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  addProducts(){
    return this.productsService.addProducts()
  }
  
  @Get(`:id`)
  getproductsId(@Param(`id`) id:string){
    return this.productsService.getproductsId(id);
  }

  @ApiBearerAuth()
  @Put(`:id`)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProducts(@Param(`id`) id:string, @Body() product:Products ){
    return this.productsService.updateProducts(id, product);
  }

}
