'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('recados',
    [
      {
        id_recados: 1,
        titulo: "Bem-Vindos à turma de Estatística Aplicada!",
        descricao: "Boa tarde alunos! sejam bem-vindos a nossa classe e desfrutem ao máximo do conhecimento que irão adquirir, irei passar listas de exercícios todas as semanas!",
        id_classe: 1,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id_recados: 2,
        titulo: "Já publiquei a primeira lista de exercícios! divirtam-se!",
        descricao: "A primeira lista de exercícios de estatística aplicada já foi publicada alunos, a descrição se encontra lá, vocês tem uma semana! boa sorte!",
        id_classe: 1,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id_recados: 3,
        titulo: "Bem-Vindos à turma de Programação Avançada!",
        descricao: "Boa tarde alunos! sejam bem-vindos a nossa classe e desfrutem ao máximo do conhecimento que irão adquirir, irei passar listas de exercícios todas as semanas!",
        id_classe: 2,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id_recados: 4,
        titulo: "Já publiquei a primeira lista de exercícios! divirtam-se!",
        descricao: "A primeira lista de exercícios de banco de dados já foi aplicada alunos, a descrição se encontra lá, vocês tem uma semana! boa sorte!",
        id_classe: 2,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id_recados: 5,
        titulo: "Bem-Vindos à turma de Banco de Dados!",
        descricao: "Boa tarde alunos! sejam bem-vindos a nossa classe e desfrutem ao máximo do conhecimento que irão adquirir, irei passar listas de exercícios todas as semanas!",
        id_classe: 3,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id_recados: 6,
        titulo: "Já publiquei a primeira lista de exercícios! divirtam-se!",
        descricao: "A primeira lista de exercícios de banco de dados já foi aplicada alunos, a descrição se encontra lá, vocês tem uma semana! boa sorte!",
        id_classe: 3,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id_recados: 7,
        titulo: "Bem-Vindos à turma de JavaScript Front!",
        descricao: "Boa tarde alunos! sejam bem-vindos a nossa classe e desfrutem ao máximo do conhecimento que irão adquirir, irei passar listas de exercícios todas as semanas!",
        id_classe: 4,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id_recados: 8,
        titulo: "Já publiquei a primeira lista de exercícios! divirtam-se!",
        descricao: "A primeira lista de exercícios de Javascript Front já foi aplicada alunos, a descrição se encontra lá, vocês tem uma semana! boa sorte!",
        id_classe: 4,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
      
      
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('recados', null, {});
  }

};