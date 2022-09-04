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
    let {page,size}=req.query;
    page=page as string;
    if(parseInt(page)<1){
        return response={
            body:{errorNo:400,errorMessage:"page must be greater than 0"},
            code:400
        } 
    }
    const queryPagination=await pool.query(`
    call planilla.sp_get_emplyeesByPageSize(?, ?);
    `,[page,size]);
    const queryCount=await pool.query(`
    select count(*) as count from tbl_employee
    `)
    const paginationParse = JSON.parse(JSON.stringify(queryPagination[0])); 
    const countEmployees = JSON.parse(JSON.stringify(queryCount[0]));     
    return response={
        body:{countEmployees:countEmployees[0].count,employees:paginationParse[0]},
        code:200
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