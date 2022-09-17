import {Router} from 'express';
import * as budgetGoalController from '../controllers/budgetGoal.controller';
import {verifyToken} from '../middleware/verify_token.middleware';
const router=Router();
router.post('/budget_goal',verifyToken,budgetGoalController.postBudgetGoal);
router.put('/budget_goal/:budgetGoalId',verifyToken,budgetGoalController.putBudgetGoal);
router.get('/budget_goal',verifyToken,budgetGoalController.getBudgetGoal);

export default router;