'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
        comment: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('comments');
  }
};