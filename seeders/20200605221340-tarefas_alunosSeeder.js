'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tarefas_alunos',
    [
      {
        id:1,
        id_tarefa: 1,
        id_aluno: 1,
        arquivo: "tarefa_estatistica.pdf",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:2,
        id_tarefa: 3,
        id_aluno: 3,
        arquivo: "tarefa_programacao.pdf",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:3,
        id_tarefa: 1,
        id_aluno: 3,
        arquivo: "tarefa_estatistica.pdf",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:4,
        id_tarefa: 3,
        id_aluno: 1,
        arquivo: "tarefa_programacao.pdf",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
      
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tarefas_alunos', null, {});
  }

};