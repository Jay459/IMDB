const dbConfig = require("../../config/db.config");


const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.actors = require("./actor")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.movies = require("./movie")(sequelize, Sequelize);
// db.rating = require("./rating")(sequelize, Sequelize);


db.actors.belongsToMany(db.movies, {
  through: "movies_actors",
  as: "movies",
  foreignKey: "actors_id",
});


db.movies.belongsToMany(db.actors, {
  through: "movies_actors",
  as: "actors",
  foreignKey: "movies_id",
});

// db.user.hasMany(db.rating,{
//   as : "rating"
// })

// db.rating.belongsTo(db.user , {
//   as : "user",
//   foreignKey: "user_id"
// })

module.exports = db;