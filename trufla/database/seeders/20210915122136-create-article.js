'use strict';
const shortid = require('shortid');
const models = require('../../models')
const Author = models.author
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
   const authors = await Author.findAll({ limit : 3 })
   await queryInterface.bulkInsert('articles',[
     {
      id:shortid.generate(),
    title:'The secret of anything',
    body:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    authorId: authors[0].id
   },
   {
    id:shortid.generate(),
    title:'The demo',
    body:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    authorId: authors[1].id
   }]
   )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('articles', null, {});

  }
};
