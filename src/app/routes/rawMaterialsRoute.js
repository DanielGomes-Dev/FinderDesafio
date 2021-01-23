const { Router } = require('express');

const rawMaterialsController = require('../controllers/rawMaterialsController');
const usedRawMaterialsController = require('../controllers/usedRawMaterialController');

const route = Router();

//Raw Materials
route.get('/rawMaterials', rawMaterialsController.index);
route.post('/rawMaterials', rawMaterialsController.create);
route.put('/rawMaterials/:id/request', rawMaterialsController.update);
route.delete('/rawMaterials/:id/delete', rawMaterialsController.delete);

//Used Raw Materials
route.get('/usedRawMaterials', usedRawMaterialsController.index);


module.exports = route;
