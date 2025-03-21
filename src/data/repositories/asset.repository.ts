import { Injectable, Optional } from '@nestjs/common';
import { AssetEntity } from '../entities';
import { DataSource, EntityManager, EntityTarget, Repository } from 'typeorm';
import { CreateIngestionDto } from 'src/features/ingestion/dto/ingestion.dto';
import { EAssetStatus } from '@app/enums';

@Injectable()
export class AssetRepository extends Repository<AssetEntity> {
  constructor(
    @Optional() _target: EntityTarget<AssetEntity>,
    entityManager: EntityManager,
    private readonly dataSource: DataSource,
  ) {
    super(AssetEntity, entityManager);
  }

  async createAsset(input: CreateIngestionDto): Promise<AssetEntity> {
    const { docId, mimeType, key } = input;
    const asset = this.create({ docId, mimeType, key });
    return this.save(asset);
  }

  async deleteExistingAsset(input: { docId: string }): Promise<void> {
    const { docId } = input;
    await this.softDelete({ docId });
  }

  async updateAsset(input: {
    assetId: string;
    assetStatus: EAssetStatus.COMPLETED | EAssetStatus.FAILED;
  }): Promise<void> {
    const { assetId, assetStatus } = input;
    await this.update({ id: assetId }, { assetStatus });
  }

  async getAsset(input: { docId: string }): Promise<AssetEntity | null> {
    const { docId } = input;
    return this.findOneBy({ docId });
  }

  async getAllAssets(input: { skip: number; limit: number }): Promise<AssetEntity[]> {
    const { skip, limit } = input;
    return this.find({
      skip,
      take: limit,
    });
  }
}
