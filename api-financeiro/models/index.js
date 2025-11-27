const conexaoBanco = require('../config/database')
const Financeiro = require('./financeiro')(conexaoBanco)
const Usuario = require('./usuarios')(conexaoBanco)

Usuario.hasMany(Financeiro, { foreignKey: "usuarioid" })
Financeiro.belongsTo(Usuario, { foreignKey: "usuarioid" })
 
module.exports = {conexaoBanco, Usuario, Financeiro}