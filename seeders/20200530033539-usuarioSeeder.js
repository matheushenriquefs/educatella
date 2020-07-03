'use strict';
const bcrypt = require("bcrypt");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios',
    [
      {
        id:1,
        nome: "Sérgio Pereira",
        email: "sergio@dh.com",
        senha: bcrypt.hashSync("123456", 10),
        imagem: "sergio.jpg",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:2,
        nome: "Gabriel Brunetti",
        email: "gabriel@dh.com",
        senha: bcrypt.hashSync("123456", 10),
        imagem: "gabriel.jpg",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:3,
        nome: "Hendy Almeida",
        email: "hendy@dh.com",
        senha: bcrypt.hashSync("123456", 10),
        imagem: "hendy.jpg",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:4,
        nome: "Vinícius Almeida",
        email: "vinicius@dh.com",
        senha: bcrypt.hashSync("123456", 10),
        imagem: "vinicius.jpg",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:5,
        nome: "Matheus Reyes",
        email: "matheus@dh.com",
        senha: bcrypt.hashSync("123456", 10),
        imagem: "matheus.jpg",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:6,
        nome: "Luisa Jacomini",
        email: "luisa@dh.com",
        senha: bcrypt.hashSync("123456", 10),
        imagem: "luisa.jpg",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:7,
        nome: "Adrian Iazbeck",
        email: "adrian@dh.com",
        senha: bcrypt.hashSync("123456", 10),
        imagem: "adrian.jpg",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:8,
        nome: "Matheus Henrique Felix",
        email: "matheush@dh.com",
        senha: bcrypt.hashSync("123456", 10),
        imagem: "matheush.jpg",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {});
  }

};