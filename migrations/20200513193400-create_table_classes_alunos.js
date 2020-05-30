'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('classes_alunos', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      id_classe:{
        type: Sequelize.INTEGER,
        references:{
          model:'classes',
          key:'id'
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      id_aluno:{
        type: Sequelize.INTEGER,
        references:{
          model:'alunos',
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
    return queryInterface.dropTable('classes_alunos');
  }
};
