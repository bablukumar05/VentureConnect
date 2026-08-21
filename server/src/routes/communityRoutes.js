const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getFeedPosts,
  createPost,
  toggleLikePost,
  addComment,
  toggleFollowUser,
} = require('../controllers/communityController');

router.get('/posts', protect, getFeedPosts);
router.post('/posts', protect, createPost);
router.post('/posts/:postId/like', protect, toggleLikePost);
router.post('/posts/:postId/comment', protect, addComment);
router.post('/users/:targetUserId/follow', protect, toggleFollowUser);

module.exports = router;
