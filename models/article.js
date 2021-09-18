'use strict';
const shortid = require('shortid')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.user,{through:'article_user',foreignKey:'articleId'})
      this.hasMany(models.article_user,{ foreignKey: 'articleId' })
      this.belongsTo(models.author,{ foreignKey: 'authorId' })
      this.hasMany(models.comments,{ foreignKey: 'articleId' })
      this.hasMany(models.thumbs,{ foreignKey: 'articleId' })

    }
  };
  article.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    authorId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'article',
    hooks:{
      beforeCreate:generateID
    }
  });
  return article;
};

const generateID = async(authors) =>{
  if(authors.changed('id'))
  authors.id = await shortid.generate();
 return authors
 }