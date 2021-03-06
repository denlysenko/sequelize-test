'use strict';

module.exports = function(sequelize, DataTypes) {
	var Project = sequelize.define('Project',
		{
			projectId: {
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
        	Project.belongsTo(models.User, {foreignKey: 'creatorId'});
          Project.belongsToMany(models.Tag, {through: 'TagProjects', foreignKey: 'projectId', constraints: false});
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
