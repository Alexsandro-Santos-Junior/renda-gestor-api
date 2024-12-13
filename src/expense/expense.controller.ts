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

import { ZodPipe } from 'src/shared/pipes/zod.pipes';
import {
  createExpenseRequest,
  CreateExpenseRequest,
  UpdateExpenseRequest,
  updateExpenseRequest,
} from './validation/schema';

import { Request } from 'express';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get(':expenseId')
  async getExpenseId(@Param('expenseId') expenseId: string) {
    return this.expenseService.getExpense(expenseId);
  }

  @Post()
  async createExpense(
    @Req() req: Request,
    @Body(new ZodPipe(createExpenseRequest))
    body: CreateExpenseRequest,
  ) {
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    console.log('Dados recebidos no backend:', body);

    try {
      const createExpenseData = await this.expenseService.createExpense({
        userId,
        descricao: body.descricao,
        data: body.data,
        categoria: body.categoria,
        despesa: body.despesa,
        forma_pagamento: body.forma_pagamento,
        recorrencia: body.recorrencia,
        valor: body.valor,
      });

      return createExpenseData;
    } catch (error) {
      console.error('Erro ao criar despesa no servidor:', error.message);
      throw new InternalServerErrorException(
        'Erro ao criar renda no servidor.',
      );
    }
  }

  @Patch(':id')
  async updateExpense(
    @Param('id') id: string,
    @Body(new ZodPipe(updateExpenseRequest))
    body: UpdateExpenseRequest,
  ) {
    const expense = await this.expenseService.updateExpense(id, body);
    return expense;
  }

  @Get()
  async getExpense(@Req() request: Request) {
    const userId = request.user?.id;

    if (!userId) {
      return { message: 'User not found.' };
    }

    const expenses = await this.expenseService.findAll(userId);

    return expenses.length > 0 ? expenses : [];
  }
}
