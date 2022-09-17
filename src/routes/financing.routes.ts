import {Router} from 'express';
import * as financingController from '../controllers/financing.controller';
import {verifyToken} from '../middleware/verify_token.middleware';
const router=Router();
router.post('/financing',verifyToken,financingController.postFinancing);
router.put('/financing/:financingId',verifyToken,financingController.putFinancing);
router.get('/financing',verifyToken,financingController.getFinancing);
export default router;