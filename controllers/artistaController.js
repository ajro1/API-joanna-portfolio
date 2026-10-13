import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// Filtro select que omite o campo senhaHash nas respostas públicas da API
const selectSemSenha = {
  id: true,
  nome: true,
  email: true,
  biografia: true,
  fotoUrl: true,
  numeroTelefone: true,
  instagram: true,
  role: true,
  criadoEm: true,
  atualizadoEm: true,
};

// GET /artistas — lista todos os artistas cadastrados
export async function listarArtistas(req, res, next) {
  try {
    const artistas = await prisma.artista.findMany({
      select: selectSemSenha,
    });
    res.json(artistas);
  } catch (erro) {
    next(erro);
  }
}

// GET /artistas/:id — busca um artista específico pelo ID
export async function buscarArtista(req, res, next) {
  try {
    const { id } = req.params;
    const artista = await prisma.artista.findUnique({
      where: { id: Number(id) },
      select: selectSemSenha,
    });

    if (!artista) {
      return res.status(404).json({ erro: 'Artista não encontrado' });
    }

    res.json(artista);
  } catch (erro) {
    next(erro);
  }
}

// POST /artistas — cadastra um novo artista
export async function criarArtista(req, res, next) {
  try {
    const { nome, email, senhaHash, biografia, fotoUrl, numeroTelefone, instagram } = req.body;

    // Verifica se o email já está cadastrado
    const emailExistente = await prisma.artista.findUnique({ where: { email } });
    if (emailExistente) {
      return res.status(400).json({ erro: 'Este e-mail já está em uso.' });
    }

    const artista = await prisma.artista.create({
      data: {
        nome,
        email,
        senhaHash, // Idealmente criptografada no fluxo do auth middleware futuramente
        biografia,
        fotoUrl,
        numeroTelefone,
        instagram,
        role: 'USER', // Padrão inicial
      },
      select: selectSemSenha,
    });

    return res.status(201).json(artista);
  } catch (erro) {
    next(erro);
  }
}

// PUT /artistas/:id — atualiza os dados de um artista
export async function atualizarArtista(req, res, next) {
  try {
    const { id } = req.params;
    const artista = await prisma.artista.update({
      where: { id: Number(id) },
      data: req.body,
      select: selectSemSenha,
    });

    return res.status(200).json(artista);
  } catch (erro) {
    return res.status(404).json({ erro: 'Artista não encontrado' });
  }
}

// DELETE /artistas/:id — remove um artista do sistema
export async function deletarArtista(req, res, next) {
  try {
    const { id } = req.params;
    await prisma.artista.delete({
      where: { id: Number(id) },
    });

    return res.status(204).end();
  } catch (erro) {
    return res.status(404).json({ erro: 'Artista não encontrado' });
  }
}