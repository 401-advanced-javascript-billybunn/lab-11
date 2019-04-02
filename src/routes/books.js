'use strict';
/**
 * Books Router Module
 * Handles routes to send book data to authenticated users.
 * @module routes/books.js
 */
const express = require('express');
const router = express.Router();
const auth = require('../auth/middleware.js');


router.get('/books', auth, handleGetAll);
router.get('/books/:id', auth, handleGetOne);

// Route Handlers
/**
 * @name handleGetAll
 * Sends data for multiple books to the client
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
function handleGetAll(req, res, next) {
  let books = {
    count: 3,
    results: [
      { title:'Moby Dick' },
      { title:'Little Women' },
      { title: 'Eloquent Javascript' },
    ],
  };
  res.status(200).json(books);
}

/**
 * @name handleGetOne
 * Sends data for a single book to the client
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
function handleGetOne(req, res, next) {
  let book = {
    title:'Moby Dick',
  };
  res.status(200).json(book);
}

module.exports = router;
