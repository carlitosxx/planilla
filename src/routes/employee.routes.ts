import {Router} from 'express';
import * as employeeController from '../controllers/employee.controller';
import {verifyToken} from '../middleware/verify_token.middleware';
const router=Router();
/** 
 * @swagger
 * /employee:
 *      post:
 *          tags:
 *              - employee
 *          summary: add employe
 *          security:
 *              - Authorization: []
 *          parameters:
 *          -   name: X-Frame-Options
 *              in: header
 *              required: true
 *              description: only "deny" is allowed
 *          -   name: accept
 *              in: header
 *              required: true
 *              description: only "application/json" is allowed
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addEmployee'
 *          responses:
 *              '200':
 *                  description: succesful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/succesfulResponse'
 *              '403':
 *                  description: duplicate data
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/errorResponse'
 *              
*/
router.post('/employee',verifyToken,employeeController.addEmployee);
//update employee
//TODO:


/**
 * @swagger
 * /employee/category:
 *      post:
 *          tags:
 *              - employee
 *          summary: Add category employee
 *          security:
 *              - Authorization: []
 *          parameters:
 *          -   name: X-Frame-Options
 *              in: header
 *              required: true
 *              description: only "deny" is allowed
 *          -   name: accept
 *              in: header
 *              required: true
 *              description: only "application/json" is allowed
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addCategory'
 *          responses:
 *              '200':
 *                  description: succesful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/succesfulResponse'
 *              '403':
 *                  description: duplicate data
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/errorResponse' 
 * 
 */
router.post('/employee/category',verifyToken,employeeController.addCategory);
/**
 * @swagger
 * /employee/category_salary:
 *      post:
 *          tags:
 *              - employee
 *          summary: add salary
 *          security:
 *              - Authorization: []
 *          parameters:
 *          -   name: X-Frame-Options
 *              in: header
 *              required: true
 *              description: only "deny" is allowed
 *          -   name: accept
 *              in: header
 *              required: true
 *              description: onle "application/json" is allowed
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addCategorySalary'
 *          responses:
 *              '200':
 *                  description: succesful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/succesfulResponse'
 *              '403':
 *                  description: duplicate data
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/errorResponse'
 * 
 */
router.post('/employee/category_salary',verifyToken,employeeController.addCategorySalary);

export default router;
