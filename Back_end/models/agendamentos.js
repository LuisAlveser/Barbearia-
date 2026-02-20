'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agendamentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Agendamentos.init({
    id_cliente: DataTypes.INTEGER,
    id_barbeiro: DataTypes.INTEGER,
    data: DataTypes.STRING,
    cancelamento: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Agendamentos',
  });
  return Agendamentos;
};