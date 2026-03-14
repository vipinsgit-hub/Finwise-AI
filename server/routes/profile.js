const express = require('express');
const router = express.Router();
const { getProfile, upsertProfile } = require('../controllers/profileController');
const { getFIREProjections } = require('../controllers/fireController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getProfile)
  .post(protect, upsertProfile);

router.post('/fire', protect, getFIREProjections);

module.exports = router;
