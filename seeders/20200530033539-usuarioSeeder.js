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
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:2,
        nome: "Gabriel Brunetti",
        email: "gabriel@dh.com",
        senha: bcrypt.hashSync("123456", 10),
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:3,
        nome: "Talita Gomes",
        email: "talita@dh.com",
        senha: bcrypt.hashSync("123456", 10),
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:4,
        nome: "Camila Silva",
        email: "camila@dh.com",
        senha: bcrypt.hashSync("123456", 10),
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:5,
        nome: "Matheus Reyes",
        email: "matheus@dh.com",
        senha: bcrypt.hashSync("123456", 10),
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:6,
        nome: "Luisa Gonçalves",
        email: "luisa@dh.com",
        senha: bcrypt.hashSync("123456", 10),
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:7,
        nome: "Adrian Silva",
        email: "adrian@dh.com",
        senha: bcrypt.hashSync("123456", 10),
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        id:8,
        nome: "Lucas Silva",
        email: "lucas@dh.com",
        senha: bcrypt.hashSync("123456", 10),
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {});
  }

};