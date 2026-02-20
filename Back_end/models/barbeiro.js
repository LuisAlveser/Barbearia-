'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barbeiro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Barbeiro.init({
    id_user: DataTypes.INTEGER,
    bio: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Barbeiro',
  });
  return Barbeiro;
};