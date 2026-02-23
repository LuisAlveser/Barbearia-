'use strict';
import {Model} from 'sequelize';
export default  (sequelize, DataTypes) => {
  class Barbeiro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Barbeiro.belongsTo(models.Usuario,{foreignKey:"id_user",});
      Barbeiro.hasMany(models.Cortes,{foreignKey:"id_barbeiro",onDelete:"CASCADE",hooks:true})
      Barbeiro.hasMany(models.Agendamentos,{foreignKey:"id_barbeiro"})
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