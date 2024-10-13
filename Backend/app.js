const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/', routes);

mongoose
    .connect('mongodb+srv://admin:Misha123456@cluster0.ibkqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        app.listen(port, () => {
            console.log(`server started on port ${port}`);
        });
    });
