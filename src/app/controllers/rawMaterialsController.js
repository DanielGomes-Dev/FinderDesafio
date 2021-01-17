const rawMaterial = require('../models/rawMaterialsModel');
const usedRawMaterial = require('../models/usedRawMaterialsModel');

module.exports = {
    async index(req, res) {

        const { name, user } = req.query;

        try {
            const allRawMaterials = await rawMaterial.findAll({
                attributes: ['id', 'name', 'quantity'],
                raw: true
            });

            if (name) return res.json(allRawMaterials.filter(material => material.name.toLowerCase().includes(name.toLowerCase())));

            if (user) {
                const logs = await usedRawMaterial.findAll({
                    where: {
                        user
                    },
                    attributes: ['name', 'usedQuantity', 'user', 'createdAt']
                    ,
                    order: [['createdAt', 'Desc']]

                })
                return res.json(logs)
            };

            return res.json(allRawMaterials);

        } catch (err) {
            console.log(err)
            return res.status(500).json({});
        }

    },

    async create(req, res) {
        const { name, quantity } = req.body;

        if (!name || !quantity) return res.json({ err: 'the fields, name and quantity are required' });
        if (typeof (name) !== 'string') return res.json({ err: 'the field, name must be a string' });
        if (!Number.isInteger(quantity)) return res.json({ err: 'the field, quantity must be a integer' });
        if (quantity < 1) return res.json({ err: 'the field, quantity must be greater than zero' });

        try {
            const savedRawMaterial = await rawMaterial.create({ name, quantity });
            return res.json(savedRawMaterial);

        } catch (err) {
            // console.log(err);
            return res.status(500).json();
        }
    },

    async update(req, res) {

        let { id } = req.params;

        const { quantity, user } = req.body

        if (!user || !quantity || !id) return res.status(400).json({ err: 'the fields, id, user and quantity are required' });
        id = Number(id);
        if (!Number.isInteger(id)) return res.status(400).json({ err: 'the field, id must be a integer' });
        if (!Number.isInteger(quantity)) return res.status(400).json({ err: 'the field, quantity must be a integer' });
        if (typeof (user) !== 'string') return res.status(400).json({ err: 'the field, user must be a string' });

        try {
            const material = await rawMaterial.findByPk(id, {
                raw: true
            });

            if (!material) return res.status(404).json({ err: 'No Raw Materials Found' })
            if (material.quantity < quantity) return res.status(409).json({ err: 'Insufficient Raw Material' });


            await rawMaterial.update({
                quantity: material.quantity - quantity
            }, {
                where: {
                    id
                }
            });

            const logUsedRawMaterials = await usedRawMaterial.create({
                name: material.name,
                usedQuantity: quantity,
                user
            });

            return res.json({
                quantity,
                user
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({});
        }

    }
}