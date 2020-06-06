'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tarefas',
    [
      {
        id: 1,
        titulo: "Lista de Exercícios Estatística Aplicada!",
        descricao: "Nessa primeira lista de exercícios de estatística vocês devem me enviar um arquivo PDF respondendo todas as perguntas que enviei a vocês, vocês tem uma semana, atrasos não serão permitidos!",
        id_classe: 1,
        data_entrega: "2020-07-20 00:00:00",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 2,
        titulo: "Orientação de pesquisa Estatística",
        descricao: "Nesse exercícios, vocês devem pesquisar sobre grandes nomes da estatística e trazer conceitos novos que vocês acharam interessante!",
        id_classe: 1,
        data_entrega: "2020-07-15 00:00:00",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 3,
        titulo: "Lista de Exercícios Programação Avançada!",
        descricao: "Nessa primeira lista de exercícios de programação vocês devem me enviar um arquivo PDF respondendo todas as perguntas que enviei a vocês, vocês tem uma semana, atrasos não serão permitidos!",
        id_classe: 2,
        data_entrega: "2020-07-20 00:00:00",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 4,
        titulo: "Orientação de pesquisa programação",
        descricao: "Nesse exercícios, vocês devem pesquisar sobre grandes nomes da programação e trazer conceitos novos que vocês acharam interessante!",
        id_classe: 2,
        data_entrega: "2020-07-10 00:00:00",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 5,
        titulo: "Lista de Exercícios Banco de Dados!",
        descricao: "Nessa primeira lista de exerícios de banco de dados vocês devem me enviar um arquivo PDF respondendo todas as perguntas que enviei a vocês, vocês tem uma semana, atrasos não serão permitidos!",
        id_classe: 3,
        data_entrega: "2020-07-05 00:00:00",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 6,
        titulo: "Orientação de pesquisa banco de dados",
        descricao: "Nesse exercícios, vocês devem pesquisar sobre grandes nomes em banco de dados e trazer conceitos novos que vocês acharam interessante!",
        id_classe: 3,
        data_entrega: "2020-07-20 00:00:00",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 7,
        titulo: "Lista de Exercícios JavaScript Front!",
        descricao: "Nessa primeira lista de exerícios de Javascript Front vocês devem me enviar um arquivo PDF respondendo todas as perguntas que enviei a vocês, vocês tem uma semana, atrasos não serão permitidos!",
        id_classe: 4,
        data_entrega: "2020-07-15 00:00:00",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 8,
        titulo: "Orientação de pesquisa Javascript Front",
        descricao: "Nesse exercícios, vocês devem pesquisar sobre grandes nomes em JavascriptFront e trazer conceitos novos que vocês acharam interessante!",
        id_classe: 4,
        data_entrega: "2020-07-25 00:00:00",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
      
      
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tarefas', null, {});
  }

};