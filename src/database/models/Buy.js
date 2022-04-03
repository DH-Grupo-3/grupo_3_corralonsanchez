module.exports = (sequelize, DataTypes) => {
	const alias = 'buy';
	const structure = {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		idUser: {
			type: DataTypes.INTEGER,
			foreignKey:true,
            allowNull:false
		},
        totalPrice:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false
        },
        date:{
            type:DataTypes.TEXT,
            allowNull:false
        }
	};

	const config = {
		tableName: 'buys',
		timestamp: false,
	};
    
	const buy = sequelize.define(alias, structure, config);
	return buy;
};