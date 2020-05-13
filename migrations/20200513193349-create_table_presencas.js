'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('presencas', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      presenca:{
        type: Sequelize.STRING,
        allowNull: false
      },
      data:{
        type: Sequelize.DATE, 
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
    return queryInterface.dropTable('presencas');
  }
};
