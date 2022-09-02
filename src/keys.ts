import dotenv from 'dotenv';
dotenv.config();
let host = process.env.MYSQL_HOST;
let user=process.env.MYSQL_USER;
let password=process.env.MYSQL_PASSWORD;
let database=process.env.MYSQL_DATABASE;
export default{
    database: {
        host,
        user,
        password,
        database
    }
}