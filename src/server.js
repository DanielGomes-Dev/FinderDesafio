// require('dotenv').config({ path: '../.env' });

const express = require('express');
const app = express();


const rawMaterialsRoutes = require('./app/routes/rawMaterialsRoute');

module.exports = {

    routesInit() {
        app.use(rawMaterialsRoutes);
    },

    init(port) {
        app.use(express.json());
        this.routesInit();
        app.listen(3333);
    },
}

