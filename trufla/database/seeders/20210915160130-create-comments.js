'use strict';
const shortid = require("shortid");
const models = require('../../models')
const user = models.user
const article = models.article
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const users = await user.findAll({limit : 3})
     const articles = await article.findAll({limit : 3})
     await queryInterface.bulkInsert('comments',[{
      id:shortid.generate(),
      comment:'nice article',
        articleId: articles[0].id,
        userid : users[1].id       
    },
  {
    id:shortid.generate(),
    comment:'bad article',
    articleId: articles[1].id,
    userid : users[1].id       
  }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
