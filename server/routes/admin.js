const express = require('express');
const router = express.Router();
const { 
  getStats, 
  getBlogs, 
  createBlog, 
  updateBlog, 
  deleteBlog,
  getMessages,
  markRead 
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// All routes here require admin privileges
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getStats);

router.route('/blogs')
  .get(getBlogs)
  .post(createBlog);

router.route('/blogs/:id')
  .put(updateBlog)
  .delete(deleteBlog);

router.get('/messages', getMessages);
router.put('/messages/:id/read', markRead);

module.exports = router;
