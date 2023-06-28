'use strict';
import {Model, DataTypes} from 'sequelize';
import {sequelize} from './../db.js'
  export default class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init({
    name: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });

  // Task.belongsTo(User, { foreignKey: 'user_id' });