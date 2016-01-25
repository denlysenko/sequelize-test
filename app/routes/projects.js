'use strict';

var express = require('express'),
    router = express.Router(),
    projects = require('../controllers/projects.controller');


/* GET projects listing. */
router.get('/', projects.get);

/* Create project */
router.post('/', projects.create);
//router.put('/:userId', users.update);
//router.delete('/:userId', users.destroy);

module.exports = router;
