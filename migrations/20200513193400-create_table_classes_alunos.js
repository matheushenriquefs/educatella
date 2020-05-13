'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('classes_alunos', {
      id_classe:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_aluno:{
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('classes_alunos');
  }
};
