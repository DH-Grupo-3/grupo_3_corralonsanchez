const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routers/router');
const path = require('path');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

module.exports = app;
