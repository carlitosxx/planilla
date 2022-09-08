import {Request } from 'express';
import {pool} from '../database';
import { jsonToEmployee, Iemployee, IemployeeCategory, IcategorySalary, jsonToCategorySalary, IpensionAdministrator, jsonToPensionAdministrator } from '../models/raw/user.model';
/**Employee */
export const createEmployee=async(req:Request)=>{
    let response;
    const {employeeDni,employeeFullname,categorySalaryId,pensionAdministratorId,typeEmployeeId}=req.body;
    const query = await pool.query(`call sp_post_employee(?,?,?,?,?,?)`,
    [employeeDni,employeeFullname,1,categorySalaryId,pensionAdministratorId,typeEmployeeId])
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
    const {employeeDni,employeeFullname,employeeStatus,categorySalaryId,pensionAdministratorId,typeEmployeeId}=req.body; 
    await pool.query(`
    call sp_put_employee(?,?,?,?,?,?,?)
    `,[employeeDni,employeeFullname,employeeStatus,categorySalaryId,pensionAdministratorId,typeEmployeeId,_employeeId]) 
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
    const query= await pool.query(`
       call sp_post_employeeCategory(?,?)
    `,[employeeCategoryDescription,employeeCategoryShortDescription]);
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
    if (consultaParse.changedRows==1){    
        return response={
            body:{msg:"pension administrator updated"},
            code:200
        }                  
    }else{     
        return response={
            body:{errorNo:404,errorMessage:"pension administrator has already been updated"},
            code:404
        }         
    }  
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
    console.log(typeEmployeeId);
    console.log(typeEmployeeDescription)
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
