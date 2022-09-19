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
    const pathFilename="/storage/"+file?.filename;   
    const query= await pool.query(`call sp_post_responsible(?,?,?,?)`,
    [responsibleFullname,responsibleDni,responsibleStatus,pathFilename]);
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
