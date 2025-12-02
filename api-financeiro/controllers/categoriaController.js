const { Categoria } = require('../models')
const normalizeFields = require('../utils/normalizeFields'); 


exports.criar = async (req, res) => {
    const dados = req.body
    try {
        const addCategoria = await Categoria.create(dados)
        res.status(201).json(addCategoria)
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
}

exports.listar = async(req, res) => {
    
    try {
        const resultado = await Categoria.findAll()
        res.json(resultado)
    } catch (error) {
        res.status(500).json({ erro: `Erro ao listar registros: ${error}` });
    }
}

exports.alterar = async (req, res) => {
  const { id } = req.params;

  try {
    normalizeFields(req.body);

    const [atualizado] = await Categoria.update(req.body, {
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
    const removido = await Categoria.destroy({
      where: { id }
    });

    if (removido) {
      return res.status(204).send(); 
    }

    res.status(404).json({ msg: "Registro não encontrado" });

  } catch (error) {
    res.status(500).json({
      erro: `Erro ao remover registro: ${error}`
    });
  }
};