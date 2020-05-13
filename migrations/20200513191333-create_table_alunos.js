'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('alunos', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      id_usuario:{
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName: 'usuarios'
          },
          key:'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('alunos');
  }
};
