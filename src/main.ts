import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || environment.port);
}
bootstrap();
