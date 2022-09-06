import {Request,Response} from 'express';
import {handleHttp} from "../utils/error.handle";
import {
    createCategory,
    createEmployee,
    createCategorySalary,
    updateDataEmployee, 
    getDataEmployees, 
    updateDataCategory, 
    getDataCategory, 
    updateDataCategorySalary, 
    getDataCategorySalary, 
    createPensionSystem, 
    updateDataPensionSystem, 
    getDataPensionSystem,
    createPensionAdministrator,
    updateDataPensionAdministrator,
    getDataPensionAdministrator} from "../services/employee.service";

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
        handleHttp(res,"ERROR_PUT_updateEmployee",error);
    }
}
export const getEmployees=async(req:Request,res:Response)=>{
    try {
        const response= await getDataEmployees(req);
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
export const updateCategory=async(req:Request,res:Response)=>{
    try {
        const response=await updateDataCategory(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_updateCategory",error);
    }
    
}
export const getCategory=async(req:Request,res:Response)=>{
    
    try {
        const response=await getDataCategory(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getEmployess",error)
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
export const updateCategorySalary=async (req:Request,res:Response)=>{
    try {
        const response=await updateDataCategorySalary(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_updateCategorySalary",error);
    }
}
export const getCategorySalary=async(req:Request,res:Response)=>{
    try {
        const response=await getDataCategorySalary(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getCategorySalary",error);
    }
}
export const addPensionSystem=async(req:Request,res:Response)=>{
    try {
        const response=await createPensionSystem(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_addCategorySalary",error)
    }
}
export const updatePensionSystem=async(req:Request,res:Response)=>{
    try {
        const response=await updateDataPensionSystem(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_updatePensionSystem",error)
    }
}
export const getPensionSystem=async(req:Request,res:Response)=>{
    try {
        const response=await getDataPensionSystem(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getPensionSystemm",error)
    }
}
export const addPensionAdministrator=async(req:Request,res:Response)=>{
    try {
        const response=await createPensionAdministrator(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_addpensionAdministrator",error)
    }
}
export const updatePensionAdministrator= async(req:Request,res:Response)=>{
    try {
        const response=await updateDataPensionAdministrator(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_updatePensionAdministrator",error)
    }
}
export const getPensionAdministrator= async(req:Request,res:Response)=>{
    try {
        const response=await getDataPensionAdministrator(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getPensionAdministrator",error)
    }
}