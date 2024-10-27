import { Injectable } from '@nestjs/common';
import { startOfMonth, endOfMonth } from 'date-fns';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DashboardsService {
  constructor(private readonly db: DatabaseService) {}

  // Obtém as rendas do mês atual, filtradas por usuário
  private async getIncomes(
    startOfCurrentMonth: Date,
    endOfCurrentMonth: Date,
    userId: string, // Filtro pelo usuário
  ) {
    return this.db.income.findMany({
      where: {
        createdAt: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
        userId: userId, // Filtro para trazer apenas as rendas do usuário
      },
    });
  }

  // Obtém as despesas do mês atual, filtradas por usuário
  private async getExpenses(
    startOfCurrentMonth: Date,
    endOfCurrentMonth: Date,
    userId: string, // Filtro pelo usuário
  ) {
    return this.db.expense.findMany({
      where: {
        createdAt: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
        userId: userId, // Filtro para trazer apenas as despesas do usuário
      },
    });
  }

  // Calcula o valor total das rendas
  private calculateTotalIncome(incomes: any[]) {
    return incomes.reduce((total, income) => {
      return total + (income.valor || 0); // Certifica que 'valor' seja um número
    }, 0);
  }

  // Calcula o valor total das despesas
  private calculateTotalExpenses(expenses: any[]) {
    return expenses.reduce((total, expense) => {
      return total + (expense.valor || 0); // Certifica que 'valor' seja um número
    }, 0);
  }

  // Calcula o saldo (rendas - despesas)
  private calculateBalance(totalIncome: number, totalExpense: number) {
    return totalIncome - totalExpense;
  }

  // Método principal que orquestra a obtenção dos dados
  async getIncomeAndExpenseTotals(userId: string) {
    const startOfCurrentMonth = startOfMonth(new Date());
    const endOfCurrentMonth = endOfMonth(new Date());

    // Obtém as rendas e despesas separadamente, filtradas por usuário
    const newIncomes = await this.getIncomes(
      startOfCurrentMonth,
      endOfCurrentMonth,
      userId,
    );
    const newExpenses = await this.getExpenses(
      startOfCurrentMonth,
      endOfCurrentMonth,
      userId,
    );

    // Calcula os valores totais de rendas e despesas
    const totalIncomeValue = this.calculateTotalIncome(newIncomes);
    const totalExpenseValue = this.calculateTotalExpenses(newExpenses);

    // Calcula o saldo (renda - despesa)
    const balance = this.calculateBalance(totalIncomeValue, totalExpenseValue);

    // Retorna os totais de renda, despesa e saldo, além das quantidades
    return {
      totalIncomeValue, // Valor total das rendas
      totalIncomesCount: newIncomes.length, // Quantidade de rendas
      totalExpenseValue, // Valor total das despesas
      totalExpensesCount: newExpenses.length, // Quantidade de despesas
      balance, // Saldo: renda - despesa
    };
  }

  // Detalhes das despesas do usuario
  async getDetailedExpensesByUser(userId: string) {
    const startOfCurrentMonth = startOfMonth(new Date());
    const endOfCurrentMonth = endOfMonth(new Date());

    return this.db.expense.findMany({
      where: {
        createdAt: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
        userId: userId,
      },
      select: {
        descricao: true,
        categoria: true,
        forma_pagamento: true,
        recorrencia: true,
        valor: true,
      },
    });
  }
}
