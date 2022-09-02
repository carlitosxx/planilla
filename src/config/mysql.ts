import {Sequelize} from "sequelize";

const database= process.env.MYSQL_DATABASE as string;
const username=process.env.MYSQL_USER  as string;
const password=process.env.MYSQL_PASSWORD as string;
const host = process.env.MYSQL_HOST as string;
const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect:"mysql"
    }
);

const dbConnectMysql = async()=>{
    try {
        await sequelize.authenticate();
        console.log("se conecto a MySql")
    } catch (e) {
        console.log('errore de conexion',e)
    }
};
export default {dbConnectMysql,sequelize};


