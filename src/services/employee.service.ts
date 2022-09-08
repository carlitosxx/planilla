import {Request } from 'express';
import {pool} from '../database';
import { jsonToEmployee, Iemployee } from '../models/raw/user.model';

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
export const createCategory=async(req:Request)=>{
    let response;
    const {employeeCategoryDescription,employeeCategoryShortDescription}=req.body;
    const query= await pool.query(`
        INSERT INTO
        tbl_employeeCategory(            
            employeeCategoryDescription,
            employeeCategoryShortDescription)
        VALUES(?,?)
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
    const query=await pool.query(`
    UPDATE tbl_employeeCategory 
    SET
        employeeCategoryDescription=?,
        employeeCategoryShortDescription=?              
    WHERE
        employeeCategoryId=?;
    `,[employeeCategoryDescription,employeeCategoryShortDescription,parseInt(categoryId)])
    const consultaParse = JSON.parse(JSON.stringify(query[0]));
    if (consultaParse.changedRows==1){    
        response={
            body:{msg:"category updated"},
            code:200
        }
        return response;          
    }else{     
        response={
            body:{errorNo:404,errorMessage:"category has already been updated"},
            code:404
        }
        return response;  
    }       
}
export const getDataCategory=async(req:Request)=>{
    let response;
    const {page,size,employeeCategoryId}=req.query
    const queryCount=await pool.query(`
        select count(*) as count from tbl_employeeCategory
        `);
    const total = JSON.parse(JSON.stringify(queryCount[0]));
    if(page && size){
        const queryPagination=await pool.query(`
            call sp_get_categoryByPageSize(?,?)
        `,[page,size]);
        
        const paginationParse = JSON.parse(JSON.stringify(queryPagination[0])); 
       
        return response={
            body:{total:total[0].count,data:paginationParse[0]},
            code:200
        } 
    }else if (employeeCategoryId){
        const queryCategories=await pool.query(`
        select * from tbl_employeeCategory where employeeCategoryId=?
        `,[employeeCategoryId])     
        const queryCategoriesParse = JSON.parse(JSON.stringify(queryCategories[0]));       
       if (queryCategoriesParse[0]){
        return response={
            body:{total:total[0].count,data:[queryCategoriesParse[0]]},
            code:200
            };
       } else{
        return response={
            body:{total:total[0].count,data:[]},
            code:200
        } ;
       } 
        
    }
    else {        
        const queryCategories=await pool.query(`
        select * from tbl_employeeCategory
        `)        
        const queryCategoriesParse = JSON.parse(JSON.stringify(queryCategories[0])); 
        return response={
            
            body:{total:total[0].count,data:[...queryCategoriesParse]},
            code:200
        } ;
    }
    
}
export const createCategorySalary=async(req:Request)=>{
    let response;
    const {categorySalarySalary,categorySalaryYear,employeeCategoryId}=req.body;
    const query=await pool.query(`
    call planilla.sp_insert_categorySalary(?, ?, ?);
    `,[categorySalaryYear,employeeCategoryId,categorySalarySalary]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"categorySalaryYear and employeeCategoryId duplicate"},
            code:403
        }
    }
    response={
        body:{msg:"salary created"},
        code:200
    }  
    return response;
}
export const updateDataCategorySalary=async(req:Request)=>{
    let response;
    const {categorySalaryId}=req.params
    const {categorySalarySalary,categorySalaryYear,employeeCategoryId}=req.body
    const query=await pool.query(`
    UPDATE tbl_categorySalary 
    SET
    categorySalarySalary=?,
    categorySalaryYear=?,
    employeeCategoryId=?              
    WHERE
    categorySalaryId=?;
    `,[categorySalarySalary,categorySalaryYear,employeeCategoryId,categorySalaryId])
    const consultaParse = JSON.parse(JSON.stringify(query[0]));
    if (consultaParse.changedRows==1){    
        response={
            body:{msg:"salary updated"},
            code:200
        }
        return response;          
    }else{     
        response={
            body:{errorNo:404,errorMessage:"salary has already been updated"},
            code:404
        }
        return response;  
    }  
}
export const getDataCategorySalary=async(req:Request)=>{
    let response;
    const {page,size,categorySalaryId}=req.query
    const queryCount=await pool.query(`
    select count(*) as count from tbl_categorySalary
    `);
    const total = JSON.parse(JSON.stringify(queryCount[0]));
    if(page && size){
        const queryPagination=await pool.query(`
        call sp_get_salaryByPageSize(?,?)
        `,[page,size]);        
        const data = JSON.parse(JSON.stringify(queryPagination[0])); 
        
        return response={
            body:{total:total[0].count,data:data[0]},
            code:200
        } 
    }else if (categorySalaryId){
        const querySalaries=await pool.query(`
        SELECT 
            A.categorySalaryId,
            A.categorySalarySalary,
            A.categorySalaryYear,
            B.employeeCategoryId,
            B.employeeCategoryDescription,
            B.employeeCategoryShortDescription	 
        FROM 
	        tbl_categorySalary A inner join tbl_employeeCategory B 
        on 
            A.employeeCategoryId=B.employeeCategoryId 
        where 
            A.categorySalaryId=?
        `,[categorySalaryId])     
        const querySalariesParse = JSON.parse(JSON.stringify(querySalaries[0]));       
        if (querySalariesParse[0]){
        return response={
            body:{total:1,data:[querySalariesParse[0]]},
            code:200
            } ;
        } else{
        return response={
            body:{total:0,data:[]},
            code:200
            } ;
        } 
        
    }
    else {        
        const querySalaries=await pool.query(`
        SELECT 
            A.categorySalaryId,
            A.categorySalarySalary,
            A.categorySalaryYear,
            B.employeeCategoryId,
            B.employeeCategoryDescription,
            B.employeeCategoryShortDescription	 
        FROM 
	        tbl_categorySalary A inner join tbl_employeeCategory B 
        on 
            A.employeeCategoryId=B.employeeCategoryId 
        `)       
        const querySalariesParse = JSON.parse(JSON.stringify(querySalaries[0]));
               
        return response={            
            body:{total:total[0].count,data:[...querySalariesParse]},
            code:200
        } ;
    }
}
export const createPensionSystem=async(req:Request)=>{
    let response;
    const {pensionSystemCode,pensionSystemDescription}=req.body;
    const query=await pool.query(`
    INSERT INTO tbl_pensionSystem( 
        pensionSystemCode,
        pensionSystemDescription)
    SELECT 
        ?,
        ?        
    WHERE NOT EXISTS (	SELECT * 
                        FROM tbl_pensionSystem 
                        WHERE 
                            pensionSystemCode=? 
                        LIMIT 1);
    `,[pensionSystemCode,pensionSystemDescription,pensionSystemCode]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"pensionSystemCode duplicate"},
            code:403
        }
    }
    response={
        body:{msg:"system pension created"},
        code:200
    }  
    return response;
}
export const updateDataPensionSystem=async(req:Request)=>{
    let response;
    const {pensionSystemId}=req.params
    const {pensionSystemCode,pensionSystemDescription}=req.body
    const query=await pool.query(`
    UPDATE tbl_pensionSystem
    SET
    pensionSystemCode=?,
    pensionSystemDescription=?              
    WHERE
    pensionSystemId=?;
    `,[pensionSystemCode,pensionSystemDescription,pensionSystemId])
    const consultaParse = JSON.parse(JSON.stringify(query[0]));
    if (consultaParse.changedRows==1){    
        response={
            body:{msg:"pension system updated"},
            code:200
        }
        return response;          
    }else{     
        response={
            body:{errorNo:404,errorMessage:"pension system has already been updated"},
            code:404
        }
        return response;  
    }  
}
export const getDataPensionSystem=async(req:Request)=>{
    let response;
    const {page,size,pensionSystemId}=req.query
    if(page && size){
        const _page=(parseInt(page as string));
        const _size=(parseInt(size as string));        
        const _pageCalc=(_page-1)*_size; 
        const queryPagination=await pool.query(`
        SELECT * FROM tbl_pensionSystem order by pensionSystemCode limit ?,?
        `,[_pageCalc,_size]);
        const queryCount=await pool.query(`
        select count(*) as count from tbl_pensionSystem
        `);
        const data = JSON.parse(JSON.stringify(queryPagination[0])); 
        const total = JSON.parse(JSON.stringify(queryCount[0]));
        return response={
            body:{total:total[0].count,data:[...data]},
            code:200
        } 
    }else if (pensionSystemId){
        const query=await pool.query(`
        SELECT 
        *
        FROM 
            tbl_pensionSystem
        where 
        pensionSystemId=?
        `,[pensionSystemId])     
        const data = JSON.parse(JSON.stringify(query[0]));       
        if (data[0]){
        return response={
            body:{total:1,data:[data[0]]},
            code:200
            } ;
        } else{
        return response={
            body:{total:0,data:[]},
            code:200
            } ;
        } 
    }else {        
        const queryData=await pool.query(`
        SELECT 
           *
        FROM 
	        tbl_pensionSystem         
        `)
        const queryCount= await pool.query(`
        select count(*) as count from tbl_pensionSystem
        `)
        const data = JSON.parse(JSON.stringify(queryData[0]));
        const total = JSON.parse(JSON.stringify(queryCount[0]));         
        return response={            
            body:{total:total[0].count,data:[...data]},
            code:200
        } ;
    }
    
}
export const createPensionAdministrator=async(req:Request)=>{
    let response;
    const {pensionAdministratorCode,pensionAdministratorDescription,pensionSystemId}=req.body;
    const query=await pool.query(`
    INSERT INTO tbl_pensionAdministrator( 
        pensionAdministratorCode,
        pensionAdministratorDescription,
        pensionSystemId)
    SELECT 
        ?,
        ?,
        ?        
    WHERE NOT EXISTS (	SELECT * 
                        FROM tbl_pensionAdministrator
                        WHERE 
                            pensionAdministratorCode=? 
                        LIMIT 1);
    `,[pensionAdministratorCode,pensionAdministratorDescription,pensionSystemId,pensionAdministratorCode]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"pensionAdministratorCode duplicate"},
            code:403
        }
    }
    response={
        body:{msg:"Pension administrator created"},
        code:200
    }  
    return response;
}
export const updateDataPensionAdministrator=async(req:Request)=>{
    let response;
    const {pensionAdministratorId}=req.params
    const {pensionAdministratorCode,pensionAdministratorDescription,pensionSystemId}=req.body
    const query=await pool.query(`
    UPDATE tbl_pensionAdministrator
    SET
    pensionAdministratorCode=?,
    pensionAdministratorDescription=?,
    pensionSystemId=?

    WHERE
    pensionAdministratorId=?;
    `,[pensionAdministratorCode,pensionAdministratorDescription,pensionSystemId,pensionAdministratorId])
    const consultaParse = JSON.parse(JSON.stringify(query[0]));
    if (consultaParse.changedRows==1){    
        response={
            body:{msg:"pension administrator updated"},
            code:200
        }
        return response;          
    }else{     
        response={
            body:{errorNo:404,errorMessage:"pension administrator has already been updated"},
            code:404
        }
        return response;  
    }  
}
export const getDataPensionAdministrator= async(req:Request)=>{
    let response;
    const {page,size,pensionAdministratorId}=req.query
    const queryCount=await pool.query(`
    select count(*) as count from tbl_pensionAdministrator
    `);
    const total = JSON.parse(JSON.stringify(queryCount[0]));
    if(page && size){
        const _page=(parseInt(page as string));
        const _size=(parseInt(size as string));        
        const _pageCalc=(_page-1)*_size; 
        const queryPagination=await pool.query(`
        SELECT 
	        A.pensionAdministratorId,
            A.pensionAdministratorCode,
            A.pensionAdministratorDescription,
            B.pensionSystemId,
            B.pensionSystemCode,
            B.pensionSystemDescription
        FROM tbl_pensionAdministrator A inner join
            tbl_pensionSystem B on A.pensionSystemId=B.pensionSystemId
        order by A.pensionAdministratorCode 
        limit ?,?
        `,[_pageCalc,_size]);        
        const data = JSON.parse(JSON.stringify(queryPagination[0]));         
        return response={
            body:{total:total[0].count,data:[...data]},
            code:200
        } 
    }else if (pensionAdministratorId){
        const query=await pool.query(`
        SELECT 
	        A.pensionAdministratorId,
            A.pensionAdministratorCode,
            A.pensionAdministratorDescription,
            B.pensionSystemId,
            B.pensionSystemCode,
            B.pensionSystemDescription
        FROM tbl_pensionAdministrator A inner join
            tbl_pensionSystem B on A.pensionSystemId=B.pensionSystemId
        WHERE 
            A.pensionAdministratorId=?
        order by A.pensionAdministratorCode       
        `,[pensionAdministratorId])          
        const data = JSON.parse(JSON.stringify(query[0]));  
        if (data[0]){
        return response={
            body:{total:total[0].count,data:[data[0]]},
            code:200
            } ;
        } else{
        return response={
            body:{total:0,data:[]},
            code:200
            } ;
        } 
    }else {        
        const queryData=await pool.query(`
        SELECT 
	        A.pensionAdministratorId,
            A.pensionAdministratorCode,
            A.pensionAdministratorDescription,
            B.pensionSystemId,
            B.pensionSystemCode,
            B.pensionSystemDescription
        FROM tbl_pensionAdministrator A inner join
            tbl_pensionSystem B on A.pensionSystemId=B.pensionSystemId       
        `)       
        const data = JSON.parse(JSON.stringify(queryData[0]));              
        return response={            
            body:{total:total[0].count,data:[...data]},
            code:200
        } ;
    }
}
export const createTypeEmployee=async (req:Request)=>{
    let response;
    const {typeEmployeeCode,typeEmployeeDescription}=req.body;
    const query=await pool.query(`
    INSERT INTO tbl_typeEmployee(         
        typeEmployeeDescription)
    SELECT                 
        ?        
    WHERE NOT EXISTS (	SELECT * 
                        FROM tbl_typeEmployee
                        WHERE 
                            typeEmployeeDescription=? 
                        LIMIT 1);
    `,[typeEmployeeDescription,typeEmployeeDescription]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"typeEmployeeDescription duplicate"},
            code:403
        }
    }
    response={
        body:{msg:"type of employee created"},
        code:200
    }  
    return response;
}
export const updateDataTypeEmployee= async(req:Request)=>{
    let response;
    const {typeEmployeeId}=req.params
    const {typeEmployeeDescription}=req.body
    const query=await pool.query(`
    UPDATE 
        tbl_typeEmployee
    SET    
        typeEmployeeDescription=?,    
    WHERE
        typeEmployeeId=?;
    `,[typeEmployeeDescription,typeEmployeeId])
    const consultaParse = JSON.parse(JSON.stringify(query[0]));
    if (consultaParse.changedRows==1){    
        response={
            body:{msg:"Type of employee updated"},
            code:200
        }
        return response;          
    }else{     
        response={
            body:{errorNo:404,errorMessage:"Type of employee has already been updated"},
            code:404
        }
        return response;  
    }  
}
export const getDataTypeEmployee=async(req:Request)=>{
    let response;
    const {page,size,typeEmployeeId}=req.query
    const queryCount=await pool.query(`
    select count(*) as count from tbl_typeEmployee
    `);
    const total = JSON.parse(JSON.stringify(queryCount[0]));
    if(page && size){
        const _page=(parseInt(page as string));
        const _size=(parseInt(size as string));        
        const _pageCalc=(_page-1)*_size; 
        const queryPagination=await pool.query(`
        SELECT
            typeEmployeeId,             
            typeEmployeeDescription
        FROM 
            tbl_typeEmployee
        order by typeEmployeeDescription
        limit ?,?
        `,[_pageCalc,_size]);        
        const data = JSON.parse(JSON.stringify(queryPagination[0]));         
        return response={
            body:{total:total[0].count,data:[...data]},
            code:200
        } 
    }else if (typeEmployeeId){
        const query=await pool.query(`
        SELECT
            typeEmployeeId,             
            typeEmployeeDescription        
        FROM tbl_typeEmployee
        WHERE 
            typeEmployeeId=?
        order by typeEmployeeDescription       
        `,[typeEmployeeId])          
        const data = JSON.parse(JSON.stringify(query[0]));  
        if (data[0]){
        return response={
            body:{total:total[0].count,data:[data[0]]},
            code:200
            } ;
        } else{
        return response={
            body:{total:0,data:[]},
            code:200
            } ;
        } 
    }else {        
        const queryData=await pool.query(`
        SELECT
            typeEmployeeId,             
            typeEmployeeDescription   
        FROM 
            tbl_typeEmployee     
        `)       
        const data = JSON.parse(JSON.stringify(queryData[0]));              
        return response={            
            body:{total:total[0].count,data:[...data]},
            code:200
        } ;
    }
}
