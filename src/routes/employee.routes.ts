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
/**
 * @swagger
 * /employee/{employeeId}:
 *      put:
 *          tags:
 *              - employee
 *          summary: update employee by employeeId
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
 *          -   name: employeeId
 *              in: path
 *              required: true
 *              description: employee id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/updateEmployee'
 *          responses:
 *              '200':
 *                  description: succesful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/succesfulResponse'
 *              '404':
 *                  description: employee has already been updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/errorResponse' 
 */
router.put('/employee/:employeeId',verifyToken,employeeController.updateEmployee);
/**
 * @swagger
 * /employee:
 *      get:
 *          tags:
 *              - employee
 *          summary: get employees by page and size
 *          security:
 *              - Authorization: []
 *          parameters:
 *          -   name: page
 *              in: query
 *              required: true
 *          -   name: size
 *              in: query
 *              required: true
 *          -   name: X-Frame-Options
 *              in: header
 *              required: true
 *              description: only "deny" is allowed
 *          -   name: Accept
 *              in: header
 *              required: true
 *              description: only "application/json" is allowed *         
 *          responses:
 *              '200':
 *                  description: succesful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/getEmployeesResponse'
 *          
 */
router.get('/employee',verifyToken,employeeController.getEmployees);
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
 *          -   name: Accept
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

//test
router.get('/employee',employeeController.test)
export default router;
