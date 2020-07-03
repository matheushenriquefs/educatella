'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tarefas',
    [
      {
        id: 1,
        titulo: "Lista de exercícios de Estatística Aplicada!",
        descricao: "Enviar um arquivo PDF com as respostas para as perguntas da lista. Vocês têm uma semana, atrasos não serão tolerados!",
        arquivo: "estatisticaLista.pdf",
        id_classe: 1,
        data_entrega: "20/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 2,
        titulo: "Orientação de Pesquisa em Estatística",
        descricao: "Com base no texto enviado, aponte e descreva os principais conceitos apresentados pelo autor!",
        arquivo: "estatisticaTexto.pdf",
        id_classe: 1,
        data_entrega: "15/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 3,
        titulo: "Lista de exercícios de Programação Avançada!",
        descricao: "Enviar um arquivo PDF com as respostas para as perguntas da lista. Vocês têm uma semana, atrasos não serão tolerados!",
        arquivo: "programacaoLista.pdf",
        id_classe: 2,
        data_entrega: "20/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 4,
        titulo: "Orientação de Pesquisa em programação",
        descricao: "Com base na literatura indicada, monte uma linha do tempo com as principais linguagens de programação!",
        arquivo: "progamacaoTexto.pdf",
        id_classe: 2,
        data_entrega: "20/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 5,
        titulo: "Lista de exercícios de Banco de Dados!",
        descricao: "Enviar um arquivo PDF com as respostas para as perguntas da lista. Vocês têm uma semana, atrasos não serão tolerados!",
        arquivo: "listaDB.pdf",
        id_classe: 3,
        data_entrega: "05/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 6,
        titulo: "Orientação de Pesquisa em Banco de Dados",
        descricao: "Com base no texto apresentado, faça um resumo prático!",
        arquivo: "textoDB.pdf",
        id_classe: 3,
        data_entrega: "20/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 7,
        titulo: "Lista de exercícios de JavaScript!",
        descricao: "Enviar um arquivo PDF com as respostas para as perguntas da lista. Vocês têm uma semana, atrasos não serão tolerados!",
        arquivo: "listaJS.pdf",
        id_classe: 4,
        data_entrega: "15/07/2020",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id: 8,
        titulo: "Orientação de Pesquisa em Javascript",
        descricao: "O texto aborda a era dos frameworks, dê a sua opinião sobre o assunto!",
        arquivo: "textoJS.pdf",
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