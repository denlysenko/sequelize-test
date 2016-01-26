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
			name: {
				type: DataTypes.STRING(255),
				allowNull: false
			}
		},
    {
      classMethods: {
        associate: function(models) {
          Tag.belongsTo(models.User, {foreignKey: 'userId'});
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