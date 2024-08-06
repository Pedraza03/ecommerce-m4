import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
