import { Injectable, Logger } from '@nestjs/common';
import { CreateIngestionDto } from './dto/ingestion.dto';
import { AssetRepository } from 'src/data/repositories';
import { AssetEntity } from '@app/entities';
import { EAssetStatus } from '@app/enums';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);

  constructor(
    private readonly assetRepository: AssetRepository,
    private readonly kafkaService: KafkaService,
  ) {}

  async startProcessing(input: CreateIngestionDto): Promise<void> {
    const { docId } = input;
    try {
      await this.assetRepository.deleteExistingAsset({ docId });
      const asset = await this.assetRepository.createAsset({ ...input });
      this.logger.log(`Asset created with docId: ${docId}`);
      await this.processAsset(asset);
    } catch (error) {
      this.logger.error(
        `Error in startProcessing: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to start processing');
    }
  }

  async timeout(): Promise<number> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(Math.random()), 5000),
    );
  }

  async processAsset(asset: AssetEntity): Promise<void> {
    this.logger.log(`Processing asset with ID: ${asset.id}`);
    const random = await this.timeout();
    const assetStatus =
      random % 2 === 0 ? EAssetStatus.COMPLETED : EAssetStatus.FAILED;
    await this.assetRepository.updateAsset({ assetId: asset.id, assetStatus });
    if (assetStatus === EAssetStatus.FAILED)
      this.kafkaService.sendMessage({
        topic: 'processing-failed',
        message: asset.id,
      });
  }

  getAllAssets(input:{skip:number,limit:number;}) {
    return this.assetRepository.getAllAssets({...input});
  }

  async getAssetStatus(input: { docId: string }) {
    const { docId } = input;
    const asset = await this.assetRepository.getAsset({ docId });
    return asset?.assetStatus;
  }

  findOne(input: { docId: string }) {
    const { docId } = input;
    return this.assetRepository.getAsset({ docId });
  }

  deleteAsset(input: { docId: string }) {
    const { docId } = input;
    return this.assetRepository.deleteExistingAsset({ docId });
  }
}
