const express = require('express');
const { getCart, addCart, updateCountToCart, removeCartItem, clearToCart } = require('../controllers/cart');
const mapCart = require('../helpers/mapCart');
const authenticated = require('../middlewares/authenticated');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, async (req, res) => {
    try {
        const cart = await getCart(req.user.id);

        res.send({ error: null, cart: mapCart(cart) });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', cart: null });
    }
});

router.post('/add', authenticated, async (req, res) => {
    try {
        const cart = await addCart(req.body.products, req.user.id);

        res.send({ error: null, data: { cart } });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

router.post('/update/:id', authenticated, async (req, res) => {
    try {
        const cart = await updateCountToCart(req.params.id, req.body.operation, req.user.id);
        res.send({ error: null, data: { cart } });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

router.delete('/remove/:id', authenticated, async (req, res) => {
    try {
        await removeCartItem(req.params.id, req.user.id);

        res.send({ error: null });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

router.delete('/clear', authenticated, async (req, res) => {
    try {
        await clearToCart(req.user.id);
        res.send({ error: null });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

module.exports = router;
