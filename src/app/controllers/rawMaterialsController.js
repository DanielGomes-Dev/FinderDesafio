const rawMaterial = require('../models/rawMaterialsModel');
const usedRawMaterial = require('../models/usedRawMaterialsModel');



module.exports = {
    async index(req, res) {

        const { name, user } = req.query;

        const allRawMaterials = await rawMaterial.findAll({
            attributes: ['id', 'name', 'quantity'],
            raw: true
        });

        if (name) return res.json(allRawMaterials.filter(material => material.name.toLowerCase().includes(name.toLowerCase())));
        if (user) return res.json({ msg: 'buscando' });

        return res.json(allRawMaterials);
    },

    async create(req, res) {
        const { name, quantity, user } = req.body;

        try {
            const savedRawMaterial = await rawMaterial.create({ name, quantity, user });
            return res.json(savedRawMaterial);
        } catch (err) {
            // console.log(err);
            return res.status(400).json();
        }
    },

    async update(req, res) {

        const { id } = req.params;
        const { quantity, user } = req.body

        const material = await rawMaterial.findByPk(id, {
            raw: true
        });

        try {
            const updatedRawMaterials = await rawMaterial.update({
                quantity: material.quantity - quantity
            }, {
                where: {
                    id
                }
            });

            return res.json({
                quantity,
                user
            });
        } catch (err) {
            console.log(err);
        }

        // const logUsedRawMaterials = usedRawMaterial.create({
        //     name: rawMaterials.name,
        //     quantity,
        //     user
        // });



    }
}