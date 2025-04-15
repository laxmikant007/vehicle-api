import { Sequelize, DataTypes } from "sequelize";
import config from "../config/config.js";

let IS_LIVE = parseInt(config.IS_LIVE);

let dialectOptions = {};

if(IS_LIVE === 1){
    dialectOptions = {
        ssl: {
            require: false,
            rejectUnauthorized: false
        }
    }
}else{
    dialectOptions = {}
}

const Model = new Sequelize(config.SQL_DATABASE, config.SQL_USERNAME, config.SQL_PASSWORD, {
    host: config.SQL_HOST,
    port: config.SQL_PORT || 3306, 
    dialect: 'mysql',
    logging: config.SQL_LOGGING,
    dialectOptions: dialectOptions
});

try {
  await Model.authenticate();
  console.log(`${config.SQL_DATABASE} DB has been connected successfully.`);
} catch (error) {
  console.error(`${config.SQL_DATABASE} DB Unable to connect to the database:`, error);
}

export {Model, Sequelize}