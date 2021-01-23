const express = require('express');
const app = express();
const rawMaterialsRoutes = require('./app/routes/rawMaterialsRoute');

const App = {
    routesInit() {
        app.use(rawMaterialsRoutes);
    },

    init() {
        app.use(express.json());
        this.routesInit();
    },

}

App.init();

module.exports = app;

