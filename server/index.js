const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

var db = require('./database');
var api = require('./api');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.join());

// app.use('/api/[]', require('./api/[]))

module.exports = app;