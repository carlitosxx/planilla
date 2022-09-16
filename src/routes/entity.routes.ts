import {Router} from 'express';
import * as entityController from  '../controllers/entity.controller'
import {verifyToken} from '../middleware/verify_token.middleware';


const router=Router();
router.post('/entity',verifyToken,entityController.postEntity)
router.put('/entity/:entityId',verifyToken,entityController.putEntity)
router.get('/entity',verifyToken,entityController.getEntity)
export default router;