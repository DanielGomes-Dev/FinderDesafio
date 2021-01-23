require('dotenv').config();

'use strict';

const seed = () => {

  const ingredientes = ['Ovo', 'Manteiga', 'Farinha de Trigo', 'Chocolate', 'Açúcar'];
  const seed = [];

  for (let i in ingredientes) {
    seed.push({
      name: ingredientes[i],
      quantity: Math.floor(Math.random() * 100),
    })
  }

  console.log(seed);

  return seed;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    try {
      return await queryInterface.bulkInsert('rawMaterials', seed(), {});
    } catch (err) {
      console.log(err);
    }
  },

  down: async (queryInterface) => {

    return await queryInterface.bulkDelete('rawMaterials', null, {});
  }
};
