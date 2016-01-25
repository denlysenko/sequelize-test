'use strict';

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Team', 
		{
			teamId: {
				type: DataTypes.STRING(255),
				primaryKey: true
			},
			projectId: {
				type: DataTypes.STRING(255)
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: false
			}
		},
		{
			timestamps: true,
			underscored: true,
			tableName: 'teams'
		}
	);
};
