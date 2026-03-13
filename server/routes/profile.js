const express = require('express');
const router = express.Router();
const { getProfile, upsertProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getProfile)
  .post(protect, upsertProfile);

module.exports = router;
