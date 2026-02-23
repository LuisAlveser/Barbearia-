'use strict';
import {Model} from 'sequelize';
export default (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Usuario.hasMany(models.Barbeiro,{foreignKey:"id_user",onDelete:"CASCADE",hooks:true});
     Usuario.hasMany(models.Agendamentos,{foreignKey:"id_cliente"})
    }
  }
  Usuario.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    regra: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};