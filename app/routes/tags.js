'use strict';

var express = require('express'),
    router = express.Router(),
    tags = require('../controllers/tags.controller');


/* GET tags listing. */
router.get('/', tags.getAll);
router.get('/:tagId', tags.getById);

/* Create project */
router.post('/', tags.create);
router.put('/:tagId', tags.update);
router.delete('/:tagId', tags.destroy);

/* Add/remove project to tag */
router.post('/add_project/:tagId', tags.addProject);
router.delete('/remove_project/:tagId', tags.removeProject);
module.exports = router;
