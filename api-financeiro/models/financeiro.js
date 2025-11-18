const {DataTypes} = require('sequelize')
module.exports = (conexaoBanco) =>{
    const Financeiro = conexaoBanco.define('Financeiro', {
        data: DataTypes.DATE,
        descricao: DataTypes.STRING,
        formaPagamento: DataTypes.STRING,
        valor: DataTypes.FLOAT,
        tipo: DataTypes.ENUM('entrada', 'saida'),
        
    }, {
        tableName: 'financeiro',
        freezeTableName: 'true'
    })
    return Financeiro;
}