import { Request,Response,NextFunction } from "express";
import multer from "multer";
import path from "path";
const storage=multer.diskStorage({
    destination(req, file, callback) {        
        const pathStorage=`${__dirname}/../storage`;
        callback(null,pathStorage);
    },
    filename(req, file, callback) {
        const ext=file.originalname.split(".").pop();
        
        const filename=`file-${Date.now()}.${ext}`
        
        callback(null,filename)
    },
})
export const upload=multer({
    storage: storage,
    fileFilter:  (req, file, callback) =>{
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {            
             callback(null, false);   
             return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));        
        }
        return callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
})
// export const verifyLogo = (req:Request,res:Response,next:NextFunction)=>{
//     try {        
//         const middleUpload=upload.single("entityLogo")
//         middleUpload(req,res, function (err) {
//             if (err)  return res.status(400).send({errorNo:0, errorMessage: err.message })            
//         })
//         next()
//     } catch (error) {        
//         return res.status(406).json('error unknown in verifyLogo');
//     }
    
    
// }
