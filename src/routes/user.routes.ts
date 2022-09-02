import {Router} from 'express';

import * as userController from '../controllers/user.controller';

import {verifyToken} from '../middleware/verify_token.middleware';
import {validationSchema} from '../middleware/validation_schema.middleware';


const router = Router();
/**
 * @swagger
 *  /user/signin/{userEmail}/{userDni}:
 *      get:
 *          tags:
 *              - user
 *          summary: Sign-in user
 *          parameters:
 *          -   name: userEmail
 *              in: path
 *              description: user's email
 *              required: true
 *              schema:
 *                  type: string
 *          -   name: userDni
 *              in: path
 *              description: user's Dni
 *              required: true
 *              schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: succesful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/signinUser'
 *              '400':
 *                  description: email or dni invalid
 */

router.get('/user/signin/:userEmail/:userDni',userController.signinUser);
router.get('/user/profile/:userId',verifyToken,userController.profile);



export default router;