import {Request, Response,NextFunction} from 'express';
import { validationResult } from 'express-validator';

export function validationSchema(req:Request,res:Response,next:NextFunction){
    try {
        //fields validation
        const errors = validationResult(req)   
        if(!errors.isEmpty()){            
            return res.status(422).json(errors.array())
        }
        next();
    } catch (error) {        
        console.log(`validation_schema.middleware:there is an error:${error}`)
    }
   
}
