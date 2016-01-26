'use strict';

module.exports = function(sequelize, DataTypes) {
	var Tag = sequelize.define('Tag', 
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
      classMethods: {
        associate: function(models) {
          models.Project.belongsToMany(Tag, {through: 'ProjectTags'});
          Tag.belongsToMany(models.User, {through: 'UserTags'});
        }
      }
    },
		{
			timestamps: true,
			underscored: true,
			tableName: 'tags'
		}
	);
	return Tag;
};