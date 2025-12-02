const { DataTypes } = require('sequelize')
const moment = require('moment')

module.exports = (conecxaoBanco) =>{
    const Categoria =  conecxaoBanco.define('Categoria', {
        tituloCategoria: DataTypes.STRING,
        descricaoCategoria: DataTypes.TEXT
    }, {
        tableName: "categorias"
    })
return Categoria
}