const request = require('supertest');
const app = require('../../src/server');
const truncate = require('../util/truncate');

describe('rawMaterials', () => {
    beforeEach(async () => {
        await truncate();
    });

    // Create a Material
    it('should be able to create', async () => {
        const response = await request(app)
            .post('/rawMaterials')
            .send({
                name: 'Ovo',
                quantity: 10
            });


        expect(response.body).toHaveProperty('id')
    });

    //Duplicated Materials #########################################33
    it('If the raw material exists in the database, the raw material will be increased', async () => {
        const response = await request(app)
            .post('/rawMaterials')
            .send({
                name: 'Farinha',
                quantity: 10
            });

        const response2 = await request(app)
            .post('/rawMaterials')
            .send({
                name: 'Farinha',
                quantity: 10
            });

        expect(response2.body).toHaveProperty('id')
    });

    //Invalid Body ####################################
    it('If you do not send all parameters in the request body, you should return an error', async () => {
        const response = await request(app)
            .post('/rawMaterials')
            .send({
                name: 'Farinha',
            });

        expect(response.body).toHaveProperty('err')
    });

    it('If you send a parameter with a different type than expected', async () => {
        const response = await request(app)
            .post('/rawMaterials')
            .send({
                name: 1,
                quantity: 10,
            });
        expect(response.body).toHaveProperty('err')
    });

    it('If you send a parameter with a different type than expected', async () => {
        const response = await request(app)
            .post('/rawMaterials')
            .send({
                name: 'Farinha',
                quantity: 1.5,
            });
        expect(response.body).toHaveProperty('err')
    });

    it('If you send the parameter quantity less than or equal to zero', async () => {
        const response = await request(app)
            .post('/rawMaterials')
            .send({
                name: 'Farinha',
                quantity: -1,
            });
        expect(response.body).toHaveProperty('err')
    });



    // Delete a Material
    it('should be able to delete', async () => {
        const response = await request(app)
            .post('/rawMaterials')
            .send({
                name: 'Farinha',
                quantity: 10
            });

        const responseDelete = await request(app)
            .delete(`/rawMaterials/${response.body.id}/delete`);

        expect(responseDelete.body).toHaveProperty('id');
    });

    it('wrong id parameter', async () => {
        const responseDelete = await request(app)
            .delete(`/rawMaterials/ID/delete`);

        expect(responseDelete.body).toHaveProperty('err');
    });

    it('raw material not found', async () => {
        const responseDelete = await request(app)
            .delete(`/rawMaterials/99999/delete`);

        expect(responseDelete.body).toHaveProperty('err');
    });

    // List Material INDEX #########################################
    it('should be able to list all materials', async () => {

        const create1 = await request(app)
            .post('/rawMaterials')
            .send({
                name: 'Farinha1',
                quantity: 10
            });

        const create2 = await request(app)
            .post('/rawMaterials')
            .send({
                name: 'Farinha2',
                quantity: 10
            });


        const response = await request(app)
            .get('/rawMaterials');

        expect(response.body.length == 2);
    });

    it('should be able to list materials by using a filter', async () => {

        const create1 = await request(app)
            .post('/rawMaterials')
            .send({
                name: 'Farinha',
                quantity: 10
            });

        const create2 = await request(app)
            .post('/rawMaterials')
            .send({
                name: 'Ovo',
                quantity: 10
            });


        const response = await request(app)
            .get('/rawMaterials?name=ovo');

        expect(response.body.length == 1);
    });

    // Update ################################################
    it('should be able to use a raw material', async () => {

        const create = await request(app)
            .post('/rawMaterials')
            .send({
                name: 'Farinha',
                quantity: 10
            });


        const use = await request(app)
            .put(`/rawMaterials/${create.body.id}/request`)
            .send({
                user: 'User',
                quantity: 1
            });

        expect(use.body).toHaveProperty('user')
    });


    it('If there is not enough raw material in stock', async () => {

        const create = await request(app)
            .post('/rawMaterials')
            .send({
                name: 'Farinha',
                quantity: 1
            });

        const use = await request(app)
            .put(`/rawMaterials/${create.body.id}/request`)
            .send({
                user: 'User',
                quantity: 200
            });


        expect(use.body.err == 'Insufficient Raw Material');
    });

    it('If the Material is not registered', async () => {
        const use = await request(app)
            .put(`/rawMaterials/99999/request`)
            .send({
                user: 'User',
                quantity: 2
            });

        expect(use.body).toHaveProperty('err')
    });

    it('invalid id', async () => {
        const use = await request(app)
            .put(`/rawMaterials/1.5/request`)
            .send({
                user: 'User',
                quantity: 2
            });

        expect(use.body).toHaveProperty('err')
    });

    it('invalid user', async () => {
        const response = await request(app)
            .put(`/rawMaterials/1/request`)
            .send({
                user: 1,
                quantity: 2
            });

        expect(response.body).toHaveProperty('err')
    });

    it('invalid quantity', async () => {
        const response = await request(app)
            .put(`/rawMaterials/1/request`)
            .send({
                user: 'user',
                quantity: 1.5
            });

        expect(response.body).toHaveProperty('err')
    });

    it('Faltando id, quantidade ou usuário', async () => {
        const response = await request(app)
            .put(`/rawMaterials/1/request`)
            .send({
                quantity: 1
            });

        expect(response.body).toHaveProperty('err')
    });

    //Show used Materials #####################################
    it('should be able show used raw material by user', async () => {

        const create = await request(app)
            .post('/rawMaterials')
            .send({
                name: 'Farinha',
                quantity: 10
            });

        const use = await request(app)
            .put(`/rawMaterials/${create.body.id}/request`)
            .send({
                user: 'Usuario',
                quantity: 1
            });

        const response = await request(app)
            .get(`/usedRawMaterials`);

        expect(response.body.length == 1);
    });

    it('should be able to list used materials by using a filter', async () => {

        const create = await request(app)
            .post('/rawMaterials')
            .send({
                name: 'Farinha',
                quantity: 10
            });

        const use = await request(app)
            .put(`/rawMaterials/${create.body.id}/request`)
            .send({
                user: 'Usuario',
                quantity: 1
            });


        const use2 = await request(app)
            .put(`/rawMaterials/${create.body.id}/request`)
            .send({
                user: 'NovoUsuario',
                quantity: 1
            });


        const response = await request(app)
            .get(`/usedRawMaterials?user=novousuario`);


        expect(response.body.length == 1);
    });


});