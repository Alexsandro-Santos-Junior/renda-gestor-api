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
import { IncomeService as IncomeService } from './income.service';
import { Request } from 'express';
import {
  createIncomeRequest,
  CreateIncomeRequest,
  updateIncomeRequest,
  UpdateIncomeRequest,
} from './validation/schema';
import { ZodPipe } from 'src/shared/pipes/zod.pipes';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Get(':incomeId')
  async getIncomeId(@Param('incomeId') incomeId: string) {
    return this.incomeService.getIncome(incomeId);
  }

  @Post()
  async createIncome(
    @Req() req: Request,
    @Body(new ZodPipe(createIncomeRequest)) body: CreateIncomeRequest,
  ) {
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    console.log('Dados recebidos no backend:', body);
    try {
      const createIncomeData = await this.incomeService.createIncome({
        userId,
        fonte: body.fonte,
        data: body.data,
        categoria: body.categoria,
        forma_pagamento: body.forma_pagamento,
        recorrencia: body.recorrencia,
        valor: body.valor,
      });

      return createIncomeData;
    } catch (error) {
      console.error('Erro ao criar renda no servidor:', error.message);
      throw new InternalServerErrorException(
        'Erro ao criar renda no servidor.',
      );
    }
  }

  @Patch(':id')
  async updateIncome(
    @Param('id') id: string,
    @Body(new ZodPipe(updateIncomeRequest))
    body: UpdateIncomeRequest,
  ) {
    const income = await this.incomeService.updateIncome(id, body);
    return income;
  }

  @Get()
  async getIncome(@Req() request: Request) {
    const userId = request.user?.id;

    if (!userId) {
      return { message: 'User not found.' };
    }

    const incomes = await this.incomeService.findAll(userId);

    return incomes.length > 0 ? incomes : [];
  }
}
