import { TipoBem } from '@prisma/client';

export type CreateAssetDTO = {
  userId: string;
  tipo: TipoBem;
  descricao: string;
  valor_estimado: number;
  data_aquisicao: string | Date;
};

export type UpdateAssetDTO = {
  userId?: string;
  tipo?: TipoBem;
  descricao?: string;
  valor_estimado?: number;
  data_aquisicao?: string | Date;
};
