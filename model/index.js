const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operationsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize.authenticate()
    .then(()=>{
        console.log('connected successfully')
    })
    .catch(err=>{
        console.log(err)
    })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel')(sequelize, DataTypes);
db.posts = require('./postModel')(sequelize, DataTypes);

db.sequelize.sync({force: false})
.then(()=>{
    console.log('re sync done');
})

//user connection with post model
db.users.hasMany(db.posts,{
    foreignKey: 'userId',
    as: 'posts'
})

db.posts.belongsTo(db.users,{
    foreignKey: 'userId',
    as: 'user'
})

module.exports = db;