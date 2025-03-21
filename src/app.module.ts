import { Module } from '@nestjs/common';
import { KafkaService } from './kafka/kafka.service';
import { IngestionModule } from './features/ingestion/ingestion.module';

@Module({
  imports: [IngestionModule],
  controllers: [],
  providers: [KafkaService],
})
export class AppModule {}
