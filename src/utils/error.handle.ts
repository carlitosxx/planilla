import {Response} from "express";
const handleHttp = (res:Response,error:string,rawError:any)=>{
    res.status(400);
    res.send({error});
    console.log(rawError);
}
export {handleHttp};