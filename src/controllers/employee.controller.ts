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
    getDataPensionAdministrator,
    createTypeEmployee,
    getDataTypeEmployee,
    updateDataTypeEmployee,
    addCondition,
    updateCondition,
    getDataCondition,
    addLaborRegime,
    updateLaborRegime,
    getDataLaborRegime,
    addOccupationalGroup,
    updateOccupationalGroup,
    getDataOccupationalGroup,
    addEstablishment,
    updateEstablishment,
    getDataEstablishment,
    addPosition,
    updatePosition,
    getDataPosition,
    addWorkday,
    updateWorkday,
    getDataWorkday} from "../services/employee.service";

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
export const addTypeEmployee=async(req:Request,res:Response)=>{
    try {
        const response=await createTypeEmployee(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_addTypeEmployee",error)
    }
}
export const updateTypeEmployee=async(req:Request,res:Response)=>{
    try {
        const response=await updateDataTypeEmployee(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_updateTypeEmployee",error)
    }
}
export const getTypeEmployee=async(req:Request,res:Response)=>{
    try {
        const response=await getDataTypeEmployee(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getTypeEmployee",error)
    }
}
export const postCondition=async(req:Request,res:Response)=>{
    try {
        const response=await addCondition(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_postCondition",error)
    }
}
export const putCondition=async(req:Request,res:Response)=>{
    try {
        const response=await updateCondition(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_putCondition",error)
    }
}
export const getCondition=async(req:Request,res:Response)=>{
    try {
        const response=await getDataCondition(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_putCondition",error)
    }
}
export const postLaborRegime=async(req:Request,res:Response)=>{
    try {
        const response=await addLaborRegime(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_postLaborRegime",error)
    }
}
export const putLaborRegime=async(req:Request,res:Response)=>{
    try {
        const response=await updateLaborRegime(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_putLaborRegime",error)
    }
}
export const getLaborRegime=async(req:Request,res:Response)=>{
    try {
        const response=await getDataLaborRegime(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getLaborRegime",error)
    }
}
export const postOccupationalGroup=async(req:Request,res:Response)=>{
    try {
        const response=await addOccupationalGroup(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POS_postOccupationalGroup",error)
    }
}
export const putOccupationalGroup=async(req:Request,res:Response)=>{
    try {
        const response=await updateOccupationalGroup(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_ putOccupationalGroup",error)
    }
}
export const getOccupationalGroup=async(req:Request,res:Response)=>{
    try {
        const response=await getDataOccupationalGroup(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_OccupationalGroup",error)
    }
}
export const postEstablishment=async(req:Request,res:Response)=>{
    try {
        const response=await addEstablishment(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POS_postEstablishment",error)
    }
}
export const putEstablishment=async(req:Request,res:Response)=>{
    try {
        const response=await updateEstablishment(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_putEstablishment",error)
    }
}
export const getEstablishment=async(req:Request,res:Response)=>{
    try {
        const response=await getDataEstablishment(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getEstablishment",error)
    }
}
export const postPosition=async(req:Request,res:Response)=>{
    try {
        const response = await addPosition(req);
        res.status(response.code).json(response.body)
    } catch (error) {
        handleHttp(res,"ERROR_POST_postPosition",error)
    }
}
export const putPosition=async(req:Request,res:Response)=>{
    try {
        const response=await updatePosition(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_position",error)
    }
}
export const getPosition=async(req:Request,res:Response)=>{
    try {
        const response=await getDataPosition(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getPosition",error)
    }
}
export const postWorkday=async(req:Request,res:Response)=>{
    try {
        const response = await addWorkday(req);
        res.status(response.code).json(response.body)
    } catch (error) {
        handleHttp(res,"ERROR_POST_postWorkday",error)
    }
}
export const putWorkday=async(req:Request,res:Response)=>{
    try {
        const response=await updateWorkday(req);
        res.status(response.code).json(response.body)
    } catch (error) {
        handleHttp(res,"ERROR_PUT_putWorkday",error)
    }
}
export const getWorkday=async(req:Request,res:Response)=>{
    try {
        const response=await getDataWorkday(req);
        res.status(response.code).json(response.body)
    } catch (error) {
        handleHttp(res,"ERROR_GET_getWorkday",error)
    }
}