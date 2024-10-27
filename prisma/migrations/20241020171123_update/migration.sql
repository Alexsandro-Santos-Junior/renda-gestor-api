-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `authProviderId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `incomeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_authProviderId_key`(`authProviderId`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Income` (
    `id` VARCHAR(191) NOT NULL,
    `fonte` ENUM('SALARIO', 'FREELANCE', 'INVESTIMENTO', 'ALUGUEL', 'OUTROS') NOT NULL,
    `categoria` ENUM('RENDA_PRINCIPAL', 'RENDA_SECUNDARIA', 'BONUS', 'COMISSAO', 'ALUGUEL', 'JUROS', 'OUTROS') NOT NULL,
    `forma_pagamento` ENUM('DINHEIRO', 'CARTAO_DE_CREDITO', 'CARTAO_DE_DEBITO', 'TRANSFERENCIA', 'PIX', 'BOLETO') NOT NULL,
    `recorrencia` ENUM('UNICO', 'DIARIO', 'SEMANAL', 'MENSAL', 'TRIMESTRAL', 'ANUAL') NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `valor` DOUBLE NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Income_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expense` (
    `id` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `categoria` ENUM('ALIMENTACAO', 'TRANSPORTE', 'SAUDE', 'EDUCACAO', 'LAZER', 'HABITACAO', 'CONTAS', 'VESTUARIO', 'OUTROS') NOT NULL,
    `forma_pagamento` ENUM('DINHEIRO', 'CARTAO_DE_CREDITO', 'CARTAO_DE_DEBITO', 'TRANSFERENCIA', 'PIX', 'BOLETO') NOT NULL,
    `recorrencia` ENUM('UNICO', 'DIARIO', 'SEMANAL', 'MENSAL', 'TRIMESTRAL', 'ANUAL') NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `valor` DOUBLE NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Expense_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asset` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` ENUM('CASA', 'CARRO', 'MOTO', 'COMPUTADOR', 'TERRENO', 'JOIA', 'ACOES', 'OUTROS') NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `valor_estimado` DOUBLE NOT NULL,
    `data_aquisicao` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Asset_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Income` ADD CONSTRAINT `Income_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
