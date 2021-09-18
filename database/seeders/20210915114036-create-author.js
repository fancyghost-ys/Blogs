'use strict';

const shortid = require("shortid");

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
   await queryInterface.bulkInsert('authors',[
     {
      id:shortid.generate(),
     name:'John Doe',
     jobTitle:'Writer in WB'
   },
   {
    id:shortid.generate(),
    name:'Mikal Doe',
    jobTitle:'Sport Writer in WB'
  },
  {
    id:shortid.generate(),
    name:'maria john',
    jobTitle:'Photojournalist'
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
    await queryInterface.bulkDelete('auhtors',null,{})
  }
};
