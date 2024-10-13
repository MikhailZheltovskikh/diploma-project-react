const express = require('express');
const hasRole = require('../middlewares/hasRole');
const { getUsers, getRoles, updateUser, deleteUser } = require('../controllers/user');
const mapUser = require('../helpers/mapUser');
const authenticated = require('../middlewares/authenticated');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const users = await getUsers();

        res.send({ error: null, data: users.map(mapUser) });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

router.get('/roles', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const roles = await getRoles();

        res.send({ error: null, data: roles });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const newUser = await updateUser(req.params.id, {
            role: req.body.roleId,
        });

        res.send({ error: null, data: mapUser(newUser) });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        await deleteUser(req.params.id);

        res.send({ error: null });
    } catch (e) {
        res.send({ error: e.message || 'Неизвестная ошибка...', data: null });
    }
});

module.exports = router;
