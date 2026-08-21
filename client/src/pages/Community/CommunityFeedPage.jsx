import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { MessageSquare, Heart, Share2, UserPlus, Send, Image } from 'lucide-react';

export const CommunityFeedPage = () => {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState([]);
  const [newContent, setNewContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});

  const fetchFeed = async () => {
    try {
      const res = await API.get('/community/posts');
      setPosts(res.data.posts);
    } catch (err) {
      console.error('Fetch feed error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    setIsPosting(true);
    try {
      const res = await API.post('/community/posts', { content: newContent });
      setPosts([res.data.post, ...posts]);
      setNewContent('');
    } catch (err) {
      console.error('Create post error:', err);
    } finally {
      setIsPosting(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await API.post(`/community/posts/${postId}/like`);
      setPosts(
        posts.map((p) =>
          p._id === postId
            ? { ...p, likesCount: res.data.isLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1) }
            : p
        )
      );
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleAddComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    try {
      await API.post(`/community/posts/${postId}/comment`, { text });
      setPosts(posts.map((p) => (p._id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p)));
      setCommentInputs({ ...commentInputs, [postId]: '' });
    } catch (err) {
      console.error('Add comment error:', err);
    }
  };

  if (isLoading) return <LoadingSpinner label="Loading Community Social Feed..." />;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Feed Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-6 sm:p-8 rounded-3xl border border-indigo-500/20 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">VentureConnect Network</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Community Social Feed</h1>
          <p className="text-sm text-slate-400 mt-1">
            Connect with founders, angel investors, mentors, and accelerators across the ecosystem.
          </p>
        </div>
      </div>

      {/* Create Post Box */}
      <div className="bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center text-base">
            {user?.name ? user.name[0] : 'U'}
          </div>
          <span className="text-sm font-bold text-white">{user?.name} ({user?.role})</span>
        </div>

        <form onSubmit={handleCreatePost} className="space-y-3">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={3}
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            placeholder="Share a milestone, pitch update, metric win, or ecosystem question..."
          />

          <div className="flex items-center justify-between">
            <button type="button" className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 font-medium">
              <Image className="w-4 h-4 text-indigo-400" /> Attach Image/Deck
            </button>

            <button
              type="submit"
              disabled={isPosting || !newContent.trim()}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
            >
              <Send className="w-3.5 h-3.5" /> {isPosting ? 'Posting...' : 'Post to Feed'}
            </button>
          </div>
        </form>
      </div>

      {/* Feed Stream */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            {/* Author Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-950 border border-indigo-500/30 text-indigo-400 font-black flex items-center justify-center text-sm">
                  {post.author?.name ? post.author.name[0] : 'A'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    {post.author?.name}
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold capitalize">
                      {post.author?.role}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{post.author?.bio || 'VentureConnect Member'}</p>
                </div>
              </div>

              <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-400 text-xs font-bold rounded-xl transition flex items-center gap-1">
                <UserPlus className="w-3.5 h-3.5" /> Follow
              </button>
            </div>

            {/* Post Content */}
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">{post.content}</p>

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400 font-semibold">
              <button
                onClick={() => handleLike(post._id)}
                className="flex items-center gap-1.5 hover:text-rose-400 transition"
              >
                <Heart className="w-4 h-4 text-rose-400" /> {post.likesCount || 0} Likes
              </button>

              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-indigo-400" /> {post.commentsCount || 0} Comments
              </div>

              <button className="flex items-center gap-1.5 hover:text-emerald-400 transition">
                <Share2 className="w-4 h-4 text-emerald-400" /> {post.sharesCount || 0} Shares
              </button>
            </div>

            {/* Quick Comment Input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={commentInputs[post._id] || ''}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post._id]: e.target.value })}
                placeholder="Write a comment..."
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
              <button
                onClick={() => handleAddComment(post._id)}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition"
              >
                Comment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
