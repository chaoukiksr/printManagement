import express from 'express';
import * as statisticsController from '../controllers/statisticsController.js';
import { checkRole } from '../utils/middelwares/auth.js';

const router = express.Router();

// Get all statistics
router.get('/', statisticsController.getStatistics);

// Update cost settings (admin only)
router.put('/cost-settings', checkRole(["admin"]) ,statisticsController.updateCostSettings);

export default router; 