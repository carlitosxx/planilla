import {Request } from 'express';
import {pool} from '../database';

export const addFinancing=async(req:Request)=>{
    let response;
    const {financingDescription}=req.body;
    const query=await pool.query(`call sp_post_financing(?)`,[financingDescription]);    
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
       return response={
            body:{errorNo:1062,errorMessage:"financing Description duplicate"},
            code:403
        }
    }
    return response={
        body:{msg:"financing created"},
        code:200
    } 
}
export const updateFinancing=async(req:Request)=>{
    let response;
    const {financingId}=req.params
    const {financingDescription}=req.body; 
    await pool.query(`call sp_put_financing(?,?)`,
    [financingDescription,financingId])    
    return response={
        body:{msg:"financing updated"},
        code:200
    }
}
export const getDataFinancing=async(req:Request)=>{
    let response;
    const {page,size,financingId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_financing`);
    const total = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;
    if(page && size){
        const _page=(parseInt(page as string));
        const _size=(parseInt(size as string));        
        const _pageCalc=(_page-1)*_size; 
        const query=await pool.query(`call sp_get_financing(?,?,null)`,[_pageCalc,_size]);        
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
        } 
    }else if (financingId){
        const query=await pool.query(`call sp_get_financing(null,null,?)`,[financingId])          
        const data = (JSON.parse(JSON.stringify(query[0])))[0];         
        return response={
            body:{total,data},
            code:200
            } ;        
    }else {        
        const query=await pool.query(`call sp_get_financing(null,null,null)`)       
        const data = (JSON.parse(JSON.stringify(query[0]))[0]);              
        return response={            
            body:{total,data},
            code:200
        } ;
    }
}