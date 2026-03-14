const BlogPost = require('../models/BlogPost');
const ContactMessage = require('../models/ContactMessage');
const User = require('../models/User');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalPosts = await BlogPost.countDocuments();
    const unreadMessages = await ContactMessage.countDocuments({ isRead: false });

    res.status(200).json({
      totalUsers,
      totalPosts,
      unreadMessages
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all blog posts
// @route   GET /api/admin/blogs
// @access  Private/Admin
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a blog post
// @route   POST /api/admin/blogs
// @access  Private/Admin
exports.createBlog = async (req, res) => {
  try {
    const { title, content, summary, tags, image } = req.body;
    
    // Simple slug generation
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const blog = await BlogPost.create({
      title,
      slug,
      content,
      summary,
      author: req.user._id,
      tags,
      image,
      isPublished: true
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a blog post
// @route   PUT /api/admin/blogs/:id
// @access  Private/Admin
exports.updateBlog = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const { title, content, summary, tags, image, isPublished } = req.body;

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.summary = summary || blog.summary;
    blog.tags = tags || blog.tags;
    blog.image = image || blog.image;
    blog.isPublished = isPublished !== undefined ? isPublished : blog.isPublished;

    if (title) {
      blog.slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/admin/blogs/:id
// @access  Private/Admin
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.deleteOne();
    res.status(200).json({ message: 'Blog removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/admin/messages
// @access  Private/Admin
exports.getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark message as read
// @route   PUT /api/admin/messages/:id/read
// @access  Private/Admin
exports.markRead = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    message.isRead = true;
    await message.save();
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
