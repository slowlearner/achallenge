// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('24 hour challenge API Documentation')
    .setDescription('24 hour challenge.')
    .setVersion('1.0')
    .build();
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // enable injection in class-validators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.HTTP_PORT);
}
bootstrap();
