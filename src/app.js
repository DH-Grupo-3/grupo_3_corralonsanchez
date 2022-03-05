const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routers/router');
const productRouter = require('./routers/product');
const usersRouter = require('./routers/user');
const path = require('path');
const method = require('method-override');
const session = require('express-session');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.static(path.resolve(__dirname, '../uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(method('m'));
app.use(session({ secret: 'Secreto' }));

app.use('/', router);
app.use('/products', productRouter);
app.use('/users', usersRouter);

module.exports = app;
