'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tarefas_alunos', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      id_tarefa:{
        type: Sequelize.INTEGER,
        references:{
          model:'tarefas',
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
      arquivo:{
        type: Sequelize.STRING, 
        allowNull: false
      },
      nota:{
        type: Sequelize.INTEGER,
        allowNull: true
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
    return queryInterface.dropTable('tarefas_alunos');
  }
};
