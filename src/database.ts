import mysql from 'mysql2/promise';
import keys from './keys';
export const pool = mysql.createPool(keys.database);


export const connectDb = ()=> {
    var conn :any= null;
    return pool.getConnection().then((connection)=> {
      conn = connection;
      console.log('Db is connected')
    return connection;
    }).catch((error)=> {
      console.log("connection failed");
    }).finally(() =>{
      if (conn) {
        conn.connection.release();
      }
    });
  }