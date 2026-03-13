const express = require('express');
const router = express.Router();

// Import individual route files (to be created in next steps)
const authRoutes = require('./auth');
// const profileRoutes = require('./profile');
// const blogRoutes = require('./blog');
// const contactRoutes = require('./contact');

router.use('/auth', authRoutes);
// router.use('/profile', profileRoutes);
// router.use('/blog', blogRoutes);
// router.use('/contact', contactRoutes);

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is healthy' });
});

module.exports = router;
