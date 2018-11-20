'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

mongoose.set('useCreateIndex', true);
//Conecta no banco de dados
mongoose.connect(config.connectionString, {useNewUrlParser: true});

//Carrega as models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carrega as rotas da API
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json({
    limit: '5mb'
}));

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Rquested-with, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Headers', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;