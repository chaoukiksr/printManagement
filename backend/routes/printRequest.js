import express from 'express';
import * as printRequestController from '../controllers/printRequestController.js';
import { checkRole } from '../utils/middelwares/auth.js';
import upload from '../utils/multer.js';

const router = express.Router();

// Routes for teachers
router
    .route('/')
    .get(checkRole(['teacher']), printRequestController.getPrintRequests)
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

// Route for department to get their requests
router.get(
    '/department',
    checkRole(['department']),
    printRequestController.getPrintRequests
);

// Route for printer to get all requests
router.get(
    '/printer',
    checkRole(['printer']),
    printRequestController.getPrintRequests
);

export default router;
