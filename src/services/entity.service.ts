import {Request } from 'express';
import {pool} from '../database';
import  * as fs from 'fs';
import {promisify} from 'util'
import path, { join } from 'path';
import {Ientity} from '../models/raw/entity.model'


const unlinkAsync = promisify(fs.unlink)

export const addEntity=async(req:Request)=>{   
    let response;
    const {
        entityRuc,
        entityCode,
        entityName,
        entityEmployer,
        entityStatus        
        }=req.body;
    const {file}=req;
    const pathFilename="/storage/"+file?.filename;   
    const query= await pool.query(`call sp_post_entity(?,?,?,?,?,?)`,
    [entityRuc,entityCode,entityName,entityEmployer,entityStatus,pathFilename]);
    const queryParse = JSON.parse(JSON.stringify(query[0]));     
    if (queryParse.affectedRows==0){
        return response={
                body:{errorNo:1062,errorMessage:"entityCode duplicate"},
                code:403
            }
    }
    return response={
            body:{msg:"Entity created"},
            code:200
    }      
}
export const updateEntity=async(req:Request)=>{
   try {
    let response;
    const directory=path.join(__dirname,'..' )   
    console.log(directory);
    const {entityId}=req.params
    const { entityRuc,
        entityCode,
        entityName,
        entityEmployer,
        entityStatus  }=req.body
        const {file}=req; 
        const pathFilename="/storage/"+file?.filename;  
        const query= await pool.query(`call sp_put_entity(?,?,?,?,?,?,?)`,
        [entityRuc,entityCode,entityName,entityEmployer,entityStatus,pathFilename,entityId]);     
     if(!((JSON.parse(JSON.stringify(query[0])))[0])[0]){
        // const joinDirectory=path.join(directory,`/storage/${file?.filename}`)
        // console.log(joinDirectory);
        // await unlinkAsync(directory+`/storage/${file?.filename}`)
        return response={
        body:{msg:"entity not found"},
        code:400
    }}
    const previousEntityLogo=((JSON.parse(JSON.stringify(query[0])))[0])[0].entityLogo;     
      
    await unlinkAsync(directory+`/${previousEntityLogo}`)
    response={
        body:{msg:"entity updated"},
        code:200
    }
    return response;   
   } catch (error) {
    console.log(error)
    const response={
        body:{msg:"entity error"},
        code:400
    }
    return response;    
   }
   
}
export const getdataEntity=async(req:Request)=>{
    let response;
    const {page,size,entityId}=req.query
    const queryCount=await pool.query(`select count(*) as count from tbl_entity`);
    const total = (JSON.parse(JSON.stringify(queryCount[0])))[0].count;
    if(page && size){
        const query=await pool.query(`call sp_get_entity(?,?,null)`,[page,size]);        
        const data:Ientity = (JSON.parse(JSON.stringify(query[0])))[0];        
        return response={
            body:{total,data},
            code:200
        }
    }
    if (entityId){
        const query=await pool.query(`call sp_get_entity(null,null,?)`,[entityId])     
        const data:Ientity = (JSON.parse(JSON.stringify(query[0])))[0];       
        return response={
            body:{total,data},
            code:200
            };         
    }
    else {        
        const query=await pool.query(`call sp_get_entity(null,null,null)`)        
        const data:Ientity = (JSON.parse(JSON.stringify(query[0])))[0]; 
        return response={            
            body:{total,data},
            code:200
        } ;
    }
}