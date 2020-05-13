'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tarefas', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      titulo:{
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao:{
        type: Sequelize.STRING, 
        allowNull: false
      },
      data_entrega:{
        type: Sequelize.DATE, 
        allowNull: false
      },
      data_criacao:{
        type: Sequelize.DATE, 
        allowNull: false
      },
      nota:{
        type: Sequelize.INTEGER, 
        allowNull: false
      },
      id_classe:{
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName: 'classes'
          },
          key:'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tarefas');
  }
};
