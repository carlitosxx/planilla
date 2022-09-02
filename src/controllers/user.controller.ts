import {pool} from '../database';
import {Request,Response} from 'express';
import {handleHttp} from "../utils/error.handle";
import {getProfile, validateUser} from "../services/user.service";


// signup User
export const signupUser=async(req:Request, res:Response)=>{
    try {
        console.log('hola mundo');
        res.status(200).json({token:'holas'});
        // const {userFirstName,userLastName,userEmail,userDni,userPassword}=req.body;
        // const query = await pool.query(`
        // INSERT INTO 
        // tbl_user (
        //     user_first_name,
        //     user_last_name,
        //     user_dni,
        //     user_correo,
        //     user_status)
        // values(?,?,?,?,1)
        // `,[userFirstName,userLastName,userDni,userEmail,userPassword]); 
        // if (Object.entries(query[0]).length===0){

        // }
    } catch (error) {
        console.log(error);
    }
}
// sign in User [GET]
export const signinUser=async(req:Request, res:Response)=>{
    try {    
        const response=await validateUser(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_signinUser",error);
    }
}
// profile
export const profile=async(req:Request,res:Response)=>{
    try {
       const response = await getProfile(req);
       res.status(response.code).json(response.body)
    } catch (error) {
        console.log(error);
    }
}
// Update user data

// Update status user

// Get user profile data

// List users
