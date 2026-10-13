import { Router } from 'express'; // Router cria um mini-app de rotas
import {
  listarArtistas,
  buscarArtista,
  criarArtista,
  atualizarArtista,
  deletarArtista,
} from '../controllers/artistaController.js'; // importa as funções certas do controlador

const router = Router(); // cria o router de artistas

router.get('/', listarArtistas);         // GET /artistas
router.get('/:id', buscarArtista);       // GET /artistas/:id
router.post('/', criarArtista);          // POST /artistas
router.put('/:id', atualizarArtista);    // PUT /artistas/:id
router.delete('/:id', deletarArtista);   // DELETE /artistas/:id

export default router; // exporta o router para usar no index.js
