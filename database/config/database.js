const path = require('path');

module.exports = {
    dialect: 'sqlite',
    storage: './database/database.sqlite',
    define: {
        timestamp: true,
    }
};