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
      arquivo:{
        type: Sequelize.STRING, 
        allowNull: true
      },
      data_entrega:{
        type: Sequelize.STRING, 
        allowNull: false
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
    return queryInterface.dropTable('tarefas');
  }
};
