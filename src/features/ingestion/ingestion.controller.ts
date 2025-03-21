import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IngestionService } from './ingestion.service';
import { CreateIngestionDto } from './dto/ingestion.dto';

@Controller()
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @MessagePattern('start-processing')
  startProcessing(@Payload() input: CreateIngestionDto) {
    return this.ingestionService.startProcessing(input);
  }

  @MessagePattern('asset-status')
  async getAssetStatus(@Payload() docId: string) {
    return this.ingestionService.getAssetStatus({ docId });
  }

  @MessagePattern('find-all-asset')
  getAllAssets(@Payload() input: { skip: number; limit: number }) {
    return this.ingestionService.getAllAssets({ ...input });
  }

  @MessagePattern('find-one-asset')
  findOne(@Payload() docId: string) {
    return this.ingestionService.findOne({ docId });
  }

  @MessagePattern('remove-asset')
  deleteAsset(@Payload() docId: string) {
    return this.ingestionService.deleteAsset({ docId });
  }
}
