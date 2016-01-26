'use strict';

module.exports = function(sequelize, DataTypes) {
	var Team = sequelize.define('Team', 
		{
			teamId: {
				type: DataTypes.STRING(255),
				primaryKey: true
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: false
			}
		},
		{
			classMethods: {
				associate: function(models) {
					Team.belongsTo(models.Project, {foreignKey: 'projectId'});
				}
			}
		},
		{
			timestamps: true,
			underscored: true,
			tableName: 'teams'
		}
	);
	return Team;
};
