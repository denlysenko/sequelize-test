'use strict';

var express = require('express'),
    router = express.Router(),
    teams = require('../controllers/teams.controller');


/* GET projects listing. */
router.get('/', teams.get);

/* Create project */
router.post('/', teams.create);
router.put('/:teamId', teams.update);
router.delete('/:teamId', teams.destroy);

module.exports = router;
