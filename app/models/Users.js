'use strict';

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('User', 
		{
			userId: {
				type: DataTypes.STRING(255),
				primaryKey: true
			},
			username: {
				type: DataTypes.STRING(255),
				validate: {
					notEmpty: true
				}
			},
			fullName: {
				type: DataTypes.STRING(255),
				validate: {
					notEmpty: true
				}
			},
			role: {
				type: DataTypes.STRING(255),
				defaultValue: 'developer'
			}
		},
		{
			timestamps: true,
			underscored: true,
			tableName: 'users'
	});
};