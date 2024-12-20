/*
  Warnings:

  - You are about to drop the column `tipo` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `despesa` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Expense` DROP COLUMN `tipo`,
    ADD COLUMN `despesa` ENUM('MORADIA', 'CONDOMINIO', 'ALUGUEL', 'AGUA', 'LUZ', 'GAS', 'INTERNET', 'IPTU', 'PLANO_DE_SAUDE', 'SEGURO_DE_VIDA', 'INVESTIMENTO', 'TARIFAS_BANCARIAS', 'PLANO_CELULAR', 'IPVA', 'SUPERMERCADO', 'CARTAO_DE_CREDITO', 'COMBUSTIVEL', 'FARMACIA', 'GASTOS_COM_ANIMAIS', 'IMPREVISTOS', 'ASSINATURA_VIDEO', 'ASSINATURA_MUSICA', 'PADARIA', 'FEIRA', 'LAZER', 'SALAO', 'CONSULTA_MEDICA', 'CURSO', 'DIVERSOS') NOT NULL;
