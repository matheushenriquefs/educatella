'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('recados',
    [
      {
        id_recados: 1,
        titulo: "Sejam bem-vindos à turma de Estatística Aplicada!",
        descricao: "Boa tarde alunos! Desfrutem ao máximo do conhecimento que será compartilhado, teremos listas de exercícios todas as semanas!",
        id_classe: 1,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id_recados: 2,
        titulo: "A primeira lista de exercícios foi publicada! Divirtam-se!",
        descricao: "A lista encontra-se na aba tarefas, com tudo especificado. Vocês têm uma semana! Boa sorte!",
        id_classe: 1,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id_recados: 3,
        titulo: "Sejam bem-vindos à turma de Programação Avançada!",
        descricao: "Boa tarde alunos! Desfrutem ao máximo do conhecimento que será compartilhado, teremos listas de exercícios todas as semanas!",
        id_classe: 2,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id_recados: 4,
        titulo: "A primeira lista de exercícios foi publicada! Divirtam-se!",
        descricao: "A lista encontra-se na aba tarefas, com tudo especificado. Vocês têm uma semana! Boa sorte!",
        id_classe: 2,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id_recados: 5,
        titulo: "Sejam bem-vindos à turma de Banco de Dados!",
        descricao: "Boa tarde alunos! Desfrutem ao máximo do conhecimento que será compartilhado, teremos listas de exercícios todas as semanas!",
        id_classe: 3,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id_recados: 6,
        titulo: "A primeira lista de exercícios foi publicada! Divirtam-se!",
        descricao: "A lista encontra-se na aba tarefas, com tudo especificado. Vocês têm uma semana! Boa sorte!",
        id_classe: 3,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id_recados: 7,
        titulo: "Sejam bem-vindos à turma de JavaScript Front!",
        descricao: "Boa tarde alunos! Desfrutem ao máximo do conhecimento que será compartilhado, teremos listas de exercícios todas as semanas!",
        id_classe: 4,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id_recados: 8,
        titulo: "A primeira lista de exercícios foi publicada! Divirtam-se!",
        descricao: "A lista encontra-se na aba tarefas, com tudo especificado. Vocês têm uma semana! Boa sorte!",
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