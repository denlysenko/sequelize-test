'use strict';

var express = require('express'),
    router = express.Router(),
    projects = require('../controllers/projects.controller');


/* GET projects listing. */
router.get('/', projects.getAll);
router.get('/:projectId', projects.getById);

/* Create project */
router.post('/', projects.create);
router.put('/:projectId', projects.update);
router.delete('/:projectId', projects.destroy);

module.exports = router;
