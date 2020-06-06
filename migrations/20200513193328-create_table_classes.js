'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('classes', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nome:{
          type: Sequelize.STRING,
          allowNull: false
      },
      codigo:{
          type: Sequelize.STRING, 
          allowNull: false,
          unique: true
      },
      id_professor:{
        type: Sequelize.INTEGER,
        references:{
          model:'professores',
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
    return queryInterface.dropTable('classes');
  }
};
