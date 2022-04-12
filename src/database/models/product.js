module.exports = (sequelize, DataTypes) => {
	const alias = 'product';
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
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		stock: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		offer: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		image: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		idCategory: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	};
	const config = {
		tableName: 'products',
		timestamps: false,
	};

	const product = sequelize.define(alias, structure, config);

	product.associate = function (models) {
		product.hasMany(models.buydetail, {                  
			as: 'buydetail',
			foreignKey: 'idProduct',
		}),
			product.belongsTo(models.category, {
				as: 'category',
				foreignKey: 'idCategory',
			});
	};

	return product;
};
