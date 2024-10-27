import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';

import {
  CreateAssetRequest,
  createAssetRequest,
  updateAssetRequest,
  UpdateAssetRequest,
} from './validation/schema';
import { ZodPipe } from 'src/shared/pipes/zod.pipes';
import { AssetService } from './asset.service';
import { Request } from 'express';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get(':assetId')
  async getAssetId(@Param('assetId') assetId: string) {
    return this.assetService.getAsset(assetId);
  }

  @Post()
  async createAsset(
    @Req() req: Request,
    @Body(new ZodPipe(createAssetRequest))
    body: CreateAssetRequest,
  ) {
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    console.log('Dados recebidos no backend:', body);

    try {
      const createAssetData = await this.assetService.createAsset({
        userId,
        tipo: body.tipo,
        descricao: body.descricao,
        valor_estimado: body.valor_estimado,
        data_aquisicao: body.data_aquisicao,
      });

      return createAssetData;
    } catch (error) {
      console.error('Erro ao criar patrimonio no servidor:', error.message);
      throw new InternalServerErrorException(
        'Erro ao criar renda no servidor.',
      );
    }
  }

  @Patch(':id')
  async updateAsset(
    @Param('id') id: string,
    @Body(new ZodPipe(updateAssetRequest))
    body: UpdateAssetRequest,
  ) {
    const asset = await this.assetService.updateAsset(id, body);
    return asset;
  }

  @Get()
  async getAsset(@Req() request: Request) {
    const userId = request.user?.id;

    if (!userId) {
      return { message: 'User not found.' };
    }

    const assets = await this.assetService.findAll(userId);

    return assets.length > 0 ? assets : [];
  }
}
