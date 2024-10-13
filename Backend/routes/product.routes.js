const express = require('express');
const { getProducts, getProduct, addProduct, editProduct, deleteProduct } = require('../controllers/product');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const mapProduct = require('../helpers/mapProduct');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    try {
        const sort = req.query.sort;
        const hasSort = 'sort' in req.query;
        if (hasSort) {
            const { products, lastPage } = await getProducts(req.query.search, req.query.limit, req.query.page, sort);
            res.send({ error: null, data: { lastPage, products: products.map(mapProduct) } });
        } else if (!hasSort) {
            const { products, lastPage } = await getProducts(req.query.search, req.query.limit, req.query.page);
            res.send({ error: null, data: { lastPage, products: products.map(mapProduct) } });
        }
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await getProduct(req.params.id);

        res.send({ error: null, data: mapProduct(product) });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const newProduct = await addProduct({
            title: req.body.title,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            amount: req.body.amount,
            group: req.body.group,
        });

        res.send({ error: null, data: mapProduct(newProduct) });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const updatedProduct = await editProduct(req.params.id, {
            title: req.body.title,
            image: req.body.image_url,
            description: req.body.description,
            price: req.body.price,
            amount: req.body.amount,
            group: req.body.group,
        });

        res.send({ error: null, data: mapProduct(updatedProduct) });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        await deleteProduct(req.params.id);

        res.send({ error: null });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

module.exports = router;
