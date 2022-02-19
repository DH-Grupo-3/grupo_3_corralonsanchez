const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routers/router');
const path = require('path');
const method = require("method-override");

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(method("m"));

app.use('/', router);
app.use('/users', require('./routers/users'));

module.exports = app;
