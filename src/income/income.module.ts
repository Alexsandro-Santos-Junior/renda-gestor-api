import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}
