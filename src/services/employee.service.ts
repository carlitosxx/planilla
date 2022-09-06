import {Request, response} from 'express';
import {pool} from '../database';

export const createEmployee=async(req:Request)=>{
    let response;
    const {employeeDni,employeeFullname,categorySalaryId}=req.body;
    const query = await pool.query(`
        INSERT INTO
        tbl_employee(            
            employeeDni, 
            employeeFullname,
            categorySalaryId,
            employeeStatus)
        values(?,?,?,?)
        `,[employeeDni,employeeFullname,categorySalaryId,1])
        response={
            body:{msg:"employee created"},
            code:200
        }
        return response;
}
export const updateDataEmployee=async(req:Request)=>{
    let response;
    const {employeeId}=req.params
    const {employeeDni,employeeFullname,employeeStatus,categorySalaryId}=req.body;
    const query=await pool.query(`
    UPDATE tbl_employee 
    SET
        employeeDni=?,
        employeeFullname=?,
        employeeStatus=?,
        categorySalaryId=?        
    WHERE
        employeeId=?;
    `,[employeeDni,employeeFullname,employeeStatus,categorySalaryId,employeeId])
    const consultaParse = JSON.parse(JSON.stringify(query[0]));
    if (consultaParse.changedRows==1){    
        response={
            body:{msg:"employee updated"},
            code:200
        }
        return response;          
    }else{     
        response={
            body:{errorNo:404,errorMessage:"employee has already been updated"},
            code:404
        }
        return response;  
    }       
   
}
export const getEmployeesByPageSize=async(req:Request)=>{
    let response;
    const {page,size,employeeId}=req.query
    if(page && size){
        const queryPagination=await pool.query(`
        call sp_get_employeesByPageSize(?,?)
        `,[page,size]);
        const queryCount=await pool.query(`
        select count(*) as count from tbl_employee
        `);
        const paginationParse = JSON.parse(JSON.stringify(queryPagination[0])); 
        const countEmployee = JSON.parse(JSON.stringify(queryCount[0]));
        return response={
            body:{countEmployee:countEmployee[0].count,employees:paginationParse[0]},
            code:200
        } 
    }else if (employeeId){
        const queryEmployee=await pool.query(`
        SELECT 
            A.employeeId,
            A.employeeDni,
            A.employeeFullname,
            A.employeeStatus,
            B.categorySalaryId,
            B.categorySalarySalary,
            B.categorySalaryYear,
            C.employeeCategoryId,
            C.employeeCategoryDescription,
            C.employeeCategoryShortDescription
        FROM 
            tbl_employee A inner join tbl_category_salary B 
        on 
            A.categorySalaryId=B.categorySalaryId
        inner join tbl_employee_category C
        on 
            C.employeeCategoryId=B.employeeCategoryId
        where A.employeeId=?
        `,[employeeId])     
        const queryEmployeesParse = JSON.parse(JSON.stringify(queryEmployee[0]));       
        if (queryEmployeesParse[0]){
        return response={
            body:{countEmployees:1,employees:[queryEmployeesParse[0]]},
            code:200
            } ;
        } else{
        return response={
            body:{countEmployees:0,employees:[]},
            code:200
            } ;
        } 
        
    }
    else {        
        const queryEmployee=await pool.query(`
        SELECT 
            A.employeeId,
            A.employeeDni,
            A.employeeFullname,
            A.employeeStatus,
            B.categorySalaryId,
            B.categorySalarySalary,
            B.categorySalaryYear,
            C.employeeCategoryId,
            C.employeeCategoryDescription,
            C.employeeCategoryShortDescription
        FROM 
            tbl_employee A inner join tbl_category_salary B 
        on 
            A.categorySalaryId=B.categorySalaryId
        inner join tbl_employee_category C
        on 
            C.employeeCategoryId=B.employeeCategoryId       
        order by A.employeeFullname 
        `)
        const queryCount= await pool.query(`
        select count(*) as count from tbl_employee
        `)
        const queryEmployeesParse = JSON.parse(JSON.stringify(queryEmployee[0]));
        const countEmployees = JSON.parse(JSON.stringify(queryCount[0]));         
        return response={            
            body:{countEmployees:countEmployees[0].count,categories:[...queryEmployeesParse]},
            code:200
        } ;
    }
}
export const createCategory=async(req:Request)=>{
    let response;
    const {employeeCategoryDescription,employeeCategoryShortDescription}=req.body;
    const query= await pool.query(`
        INSERT INTO
        tbl_employee_category(            
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
    UPDATE tbl_employee_category 
    SET
        employeeCategoryDescription=?,
        employeeCategoryShortDescription=?,              
    WHERE
        categoryId=?;
    `,[employeeCategoryDescription,employeeCategoryShortDescription,categoryId])
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
    if(page && size){
        const queryPagination=await pool.query(`
            call sp_get_categoryByPageSize(?,?)
        `,[page,size]);
        const queryCount=await pool.query(`
        select count(*) as count from tbl_employee_category
        `);
        const paginationParse = JSON.parse(JSON.stringify(queryPagination[0])); 
        const countCategories = JSON.parse(JSON.stringify(queryCount[0]));
        return response={
            body:{countCategories:countCategories[0].count,categories:paginationParse[0]},
            code:200
        } 
    }else if (employeeCategoryId){
        const queryCategories=await pool.query(`
        select * from tbl_employee_category where employeeCategoryId=?
        `,[employeeCategoryId])     
        const queryCategoriesParse = JSON.parse(JSON.stringify(queryCategories[0]));
       console.log(queryCategoriesParse[0])
       if (queryCategoriesParse[0]){
        return response={
            body:{countCategories:1,categories:[queryCategoriesParse[0]]},
            code:200
        } ;
       } else{
        return response={
            body:{countCategories:0,categories:[]},
            code:200
        } ;
       } 
        
    }
    else {
        console.log('paso por aqui sin parametros')
        const queryCategories=await pool.query(`
        select * from tbl_employee_category
        `)
        const queryCount= await pool.query(`
        select count(*) as count from tbl_employee_category
        `)
        const queryCategoriesParse = JSON.parse(JSON.stringify(queryCategories[0]));
        const countCategories = JSON.parse(JSON.stringify(queryCount[0])); 
        console.log(queryCategoriesParse)
        console.log(countCategories)
        return response={
            // body:[...queryCategoriesParse],
            body:{countCategories:countCategories[0].count,categories:[...queryCategoriesParse]},
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
    UPDATE tbl_category_salary 
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
    if(page && size){
        const queryPagination=await pool.query(`
        call sp_get_salaryByPageSize(?,?)
        `,[page,size]);
        const queryCount=await pool.query(`
        select count(*) as count from tbl_category_salary
        `);
        const paginationParse = JSON.parse(JSON.stringify(queryPagination[0])); 
        const countCategories = JSON.parse(JSON.stringify(queryCount[0]));
        return response={
            body:{countSalaries:countCategories[0].count,salaries:paginationParse[0]},
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
	        tbl_category_salary A inner join tbl_employee_category B 
        on 
            A.employeeCategoryId=B.employeeCategoryId 
        where 
            A.categorySalaryId=?
        `,[categorySalaryId])     
        const querySalariesParse = JSON.parse(JSON.stringify(querySalaries[0]));       
        if (querySalariesParse[0]){
        return response={
            body:{countSalaries:1,salaries:[querySalariesParse[0]]},
            code:200
            } ;
        } else{
        return response={
            body:{countSalaries:0,salaries:[]},
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
	        tbl_category_salary A inner join tbl_employee_category B 
        on 
            A.employeeCategoryId=B.employeeCategoryId 
        `)
        const queryCount= await pool.query(`
        select count(*) as count from tbl_category_salary
        `)
        const querySalariesParse = JSON.parse(JSON.stringify(querySalaries[0]));
        const countSalaries = JSON.parse(JSON.stringify(queryCount[0]));         
        return response={            
            body:{countCategories:countSalaries[0].count,categories:[...querySalariesParse]},
            code:200
        } ;
    }
}