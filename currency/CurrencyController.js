// Common , for routing.
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var currency = require("./Currency");
const request = require('request');
