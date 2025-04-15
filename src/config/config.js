import "dotenv/config";
let env = process.env;

let IS_LIVE = parseInt(env.IS_LIVE);


const Config = {

    SQL_DATABASE: IS_LIVE ? env.LIVE_SQL_DATABASE : env.SQL_DATABASE,
    SQL_USERNAME: IS_LIVE ? env.LIVE_SQL_USERNAME : env.SQL_USERNAME,
    SQL_PASSWORD: IS_LIVE ? env.LIVE_SQL_PASSWORD : env.SQL_PASSWORD,
    SQL_HOST: IS_LIVE ? env.LIVE_SQL_HOST : env.SQL_HOST,
    SQL_PORT: IS_LIVE ? env.LIVE_SQL_PORT : env.SQL_PORT,

    SQL_LOGGING: false,

    MATH_CONFIG : { returnString: true, eMinus: Infinity, ePlus: Infinity },


}

export default Object.freeze(Config);