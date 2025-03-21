import { Module } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { IngestionController } from './ingestion.controller';
import { KafkaService } from 'src/kafka';

@Module({
  controllers: [IngestionController],
  providers: [IngestionService,KafkaService],
})
export class IngestionModule {}
