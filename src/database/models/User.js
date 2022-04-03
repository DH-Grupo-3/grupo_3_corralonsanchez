module.exports = (sequelize, DataTypes) => {
	const alias = 'user';
	const structure = {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		fullName: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
        dni:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(150),
            allowNull:false
        },
        dayOfBirth: {
            type: DataTypes.TEXT,
            allowNull:false
        },
        address:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        cel:{
            type: DataTypes.INTEGER(11),
            allowNull:false
        },
        isAdmin:{
            type:DataTypes.INTEGER(11),
            allowNull:false
        },
        password:{
            type:DataTypes.TEXT,
            allowNull:false
        }
	};
    
	const config = {
		tableName: 'users',
		timestamp: false,
	};
	const user = sequelize.define(alias, structure, config);
	user.associate = function (models) {
		user.hasMany(models.buy, {
			as: 'buys',
			foreignKey: 'idUser',
		});
	};
	return user;
};