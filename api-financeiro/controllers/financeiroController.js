const { Financeiro } = require('../models') //models/index.js

exports.listar = async (req, res) => {
  try {
    const resultado = await Financeiro.findAll();
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ erro: `Erro ao listar registros: ${error}` });
  }
};


exports.criar = async(req, res) =>{
    try {
        const registro = await Financeiro.create(req.body)
        res.status(201).json(registro)
    } catch (error) {
        res.status(500).json({erro: `Erro ao criar registro ${error}`})
    }
}