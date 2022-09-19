import {Request } from 'express';
import {pool} from '../database';
import  * as fs from 'fs';
import {promisify} from 'util'
import path from 'path';
import {Iresponsible} from '../models/raw/responsible.model'

const unlinkAsync = promisify(fs.unlink)

export const addResponsible=async(req:Request)=>{   
    let response;
    const {
        responsibleFullname,
        responsibleDni,        
        responsibleStatus        
        }=req.body;
    const {file}=req;
    // const pathFilename="/storage/"+file?.filename;   
    const query= await pool.query(`call sp_post_responsible(?,?,?,?)`,
    [responsibleFullname,responsibleDni,responsibleStatus,file?.filename]);
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
        return response={
                body:{errorNo:1062,errorMessage:"responsibleDni duplicate"},
                code:403
            }
    }
    return response={
            body:{msg:"Responsible created"},
            code:200
    }      
}
export const updateResponsible=async(req:Request)=>{
    let response; 
    try {   
        const directory=path.join(__dirname,'..','storage' );           
        const {responsibleId}=req.params
        const { 
            responsibleFullname,
            responsibleDni,        
            responsibleStatus 
          }=req.body
            const {file}=req;      
            console.log(file?.filename)        
            const query= await pool.query(`call sp_put_responsible(?,?,?,?,?)`,
            [responsibleFullname,responsibleDni,responsibleStatus,file?.filename,responsibleId]);     
         if(!((JSON.parse(JSON.stringify(query[0])))[0])[0]){
            const pathDelete= path.join(directory,`${file?.filename}`)                  
            await unlinkAsync(pathDelete)
            return response={
            body:{msg:"responsible not found"},
            code:400
        }}
        const previousResponsibleSignature=((JSON.parse(JSON.stringify(query[0])))[0])[0].responsibleSignature;     
        const pathDelete= path.join(directory,previousResponsibleSignature)
        console.log(pathDelete)
        await unlinkAsync(pathDelete)
        return response={
            body:{msg:"responsible updated"},
            code:200
        }        
       } catch (error:any) {
        if(!error.sqlMessage){
           return response={
                body:{msg:"entity error"},
                code:400
            }
        }        
        return response={
            body:{msg:error.sqlMessage},
            code:400
        }            
       }
}
export const getDataResponsibleById=async(req:Request)=>{
    let response;
    const {responsibleId}=req.params   
    const queryCount=await pool.query(`select count(*) as count from tbl_responsible`);
    const total:number = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;  
    const query=await pool.query(`call sp_get_responsible(null,null,?)`,[responsibleId])     
    const dataRaw = (JSON.parse(JSON.stringify(query[0])))[0];         
    const data=dataRaw.map((element:any)=>{
        element.responsibleSignature='/storage/'+element.responsibleSignature            
        return element
    })         
        return response={
            body:{total,data},
            code:200
            };        
}
export const getDataResponsible=async(req:Request)=>{
    let response;
    const {page,size,responsibleId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_responsible`);
    const total = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;
    if(page && size){        
        const query=await pool.query(`call sp_get_responsible(?,?,null)`,[page,size]);        
        const dataRaw = (JSON.parse(JSON.stringify(query[0])))[0];         
    const data=dataRaw.map((element:any)=>{
        element.responsibleSignature='/storage/'+element.responsibleSignature            
        return element
    })         
        return response={
            body:{total,data},
            code:200
        }
    }
    if (responsibleId){        
        const query=await pool.query(`call sp_get_responsible(null,null,?)`,[responsibleId])     
        const dataRaw = (JSON.parse(JSON.stringify(query[0])))[0];         
        const data=dataRaw.map((element:any)=>{
            element.responsibleSignature='/storage/'+element.responsibleSignature            
            return element
        })                
        return response={
            body:{total,data},
            code:200
            };         
    }
    else {     
          
        const query=await pool.query(`call sp_get_responsible(null,null,null)`)        
        const dataRaw = (JSON.parse(JSON.stringify(query[0])))[0];         
        const data=dataRaw.map((element:any)=>{
            element.responsibleSignature='/storage/'+element.responsibleSignature            
            return element
        })         
        return response={            
            body:{total,data},
            code:200
        } ;
    }    
}