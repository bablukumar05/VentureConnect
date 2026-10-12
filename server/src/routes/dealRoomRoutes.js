const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getDataRoomDocuments,
  uploadDataRoomDocument,
  requestDocumentAccess,
  manageDocumentAccess,
  getTermSheets,
  getTermSheetById,
  createTermSheet,
  updateTermSheet,
  signTermSheet,
} = require('../controllers/dealRoomController');

router.use(protect);

// Virtual Data Room (VDR) Routes
router.get('/vdr/documents/:startupId?', getDataRoomDocuments);
router.post('/vdr/documents', uploadDataRoomDocument);
router.post('/vdr/documents/:documentId/request-access', requestDocumentAccess);
router.post('/vdr/documents/:documentId/manage-access', manageDocumentAccess);

// Term Sheet Execution Routes
router.get('/term-sheets', getTermSheets);
router.get('/term-sheets/:id', getTermSheetById);
router.post('/term-sheets', createTermSheet);
router.put('/term-sheets/:id', updateTermSheet);
router.post('/term-sheets/:id/sign', signTermSheet);

module.exports = router;
