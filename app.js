var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require('./config/db');

require("dotenv").config({ path: "config/.env" });

var indexRouter = require('./routes/index');
var employeesRouter = require('./routes/employees');
var payperiodsRouter = require('./routes/payperiods');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/employees', employeesRouter);
app.use('/payperiods', payperiodsRouter);

// Connect to MongoDB
connectDB();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res
    .status(err.status || 500)
    .json({
      error: {
        message: err.message,
        status: err.status || 500,
        stack: req.app.get('env') === 'development' ? err.stack : {},
      }
    });
});

module.exports = app;
