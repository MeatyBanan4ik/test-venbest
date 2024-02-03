import * as process from 'process';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Test for Venbest')
    .setDescription('Test for Venbest')
    .setVersion('1.0.0')
    .addTag('MeatyBanana')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(PORT, () => console.log(`App starts on ${PORT} port`));
}
bootstrap();
