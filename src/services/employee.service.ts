import {Request } from 'express';
import {pool} from '../database';
import { jsonToEmployee, Iemployee, IemployeeCategory, IcategorySalary, jsonToCategorySalary, IpensionAdministrator, jsonToPensionAdministrator } from '../models/raw/user.model';
/**Employee */
export const createEmployee=async(req:Request)=>{
    let response;
    const {
        employeeDni,
        employeeFullname,
        employeeEntryDate,
        employeeCUSPP,
        employeeAIRHSP,
        categorySalaryId,
        pensionAdministratorId,
        typeEmployeeId,
        conditionId,
        laborRegimeId,
        occupationalGroupId,
        establishmentId,
        positionId,
        workdayId,
        organicUnitId}=req.body;
    const query = await pool.query(`call sp_post_employee(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
        employeeDni,
        employeeFullname,
        1,
        employeeEntryDate,
        employeeCUSPP,
        employeeAIRHSP,
        categorySalaryId,
        pensionAdministratorId,
        typeEmployeeId,
        conditionId,
        laborRegimeId,
        occupationalGroupId,
        establishmentId,
        positionId,
        workdayId,
        organicUnitId
    ])
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
        return response={
                body:{errorNo:1062,errorMessage:"employeeDni duplicate"},
                code:403
            }
    }
    return response={
            body:{msg:"Employee created"},
            code:200
    }          
}
export const updateDataEmployee=async(req:Request)=>{
    let response;
    const {employeeId}=req.params
    const _employeeId=parseInt(employeeId);    
    const {
        employeeDni,
        employeeFullname,
        employeeStatus,
        employeeEntryDate,
        employeeCUSPP,
        employeeAIRHSP,
        categorySalaryId,
        pensionAdministratorId,
        typeEmployeeId,
        conditionId,
        laborRegimeId,
        occupationalGroupId,
        establishmentId,
        positionId,
        workdayId,
        organicUnitId
    }=req.body; 
    await pool.query(`
    call sp_put_employee(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `,[
        employeeDni,
        employeeFullname,
        employeeStatus,
        employeeEntryDate,
        employeeCUSPP,
        employeeAIRHSP,
        categorySalaryId,
        pensionAdministratorId,
        typeEmployeeId,
        conditionId,
        laborRegimeId,
        occupationalGroupId,
        establishmentId,
        positionId,
        workdayId,
        organicUnitId,
        _employeeId]) 
    return response={
            body:{msg:"employee updated"},
            code:200
        }
}
export const getDataEmployees=async(req:Request)=>{
    let response;
    const {page,size,employeeId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_employee`);
    const total:number = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;       
    if(page && size){
        const _page:number=(parseInt(page as string));
        const _size:number=(parseInt(size as string));        
        const _pageCalc:number=(_page-1)*_size; 
        const query=await pool.query(`call sp_get_employee(?,?,null)`,[_pageCalc,_size]);                      
        const queryParse:JSON = (JSON.parse(JSON.stringify(query[0])))[0];        
        const data:Iemployee=jsonToEmployee(queryParse)
        return response={
            body:{total,data},
            code:200
            } 
    }else if (employeeId){
        const query=await pool.query(`call sp_get_employee(null,null,?)`,[employeeId])     
        const queryParse:JSON = (JSON.parse(JSON.stringify(query[0])))[0];   
        const data:Iemployee=jsonToEmployee(queryParse) 
        return response={
            body:{total,data},
            code:200
            };                 
    }else {        
        const query=await pool.query(`call sp_get_employee(null,null,null)`);       
        const queryParse:JSON = (JSON.parse(JSON.stringify(query[0])))[0];              
        const data:Iemployee=jsonToEmployee(queryParse)
        return response={
            body:{total,data},
            code:200
        } ;
    }
}
/**employeeCategory */
export const createCategory=async(req:Request)=>{
    let response;
    const {employeeCategoryDescription,employeeCategoryShortDescription}=req.body;
    const query= await pool.query(`call sp_post_employeeCategory(?,?)`,
    [employeeCategoryDescription,employeeCategoryShortDescription]);
    response={
        body:{msg:"category created"},
        code:200
    }
    return response;
}
export const updateDataCategory=async(req:Request)=>{
    let response;
    const {categoryId}=req.params
    const {employeeCategoryDescription,employeeCategoryShortDescription}=req.body
    await pool.query(`
    call sp_put_employeeCategory(?,?,?);
    `,[employeeCategoryDescription,employeeCategoryShortDescription,parseInt(categoryId)])   
    response={
        body:{msg:"category updated"},
        code:200
    }
    return response;   
   
}
export const getDataCategory=async(req:Request)=>{
    let response;
    const {page,size,employeeCategoryId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_employeeCategory`);
    const total = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;
    if(page && size){
        const query=await pool.query(`call sp_get_employeeCategory(?,?,null)`,[page,size]);        
        const data:IemployeeCategory = (JSON.parse(JSON.stringify(query[0])))[0];        
        return response={
            body:{total,data},
            code:200
        }
    }
    if (employeeCategoryId){
        const query=await pool.query(`call sp_get_employeeCategory(null,null,?)`,[employeeCategoryId])     
        const data:IemployeeCategory = (JSON.parse(JSON.stringify(query[0])))[0];       
        return response={
            body:{total,data},
            code:200
            };         
    }
    else {        
        const query=await pool.query(`call sp_get_employeeCategory(null,null,null)`)        
        const data:IemployeeCategory = (JSON.parse(JSON.stringify(query[0])))[0]; 
        return response={            
            body:{total,data},
            code:200
        } ;
    }
    
}
/**categorySalary */
export const createCategorySalary=async(req:Request)=>{
    let response;
    const {categorySalarySalary,categorySalaryYear,employeeCategoryId}=req.body;
    const query=await pool.query(`call sp_post_categorySalary(?, ?, ?)`,
    [categorySalaryYear,employeeCategoryId,categorySalarySalary]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"categorySalaryYear and employeeCategoryId duplicate"},
            code:403
        }
    }
    return response={
        body:{msg:"salary created"},
        code:200
    }      
}
export const updateDataCategorySalary=async(req:Request)=>{
    let response;
    const {categorySalaryId}=req.params
    const {categorySalarySalary,categorySalaryYear,employeeCategoryId}=req.body
    await pool.query(`call sp_put_categorySalary(?,?,?,?)`,
    [categorySalarySalary,categorySalaryYear,employeeCategoryId,categorySalaryId])    
    return  response={
        body:{msg:"salary updated"},
        code:200
    }
    
}
export const getDataCategorySalary=async(req:Request)=>{
    let response;
    const {page,size,categorySalaryId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_categorySalary`);
    const total = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;
    if(page && size){
        const query=await pool.query(`call sp_get_categorySalary(?,?,null)`,[page,size]);        
        const queryParse:JSON = (JSON.parse(JSON.stringify(query[0])))[0];        
        const data:IcategorySalary=jsonToCategorySalary(queryParse)
        return response={
            body:{total,data},
            code:200
        } 
    }else if (categorySalaryId){
        const query=await pool.query(`call sp_get_categorySalary(null,null,?)`,[categorySalaryId])     
        const queryParse = (JSON.parse(JSON.stringify(query[0])))[0];
        const data:IcategorySalary=jsonToCategorySalary(queryParse) 
        return response={
            body:{total,data},
            code:200
            };
    }
    else {        
        const query=await pool.query(`call sp_get_categorySalary(null,null,null)`)       
        const queryParse = (JSON.parse(JSON.stringify(query[0])))[0];
        const data:IcategorySalary=jsonToCategorySalary(queryParse)               
        return response={            
            body:{total,data},
            code:200
        } ;
    }
}
/**pensionSystem */
export const createPensionSystem=async(req:Request)=>{
    let response;
    const {pensionSystemCode,pensionSystemDescription}=req.body;
    const query=await pool.query(`call sp_post_pensionSystem(?,?,?)`,
    [pensionSystemCode,pensionSystemDescription,pensionSystemCode]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"pensionSystemCode duplicate"},
            code:403
        }
    }
    return response={
        body:{msg:"system pension created"},
        code:200
    }  
    
}
export const updateDataPensionSystem=async(req:Request)=>{
    let response;
    const {pensionSystemId}=req.params
    const {pensionSystemCode,pensionSystemDescription}=req.body
    await pool.query(`call sp_put_pensionSystem(?,?,?)`,
    [pensionSystemCode,pensionSystemDescription,pensionSystemId])    
        return response={
            body:{msg:"pension system updated"},
            code:200
        }         
}
export const getDataPensionSystem=async(req:Request)=>{
    let response;
    const {page,size,pensionSystemId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_pensionSystem`);
    const total = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;
    if(page && size){
        const _page=(parseInt(page as string));
        const _size=(parseInt(size as string));        
        const _pageCalc=(_page-1)*_size; 
        const queryPagination=await pool.query(`call sp_get_pensionSystem(?,?,null)`,[_pageCalc,_size]);       
        const data = (JSON.parse(JSON.stringify(queryPagination[0])))[0];         
        return response={
            body:{total,data},
            code:200
        } 
    }else if (pensionSystemId){
        const query=await pool.query(`call sp_get_pensionSystem(null,null,?)`,[pensionSystemId])     
        const data = (JSON.parse(JSON.stringify(query[0])))[0];        
        return response={
            body:{total,data},
            code:200
            };       
    }else{        
        const queryData=await pool.query(`call sp_get_pensionSystem(null,null,null)`)        
        const data = (JSON.parse(JSON.stringify(queryData[0])))[0];               
        return response={            
            body:{total,data},
            code:200
        };
    }    
}
/**pensionAdministrator */
export const createPensionAdministrator=async(req:Request)=>{
    let response;
    const {pensionAdministratorCode,pensionAdministratorDescription,pensionSystemId}=req.body;
    const query=await pool.query(`call sp_post_pensionAdministrator(?,?,?)`,
    [pensionAdministratorCode,pensionAdministratorDescription,pensionSystemId]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"pensionAdministratorCode duplicate"},
            code:403
        }
    }
    return response={
        body:{msg:"Pension administrator created"},
        code:200
    }      
}
export const updateDataPensionAdministrator=async(req:Request)=>{
    let response;
    const {pensionAdministratorId}=req.params
    const {pensionAdministratorCode,pensionAdministratorDescription,pensionSystemId}=req.body
    const query=await pool.query(`call sp_put_pensionAdministrator(?,?,?,?)`,
    [pensionAdministratorCode,pensionAdministratorDescription,pensionSystemId,pensionAdministratorId])
    const consultaParse = JSON.parse(JSON.stringify(query[0]));
    return response={
        body:{msg:"pension administrator updated"},
        code:200
    }   

    // if (consultaParse.changedRows==1){    
    //     return response={
    //         body:{msg:"pension administrator updated"},
    //         code:200
    //     }                  
    // }else{     
    //     return response={
    //         body:{errorNo:404,errorMessage:"pension administrator has already been updated"},
    //         code:404
    //     }         
    // }  
}
export const getDataPensionAdministrator= async(req:Request)=>{
    let response;
    const {page,size,pensionAdministratorId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_pensionAdministrator`);
    const total = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;
    if(page && size){
        const _page=(parseInt(page as string));
        const _size=(parseInt(size as string));        
        const _pageCalc=(_page-1)*_size; 
        const query=await pool.query(`call sp_get_pensionAdministrator(?,?,null)`,[_pageCalc,_size]);        
        const queryParse:JSON = (JSON.parse(JSON.stringify(query[0])))[0]; 
        const data:IpensionAdministrator=  jsonToPensionAdministrator(queryParse)       
        return response={
            body:{total,data},
            code:200
        } 
    }else if (pensionAdministratorId){
        const query=await pool.query(`call sp_get_pensionAdministrator(null,null,?)`,[pensionAdministratorId])          
        const queryParse:JSON = (JSON.parse(JSON.stringify(query[0])))[0];
        const data:IpensionAdministrator=  jsonToPensionAdministrator(queryParse)    
        return response={
            body:{total,data},
            code:200
            } ;
    }else {        
        const query=await pool.query(`call sp_get_pensionAdministrator(null,null,null)`)       
        const queryParse:JSON = (JSON.parse(JSON.stringify(query[0])))[0];
        const data:IpensionAdministrator=  jsonToPensionAdministrator(queryParse)            
        return response={            
            body:{total,data},
            code:200
        } ;
    }
}
/**typeEmployee */
export const createTypeEmployee=async (req:Request)=>{
    let response;
    const {typeEmployeeDescription}=req.body;
    const query=await pool.query(`call sp_post_typeEmployee(?)`,[typeEmployeeDescription]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"typeEmployeeDescription duplicate"},
            code:403
        }
    }
    return response={
        body:{msg:"type of employee created"},
        code:200
    }  
}
export const updateDataTypeEmployee= async(req:Request)=>{
    let response;
    const {typeEmployeeId}=req.params
    const {typeEmployeeDescription}=req.body 
    await pool.query(`call sp_put_typeEmployee(?,?)`,[typeEmployeeDescription,typeEmployeeId])
    
    return response={
        body:{msg:"type employee updated"},
        code:200
    }
}
export const getDataTypeEmployee=async(req:Request)=>{
    let response;
    const {page,size,typeEmployeeId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_typeEmployee`);
    const total = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;
    if(page && size){
        const _page=(parseInt(page as string));
        const _size=(parseInt(size as string));        
        const _pageCalc=(_page-1)*_size; 
        const queryPagination=await pool.query(`call sp_get_typeEmployee(?,?,null)`,[_pageCalc,_size]);        
        const data = (JSON.parse(JSON.stringify(queryPagination[0])))[0];         
        return response={
            body:{total,data},
            code:200
        } 
    }else if (typeEmployeeId){
        const query=await pool.query(`call sp_get_typeEmployee(null,null,?)`,[typeEmployeeId])          
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
            } ;
        
    }else {        
        const queryData=await pool.query(`call sp_get_typeEmployee(null,null,null)`)       
        const data = (JSON.parse(JSON.stringify(queryData[0]))[0]);              
        return response={            
            body:{total,data},
            code:200
        } ;
    }
}
/**condition*/
export const addCondition=async(req:Request)=>{
    let response;
    const {conditionCode,conditionName,conditionDescription}=req.body;
    const query=await pool.query(`call sp_post_condition(?,?,?)`,[conditionCode,conditionName,conditionDescription]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"conditionCode duplicate"},
            code:403
        }
    }
    return response={
        body:{msg:"condition created"},
        code:200
    }  
}
export const updateCondition=async(req:Request)=>{
    let response;
    const {conditionId}=req.params
    const {conditionCode,conditionName,conditionDescription}=req.body; 
    await pool.query(`call sp_put_condition(?,?,?,?)`,[conditionCode,conditionName,conditionDescription,conditionId])    
    return response={
        body:{msg:"condition updated"},
        code:200
    }
}
export const getDataCondition=async(req:Request)=>{
    let response;
    const {page,size,conditionId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_condition`);
    const total = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;
    if(page && size){
        const _page=(parseInt(page as string));
        const _size=(parseInt(size as string));        
        const _pageCalc=(_page-1)*_size; 
        const query=await pool.query(`call sp_get_condition(?,?,null)`,[_pageCalc,_size]);        
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
        } 
    }else if (conditionId){
        const query=await pool.query(`call sp_get_condition(null,null,?)`,[conditionId])          
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
            } ;        
    }else {        
        const query=await pool.query(`call sp_get_condition(null,null,null)`)       
        const data = (JSON.parse(JSON.stringify(query[0]))[0]);              
        return response={            
            body:{total,data},
            code:200
        } ;
    }
}
/**labor regime */
export const addLaborRegime =async(req:Request)=>{
    let response;
    const {laborRegimeCode,laborRegimeName,laborRegimeDescription}=req.body;
    const query=await pool.query(`call sp_post_laborRegime(?,?,?)`,[laborRegimeCode,laborRegimeName,laborRegimeDescription]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"laborRegimeCode duplicate"},
            code:403
        }
    }
    return response={
        body:{msg:"labor regime created"},
        code:200
    }  
}
export const updateLaborRegime=async(req:Request)=>{
    let response;
    const {laborRegimeId}=req.params
    const {laborRegimeCode,laborRegimeName,laborRegimeDescription}=req.body; 
    await pool.query(`call sp_put_laborRegime(?,?,?,?)`,[laborRegimeCode,laborRegimeName,laborRegimeDescription,laborRegimeId])    
    return response={
        body:{msg:"Labor regime updated"},
        code:200
    }
}
export const getDataLaborRegime=async(req:Request)=>{
    let response;
    const {page,size,laborRegimeId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_laborRegime`);
    const total = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;
    if(page && size){
        const _page=(parseInt(page as string));
        const _size=(parseInt(size as string));        
        const _pageCalc=(_page-1)*_size; 
        const query=await pool.query(`call sp_get_laborRegime(?,?,null)`,[_pageCalc,_size]);        
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
        } 
    }else if (laborRegimeId){
        const query=await pool.query(`call sp_get_laborRegime(null,null,?)`,[laborRegimeId])          
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
            } ;        
    }else {        
        const query=await pool.query(`call sp_get_laborRegime(null,null,null)`)       
        const data = (JSON.parse(JSON.stringify(query[0]))[0]);              
        return response={            
            body:{total,data},
            code:200
        } ;
    }
}
/**occupational group */
export const addOccupationalGroup=async(req:Request)=>{
    let response;
    const {occupationalGroupCode,occupationalGroupName,occupationalGroupDescription}=req.body;
    const query=await pool.query(`call sp_post_occupationalGroup(?,?,?)`,[occupationalGroupCode,occupationalGroupName,occupationalGroupDescription]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"occupationalGroupCode duplicate"},
            code:403
        }
    }
    return response={
        body:{msg:"occupational Group created"},
        code:200
    }  
}
export const updateOccupationalGroup=async(req:Request)=>{
    let response;
    const {occupationalGroupId}=req.params
    const {occupationalGroupCode,occupationalGroupName,occupationalGroupDescription}=req.body; 
    await pool.query(`call sp_put_occupationalGroup(?,?,?,?)`,
    [occupationalGroupCode,occupationalGroupName,occupationalGroupDescription,occupationalGroupId])    
    return response={
        body:{msg:"occupational group updated"},
        code:200
    }
}
export const getDataOccupationalGroup=async(req:Request)=>{
    let response;
    const {page,size,occupationalGroupId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_occupationalGroup`);
    const total = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;
    if(page && size){
        const _page=(parseInt(page as string));
        const _size=(parseInt(size as string));        
        const _pageCalc=(_page-1)*_size; 
        const query=await pool.query(`call sp_get_occupationalGroup(?,?,null)`,[_pageCalc,_size]);        
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
        } 
    }else if (occupationalGroupId){
        const query=await pool.query(`call sp_get_occupationalGroup(null,null,?)`,[occupationalGroupId])          
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
            } ;        
    }else {        
        const query=await pool.query(`call sp_get_occupationalGroup(null,null,null)`)       
        const data = (JSON.parse(JSON.stringify(query[0]))[0]);              
        return response={            
            body:{total,data},
            code:200
        } ;
    }
}
/**establishment */
export const addEstablishment=async(req:Request)=>{
    let response;
    const {establishmentCode,establishmentName,establishmentDescription}=req.body;
    const query=await pool.query(`call sp_post_establishment(?,?,?)`,[establishmentCode,establishmentName,establishmentDescription]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"establishmentCode duplicate"},
            code:403
        }
    }
    return response={
        body:{msg:"establishment created"},
        code:200
    }  
}
export const updateEstablishment=async(req:Request)=>{
    let response;
    const {establishmentId}=req.params
    const {establishmentCode,establishmentName,establishmentDescription}=req.body; 
    await pool.query(`call sp_put_establishment(?,?,?,?)`,
    [establishmentCode,establishmentName,establishmentDescription,establishmentId])    
    return response={
        body:{msg:"Establishment updated"},
        code:200
    }
}
export const getDataEstablishment=async(req:Request)=>{
    let response;
    const {page,size,establishmentId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_establishment`);
    const total = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;
    if(page && size){
        const _page=(parseInt(page as string));
        const _size=(parseInt(size as string));        
        const _pageCalc=(_page-1)*_size; 
        const query=await pool.query(`call sp_get_establishment(?,?,null)`,[_pageCalc,_size]);        
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
        } 
    }else if (establishmentId){
        const query=await pool.query(`call sp_get_establishment(null,null,?)`,[establishmentId])          
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
            } ;        
    }else {        
        const query=await pool.query(`call sp_get_establishment(null,null,null)`)       
        const data = (JSON.parse(JSON.stringify(query[0]))[0]);              
        return response={            
            body:{total,data},
            code:200
        } ;
    }
}
/**position */
export const addPosition=async(req:Request)=>{
    let response;
    const {positionCode,positionName,positionDescription}=req.body;
    const query=await pool.query(`call sp_post_position(?,?,?)`,[positionCode,positionName,positionDescription]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"positionCode duplicate"},
            code:403
        }
    }
    return response={
        body:{msg:"position created"},
        code:200
    }  
}
export const updatePosition=async(req:Request)=>{
    let response;
    const {positionId}=req.params
    const {positionCode,positionName,positionDescription}=req.body; 
    await pool.query(`call sp_put_position(?,?,?,?)`,
    [positionCode,positionName,positionDescription,positionId])    
    return response={
        body:{msg:"Position updated"},
        code:200
    }
}
export const getDataPosition=async(req:Request)=>{
    let response;
    const {page,size,positionId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_position`);
    const total = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;
    if(page && size){
        const _page=(parseInt(page as string));
        const _size=(parseInt(size as string));        
        const _pageCalc=(_page-1)*_size; 
        const query=await pool.query(`call sp_get_position(?,?,null)`,[_pageCalc,_size]);        
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
        } 
    }else if (positionId){
        const query=await pool.query(`call sp_get_position(null,null,?)`,[positionId])          
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
            } ;        
    }else {        
        const query=await pool.query(`call sp_get_position(null,null,null)`)       
        const data = (JSON.parse(JSON.stringify(query[0]))[0]);              
        return response={            
            body:{total,data},
            code:200
        } ;
    }
}

/**workday */
export const addWorkday=async(req:Request)=>{
    let response;
    const {workdayHoursDay,workdayDaysWeek,workdayDescription}=req.body;
    const query=await pool.query(`call sp_post_workday(?,?,?)`,[workdayHoursDay,workdayDaysWeek,workdayDescription]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"workday Description duplicate"},
            code:403
        }
    }
    return response={
        body:{msg:"workDay created"},
        code:200
    } 
}
export const updateWorkday=async(req:Request)=>{
    let response;
    const {workdayId}=req.params
    const {workdayHoursDay,workdayDaysWeek,workdayDescription}=req.body; 
    await pool.query(`call sp_put_workday(?,?,?,?)`,
    [parseInt(workdayHoursDay),parseInt(workdayDaysWeek),workdayDescription,workdayId])    
    return response={
        body:{msg:"workday updated"},
        code:200
    }
}
export const getDataWorkday=async(req:Request)=>{
    let response;
    const {page,size,workdayId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_workday`);
    const total = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;
    if(page && size){
        const _page=(parseInt(page as string));
        const _size=(parseInt(size as string));        
        const _pageCalc=(_page-1)*_size; 
        const query=await pool.query(`call sp_get_workday(?,?,null)`,[_pageCalc,_size]);        
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
        } 
    }else if (workdayId){
        const query=await pool.query(`call sp_get_workday(null,null,?)`,[workdayId])          
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
            } ;        
    }else {        
        const query=await pool.query(`call sp_get_workday(null,null,null)`)       
        const data = (JSON.parse(JSON.stringify(query[0]))[0]);              
        return response={            
            body:{total,data},
            code:200
        } ;
    }
}
/**organic Unit */
export const addOrganicUnit=async(req:Request)=>{
    let response;
    const {organicUnitCode,organicUnitDescription}=req.body;
    const query=await pool.query(`call sp_post_organicUnit(?,?)`,[organicUnitCode,organicUnitDescription]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"OrganicUnitCode duplicate"},
            code:403
        }
    }
    return response={
        body:{msg:"Organic Unit created"},
        code:200
    } 
}
export const updateOrganicUnit=async(req:Request)=>{
    let response;
    const {organicUnitId}=req.params
    const {organicUnitCode,organicUnitDescription}=req.body; 
    await pool.query(`call sp_put_organicUnit(?,?,?)`,
    [organicUnitCode,organicUnitDescription,organicUnitId])    
    return response={
        body:{msg:"organic Unit updated"},
        code:200
    }
}
export const getDataOrganicUnit=async(req:Request)=>{
    let response;
    const {page,size,organicUnitId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_organicUnit`);
    const total = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;
    if(page && size){
        const _page=(parseInt(page as string));
        const _size=(parseInt(size as string));        
        const _pageCalc=(_page-1)*_size; 
        const query=await pool.query(`call sp_get_organicUnit(?,?,null)`,[_pageCalc,_size]);        
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
        } 
    }else if (organicUnitId){
        const query=await pool.query(`call sp_get_organicUnit(null,null,?)`,[organicUnitId])          
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
            } ;        
    }else {        
        const query=await pool.query(`call sp_get_organicUnit(null,null,null)`)       
        const data = (JSON.parse(JSON.stringify(query[0]))[0]);              
        return response={            
            body:{total,data},
            code:200
        } ;
    }
}