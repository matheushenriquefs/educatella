'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('professores', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      id_usuario:{
        type: Sequelize.INTEGER,
        references:{
          model:'usuarios',
          key:'id'
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      createdAt:{
        type: Sequelize.DATE, 
        allowNull: false
      },
      updatedAt:{
        type: Sequelize.DATE, 
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('professores');
  }
};