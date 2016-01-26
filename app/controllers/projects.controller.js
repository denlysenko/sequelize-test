'use strict';

var models = require('../models'),
    crypto = require('crypto'),
    async = require('async'),
    _ = require('lodash');

module.exports = {
  getAll: function(req, res) {
    models.Project.findAll({
      include: [
        {model: models.User}
      ]
    })
        .then(function(projects) {
          res.json(projects);
        })
        .catch(function(err) {
          console.log(err);
          res.status(400).send({message: err.message});
        });
  },
  getById: function(req, res, next) {
    models.Project.find({where: {projectId: req.params.projectId}, include: [{model: models.User}]})
        .then(function(project) {
          if(!project) return res.status(404).send({message: 'Project Not found'});
          res.json(project);
        })
        .catch(function(err) {
          console.log(err);
          next(err);
        });
  },
  create: function(req, res, next) {
    var id = crypto.randomBytes(20).toString('hex');
    models.Project.create({
      projectId: id,
      name: req.body.name,
      creatorId: req.body.creatorId
    })
        .then(function(user) {
          res.json(user);
        })
        .catch(function(err) {
          console.log(err);
          next(err);
        });
  },
  update: function(req, res, next) {
    async.waterfall([
      function(callback) {
        models.Project.findById(req.params.projectId)
            .then(function(project) {
              if(!project) return res.status(404).send({message: 'Project Not Found'});
              callback(null, project);
            })
            .catch(function(err) {
              callback(err);
            });
      },
      function(project, callback) {
        _.extend(project, req.body);
        project.save()
            .then(function() {
              callback(null, project);
            })
            .catch(function(err) {
              callback(err);
            });
      }
    ], function(err, project) {
      if(err) return next(err);
      res.json(project);
    });
  },
  destroy: function(req, res, next) {
    models.Project.destroy({where: {projectId: req.params.projectId}})
        .then(function() {
          res.send('Project was removed');
        })
        .catch(function(err) {
          next(err);
        });
  }
};