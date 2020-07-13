'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tarefas',
    [
      {
        id: 1,
        titulo: "Lista de exercícios de Estatística Aplicada!",
        descricao: "Todas as orientações estão na lista!",
        arquivo: "estatisticaLista.pdf",
        id_classe: 1,
        data_entrega: "20/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 2,
        titulo: "Orientação de Pesquisa em Estatística",
        descricao: "Todas as orientações estão no arquivo!",
        arquivo: "estatisticaTexto.pdf",
        id_classe: 1,
        data_entrega: "10/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 3,
        titulo: "Lista de exercícios de Programação Avançada!",
        descricao: "Todas as orientações estão na lista!",
        arquivo: "programacaoLista.pdf",
        id_classe: 2,
        data_entrega: "20/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 4,
        titulo: "Orientação de Pesquisa em programação",
        descricao: "Todas as orientações estão no arquivo!",
        arquivo: "progamacaoTexto.pdf",
        id_classe: 2,
        data_entrega: "20/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 5,
        titulo: "Lista de exercícios de Banco de Dados!",
        descricao: "Todas as orientações estão na lista!",
        arquivo: "listaDB.pdf",
        id_classe: 3,
        data_entrega: "20/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 6,
        titulo: "Orientação de Pesquisa em Banco de Dados",
        descricao: "Todas as orientações estão no arquivo!",
        arquivo: "textoDB.pdf",
        id_classe: 3,
        data_entrega: "20/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 7,
        titulo: "Lista de exercícios de JavaScript!",
        descricao: "Todas as orientações estão na lista!",
        arquivo: "listaJS.pdf",
        id_classe: 4,
        data_entrega: "20/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 8,
        titulo: "Orientação de Pesquisa em Javascript",
        descricao: "Todas as orientações estão no arquivo!",
        arquivo: "textoJS.pdf",
        id_classe: 4,
        data_entrega: "20/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 9,
        titulo: "Recuperação Estatística",
        descricao: "Todas as orientações estão no arquivo!",
        arquivo: "estatisticaLista.pdf",
        id_classe: 1,
        data_entrega: "20/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
      
      
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tarefas', null, {});
  }

};