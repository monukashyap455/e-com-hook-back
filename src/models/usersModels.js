
module.exports = (sequelize, DataTypes) => {
    return Users = sequelize.define("users", {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
        },
        name: { type: DataTypes.STRING, allowNull: false },
        number: { type: DataTypes.INTEGER, allowNull: true },
        password: { type: DataTypes.STRING, allowNull: false },
        createdAt: DataTypes.DATE,
    });
};

