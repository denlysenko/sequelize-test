'use strict';

module.exports = function(sequelize, DataTypes) {
	var Project = sequelize.define('Project',
		{
			projectId: {
				type: DataTypes.STRING(255),
				primaryKey: true
			},
			creatorId: {
				type: DataTypes.STRING(255)
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: false
			}
		},
		{
      classMethods: {
        associate: function(models) {
          Project.belongsTo(models.User, {as: 'creator'});
        }
      }
    },
		{
			timestamps: true,
			underscored: true,
			tableName: 'projects'
		}
	);
  return Project;
};
