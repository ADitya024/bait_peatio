// app.js
var express = require('express');
var app = express();
var db = require('./db');
                                             
// ADD THESE TWO LINES
var UserController = require('./user/UserController');
var TickerController = require('./ticker/TickerController');

app.use('/users', UserController);
app.use('/tickers', TickerController);
// app.user('/currency',CurrencyController)
module.exports = app;