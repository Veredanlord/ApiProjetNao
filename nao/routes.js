const Router = require('express').Router();
const controller = require('./controller');
var bcrypt = require('bcrypt');
var mysql   = require("mysql");
var mongoose = require('mongoose');

Router.route('/nao')
    .post(controller.postNao);

module.exports = Router;
