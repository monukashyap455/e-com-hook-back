
module.exports = (sequelize, DataTypes) => {
    return Products = sequelize.define("products", {
        ProductId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        userId: { type: DataTypes.INTEGER, allowNull: false, },
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.INTEGER, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: false },
        company: { type: DataTypes.STRING, allowNull: false },
        createdAt: DataTypes.DATE,
    });
};
