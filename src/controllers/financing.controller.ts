import {Request,Response} from 'express';
import {handleHttp} from "../utils/error.handle";
import * as serviceFinancing from "../services/financing.service";


export const postFinancing=async(req:Request,res:Response)=>{
    try {
        const response=await serviceFinancing.addFinancing(req);
        return res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_postFinancing",error);
    }
}
export const putFinancing=async(req:Request,res:Response)=>{
    try {
        const response=await serviceFinancing.updateFinancing(req);
        return res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_putFinancing",error);
    }
}
export const getFinancing=async(req:Request,res:Response)=>{
    try {
        const response=await serviceFinancing.getDataFinancing(req);
        return res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_putFinancing",error);
    }
}
