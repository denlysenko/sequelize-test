'use strict';

var models = require('../models'),
		crypto = require('crypto'),
    async = require('async'),
    _ = require('lodash');

module.exports = {
	get: function(req, res) {
		models.User.findAll()
			.then(function(users) {
				res.json(users);
			})
			.catch(function(err) {
				console.log(err);
				res.status(400).send({message: err.message});
			});
	},
	create: function(req, res, next) {
		var id = crypto.randomBytes(20).toString('hex');
		models.User.create({
			userId: id,
			username: req.body.username,
			fullName: req.body.fullName,
			role: req.body.role
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
          models.User.findById(req.params.userId)
              .then(function(user) {
                if(!user) return res.status(404).send({message: 'User Not Found'});
                callback(null, user);
              })
              .catch(function(err) {
                callback(err);
              });
        },
        function(user, callback) {
          _.extend(user, req.body);
          user.save()
              .then(function() {
                callback(null, user);
              })
              .catch(function(err) {
                callback(err);
              });
        }
    ], function(err, user) {
      if(err) return next(err);
      res.json(user);
    });
	},
  destroy: function(req, res, next) {
    models.User.destroy({where: {userId: req.params.userId}})
        .then(function() {
          res.send('User was removed');
        })
        .catch(function(err) {
          next(err);
        });
  }
};