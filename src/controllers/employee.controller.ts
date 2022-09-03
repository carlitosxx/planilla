import {Request,Response} from 'express';
import {handleHttp} from "../utils/error.handle";
import {createCategory, createEmployee,createCategorySalary} from "../services/employee.service";

export const addEmployee=async(req:Request,res:Response)=>{
    try {
        const response=await createEmployee(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_addEmployee",error);
    }
}
export const addCategory=async(req:Request,res:Response)=>{
    try {
        const response=await createCategory(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_addCategory",error)
    }
}
export const addCategorySalary=async(req:Request,res:Response)=>{
    try {
        const response=await createCategorySalary(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_addCategorySalary",error)
    }
}