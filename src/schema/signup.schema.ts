import {body} from 'express-validator';
const schema= [
    body('userEmail').isEmail().trim().escape().withMessage('The email is invalid'),
    body('userEmail').isLength({min:9,max:100}).withMessage('The email must contain 9 to 100 characters'),
    body('userEmail').exists().withMessage('You need to enter the Email'),
    body('userDni').isLength({min:8,max:8}).withMessage('The dni must contain 8 characteres'),
    body('userDni').exists().withMessage('You need to enter the DNI'),
    body('userFirstName').isLength({min:3,max:30}).withMessage('The first name must contain a minimum of 3 and a maximum of 30 characters'),
    body('userFirstName').exists().withMessage('You need to enter the first name'),
    body('userFirstName').isAlpha('es-ES',{ignore: ' '}).trim().escape().withMessage('The first name must only contain letters and spaces'),    
 ]

 export {schema as signupSchema}