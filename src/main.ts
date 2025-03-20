import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './libs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swagger.setup(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
