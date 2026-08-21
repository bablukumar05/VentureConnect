const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Like = require('../models/Like');
const Follow = require('../models/Follow');

const getFeedPosts = async (req, res) => {
  try {
    let posts = await Post.find().populate('author', 'name role avatar bio location').sort({ createdAt: -1 });

    if (!posts || posts.length === 0) {
      posts = [
        {
          _id: 'post_1',
          author: { name: 'Aarav Sharma', role: 'founder', bio: 'Founder @ NexusAI', avatar: '' },
          content: '🚀 Excited to share that NexusAI has hit ₹54L ARR with over 18,000 active users! Big thanks to our early angels and mentors on VentureConnect for the support.',
          likesCount: 34,
          commentsCount: 8,
          sharesCount: 5,
          createdAt: new Date(),
        },
        {
          _id: 'post_2',
          author: { name: 'Rahul Mehta', role: 'investor', bio: 'Partner @ Peak XV', avatar: '' },
          content: '💡 Top 3 metrics we evaluate in Seed stage B2B SaaS startups: 1. MoM Revenue Retention (>85%), 2. LTV:CAC (>3.5x), 3. Founder Domain Depth. Pitch decks welcomed!',
          likesCount: 62,
          commentsCount: 14,
          sharesCount: 12,
          createdAt: new Date(),
        },
      ];
    }
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      author: req.user._id,
      content: req.body.content,
      mediaUrl: req.body.mediaUrl || '',
      tags: req.body.tags || [],
    });
    const populatedPost = await Post.findById(post._id).populate('author', 'name role avatar bio');
    res.status(201).json({ success: true, post: populatedPost });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const toggleLikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const existingLike = await Like.findOne({ post: postId, user: req.user._id });

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
      res.status(200).json({ success: true, isLiked: false });
    } else {
      await Like.create({ post: postId, user: req.user._id });
      await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
      res.status(200).json({ success: true, isLiked: true });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const comment = await Comment.create({
      post: postId,
      author: req.user._id,
      text: req.body.text,
    });
    await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });
    const populatedComment = await Comment.findById(comment._id).populate('author', 'name avatar');
    res.status(201).json({ success: true, comment: populatedComment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const toggleFollowUser = async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const existingFollow = await Follow.findOne({ follower: req.user._id, following: targetUserId });

    if (existingFollow) {
      await Follow.deleteOne({ _id: existingFollow._id });
      res.status(200).json({ success: true, isFollowing: false });
    } else {
      await Follow.create({ follower: req.user._id, following: targetUserId });
      res.status(200).json({ success: true, isFollowing: true });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getFeedPosts,
  createPost,
  toggleLikePost,
  addComment,
  toggleFollowUser,
};
