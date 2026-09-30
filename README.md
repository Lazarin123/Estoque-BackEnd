# 🛒 E-Commerce Backend — Atomic Stock Control

> API RESTful de alta confiabilidade para sistemas de comércio eletrônico, desenvolvida com foco em **controle atômico de estoque**, prevenção de **over-selling** e consistência transacional.

O principal diferencial do projeto é garantir que a **baixa do estoque e a criação do pedido aconteçam de forma atômica**, evitando inconsistências quando múltiplas requisições tentam comprar o mesmo produto simultaneamente.

---

## 🎯 Sobre o Projeto

O sistema foi projetado para resolver um dos principais desafios de backends de e-commerce: **concorrência na atualização do estoque**.

Em cenários de alta demanda, duas ou mais requisições podem tentar comprar o último item disponível ao mesmo tempo.

A solução utiliza **transações ACID através do Prisma ORM**, garantindo que as operações relacionadas ao pedido e ao estoque sejam tratadas como uma única unidade transacional.

### Fluxo

```text
Cliente
   │
   ▼
Express API
   │
   ▼
Validação com Zod
   │
   ▼
Prisma Transaction
   │
   ├── Verifica estoque
   │
   ├── Baixa quantidade disponível
   │
   └── Cria pedido
   │
   ▼
COMMIT
```

Caso qualquer etapa falhe:

```text
Transaction
     │
     ▼
   ERROR
     │
     ▼
  ROLLBACK
     │
     ▼
Nenhuma alteração parcial
```

---

## 🔐 Controle Atômico de Estoque

O sistema utiliza:

```text
Prisma ORM
      │
      ▼
$transaction()
      │
      ├── Validação do estoque
      ├── Atualização do produto
      └── Criação do pedido
```

Todas as operações são confirmadas juntas.

### Exemplo conceitual

Produto:

```text
Estoque disponível: 1
```

Duas requisições chegam simultaneamente:

```text
Request A ──┐
            ├──► Transaction
Request B ──┘
```

A transação garante que o estoque não seja consumido de forma inconsistente, evitando a criação de pedidos acima da quantidade realmente disponível.

---

## 🧱 Stack

| Tecnologia     | Utilização                       |
| -------------- | -------------------------------- |
| **Node.js**    | Runtime                          |
| **TypeScript** | Desenvolvimento tipado           |
| **Express.js** | API REST                         |
| **Prisma ORM** | Acesso e transações no banco     |
| **PostgreSQL** | Banco de dados                   |
| **Supabase**   | Infraestrutura PostgreSQL        |
| **Zod**        | Validação e sanitização de dados |

---

## 🏗️ Arquitetura

```text
                 ┌──────────────┐
                 │    Cliente   │
                 └──────┬───────┘
                        │
                        ▼
                 ┌──────────────┐
                 │   Express    │
                 │     API      │
                 └──────┬───────┘
                        │
                        ▼
                 ┌──────────────┐
                 │     Zod      │
                 │  Validation  │
                 └──────┬───────┘
                        │
                        ▼
                 ┌──────────────┐
                 │    Prisma    │
                 │ Transaction  │
                 └──────┬───────┘
                        │
                        ▼
                 ┌──────────────┐
                 │ PostgreSQL   │
                 │  Supabase    │
                 └──────────────┘
```

---

## 📦 Principais Responsabilidades

### API

- Receber requisições HTTP.
- Validar payloads.
- Processar pedidos.
- Consultar produtos e estoque.
- Retornar respostas HTTP consistentes.

### Prisma

- Gerenciar acesso ao PostgreSQL.
- Executar transações.
- Garantir atomicidade das operações.
- Centralizar o acesso aos dados.

### Zod

- Validar entradas.
- Garantir tipos esperados.
- Rejeitar payloads inválidos.
- Reduzir dados inconsistentes chegando à camada de negócio.

---

## 🛡️ Princípios de Confiabilidade

O projeto prioriza:

- **Atomicidade**
- **Consistência**
- **Integridade dos dados**
- **Validação rigorosa**
- **Controle de concorrência**
- **Prevenção de over-selling**
- **Separação de responsabilidades**
- **Tipagem estática**

---

## ⚙️ Instalação

Clone o projeto:

```bash
git clone https://github.com/Lazarin123/SEU-REPOSITORIO.git
```

Entre no diretório:

```bash
cd SEU-REPOSITORIO
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Execute em desenvolvimento:

```bash
npm run dev
```

---

## 🔄 Fluxo de uma Compra

```text
POST /orders
      │
      ▼
Validação Zod
      │
      ▼
Verificação do produto
      │
      ▼
Verificação do estoque
      │
      ▼
┌──────────────────────┐
│ Prisma Transaction   │
│                      │
│  Atualiza estoque    │
│  Cria pedido         │
│                      │
└──────────┬───────────┘
           │
           ▼
        COMMIT
           │
           ▼
       HTTP 201
```

Se ocorrer um erro durante a transação:

```text
ERROR
  │
  ▼
ROLLBACK
  │
  ├── Estoque permanece consistente
  └── Pedido não é criado parcialmente
```

---

## 🚀 Diferencial Técnico

O projeto não trata o estoque apenas como uma simples operação de `UPDATE`.

A lógica considera **concorrência e consistência transacional**, problemas fundamentais em aplicações de comércio eletrônico.

O objetivo é garantir que operações críticas de negócio sejam executadas de maneira confiável mesmo diante de múltiplas requisições simultâneas.

---

## 📚 Conceitos Demonstrados

Este projeto demonstra conhecimentos práticos em:

- REST API
- Node.js
- TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- Supabase
- Zod
- Transações ACID
- Concorrência
- Integridade de dados
- Arquitetura backend
- Desenvolvimento de sistemas de e-commerce

---

## 👨‍💻 Autor

**Samuel Lazarin**

Desenvolvedor Full Stack com foco em desenvolvimento de software, backend, automação e arquitetura de sistemas.

**GitHub:** [@Lazarin123](https://github.com/Lazarin123)

---

<p align="center">
  <strong>E-Commerce Backend — Atomic Stock Control</strong>
  <br>
  Node.js • TypeScript • Express • Prisma • PostgreSQL • Supabase • Zod
</p>
