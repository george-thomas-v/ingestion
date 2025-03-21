import { Module } from '@nestjs/common';
import { KafkaService } from './kafka/kafka.service';
import { IngestionModule } from './features/ingestion/ingestion.module';
import { DataModule } from './data/data.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    IngestionModule,
    DataModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [KafkaService],
})
export class AppModule {}
