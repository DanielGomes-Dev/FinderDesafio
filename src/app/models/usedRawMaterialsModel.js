const Sequelize = require('sequelize');
const databaseConfig = require('../../../database/config/database');
const rawMaretialConnect = new Sequelize(databaseConfig);


const usedRawMaterial = rawMaretialConnect.define('usedRawMaterial', {
    name: Sequelize.STRING,
    usedQuantity: Sequelize.INTEGER,
    user: Sequelize.STRING
});

module.exports = usedRawMaterial;