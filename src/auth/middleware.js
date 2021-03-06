'use strict';
/**
 * Authentication Middleware Module - Performs basic access authentication on usernames and passwords attached to request object headers
 * @module auth/middleware
 */
const User = require('./users-model.js');

module.exports = (req, res, next) => {

  try {

    let [authType, authString] = req.headers.authorization.split(/\s+/);

    console.log('authType', authType);

    // BASIC Auth  ... Authorization:Basic ZnJlZDpzYW1wbGU=

    switch (authType.toLowerCase()) {
      case 'basic':
        return _authBasic(authString);
      default:
        return _authError();
    }

  } catch (e) {
    return _authError();
  }
  /** @function
   * @name _authBasic Parses authentication header data and passes into a User model method to query the database for matching username/password.
   * @param  {string} authString string attached to the request authentication header
   */
  function _authBasic(authString) {
    let base64Buffer = Buffer.from(authString, 'base64'); // <Buffer 01 02...>
    let bufferString = base64Buffer.toString(); // john:mysecret
    let [username, password] = bufferString.split(':');  // variables username="john" and password="mysecret"
    let auth = {username, password};  // {username:"john", password:"mysecret"}

    return User.authenticateBasic(auth)
      .then(user => _authenticate(user));
  }

  /**
   * Adds user data and token to the request object. Returns an error if no user is passed in.
   *
   * @param {*} user
   */
  function _authenticate(user) {
    if (user) {
      req.user = user;
      req.token = user.generateToken();
      next();
    }
    else {
      _authError();
    }
  }

  /**
   * Sends an error if an invalid username or password is passed into _authenticate
   *
   */
  function _authError() {
    next({ status: 401, statusMessage: 'Unauthorized', message: 'Invalid User ID/Password' });
  }

};

