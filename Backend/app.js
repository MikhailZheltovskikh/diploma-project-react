const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const mapUser = require('./helpers/mapUser');
const mapProduct = require('./helpers/mapProduct');
const mapGroups = require('./helpers/mapGroups');
const hasRole = require('./middlewares/hasRole');
const authenticated = require('./middlewares/authenticated');
const ROLES = require('./constants/roles');
const { register, login, getUsers, getRoles, updateUser, deleteUser } = require('./controllers/user');
const { getProduct, getProducts, addProduct, deleteProduct, editProduct } = require('./controllers/product');
const { getGroup, getGroups, editGroup, deleteGroup, addGroup } = require('./controllers/group');

const port = 3001;
 
const app = express();

app.use(cookieParser());
app.use(express.json());

app.post('/register', async (req, res) => {
    try {
        const { user, token } = await register(req.body.login, req.body.password);

        res.cookie('token', token, { httpOnly: true }).send({ error: null, user: mapUser(user) });
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { user, token } = await login(req.body.login, req.body.password);

        res.cookie('token', token, { httpOnly: true }).send({ error: null, user: mapUser(user) });
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' });
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '', { httpOnly: true }).send({});
});

app.get('/products', async (req, res) => {
    const { products, lastPage } = await getProducts(req.query.search, req.query.limit, req.query.page);

    res.send({ data: { lastPage, products: products.map(mapProduct) } });
});

app.get('/products/:id', async (req, res) => {
    const product = await getProduct(req.params.id);

    res.send({ data: mapProduct(product) });
});

app.get('/groups', async (req, res) => {
    const groups = await getGroups();

    res.send({ data: groups.map(mapGroups) });
});

app.get('/groups/:id', async (req, res) => {
    const groups = await getGroup(req.params.id);

    res.send({ data: mapGroups(groups) });
});

app.use(authenticated);

app.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
    const users = await getUsers();

    res.send({ data: users.map(mapUser) });
});

app.get('/users/roles', hasRole([ROLES.ADMIN]), async (req, res) => {
    const roles = await getRoles();

    res.send({ data: roles });
});

app.patch('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    const newUser = await updateUser(req.params.id, {
        role: req.body.roleId,
    });

    res.send({ data: mapUser(newUser) });
});

app.delete('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteUser(req.params.id);

    res.send({ error: null });
});

app.post('/products', hasRole([ROLES.ADMIN]), async (req, res) => {
    const newProduct = await addProduct({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        amount: req.body.amount,
        group: req.body.group,
    });

    res.send({ data: mapProduct(newProduct) });
});

app.patch('/products/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    const updatedProduct = await editProduct(req.params.id, {
        title: req.body.title,
        image: req.body.image_url,
        description: req.body.description,
        price: req.body.price,
        amount: req.body.amount,
        group: req.body.group,
    });

    res.send({ data: mapProduct(updatedProduct) });
});

app.delete('/products/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteProduct(req.params.id);

    res.send({ error: null });
});

app.post('/groups', hasRole([ROLES.ADMIN]), async (req, res) => {
    const newProduct = await addGroup({
        name: req.body.name,
    });

    res.send({ data: mapGroups(newProduct) });
});

app.patch('/groups/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    const updatedGroup = await editGroup(req.params.id, {
        name: req.body.name,
    });

    res.send({ data: mapGroups(updatedGroup) });
});

app.delete('/groups/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteGroup(req.params.id);

    res.send({ error: null });
});

mongoose
    .connect('mongodb+srv://admin:Misha123456@cluster0.ibkqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        app.listen(port, () => {
            console.log(`server started on port ${port}`);
        });
    });
