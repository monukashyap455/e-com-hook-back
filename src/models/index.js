const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('webapp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
const db = {};


sequelize.authenticate()
    .then(() => {
        console.log("MYSQL connected");
    })
    .catch(err => {
        console.log("Error" + err);
    });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require('./usersModels')(sequelize, DataTypes);
db.Products = require('./productsModel')(sequelize, DataTypes);


module.exports = db;

// db.sequelize.sync()
//     .then(() => {
//         console.log("yes re-sync");
//     });




