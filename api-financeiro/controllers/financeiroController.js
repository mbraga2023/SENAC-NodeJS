const { Financeiro } = require('../models') //models/index.js
const { Categoria } = require('../models') //models/index.js
const normalizeFields = require('../utils/normalizeFields'); 

exports.listar = async (req, res) => {
  const usuarioIdRecuperado = req.usuarioId;

  try {
    const resultado = await Financeiro.findAll({
      where: {
        usuarioid: usuarioIdRecuperado
      },
      include: [
  {
    model: Categoria,
    as: "categoria",
    attributes: ["id", "tituloCategoria", "descricaoCategoria"]
  }
]

    });

    res.json(resultado);

  } catch (error) {
    res.status(500).json({ erro: `Erro ao listar registros: ${error}` });
  }
};



exports.criar = async (req, res) => {
  const usuarioIdRecuperado = req.usuarioId;

  try {
    const dados = {
      ...req.body,
      usuarioid: usuarioIdRecuperado  
    };

    const registro = await Financeiro.create(dados);

    res.status(201).json(registro);

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        Inconsistencias: error.errors.map(e => e.message)
      });
    }

    res.status(500).json({
      erro: `Erro ao criar registro: ${error}`
    });
  }
};


exports.alterar = async (req, res) => {
  const { id } = req.params;

  try {
    normalizeFields(req.body);

    const [atualizado] = await Financeiro.update(req.body, {
      where: { id }
    });

    if (atualizado) {
      return res.json({ sucesso: 'Registro atualizado' });
    }

    res.status(404).json({ msg: "Registro não encontrado" });

  } catch (listaDeErros) {

    if (listaDeErros.name === 'SequelizeValidationError') {
      return res.status(400).json({
        Inconsistencias: listaDeErros.errors.map(e => e.message)
      });
    }

    res.status(500).json({
      erro: `Erro ao atualizar registro: ${listaDeErros}`
    });
  }
};

exports.remover = async (req, res) => {
  const { id } = req.params;

  try {
    const removido = await Financeiro.destroy({
      where: { id }
    });

    if (removido) {
      return res.status(204).send(); // no body in 204
    }

    res.status(404).json({ msg: "Registro não encontrado" });

  } catch (error) {
    res.status(500).json({
      erro: `Erro ao remover registro: ${error}`
    });
  }
};
