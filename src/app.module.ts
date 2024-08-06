import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import typeorm from './config/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(
  {
    isGlobal:true,
    load:[typeorm]}
  ),
  TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    useFactory: (config:ConfigService) => config.get('typeorm')
  }),
  JwtModule.register({
    global:true,
    secret: process.env.JWT_SECRET,
    signOptions:{expiresIn:'1h'}
  })
  ,AuthModule, ProductsModule, UsersModule, CategoriesModule, OrdersModule, FileUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
