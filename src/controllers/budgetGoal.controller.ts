import {Request,Response} from 'express';
import {handleHttp} from "../utils/error.handle";
import * as serviceBudgetGoal from "../services/budgetGoal.service";

export const postBudgetGoal=async(req:Request,res:Response)=>{
    try {
        const response=await serviceBudgetGoal.addBudgetGoal(req);
        return res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_POST_postBudgetGoal",error);
    }
}
export const putBudgetGoal=async(req:Request,res:Response)=>{
    try {
        const response=await serviceBudgetGoal.updateBudgetGoal(req);
        return res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_PUT_putBudgetGoal",error);
    }
}
export const getBudgetGoal=async(req:Request,res:Response)=>{
    try {
        const response=await serviceBudgetGoal.getDataBudgetGoal(req);
        return res.status(response.code).json(response.body);
    } catch (error) {
        handleHttp(res,"ERROR_GET_getBudgetGoal",error);
    }
}
