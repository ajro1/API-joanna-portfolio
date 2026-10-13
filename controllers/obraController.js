import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// GET /obras — lista todas as obras com os dados resumidos do artista criador
export async function listarObras(req, res, next) {
  try {
    const obras = await prisma.obra.findMany({
      include: {
        artista: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });
    res.json(obras);
  } catch (erro) {
    next(erro);
  }
}

// GET /obras/:id — busca uma obra específica pelo ID
export async function buscarObra(req, res, next) {
  try {
    const { id } = req.params;
    const obra = await prisma.obra.findUnique({
      where: { id: Number(id) },
      include: {
        artista: {
          select: {
            id: true,
            nome: true,
            instagram: true,
          },
        },
      },
    });

    if (!obra) {
      return res.status(404).json({ erro: 'Obra não encontrada.' });
    }

    res.json(obra);
  } catch (erro) {
    next(erro);
  }
}

// POST /obras — cadastra uma nova obra vinculada a um artista
export async function criarObra(req, res, next) {
  try {
    const { titulo, preco, fotoUrl, legenda, dataDeCriacao, dimensoes, artistaId } = req.body;

    // Validação: confere se o artista informado realmente existe no banco
    const artistaExiste = await prisma.artista.findUnique({ where: { id: Number(artistaId) } });
    if (!artistaExiste) {
      return res.status(404).json({ erro: 'O artista informado para esta obra não existe.' });
    }

    const obra = await prisma.obra.create({
      data: {
        titulo,
        preco: Number(preco),
        fotoUrl,
        legenda,
        dataDeCriacao: new Date(dataDeCriacao), // Converte string de data em objeto Date
        dimensoes,
        artistaId: Number(artistaId),
      },
    });

    return res.status(201).json(obra);
  } catch (erro) {
    next(erro);
  }
}

// PUT /obras/:id — atualiza os dados de uma obra de arte
export async function atualizarObra(req, res, next) {
  try {
    const { id } = req.params;
    const dadosAtualizacao = { ...req.body };

    // Garante as conversões corretas de tipo se os valores correspondentes forem enviados
    if (dadosAtualizacao.preco) dadosAtualizacao.preco = Number(dadosAtualizacao.preco);
    if (dadosAtualizacao.artistaId) dadosAtualizacao.artistaId = Number(dadosAtualizacao.artistaId);
    if (dadosAtualizacao.dataDeCriacao) dadosAtualizacao.dataDeCriacao = new Date(dadosAtualizacao.dataDeCriacao);

    const obra = await prisma.obra.update({
      where: { id: Number(id) },
      data: dadosAtualizacao,
    });

    return res.status(200).json(obra);
  } catch (erro) {
    return res.status(404).json({ erro: 'Obra não encontrada.' });
  }
}

// DELETE /obras/:id — remove uma obra de arte do sistema
export async function deletarObra(req, res, next) {
  try {
    const { id } = req.params;
    await prisma.obra.delete({
      where: { id: Number(id) },
    });

    return res.status(204).end();
  } catch (erro) {
    return res.status(404).json({ erro: 'Obra não encontrada.' });
  }
}