'use strict';

const seed = () => {
  const ingredientes = ['Ovo', 'Manteiga', 'Farinha de Trigo', 'Chocolate', 'Açúcar'];
  const seed = [];
  for (let i = 0; i < 50; ++i) {
    seed.push({
      name: ingredientes[Math.floor(Math.random() * ingredientes.length)],
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
