'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class thumbs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.article,{foreignKey: 'articleId'})
      this.belongsTo(models.user,{ foreignKey: 'userId' })
    }
  };
  thumbs.init({
    thumb: DataTypes.BOOLEAN,
    articleId: DataTypes.STRING,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'thumbs',
  });
  return thumbs;
};