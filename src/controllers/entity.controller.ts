import {Request,Response} from 'express';
import {handleHttp} from "../utils/error.handle";
import * as serviceEntity from "../services/entity.service";
import {upload} from '../middleware/upload.middleware'
import multer from 'multer';
export const postEntity=async(req:Request,res:Response)=>{
    try {
        const middleUpload=upload.single("entityLogo")   
        middleUpload(req, res, async (err: unknown) => {
            if (err instanceof multer.MulterError) {                
                return res.status(400).send({ message: err.message });
            } else if (err instanceof Error) { 
            return res.status(400).send({ message: err.message });
            }
            const response=await serviceEntity.addEntity(req);
            return res.status(response.code).json(response.body);
        });    
    } catch (error) {              
        handleHttp(res,"ERROR_POST_postEntity",error);
    }
}
export const putEntity=async(req:Request,res:Response)=>{
try {
    const middleUpload=upload.single("entityLogo")   
    middleUpload(req, res, async (err: unknown) => {
        if (err instanceof multer.MulterError) {                
            return res.status(400).send({ message: err.message });
        } else if (err instanceof Error) { 
        return res.status(400).send({ message: err.message });
        }
        const response=await serviceEntity.updateEntity(req);
        return res.status(response.code).json(response.body);
    });    
} catch (error) {
    handleHttp(res,"ERROR_PUT_putEntity",error);
}
}
export const getEntity=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEntity.getdataEntity(req);
        return res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getEntity",error);
    }
}