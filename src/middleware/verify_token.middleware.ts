import {Request,Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
export const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
    try {
        //Headers const
        const tokenheader = req.header('authorization');
        const contenttype= req.header('Content-Type');
        const accept= req.header('Accept');
        const xframeoptions= req.header('X-Frame-Options');
        //Header validation (406)
        if(contenttype!='application/json'){
            console.log(`verify_Token.middleware: Content-Type must be application/json`);
            return res.status(406).json('Content-Type must be application/json');
        }
        if( accept !='application/json'){
            console.log(`verify_Token.middleware: Accept must be application/json`);
            return res.status(406).json('accept  must be application/json');
        }
        if(xframeoptions!='deny'){
           console.log(`verify_Token.middleware: X-Frame-Options must be deny`);
           return res.status(406).json('X-Frame-Options must be deny');
        }
        //Token validation (401)      
        if(!tokenheader){
            console.log('verify_Token.middleware: Acces denied,token necesary');
            return res.status(401).json('Acces denied');
        }
        const tokenWithoutBearer=tokenheader.split(' ')[1];
        //FIXME: Validar cuando sea null o vacio
        if (tokenWithoutBearer===null){
        console.log('verify_Token.middleware: Token is null');
        return res.status(401).json('Acces denied');
        }
        jwt.verify(tokenWithoutBearer,process.env.TOKEN_SECRET!,(err)=>{
            if (err) {
             console.log('verify_Token.middleware: Acces denied token invalid');
             return res.status(401).json('Acces denied'); 
            }          
             next();                           
        })
    } catch (error) {
        console.log(`verify_Token.middleware,catch:there is an error: ${error}`); 
        res.status(401).json('Invalid token');
    }
}