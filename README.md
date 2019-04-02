![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

`echo '{"username":"Billy", "password":"supersecret"}' | http :3000/signup`
`http post :3000/signin -a Billy:supersecret`
`http :3000/books -a Billy:supersecret`
`http :3000/books/2 -a Billy:supersecret`

## Bug fixes
#### `app.js`
* added `app.use(authRouter)` to `app.js` before catch-all middleware
#### `router.js`
* changed `/signin` route to use `app.post()` instead of `app.get()`
#### `users-model.js`
* added required 3rd-party middleware to `users-model.js`:
   * `const bcrypt = require('bcrypt');`
   * `const jwt = require('jsonwebtoken');`
* fixes unhandled promise in `users.methods.comparePassword`; after `bcrypt.compare()`, added a `.then()` that compares the password entered in `/signin` to the hashed password stored in the database, and return `this` (the user document) or `null`.
#### `middleware.js`
* changed all instances of `encodedString` to `authString`
* passed `authString` as an argument into function `_authBasic()`
* added lines to `_authenticate` to attach the user data and token to the request object:
```
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
```
* change `auth` variable inside `_authBasic` function add `username` and `password` to an **object** instead of an array.

## Book routes authentication
#### `app.js`
* wired `books.js` to routes; used _after_ `authRouter`
```
const bookRouter = require('./routes/books.js');

app.use(bookRouter);
```
#### `books.js`
* added authentication middleware to book routes
```
const auth = require('../auth/middleware.js');

router.get('/books', auth, handleGetAll);
router.get('/books/:id', auth, handleGetOne);
```

<!-- LINKS -->
<!-- Replace the link for each in brackets below -->
<!-- PR (working into submission) -->
[1]: https://github.com/401-advanced-javascript-billybunn/lab-11/pull/1
<!-- travis build -->
[2]: https://travis-ci.com/401-advanced-javascript-billybunn/lab-11/builds/106651934
<!-- back-end -->
[3]: http://xyz.com
<!-- front-end -->
[4]: http://xyz.com
<!-- swagger -->
[5]: http://xyz.com
<!-- jsdoc-->
[6]: heroku-link/docs 

## Lab 11: Authentication

### Author: Billy Bunn

### Links and Resources
* [PR][1]
* [travis][2]
<!-- (when applicable) -->
* [back-end][3]
<!-- (when applicable) -->
* [front-end][4]

#### Documentation
<!-- API assignments only -->
* [swagger][5]
<!-- (All assignments) -->
* [jsdoc][6]

### Modules
#### `modulename.js`
##### Exported Values and Methods

###### `foo(thing) -> string`
<!-- If you finished everything, you should be able to copy/paste the lab requirements and put them in present tense. -->
Usage Notes or examples

###### `bar(array) -> array`
Usage Notes or examples

### Setup
#### `.env` requirements
* `npm i`
* `PORT` - assign a port number
* `MONGODB_URI` - URL to the running mongo instance/db


#### Running the app
* `npm start`
* Endpoint: `/`
* Endpoint: `/foo/bar/`
  * Returns a JSON object with abc in it.
* Endpoint: `/bing/zing/`
  * Returns a JSON object with xyz in it.
  
#### Tests
* How do you run tests?
  * `npm run test`
  * `npm run lint`
* What assertions were made?
* What assertions need to be / should be made?

#### UML
Link to an image of the UML for your application and response to events
