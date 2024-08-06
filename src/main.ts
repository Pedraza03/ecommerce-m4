import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerFuncMiddleware } from './middlewares/loggerFunc.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder().setTitle('API Tienda 51').setDescription('Presentacion final del proyecto para Henrry').addBearerAuth().build()

  const document = SwaggerModule.createDocument(app,swaggerConfig)

  SwaggerModule.setup('api',app,document)

  app.use(LoggerFuncMiddleware);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
