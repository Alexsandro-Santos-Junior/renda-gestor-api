import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
