import {
  CategoriaDespesa,
  Despesa,
  FormaPagamento,
  Recorrencia,
} from '@prisma/client';
import { z } from 'zod';

export const createExpenseRequest = z.object({
  userId: z.string(),
  descricao: z.string(),
  data: z.preprocess((val) => {
    if (typeof val === 'string' || val instanceof Date) {
      return new Date(val);
    }
    return val;
  }, z.date()),
  despesa: z.nativeEnum(Despesa),
  categoria: z.nativeEnum(CategoriaDespesa),
  forma_pagamento: z.nativeEnum(FormaPagamento),
  recorrencia: z.nativeEnum(Recorrencia),
  valor: z.number(),
});

export type CreateExpenseRequest = z.infer<typeof createExpenseRequest>;

export const updateExpenseRequest = z.object({
  descricao: z.string().optional(),
  data: z
    .preprocess((val) => {
      if (typeof val === 'string' || val instanceof Date) {
        return new Date(val);
      }
      return val;
    }, z.date())
    .optional(),
  despesa: z.nativeEnum(Despesa).optional(),
  categoria: z.nativeEnum(CategoriaDespesa).optional(),
  forma_pagamento: z.nativeEnum(FormaPagamento).optional(),
  recorrencia: z.nativeEnum(Recorrencia).optional(),
  valor: z.number().optional(),
});

export type UpdateExpenseRequest = z.infer<typeof updateExpenseRequest>;
