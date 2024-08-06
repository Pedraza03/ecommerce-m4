import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateUsersDTO } from './dtos/users.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/entities/users.entity';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query(`page`) page:number, @Query(`limit`) limit:number) {
    if (page && limit){
      return this.usersService.getUsers(page,limit );  
    }
    return this.usersService.getUsers(1, 3);
  }

  @ApiBearerAuth()
  @Get(`:id`)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUserId(@Param(`id`) id:string){
    return this.usersService.getUserId(id);
  }

  // Crear Usuario
  postUsers(@Body() user: CreateUsersDTO){
    return this.usersService.addUser(user);
  }

  @ApiBearerAuth()
  @Put(`:id`)
  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateUser(@Param(`id`) id:string, @Body() user: Users){
    return this.usersService.updateUser(id,user);
  }

  @ApiBearerAuth()
  @Delete(`:id`)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteUser(@Param(`id`) id:string){
    return this.usersService.deleteUser(id);
  }
}
