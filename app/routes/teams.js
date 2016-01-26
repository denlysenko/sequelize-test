'use strict';

var express = require('express'),
    router = express.Router(),
    teams = require('../controllers/teams.controller');


/* GET projects listing. */
router.get('/', teams.getAll);
router.get('/:teamId', teams.getById);

/* Create project */
router.post('/', teams.create);
router.put('/:teamId', teams.update);
router.delete('/:teamId', teams.destroy);

/* Add member to team */
router.post('/add_member/:teamId', teams.addMember);
router.delete('/remove_member/:teamId', teams.removeMember);

module.exports = router;
