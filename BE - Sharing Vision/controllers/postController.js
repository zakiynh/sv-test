const { Post } = require('../models');

const createPost = async (req, res) => {
  try {
    console.log("Received content length:", req.body.Content.length);
    console.log("req.body: ", req.body);
    const errors = validatePost(req.body);
    console.log("errors: ", errors);
    if (Object.keys(errors).length) {
      return res.status(400).send(errors);
    }

    await Post.create(req.body);
    res.status(201).json({
      message: "Post created successfully",
    });
  } catch (error) {
    res.status(500).send(error)
  }
};

const getPost = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const status = req.query.status;

    const whereClause = status ? { status } : {};

    const totalPosts = await Post.count({ where: whereClause });

    const posts = await Post.findAll({
      limit,
      offset,
      where: whereClause,
      order: [['Created_date', 'DESC']]
    });

    res.status(200).json({
      posts,
      totalArticles: totalPosts,
    })
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }

    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePost = async (req, res) => {
  try {
    const errors = validatePost(req.body);
    console.log("req.body: ", req.body);
    if (Object.keys(errors).length) {
      return res.status(400).send(errors);
    }

    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }

    await post.update(req.body);
    res.status(200).json({
      message: "Post updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }

    await post.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

const validatePost = (post) => {
  const errors = {};

  if (!post.Title || post.Title.length < 20) {
    errors.Title = "Title is required and should be at least 20 characters long.";
  }
  if (!post.Content || post.Content.length < 200) {
    errors.Content = "Content is required and should be at least 200 characters long.";
  }
  if (!post.Category || post.Category.length < 3) {
    errors.Category = "Category is required and should be at least 3 characters long.";
  }
  const validStatuses = ["publish", "draft", "trash"];
  if (!post.Status || !validStatuses.includes(post.Status.toLowerCase())) {
    errors.Status = "Status is required and must be either 'publish', 'draft', or 'trash'.";
  }

  return errors;
};

module.exports = { getPost, createPost, getPostById, updatePost, deletePost };