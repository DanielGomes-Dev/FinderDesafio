const { Router } = require('express');

const rawMaterialsController = require('../controllers/rawMaterialsController');

const route = Router();

route.get('/rawMaterials', rawMaterialsController.index);
route.post('/rawMaterials', rawMaterialsController.create);
route.put('/rawMaterials/:id/request', rawMaterialsController.update);

module.exports = route;
