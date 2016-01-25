'use strict';

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('TeamMembers', 
		{
			teamId: {
				type: DataTypes.STRING(255),
				primaryKey: true
			},
			memberId: {
				type: DataTypes.STRING(255)
			}
		},
		{
			timestamps: true,
			underscored: true,
			tableName: 'team_members'
		}
	);
};