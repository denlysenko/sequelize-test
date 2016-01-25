'use strict';

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Tag', 
		{
			tagId: {
				type: DataTypes.STRING(255),
				primaryKey: true
			},
			projectId: {
				type: DataTypes.STRING(255)
			},
			userId: {
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
			tableName: 'tags'
		}
	);
};