import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Send } from 'lucide-react';
import { motion } from 'motion/react';
import Navigation from '../components/Navigation';

export default function CommentsPage() {
  const { postId } = useParams<{ postId: string }>();
  const { currentUser, posts, getCommentsForPost, addComment } = useApp();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>Redirecting...</p>
      </div>
    );
  }

  const post = posts.find(p => p.id === postId);
  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-gray-400">Post not found</p>
      </div>
    );
  }

  const comments = getCommentsForPost(postId || '');

  // Mock comments for demonstration
  const mockComments = [
    {
      id: 'c1',
      postId: postId || '',
      userId: '2',
      user: {
        id: '2',
        username: 'MaxFitPro',
        avatar: 'https://images.unsplash.com/photo-1588609229274-b39e162d1219?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kc29tZSUyMG1hbiUyMGZpdG5lc3N8ZW58MXx8fHwxNzc0MDk5NDQwfDA&ixlib=rb-4.1.0&q=80&w=400',
      },
      content: 'This is amazing! Great work! 🔥',
      timestamp: new Date('2026-03-22T01:30:00'),
    },
    {
      id: 'c2',
      postId: postId || '',
      userId: '3',
      user: {
        id: '3',
        username: 'ZenWithZara',
        avatar: 'https://images.unsplash.com/photo-1712509576315-372df3130f76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjB3b21hbiUyMHlvZ2F8ZW58MXx8fHwxNzc0MDk5NDQxfDA&ixlib=rb-4.1.0&q=80&w=400',
      },
      content: 'Love this! Keep it up! 💪',
      timestamp: new Date('2026-03-22T00:45:00'),
    },
    {
      id: 'c3',
      postId: postId || '',
      userId: '4',
      user: {
        id: '4',
        username: 'EllaGlam',
        avatar: 'https://images.unsplash.com/photo-1734794070127-3ef2bad0510e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRyYWN0aXZlJTIwd29tYW4lMjBmYXNoaW9ufGVufDF8fHx8MTc3NDA5OTQ0MXww&ixlib=rb-4.1.0&q=80&w=400',
      },
      content: 'Stunning as always! ✨',
      timestamp: new Date('2026-03-21T23:20:00'),
    },
    ...comments,
  ];

  const handleSubmitComment = () => {
    if (commentText.trim() && postId) {
      addComment(postId, commentText);
      setCommentText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-8">
      <Navigation />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#0F0F14]/90 backdrop-blur-lg border-b border-white/10 md:top-16">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            title='back'
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg">Comments</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-32 md:pt-40">
        {/* Post Preview */}
        <div className="mb-6 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-xl border border-white/10 p-4">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={post.creator.avatar}
              alt={post.creator.username}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">{post.creator.username}</p>
              <p className="text-xs text-gray-400">
                {new Date(post.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-300">{post.content}</p>
        </div>

        {/* Comments List */}
        <div className="space-y-4 mb-6">
          {mockComments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start gap-3"
            >
              <img
                src={comment.user.avatar}
                alt={comment.user.username}
                className="w-10 h-10 rounded-full shrink-0"
              />
              <div className="flex-1 bg-white/5 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">{comment.user.username}</p>
                  <p className="text-xs text-gray-500">
                    {getTimeAgo(comment.timestamp)}
                  </p>
                </div>
                <p className="text-sm text-gray-300">{comment.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comment Input - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0F0F14]/90 backdrop-blur-lg border-t border-white/10 md:bottom-0">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-end gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="w-10 h-10 rounded-full shrink-0"
            />
            <div className="flex-1 flex items-end gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10 focus-within:border-[#FF2D8D] transition-colors">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a comment..."
                rows={1}
                className="flex-1 bg-transparent border-none outline-none resize-none text-sm"
              />
              <button
                title='send'
                onClick={handleSubmitComment}
                disabled={!commentText.trim()}
                className="text-[#FF2D8D] disabled:text-gray-600 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(timestamp: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - timestamp.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else {
    return timestamp.toLocaleDateString();
  }
}