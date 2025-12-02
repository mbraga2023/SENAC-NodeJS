const conexaoBanco = require('../config/database')
const Financeiro = require('./financeiro')(conexaoBanco)
const Usuario = require('./usuarios')(conexaoBanco)
const Categoria =  require('./categoria')(conexaoBanco)


Usuario.hasMany(Financeiro, { foreignKey: "usuarioid" })
Financeiro.belongsTo(Usuario, { foreignKey: "usuarioid" })

Categoria.hasMany(Financeiro, { 
  foreignKey: "categoriaid",
  as: "financeiros"
});

Financeiro.belongsTo(Categoria, { 
  foreignKey: "categoriaid",
  as: "categoria"
});
 
module.exports = {conexaoBanco, Usuario, Financeiro, Categoria}