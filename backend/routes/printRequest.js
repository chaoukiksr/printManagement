import express from 'express';
import * as printRequestController from '../controllers/printRequestController.js';
import { checkRole } from '../utils/middelwares/auth.js';
import upload from '../utils/multer.js';

const router = express.Router();

router
    .route('/')
    .get(printRequestController.getPrintRequests)
    .post(
        checkRole(['teacher']),
        upload.single('file'),
        printRequestController.createPrintRequest
    );

router
    .route('/:id')
    .patch(
        checkRole(['teacher']),
        upload.single('file'),
        printRequestController.updatePrintRequest
    )
    .delete(checkRole(['teacher']), printRequestController.deletePrintRequest);


// Route for updating status (department and printer)
router
    .route('/:id/status')
    .patch(
        checkRole(['department', 'printer']),
        printRequestController.updateStatus
    );

export default router;
