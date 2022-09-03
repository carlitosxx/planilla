import {Response} from "express";
const handleHttp = (res:Response,error:string,rawError:any)=>{
    //ERROR_SQL: 
    // Cannot add duplicate field
    if (rawError.errno==1062){
        res.status(403);
        res.send({errorNo:rawError.errno,errorMessage:rawError.sqlMessage});
    // Cannot add foreign key constraint fails   
    }else if(rawError.errno==1452){
        res.status(403);
        res.send({errorNo:rawError.errno,errorMessage:rawError.sqlMessage})

    }
    else{
        res.status(400);
        res.send({error});
        console.log(rawError);
    }  
}
export {handleHttp};