import {pool} from '../database';
import {Request,Response} from 'express';
import {handleHttp} from "../utils/error.handle";
import {createUser, getProfile, validateUser} from "../services/user.service";


// signup User [POST]
export const signupUser=async(req:Request, res:Response)=>{
    try {
        const response = await createUser(req);
        res.status(response.code).json(response.body);       
    } catch (error) {
        handleHttp(res,"ERROR_GET_signupUser",error);
    }
}
// sign in User [POST]
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
        handleHttp(res,"ERROR_GET_profile",error);
    }
}
// Update user data

// Update status user

// Get user profile data

// List users
