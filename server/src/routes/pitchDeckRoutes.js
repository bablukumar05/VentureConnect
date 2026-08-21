const express = require('express');
const router = express.Router();
const { uploadPitchDeck, getPitchDeckByStartup, recordDownload } = require('../controllers/pitchDeckController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', protect, upload.single('file'), uploadPitchDeck);
router.get('/startup/:startupId', protect, getPitchDeckByStartup);
router.post('/download/:pitchDeckId', protect, recordDownload);

module.exports = router;
