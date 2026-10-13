import { Router } from 'express'; // Router cria um mini-app de rotas
import {
  listarObras,
  buscarObra,
  criarObra,
  atualizarObra,
  deletarObra,
} from '../controllers/obraController.js'; // importa as funções certas do controlador de obras

const router = Router(); // cria o router de obras

router.get('/', listarObras);         // GET /obras
router.get('/:id', buscarObra);       // GET /obras/:id
router.post('/', criarObra);          // POST /obras
router.put('/:id', atualizarObra);    // PUT /obras/:id
router.delete('/:id', deletarObra);   // DELETE /obras/:id

export default router; // exporta o router para usar no index.js
