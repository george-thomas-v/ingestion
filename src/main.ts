import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './libs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swagger.setup(app);
  await app.listen(process.env.PORT ?? 3000);
  const kafkaMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
        },
        consumer: {
          groupId: 'ingestion-service',
        },
      },
    });
  await kafkaMicroservice.listen();
  console.log('📡 Kafka Listener started...');
}

bootstrap();
