'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id'
      })
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope:{ status: 'confirmado'},
        as: 'Teste'
      })
    }
  }
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidacao: function (dado) {
          if (dado.length < 3) throw new Error('Nome inválido!')
        }
      }
    },
    
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Dados do tipo e-mail inválido'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: { where: { ativo: true } },
    scopes: { todos: { where: {} } }
  },);
  return Pessoas;
};