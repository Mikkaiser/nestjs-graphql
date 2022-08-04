import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.API_PORT || 3333;
  await app.listen(port, () => console.log(`Listening on port ${port}`));
}
bootstrap();
