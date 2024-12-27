USE master;
GO

-- Cria o banco de dados
CREATE DATABASE ayla;
GO

-- Usa o banco de dados recém-criado
USE ayla;
GO

-- Cria a tabela Products
CREATE TABLE Products (
    Id UNIQUEIDENTIFIER PRIMARY KEY, -- Tipo Guid para o Id
    Name NVARCHAR(100) NOT NULL, -- Nome do produto
    Sku NVARCHAR(50) NOT NULL UNIQUE, -- Código SKU único
    Description NVARCHAR(MAX), -- Descrição do produto
    Price DECIMAL(18,2), -- Preço com precisão e escala especificadas
    StockQuantity INT, -- Quantidade em estoque
    Category NVARCHAR(100), -- Categoria do produto
    CreatedAt DATETIME2 DEFAULT GETDATE(), -- Data de criação com hora exata
    UpdatedAt DATETIME2, -- Data da última atualização (opcional)
    IsActive BIT DEFAULT 1 -- Indicador ativo/inativo
);
GO
