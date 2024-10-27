import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateIncomeDTO, UpdateIncomeDTO } from './dto';

@Injectable()
export class IncomeService {
  constructor(private db: DatabaseService) {}

  async createIncome(data: CreateIncomeDTO & { userId: string }) {
    console.log('Dados recebidos no service:', data);
    const createdIncome = await this.db.income.create({
      data: {
        userId: data.userId,
        fonte: data.fonte,
        data: data.data,
        categoria: data.categoria,
        forma_pagamento: data.forma_pagamento,
        recorrencia: data.recorrencia,
        valor: data.valor,
      },
      select: {
        id: true,
        fonte: true,
        data: true,
        categoria: true,
        forma_pagamento: true,
        recorrencia: true,
        valor: true,
      },
    });
    return createdIncome;
  }

  async updateIncome(id: string, data: UpdateIncomeDTO) {
    const updatedIncome = await this.db.income.update({
      where: { id },
      data: {
        fonte: data.fonte,
        categoria: data.categoria,
        data: data.data,
        forma_pagamento: data.forma_pagamento,
        recorrencia: data.recorrencia,
        valor: data.valor,
      },
      select: {
        id: true,
        fonte: true,
        data: true,
        categoria: true,
        forma_pagamento: true,
        recorrencia: true,
        valor: true,
      },
    });

    if (!updatedIncome) {
      throw new NotFoundException(`Ganho with id ${id} not found`);
    }

    return updatedIncome;
  }

  async findAll(userId: string) {
    return await this.db.income.findMany({
      where: { userId },
      select: {
        id: true,
        fonte: true,
        data: true,
        categoria: true,
        forma_pagamento: true,
        recorrencia: true,
        valor: true,
      },
    });
  }

  async getIncome(incomeId: string) {
    // console.log('Income ID recebido:', incomeId);

    const income = await this.db.income.findFirst({
      where: { id: incomeId },
    });

    if (!income) {
      throw new NotFoundException('Renda não encontrada');
    }

    return income;
  }
}
