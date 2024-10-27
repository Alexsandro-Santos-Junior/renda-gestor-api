import { Fonte, Categoria, FormaPagamento, Recorrencia } from '@prisma/client';
import { z } from 'zod';

export const createIncomeRequest = z.object({
  userId: z.string(),
  fonte: z.nativeEnum(Fonte),
  data: z.preprocess((val) => {
    if (typeof val === 'string' || val instanceof Date) {
      return new Date(val);
    }
    return val;
  }, z.date()),
  categoria: z.nativeEnum(Categoria),
  forma_pagamento: z.nativeEnum(FormaPagamento),
  recorrencia: z.nativeEnum(Recorrencia),
  valor: z.number(),
});

export type CreateIncomeRequest = z.infer<typeof createIncomeRequest>;

export const updateIncomeRequest = z.object({
  fonte: z.nativeEnum(Fonte).optional(),
  data: z
    .preprocess((val) => {
      if (typeof val === 'string' || val instanceof Date) {
        return new Date(val);
      }
      return val;
    }, z.date())
    .optional(),
  categoria: z.nativeEnum(Categoria).optional(),
  forma_pagamento: z.nativeEnum(FormaPagamento).optional(),
  recorrencia: z.nativeEnum(Recorrencia).optional(),
  valor: z.number().optional(),
});

export type UpdateIncomeRequest = z.infer<typeof updateIncomeRequest>;
