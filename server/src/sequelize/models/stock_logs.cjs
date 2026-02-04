'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock_logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  stock_logs.init({
    product_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    time: DataTypes.DATE,
    is_deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'stock_logs',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return stock_logs;
};