'use strict';

var models = require('../models'),
    crypto = require('crypto'),
    async = require('async'),
    _ = require('lodash');

module.exports = {
  get: function(req, res) {
    models.Tag.findAll({
      include: [{
        model: Project
      }, {
        model: User
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
  create: function(req, res, next) {
    var id = crypto.randomBytes(20).toString('hex');
    models.Tag.create({
      tagId: id,
      name: req.body.name,
      Projects: [
        {projectId: req.body.projectId}
      ],
      User: [
        {userId: req.body.creatorId}
      ]
    })
        .then(function(team) {
          res.json(team);
        })
        .catch(function(err) {
          console.log(err);
          next(err);
        });
  },
  update: function(req, res, next) {
    async.waterfall([
      function(callback) {
        models.Team.findById(req.params.teamId)
            .then(function(team) {
              if(!team) return res.status(404).send({message: 'Team Not Found'});
              callback(null, team);
            })
            .catch(function(err) {
              callback(err);
            });
      },
      function(team, callback) {
        _.extend(team, req.body);
        team.save()
            .then(function() {
              callback(null, team);
            })
            .catch(function(err) {
              callback(err);
            });
      }
    ], function(err, team) {
      if(err) return next(err);
      res.json(team);
    });
  },
  destroy: function(req, res, next) {
    models.Team.destroy({where: {teamId: req.params.teamId}})
        .then(function() {
          res.send('Team was removed');
        })
        .catch(function(err) {
          next(err);
        });
  }
};