var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");

var indexRouter = require('./routes/index');
var AlunoRouter = require('./routes/AlunoRouter');
var ProfessorRouter = require('./routes/ProfessorRouter');
var cadastroRouter = require('./routes/CadastroRouter');
var loginRouter = require('./routes/LoginRouter');
var admRouter = require('./routes/AdmRouter');

var app = express();

//Sincronizando modelos com o banco de dados
db.sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/vendor', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/vendor', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/vendor', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery

app.use('/', indexRouter);
app.use('/', AlunoRouter);
app.use('/', ProfessorRouter);
app.use('/cadastro', cadastroRouter);
app.use('/', loginRouter);
app.use('/', admRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
  return res.status(404).render('not-found');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
