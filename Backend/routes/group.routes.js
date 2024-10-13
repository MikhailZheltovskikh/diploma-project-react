const express = require('express');
const { getGroups, getGroup, addGroup, editGroup, deleteGroup } = require('../controllers/group');
const mapGroups = require('../helpers/mapGroups');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');
const authenticated = require('../middlewares/authenticated');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    try {
        const groups = await getGroups();

        res.send({ error: null, data: groups.map(mapGroups) });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const groups = await getGroup(req.params.id);

        res.send({ error: null, data: mapGroups(groups) });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const newProduct = await addGroup({
            name: req.body.name,
        });

        res.send({ error: null, data: mapGroups(newProduct) });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const updatedGroup = await editGroup(req.params.id, {
            name: req.body.name,
        });

        res.send({ error: null, data: mapGroups(updatedGroup) });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        await deleteGroup(req.params.id);

        res.send({ error: null });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

module.exports = router;
