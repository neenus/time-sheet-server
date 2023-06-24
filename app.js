const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');

const payperiodScheduler = require('./utils/payperiodScheduler');

require("dotenv").config({ path: "config/.env" });

const indexRouter = require('./routes/index');
const employeesRouter = require('./routes/employees.routes');
const payperiodsRouter = require('./routes/payperiods.routes');

const app = express();

// Enable CORS
const corsOptions = {
  origin: process.env.FE_BASE_URL,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/employees', employeesRouter);
app.use('/payperiods', payperiodsRouter);

// Connect to MongoDB
connectDB();

// Start payperiod scheduler
payperiodScheduler();

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
