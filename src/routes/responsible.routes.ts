import {Router} from 'express';
import * as responsibleController from  '../controllers/responsible.controller'
import {verifyToken} from '../middleware/verify_token.middleware';


const router=Router();
router.post('/responsible',verifyToken,responsibleController.postResponsible)
router.put('/responsible/:responsibleId',verifyToken,responsibleController.putResponsible)
router.get('/responsible',verifyToken,responsibleController.getResponsible)
router.get('/responsible/:responsibleId',verifyToken,responsibleController.getResponsibleById)

export default router;