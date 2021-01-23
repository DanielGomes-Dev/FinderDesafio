const usedRawMaterial = require('../models/usedRawMaterialsModel');

module.exports = {

    async index(req, res) {
        const { user } = req.query;

        const logs = await usedRawMaterial.findAll({
            attributes: ['name', 'usedQuantity', 'user', 'createdAt']
            ,
            order: [['createdAt', 'Desc']]
        });

        if (user) {
            const logsFilter = logs.filter(log => log.user.toLowerCase() == user.toLowerCase());
            return res.json(logsFilter);
        }

        return res.json(logs);
    }
}