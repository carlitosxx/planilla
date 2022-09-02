import {Request, response} from 'express';
import {pool} from '../database';
import jwt from 'jsonwebtoken';
import { Iuser } from '../models/raw/user.model';

export const validateUser=async(req:Request)=>{
   let response;
   const {userEmail,userDni}=req.body;         
        const query = await pool.query(`
        SELECT * 
        FROM 
            planilla.tbl_user as u
        WHERE
            u.userEmail=? and
            u.userDni=?
        `,[userEmail,userDni]);      
        const userParse = JSON.parse(JSON.stringify(query[0]));                     
        if (Object.entries(query[0]).length===0){           
             response ={
                body:{
                    msg:"Email or dni invalid"},
                code:400    
            }
          return response;
        }
        const token = jwt.sign({userEmail},process.env.TOKEN_SECRET!); 
        response={
            body:{token,...userParse[0]},
            code:200
        }
        return response;
}
export const getProfile=async(req:Request)=>{
    const {userId}=req.params;
    let response;
    const query = await pool.query(`
    Select * 
    from planilla.tbl_user as u
    where
        u.user_id=? 
    `,[userId]);      
    const userParse = JSON.parse(JSON.stringify(query[0]));
    const result=Object.entries(query[0])
    if (result.length===0){
        response={
            body:{msg:"id invalid"},
            code:400
        }
        return  response;
    }
    response={
        body:{...userParse[0]},
        code:200
    }               
    return response;
}
export const createUser=async(req:Request)=>{
    let response;
     const {userFirstName,userLastName,userEmail,userDni}=req.body;
        const query = await pool.query(`
        INSERT INTO 
        tbl_user (
            userFirstName,
            userLastName,
            userDni,
            userEmail,
            userStatus)
        values(?,?,?,?,1)
        `,[userFirstName,userLastName,userDni,userEmail]); 
        response={
            body:{msg:"user created"},
            code:200
        }   
        // if (Object.entries(query[0]).length===0){

        // }

        return response;
}