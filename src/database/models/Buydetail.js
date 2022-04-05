module.exports = (sequelize, DataTypes) => {
    const alias = 'buydetail';
    const structure = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idProduct: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idBuy: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
    const config = {
        tableName: 'buysDetails',
        timestamps: false
    }

    const buydetail = sequelize.define(alias, structure, config);

    buydetail.associate = function(models) {
        buydetail.belongsTo(models.buy, {      
            as: 'buy',                                                     
            foreignKey: 'idBuy'
        });
        buydetail.hasMany(models.product, {   
            as: 'product',
            foreignKey: 'idProduct'
        })
    }

    return buydetail;
}