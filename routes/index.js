var express = require('express');
const login = require('./acess/login');
const refresh = require('./acess/refresh');
const lyrics = require('./lyrics/lyrics');


var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/login', login);
router.use('/refresh',refresh);
router.use('/lyrics',lyrics);

module.exports = router;
