import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Trello-like api')
    .setDescription('Trello-like api description')
    .setVersion('0.0.1')
    .build();
  const documentFactort = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactort);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
