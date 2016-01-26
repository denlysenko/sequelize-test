'use strict';

var models = require('../models'),
    crypto = require('crypto'),
    async = require('async'),
    _ = require('lodash');

module.exports = {
  getAll: function(req, res) {
    models.Tag.findAll({
      include: [{
        model: models.Project
      }, {
        model: models.User
      }]
    })
        .then(function(tags) {
          res.json(tags);
        })
        .catch(function(err) {
          console.log(err);
          res.status(400).send({message: err.message});
        });
  },
  getById: function(req, res, next) {
    models.Tag.find({where: {tagId: req.params.tagId}, include: [
      {model: models.Project},
      {model: models.User}
    ]})
        .then(function(tag) {
          if(!tag) return res.status(404).send({message: 'Tag not found'});
          res.json(tag);
        })
        .catch(function(err) {
          console.log(err);
          next(err);
        });
  },
  create: function(req, res, next) {
    var id = crypto.randomBytes(20).toString('hex');
    models.Tag.create({
      tagId: id,
      name: req.body.name,
      projectId: req.body.projectId,
      userId: req.body.userId
    })
        .then(function(tag) {
          tag.addProject(tag.projectId);
          res.json(tag);
        })
        .catch(function(err) {
          console.log(err);
          next(err);
        });
  },
  addProject: function(req, res, next) {
    async.waterfall([
        function(callback) {
          models.Tag.findById(req.params.tagId)
              .then(function(tag) {
                if(!tag) return callback({message: 'Tag not found'});
                callback(null, tag);
              })
              .catch(function(err) {
                callback(err);
              });
        },
        function(tag, callback) {
          tag.addProject(req.body.projectId);
          callback(null);
        }
    ], function(err) {
      if(err) return next(err);
      res.send('Project added');
    });
  },
  removeProject: function(req, res, next) {
    async.waterfall([
        function(callback) {
          models.Tag.findById(req.params.tagId)
              .then(function(tag) {
                if(!tag) return res.status(404).send({message: 'Tag not found'});
                callback(null, tag);
              })
              .catch(function(err) {
                console.log(err);
                callback(err);
              });
        },
        function(tag, callback) {
          tag.removeProject(req.body.projectId);
          callback(null);
        }

    ], function(err) {
      if(err) return next(err);
      res.send('Project removed');
    });
  },
  update: function(req, res, next) {
    async.waterfall([
      function(callback) {
        models.Tag.findById(req.params.tagId)
            .then(function(tag) {
              if(!tag) return res.status(404).send({message: 'Tag Not Found'});
              callback(null, tag);
            })
            .catch(function(err) {
              callback(err);
            });
      },
      function(tag, callback) {
        _.extend(tag, req.body);
        tag.save()
            .then(function() {
              callback(null, tag);
            })
            .catch(function(err) {
              callback(err);
            });
      }
    ], function(err, tag) {
      if(err) return next(err);
      res.json(tag);
    });
  },
  destroy: function(req, res, next) {
    models.Tag.destroy({where: {tagId: req.params.tagId}})
        .then(function() {
          res.send('Tag was removed');
        })
        .catch(function(err) {
          next(err);
        });
  }
};