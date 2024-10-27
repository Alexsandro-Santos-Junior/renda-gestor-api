import {
  Controller,
  Get,
  Param,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { Request } from 'express';

@Controller('dashboard')
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}
  //
  @Get('incomes-expenses')
  async getIncomesAndExpensesTotals(@Req() request: Request) {
    const user = request.user;

    if (!user || !user.id) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    const userId = user.id;

    // Chama o serviço para obter os totais de renda, despesa e saldo
    const totals =
      await this.dashboardsService.getIncomeAndExpenseTotals(userId);

    // Retorna os totais de renda, despesa, quantidade e saldo
    return {
      success: true,
      data: totals,
    };
  }
  //
  @Get('expenses-details/:userId')
  async getDetailedExpenses(@Param('userId') userId: string) {
    const expenseDetails =
      await this.dashboardsService.getDetailedExpensesByUser(userId);

    return {
      success: true,
      data: expenseDetails,
    };
  }
}
