import {Request,Response} from 'express';
import {handleHttp} from "../utils/error.handle";
import * as serviceResponsible from "../services/responsible.service";
import {upload} from '../middleware/upload.middleware'
import multer from 'multer';

export const postResponsible=async(req:Request,res:Response)=>{
    try {
        const middleUpload=upload.single("responsibleSignature")   
        middleUpload(req, res, async (err: unknown) => {
            if (err instanceof multer.MulterError) {                
                return res.status(400).send({ message: err.message });
            } else if (err instanceof Error) { 
            return res.status(400).send({ message: err.message });
            }
            const response=await serviceResponsible.addResponsible(req);
            return res.status(response.code).json(response.body);
        });    
    } catch (error) {              
        handleHttp(res,"ERROR_POST_postResponsible",error);
    }
}
export const putResponsible=async(req:Request,res:Response)=>{
    try {
        const middleUpload=upload.single("responsibleSignature")   
        middleUpload(req, res, async (err: unknown) => {
            if (err instanceof multer.MulterError) {                
                return res.status(400).send({ message: err.message });
            } else if (err instanceof Error) { 
            return res.status(400).send({ message: err.message });
            }
            const response=await serviceResponsible.updateResponsible(req);
            return res.status(response.code).json(response.body);
        });    
    } catch (error) {
        handleHttp(res,"ERROR_PUT_putResponsible",error);
    }
}
export const getResponsible=async(req:Request,res:Response)=>{
    try {
        const response=await serviceResponsible.getDataResponsible(req);
        return res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getResponsible",error);
    }
}
export const getResponsibleById=async(req:Request,res:Response)=>{
    try {
        const response=await serviceResponsible.getDataResponsibleById(req);
        return res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getResponsibleById",error);
    }
}