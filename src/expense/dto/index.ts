import {
  CategoriaDespesa,
  Despesa,
  FormaPagamento,
  Recorrencia,
} from '@prisma/client';

export type CreateExpenseDTO = {
  userId: string;
  despesa: Despesa;
  descricao: string;
  data: string | Date;
  categoria: CategoriaDespesa;
  forma_pagamento: FormaPagamento;
  recorrencia: Recorrencia;
  valor: number;
};

export type UpdateExpenseDTO = {
  userId?: string;
  despesa?: Despesa;
  descricao?: string;
  data?: string | Date;
  categoria?: CategoriaDespesa;
  forma_pagamento?: FormaPagamento;
  recorrencia?: Recorrencia;
  valor?: number;
};
