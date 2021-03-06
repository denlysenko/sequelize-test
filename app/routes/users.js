'use strict';

var express = require('express'),
		router = express.Router(),
		users = require('../controllers/users.controller');


/* GET users listing. */
router.get('/', users.getAll);
router.get('/:userId', users.getById);

/* Create user */
router.post('/', users.create);
router.put('/:userId', users.update);
router.delete('/:userId', users.destroy);

module.exports = router;
