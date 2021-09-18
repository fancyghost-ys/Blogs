'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('article_users', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
      },
      articleId: {
        type: Sequelize.STRING,
        allowNull:false,
        references:{
          model:'articles',
          key:'id'
        }, 
        onDelete: 'CASCADE' 
        },
      userId: {
        type: Sequelize.STRING,
        allowNull:false,
        references:{
          model:'users',
          key:'id'
        }, 
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('NOW()')

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('NOW()')

      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('article_users');
  }
};