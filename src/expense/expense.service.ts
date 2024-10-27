import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateExpenseDTO, UpdateExpenseDTO } from './dto';

@Injectable()
export class ExpenseService {
  constructor(private db: DatabaseService) {}

  async createExpense(data: CreateExpenseDTO & { userId: string }) {
    console.log('Dados recebidos no service:', data);
    const createdExpense = await this.db.expense.create({
      data: {
        userId: data.userId,
        descricao: data.descricao,
        data: data.data,
        despesa: data.despesa,
        categoria: data.categoria,
        forma_pagamento: data.forma_pagamento,
        recorrencia: data.recorrencia,
        valor: data.valor,
      },
      select: {
        id: true,
        descricao: true,
        data: true,
        categoria: true,
        despesa: true,
        forma_pagamento: true,
        recorrencia: true,
        valor: true,
      },
    });
    return createdExpense;
  }

  async updateExpense(id: string, data: UpdateExpenseDTO) {
    const updatedExpense = await this.db.expense.update({
      where: { id },
      data: {
        descricao: data.descricao,
        data: data.data,
        despesa: data.despesa,
        categoria: data.categoria,
        forma_pagamento: data.forma_pagamento,
        recorrencia: data.recorrencia,
        valor: data.valor,
      },
      select: {
        id: true,
        descricao: true,
        data: true,
        despesa: true,
        categoria: true,
        forma_pagamento: true,
        recorrencia: true,
        valor: true,
      },
    });

    if (!updatedExpense) {
      throw new NotFoundException(`Ganho with id ${id} not found`);
    }

    return updatedExpense;
  }

  async findAll(userId: string) {
    return await this.db.expense.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        descricao: true,
        data: true,
        despesa: true,
        categoria: true,
        forma_pagamento: true,
        recorrencia: true,
        valor: true,
      },
    });
  }

  async getExpense(expenseId: string) {
    console.log('expense ID recebido:', expenseId);

    const expense = await this.db.expense.findFirst({
      where: { id: expenseId },
    });

    if (!expense) {
      throw new NotFoundException('Renda não encontrada');
    }

    return expense;
  }
}
