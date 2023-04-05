//importing modules
const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');
require('dotenv').config();

//database name is discover
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
//checking if connection is done
const check = () => {
    sequelize.authenticate().then(() => {
        process.env.ENV == 'dev' && console.log(`Database connected to discover`);
    }).catch((err) => {
        console.log(err);
    });
}

const syncDB = (val) => {
    sequelize.sync({ force: val })
        .then((result) => {
            console.log('Sync DB...');
        }).catch((err) => {
            console.log(`There is Error in sync db...`);
        });
}
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.check = check;
db.syncDB = syncDB;

//connecting to model
db.user = require('./user.model')(sequelize, DataTypes);
db.course = require('./course.model')(sequelize, DataTypes);
db.comment = require('./comment.model')(sequelize, DataTypes);
db.req = require('./reqToGetRegistred')(sequelize, DataTypes);
db.note = require('./note.model')(sequelize, DataTypes);

module.exports = db;