import {Request,Response} from 'express';
import {handleHttp} from "../utils/error.handle";
import * as serviceEmployee from "../services/employee.service";
/**Employee */
export const addEmployee=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.createEmployee(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_addEmployee",error);
    }
}
export const updateEmployee=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.updateDataEmployee(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_updateEmployee",error);
    }
}
export const getEmployees=async(req:Request,res:Response)=>{
    try {
        const response= await serviceEmployee.getDataEmployees(req);
        res.status(response.code).json(response.body);
        
    } catch (error) {
        handleHttp(res,"ERROR_GET_getEmployees",error)
    }
}
export const getEmployeeById=async(req:Request,res:Response)=>{
    try {
        const response= await serviceEmployee.getDataEmployeeById(req);
        res.status(response.code).json(response.body);        
    } catch (error) {
        handleHttp(res,"ERROR_GET_getEmployeeById",error)
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
/**Category */
export const addCategory=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.createCategory(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_addCategory",error)
    }
}
export const updateCategory=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.updateDataCategory(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_updateCategory",error);
    }
    
}
export const getCategory=async(req:Request,res:Response)=>{    
    try {
        console.log('controller category')
        const response=await serviceEmployee.getDataCategory(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getCategory",error)
    }
}
export const getCategoryById=async(req:Request,res:Response)=>{
    try {        
        const response=await serviceEmployee.getDataCategoryById(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getCategoryById",error)
    }
}
/**Category Salary */
export const addCategorySalary=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.createCategorySalary(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_addCategorySalary",error)
    }
}
export const updateCategorySalary=async (req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.updateDataCategorySalary(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_updateCategorySalary",error);
    }
}
export const getCategorySalary=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataCategorySalary(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getCategorySalary",error);
    }
}
export const getCategorySalaryById=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataCategorySalaryById(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getCategorySalaryById",error);
    }
}
/**Pension System */
export const addPensionSystem=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.createPensionSystem(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_addCategorySalary",error)
    }
}
export const updatePensionSystem=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.updateDataPensionSystem(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_updatePensionSystem",error)
    }
}
export const getPensionSystem=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataPensionSystem(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getPensionSystemm",error)
    }
}
export const getPensionSystemById=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataPensionSystemById(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getCategorySalaryById",error);
    }
}
/**Pension Administrato */
export const addPensionAdministrator=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.createPensionAdministrator(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_addpensionAdministrator",error)
    }
}
export const updatePensionAdministrator= async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.updateDataPensionAdministrator(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_updatePensionAdministrator",error)
    }
}
export const getPensionAdministrator= async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataPensionAdministrator(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getPensionAdministrator",error)
    }
}
export const getPensionAdministratorById=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataPensionAdministratorById(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getPensionAdministratorById",error)
    }
}
/**Type employee */
export const addTypeEmployee=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.createTypeEmployee(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_addTypeEmployee",error)
    }
}
export const updateTypeEmployee=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.updateDataTypeEmployee(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_updateTypeEmployee",error)
    }
}
export const getTypeEmployee=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataTypeEmployee(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getTypeEmployee",error)
    }
}
export const getTypeEmployeeById=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataTypeEmployeeById(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getTypeEmployeeById",error)
    }
}
/**Condition */
export const postCondition=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.addCondition(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_postCondition",error)
    }
}
export const putCondition=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.updateCondition(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_putCondition",error)
    }
}
export const getCondition=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataCondition(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getCondition",error)
    }
}
export const getConditionById=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataConditionById(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getConditionById",error)
    }
}
/**Labor Regime */
export const postLaborRegime=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.addLaborRegime(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_postLaborRegime",error)
    }
}
export const putLaborRegime=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.updateLaborRegime(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_putLaborRegime",error)
    }
}
export const getLaborRegime=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataLaborRegime(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getLaborRegime",error)
    }
}
export const getLaborRegimeById=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataLaborRegimeById(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getLaborRegimeById",error)
    }
}
/**Occupational Group */
export const postOccupationalGroup=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.addOccupationalGroup(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POS_postOccupationalGroup",error)
    }
}
export const putOccupationalGroup=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.updateOccupationalGroup(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_ putOccupationalGroup",error)
    }
}
export const getOccupationalGroup=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataOccupationalGroup(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_OccupationalGroup",error)
    }
}
export const getOccupationalGroupById=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataOccupationalGroupById(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getOccupationalGroupById",error)
    }
}
/**Establishment */
export const postEstablishment=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.addEstablishment(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POS_postEstablishment",error)
    }
}
export const putEstablishment=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.updateEstablishment(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_putEstablishment",error)
    }
}
export const getEstablishment=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataEstablishment(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getEstablishment",error)
    }
}
export const getEstablishmentById=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataEstablishmentById(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getEstablishmentById",error)
    }
}
/**Position */
export const postPosition=async(req:Request,res:Response)=>{
    try {
        const response = await serviceEmployee.addPosition(req);
        res.status(response.code).json(response.body)
    } catch (error) {
        handleHttp(res,"ERROR_POST_postPosition",error)
    }
}
export const putPosition=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.updatePosition(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_position",error)
    }
}
export const getPosition=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataPosition(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getPosition",error)
    }
}
export const getPositionById=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataPositionById(req);
        res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getPositionById",error)
    }
}
/**Workday */
export const postWorkday=async(req:Request,res:Response)=>{
    try {
        const response = await serviceEmployee.addWorkday(req);
        res.status(response.code).json(response.body)
    } catch (error) {
        handleHttp(res,"ERROR_POST_postWorkday",error)
    }
}
export const putWorkday=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.updateWorkday(req);
        res.status(response.code).json(response.body)
    } catch (error) {
        handleHttp(res,"ERROR_PUT_putWorkday",error)
    }
}
export const getWorkday=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataWorkday(req);
        res.status(response.code).json(response.body)
    } catch (error) {
        handleHttp(res,"ERROR_GET_getWorkday",error)
    }
}
export const getWorkdayById=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataWorkdayById(req);
        res.status(response.code).json(response.body)
    } catch (error) {
        handleHttp(res,"ERROR_GET_getWorkdayById",error)
    }
}
/**Organic Unit */
export const postOrganicUnit=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.addOrganicUnit(req);
        res.status(response.code).json(response.body)
    } catch (error) {
        handleHttp(res,"ERROR_POST_postOrganicUnit",error)
    }
}
export const putOrganicUnit=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.updateOrganicUnit(req);
        res.status(response.code).json(response.body)
    } catch (error) {
        handleHttp(res,"ERROR_PUT_putOrganicUnit",error)
    }
}
export const getOrganicUnit=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataOrganicUnit(req);
        res.status(response.code).json(response.body)
    } catch (error) {
        handleHttp(res,"ERROR_GET_getOrganicUnit",error)
    }
}
export const getOrganicUnitById=async(req:Request,res:Response)=>{
    try {
        const response=await serviceEmployee.getDataOrganicUnitById(req);
        res.status(response.code).json(response.body)
    } catch (error) {
        handleHttp(res,"ERROR_GET_getOrganicUnitById",error)
    }
}