'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.categories, { foreignKey: 'category_id' });
    }
  }
  products.init({
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    is_deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'products',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return products;
};