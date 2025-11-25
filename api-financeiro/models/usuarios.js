const { DataTypes } = require('sequelize');
const moment = require('moment');
const bcrypt = require('bcryptjs')


module.exports = (conexaoBanco) => {
    const Usuario = conexaoBanco.define('Usuario', {
        nome: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        senha: DataTypes.STRING

    }, {
        tableName: "usuarios"
    })

    //CRIPTOGRAFIA DA SENHA
    Usuario.beforeCreate(async (usuario) => {
        usuario.senha = await bcrypt.hash(usuario.senha, 10)
    })

    return Usuario;
};
