'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tarefas',
    [
      {
        id: 1,
        titulo: "Lista de Exercícios Estatística Aplicada!",
        descricao: "Enviar um arquivo PDF respondendo a todas as perguntas que enviei, vocês têm uma semana, atrasos não serão permitidos!",
        id_classe: 1,
        data_entrega: "20/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 2,
        titulo: "Orientação de pesquisa em Estatística",
        descricao: "Pesquisar sobre os grandes nomes da estatística e trazer conceitos novos que vocês acharem interessantes!",
        id_classe: 1,
        data_entrega: "15/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 3,
        titulo: "Lista de Exercícios Programação Avançada!",
        descricao: "Enviar um arquivo PDF respondendo a todas as perguntas que enviei, vocês têm uma semana, atrasos não serão permitidos!",
        id_classe: 2,
        data_entrega: "20/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 4,
        titulo: "Orientação de pesquisa em programação",
        descricao: "Pesquisar sobre osgrandes nomes da programação e trazer conceitos novos que vocês acharem interessantes!",
        id_classe: 2,
        data_entrega: "20/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 5,
        titulo: "Lista de Exercícios Banco de Dados!",
        descricao: "Enviar um arquivo PDF respondendo a todas as perguntas que enviei a vocês, vocês têm uma semana, atrasos não serão permitidos!",
        id_classe: 3,
        data_entrega: "05/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 6,
        titulo: "Orientação de pesquisa em Banco de Dados",
        descricao: "Pesquisar sobre os grandes nomes em banco de dados e trazer conceitos novos que vocês acharem interessante!",
        id_classe: 3,
        data_entrega: "20/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 7,
        titulo: "Lista de Exercícios JavaScript Front!",
        descricao: "Enviar um arquivo PDF respondendo a todas as perguntas que enviei, vocês têm uma semana, atrasos não serão permitidos!",
        id_classe: 4,
        data_entrega: "15/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 8,
        titulo: "Orientação de pesquisa em Javascript Front",
        descricao: "Pesquisar sobre os grandes nomes em JavascriptFront e trazer conceitos novos que vocês acharem interessante!",
        id_classe: 4,
        data_entrega: "25/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
      
      
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tarefas', null, {});
  }

};