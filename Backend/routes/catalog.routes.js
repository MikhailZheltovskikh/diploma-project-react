const express = require('express');

const mapProduct = require('../helpers/mapProduct');
const { getProductsFilterGroup } = require('../controllers/product');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    try {
        const sort = req.query.sort;
        const hasSort = 'sort' in req.query;
        if (hasSort) {
            const { products, lastPage } = await getProductsFilterGroup(
                req.query.search,
                req.query.limit,
                req.query.page,
                req.query.group,
                sort
            );
            res.send({ error: null, data: { lastPage, products: products.map(mapProduct) } });
        } else if (!hasSort) {
            const { products, lastPage } = await getProductsFilterGroup(
                req.query.search,
                req.query.limit,
                req.query.page,
                req.query.group
            );
            res.send({ error: null, data: { lastPage, products: products.map(mapProduct) } });
        }
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

module.exports = router;
