const { Usuario } = require('../models') //models/index.js
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registrar(req, res) {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);

  } catch (listaDeErros) {

    if (listaDeErros.name === 'SequelizeValidationError') {
      return res.status(400).json({
        Inconsistencias: listaDeErros.errors.map(e => e.message)
      });
    }

    res.status(500).json({
      erro: `Erro ao criar registro: ${listaDeErros}`
    });
  }
}

async function login(req, res) {
  const { email, senha } = req.body
  const usuario =  await Usuario.findOne({where: {email}})
  if(!usuario || !(await bcrypt.compare(senha, usuario.senha))){
    return res.status(401).json({erro: "Credenciais inválidas"})
  }
  const token  = jwt.sign({id:usuario.id}, process.env.JWT_SECRET)

    res.json({token});
}

module.exports = {
  registrar,
  login
};
