import {Request} from 'express';
import {pool} from '../database';
import jwt from 'jsonwebtoken';
import { Iuser } from '../models/raw/user.model';

export const validateUser=async(req:Request)=>{
   let response;
   const {userEmail,userDni}=req.params;         
        const query = await pool.query(`
        SELECT * 
        FROM 
            planilla.tbl_user as u
        WHERE
            u.user_email=? and
            u.user_dni=?
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