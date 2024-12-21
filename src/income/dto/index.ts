import { Fonte, Categoria, FormaPagamento, Recorrencia } from '@prisma/client';

export type CreateIncomeDTO = {
  fonte: Fonte;
  categoria: Categoria;
  data: string | Date;
  forma_pagamento: FormaPagamento;
  recorrencia: Recorrencia;
  valor: number;
};

export type UpdateIncomeDTO = {
  fonte?: Fonte;
  categoria?: Categoria;
  data?: string | Date;
  forma_pagamento?: FormaPagamento;
  recorrencia?: Recorrencia;
  valor?: number;
};
