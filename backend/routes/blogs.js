const express = require('express');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  const blogs = await Blog.find().populate('author', 'username').sort({ createdAt: -1 });
  res.json(blogs);
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.filename : '';
  const blog = new Blog({ title, content, image, author: req.user.id });
  await blog.save();
  res.json(blog);
});

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'username');
  if (!blog) return res.status(404).json({ msg: 'Blog not found' });
  res.json(blog);
});

router.delete('/:id', auth, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ msg: 'Blog not found' });
  if (blog.author.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });
  await blog.remove();
  res.json({ msg: 'Blog deleted' });
});

module.exports = router;
