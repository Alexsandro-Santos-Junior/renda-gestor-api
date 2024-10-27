import { TipoBem } from '@prisma/client';
import { z } from 'zod';

export const createAssetRequest = z.object({
  userId: z.string(),
  descricao: z.string(),
  data_aquisicao: z.preprocess((val) => {
    if (typeof val === 'string' || val instanceof Date) {
      return new Date(val);
    }
    return val;
  }, z.date()),
  tipo: z.nativeEnum(TipoBem),
  valor_estimado: z.number(),
});

export type CreateAssetRequest = z.infer<typeof createAssetRequest>;

export const updateAssetRequest = z.object({
  descricao: z.string().optional(),
  data_aquisicao: z
    .preprocess((val) => {
      if (typeof val === 'string' || val instanceof Date) {
        return new Date(val);
      }
      return val;
    }, z.date())
    .optional(),
  tipo: z.nativeEnum(TipoBem).optional(),
  valor_estimado: z.number().optional(),
});

export type UpdateAssetRequest = z.infer<typeof updateAssetRequest>;
