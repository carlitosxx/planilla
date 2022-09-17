import {Request } from 'express';
import {pool} from '../database';
export const addBudgetGoal=async(req:Request)=>{
    let response;
    const {budgetGoalDescription}=req.body;
    const query=await pool.query(`call sp_post_budgetGoal(?)`,[budgetGoalDescription]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"Budget goal description duplicate"},
            code:403
        }
    }
    return response={
        body:{msg:"budget goal created"},
        code:200
    } 
}
export const updateBudgetGoal=async(req:Request)=>{
    let response;
    const {budgetGoalId}=req.params
    const {budgetGoalDescription}=req.body; 
    await pool.query(`call sp_put_budgetGoal(?,?)`,
    [budgetGoalDescription,budgetGoalId])    
    return response={
        body:{msg:"budget goal updated"},
        code:200
    }
}

export const getDataBudgetGoal=async(req:Request)=>{
    let response;
    const {page,size,budgetGoalId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_budgetGoal`);
    const total = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;
    if(page && size){
        const _page=(parseInt(page as string));
        const _size=(parseInt(size as string));        
        const _pageCalc=(_page-1)*_size; 
        const query=await pool.query(`call sp_get_budgetGoal(?,?,null)`,[_pageCalc,_size]);        
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
        } 
    }else if (budgetGoalId){
        const query=await pool.query(`call sp_get_budgetGoal(null,null,?)`,[budgetGoalId])          
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
            } ;        
    }else {        
        const query=await pool.query(`call sp_get_budgetGoal(null,null,null)`)       
        const data = (JSON.parse(JSON.stringify(query[0]))[0]);              
        return response={            
            body:{total,data},
            code:200
        } ;
    }
}