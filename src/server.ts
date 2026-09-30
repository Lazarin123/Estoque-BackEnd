import express from 'express';
import { prisma } from './lib/prisma';

const app = express();

app.use(express.json());

// Rota de teste para verificar a conexão com o banco
app.get('/status', async (req, res) => {
  try {
    // Tenta contar os produtos para validar a comunicação com o Supabase
    const count = await prisma.product.count();
    return res.json({ message: 'API conectada com sucesso ao Supabase!', totalProducts: count });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao conectar com a base de dados', details: error });
  }
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor a correr na porta ${PORT}`);
});
