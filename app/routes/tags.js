'use strict';

var express = require('express'),
    router = express.Router(),
    tags = require('../controllers/tags.controller');


/* GET projects listing. */
router.get('/', tags.get);

/* Create project */
router.post('/', tags.create);
// router.put('/:projectId', projects.update);
// router.delete('/:projectId', projects.destroy);

module.exports = router;
