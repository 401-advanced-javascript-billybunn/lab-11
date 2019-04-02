'use strict';

/**
 * Authentication Router Module - Integrates with middleware to sign-up users (storing username/password to database) and sign-in users (validating their username/password against the database)
 * @module auth/router
 */

const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');

/** @function
 * @name /signup POST Route Handler -
 * Creates a new instance of User with the users model and saves it to the database. Then attaches a token and the user data to the request object, and adds the token to the response header & cookie. Sends the token to the client.
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then((user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    }).catch(next);
});

/** @function
 * @name /signin POST Route Hanlder - 
 * Runs the request through the authentication middleware (auth/middleware.js). Adds the request token to the response cookie and sends the token to the client.
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
authRouter.post('/signin', auth, (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

module.exports = authRouter;
