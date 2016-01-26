'use strict';

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', 
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
			classMethods: {
				associate: function(models) {
					User.belongsToMany(models.Team, {through:'TeamMembers', foreignKey: 'memberId'});
				}
			}
		},
		{
			timestamps: true,
			underscored: true,
			tableName: 'users'
	});

	return User;
};