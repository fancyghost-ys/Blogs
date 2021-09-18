'use strict';
const shortid = require('shortid')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.article,{ foreignKey: 'authorId' })
    }
  };
  author.init({
    name: DataTypes.STRING,
    jobTitle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'author',
    hooks:{
      beforeCreate:generateID
    }
  });
  return author;
};

const generateID = async(authors) =>{
  if(authors.changed('id'))
  authors.id = await shortid.generate();
 return authors
 }