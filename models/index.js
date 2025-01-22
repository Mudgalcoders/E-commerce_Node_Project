import connection from "../config/connectionDB.js";
import { Sequelize } from "sequelize";
import signupModel from "../module/signup_pages/model/signupModel.js";
import warehouseModel from "../module/warehouse-management/model/warehouseModel.js";

const sequelize = new Sequelize(
    connection.config.database,
    connection.config.user,
    connection.config.password, {
    host: connection.host,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: connection.config.pool.max,
        min: connection.config.pool.min,
        acquire: connection.config.pool.acquire,
        idle: connection.config.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.signupModel = signupModel(sequelize, Sequelize);
db.warehouseModel = warehouseModel(sequelize, Sequelize);


// Ensure associations are set after model definitions
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

export default db;
