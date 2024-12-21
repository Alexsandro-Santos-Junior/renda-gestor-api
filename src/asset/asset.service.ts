import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAssetDTO, UpdateAssetDTO } from './dto';

@Injectable()
export class AssetService {
  constructor(private db: DatabaseService) {}

  async createAsset(data: CreateAssetDTO & { userId: string }) {
    const createdAsset = await this.db.asset.create({
      data: {
        userId: data.userId,
        tipo: data.tipo,
        descricao: data.descricao,
        valor_estimado: data.valor_estimado,
        data_aquisicao: data.data_aquisicao,
      },
      select: {
        id: true,
        tipo: true,
        descricao: true,
        valor_estimado: true,
        data_aquisicao: true,
      },
    });
    return createdAsset;
  }

  async updateAsset(id: string, data: UpdateAssetDTO) {
    const updatedAsset = await this.db.asset.update({
      where: { id },
      data: {
        tipo: data.tipo,
        descricao: data.descricao,
        valor_estimado: data.valor_estimado,
        data_aquisicao: data.data_aquisicao,
      },
      select: {
        id: true,
        tipo: true,
        descricao: true,
        valor_estimado: true,
        data_aquisicao: true,
      },
    });

    if (!updatedAsset) {
      throw new NotFoundException(`Ganho with id ${id} not found`);
    }

    return updatedAsset;
  }

  async findAll(userId: string) {
    return await this.db.asset.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        tipo: true,
        descricao: true,
        valor_estimado: true,
        data_aquisicao: true,
      },
    });
  }

  async getAsset(assetId: string) {
    const asset = await this.db.asset.findFirst({
      where: { id: assetId },
    });

    if (!asset) {
      throw new NotFoundException('Renda não encontrada');
    }

    return asset;
  }
}
