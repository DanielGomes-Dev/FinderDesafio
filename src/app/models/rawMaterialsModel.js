const Sequelize = require('sequelize');
const databaseConfig = require('../../../database/config/database');
const rawMaretialConnect = new Sequelize(databaseConfig);


const rawMaterial = rawMaretialConnect.define('rawMaterial', {
    name: Sequelize.STRING,
    quantity: Sequelize.INTEGER,
});

module.exports = rawMaterial;