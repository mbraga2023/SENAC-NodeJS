const { DataTypes } = require('sequelize');
const moment = require('moment');

module.exports = (conexaoBanco) => {
    const Financeiro = conexaoBanco.define('Financeiro', {

        // ============================
        //        DATA (Date)
        // ============================
        data: {
            type: DataTypes.DATEONLY,  // avoids moment parsing warning
            allowNull: false,
            validate: {

                notNull: { msg: "A data é obrigatória" },

                // Strict regex (prevents letters)
                is: {
                    args: /^\d{4}-\d{2}-\d{2}$/,
                    msg: "A data deve estar no formato yyyy-mm-dd"
                },

                // Calendar validity check
                isValidDate(value) {
                    if (!moment(value, "YYYY-MM-DD", true).isValid()) {
                        throw new Error("Data inválida");
                    }
                }
            }
        },

        // ============================
        //       DESCRIÇÃO
        // ============================
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "A descrição é obrigatória" },
                notEmpty: { msg: "A descrição não pode ser vazia" },
                len: {
                    args: [3, 255],
                    msg: "A descrição deve ter entre 3 e 255 caracteres"
                }
            }
        },

        // ============================
        //   FORMA DE PAGAMENTO
        // ============================
        formaPagamento: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "A forma de pagamento é obrigatória" },
                notEmpty: { msg: "A forma de pagamento não pode ser vazia" },
                isIn: {
                    args: [["pix", "dinheiro", "crédito", "débito", "boleto"]],
                    msg: "Forma de pagamento inválida"
                }
            }
        },

        // ============================
        //         VALOR
        // ============================
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: { msg: "O valor é obrigatório" },
                isFloat: { msg: "O valor deve ser numérico" },
                min: {
                    args: [0.01],
                    msg: "O valor deve ser maior que zero"
                }
            }
        },

        // ============================
        //          TIPO
        // ============================
        tipo: {
            type: DataTypes.ENUM('entrada', 'saida'),
            allowNull: false,
            validate: {
                notNull: { msg: "O tipo é obrigatório" },
                isIn: {
                    args: [['entrada', 'saida']],
                    msg: "O tipo deve ser 'entrada' ou 'saida'"
                }
            }
        }, categoriaid: {
            type: DataTypes.INTEGER,
            allowNull: true
        }



    }, {
        tableName: 'financeiro',
        freezeTableName: true
    });

    return Financeiro;
};
