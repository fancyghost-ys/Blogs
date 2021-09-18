'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.article,{through:'article_user',foreignKey:'userId'})
      this.hasMany(models.article_user,{ foreignKey: 'userId' })
    }
  };
  user.init({
    userName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};