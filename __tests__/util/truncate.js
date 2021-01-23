const rawMaterialModel = require('../../src/app/models/rawMaterialsModel');
const usedRawMaterialModel = require('../../src/app/models/usedRawMaterialsModel');

const models = [rawMaterialModel, usedRawMaterialModel]


module.exports = function truncate() {
    return Promise.all(
        models.map(model => {
            return model.destroy({ truncate: true, force: true })
        })
    )
}