module.exports = (sequelize, DataTypes) => {
	const alias = 'category';
	const structure = {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
	};
	const config = {
		tableName: 'categories',
		timestamps: false,
	};
	const category = sequelize.define(alias, structure, config);
	// category.associate = function (models) {
	// 	category.hasMany(models.product, {
	// 		as: 'products',
	// 		foreignKey: 'idCategory',
	// 	});
	// };
	return category;
};
