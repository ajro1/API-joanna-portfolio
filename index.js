import 'dotenv/config';                        // carrega .env — PRIMEIRA LINHA
import express from 'express';                  // importa o Express
import cors from 'cors'; 
import logger from './middlewares/logger.js';    // importa o middleware de log
import tratarErro from './middlewares/erro.js';   // importa o middleware de erro

// Importação das rotas adaptadas ao novo tema (Artistas e Obras)
import artistaRouter from './routes/artista.js'; 
import obraRouter from './routes/obra.js'; 

const app = express();                          // cria a aplicação Express
const PORT = process.env.PORT || 3000;          // lê do .env, com fallback para 3000

app.use(cors());                                // 1º — libera CORS para qualquer origem
app.use(express.json());                        // 2º — parseia body JSON
app.use(logger);                                // 3º — registra log

// rota raiz — boas-vindas
app.get('/', (req, res) => {
  res.json({ mensagem: 'Portfólio da Joanna API está no ar!' });
});

// rota de health check
app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Monta as novas rotas nos mesmos pontos estruturais das rotas antigas
app.use('/artistas', artistaRouter);            // Substitui /alunos por /artistas
app.use('/obras', obraRouter);                  // Substitui /mensagens por /obras

// Middleware de erro — SEMPRE por último, depois das rotas
app.use(tratarErro);

// inicia o servidor localmente — na Vercel essa parte é pulada
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

// exporta o app para a Vercel usar como serverless function
export default app;