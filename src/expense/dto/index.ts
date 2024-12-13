import {
  CategoriaDespesa,
  FormaPagamento,
  Recorrencia,
  Despesa,
} from '@prisma/client';

export type CreateExpenseDTO = {
  userId: string;
  descricao: string;
  despesa: Despesa;
  data: string | Date;
  categoria: CategoriaDespesa;
  forma_pagamento: FormaPagamento;
  recorrencia: Recorrencia;
  valor: number;
};

export type UpdateExpenseDTO = {
  userId?: string;
  descricao?: string;
  despesa?: Despesa;
  data?: string | Date;
  categoria?: CategoriaDespesa;
  forma_pagamento?: FormaPagamento;
  recorrencia?: Recorrencia;
  valor?: number;
};
