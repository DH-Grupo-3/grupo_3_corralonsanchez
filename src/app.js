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
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const cookies = require('cookie-parser');

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

app.use(
	session({
		secret: 'Secreto',
		resave: false,
		saveUninitialized: false,
	}),
);

app.use(cookies());
app.use(userLoggedMiddleware);

app.use('/', router);
app.use('/users', usersRouter);
app.use('/products', productRouter);

module.exports = app;
