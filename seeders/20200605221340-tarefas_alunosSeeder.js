'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tarefas_alunos',
    [
      {
        id:1,
        id_tarefa: 1,
        id_aluno: 1,
        arquivo: "tarefa1.docx",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:2,
        id_tarefa: 2,
        id_aluno: 2,
        arquivo: "tarefa2.docx",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:3,
        id_tarefa: 3,
        id_aluno: 3,
        arquivo: "tarefa3.docx",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:4,
        id_tarefa: 4,
        id_aluno: 4,
        arquivo: "tarefa4.docx",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:5,
        id_tarefa: 5,
        id_aluno: 1,
        arquivo: "tarefa5.docx",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:6,
        id_tarefa: 6,
        id_aluno: 2,
        arquivo: "tarefa6.docx",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:7,
        id_tarefa: 1,
        id_aluno: 3,
        arquivo: "tarefa7.docx",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
      
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tarefas_alunos', null, {});
  }

};