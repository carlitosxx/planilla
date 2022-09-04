import {Request,Response} from 'express';
import {handleHttp} from "../utils/error.handle";
import {createCategory, createEmployee,createCategorySalary, updateDataEmployee, getEmployeesByPageSize} from "../services/employee.service";

export const addEmployee=async(req:Request,res:Response)=>{
    try {
        const response=await createEmployee(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_addEmployee",error);
    }
}
export const updateEmployee=async(req:Request,res:Response)=>{
    try {
        const response=await updateDataEmployee(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_updateEmployee",error);
    }
}
export const getEmployees=async(req:Request,res:Response)=>{
    try {
        const response= await getEmployeesByPageSize(req);
        res.status(response.code).json(response.body);
        
    } catch (error) {
        handleHttp(res,"ERROR_GET_getEmployess",error)
    }
}
export const test=async(req:Request,res:Response)=>{
    try {
        const {nombre,apellido}=req.query;
        console.log(nombre,apellido)
        return res.status(200).json({nombre,apellido})
    } catch (error) {
        handleHttp(res,"ERROR_POST_addCategory",error)
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