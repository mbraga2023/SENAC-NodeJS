const conexaoBanco = require('../config/database')
const Financeiro = require('./financeiro')(conexaoBanco)
const Usuario = require('./usuarios')(conexaoBanco)

Usuario.hasMany(Financeiro, { foreignKey: "usuarioId" })
Financeiro.belongsTo(Usuario, { foreignKey: "usuarioId" })
 
module.exports = {conexaoBanco, Usuario, Financeiro}