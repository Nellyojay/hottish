import { useState } from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CommentsSectionProps {
  postId: string;
  showPostPreview?: boolean;
  maxHeightClass?: string;
  className?: string;
  initialExpanded?: boolean;
  stickyFooterInput?: boolean;
}

export default function CommentsSection({
  postId,
  showPostPreview = true,
  maxHeightClass = 'max-h-64',
  className = '',
  initialExpanded = false,
  stickyFooterInput = false,
}: CommentsSectionProps) {
  const { currentUser, posts, fetishPosts, getCommentsForPost, addComment } = useApp();
  const [commentText, setCommentText] = useState('');
  const [expanded, setExpanded] = useState(initialExpanded);

  const regularPost = posts.find(p => p.id === postId);
  const fetishPost = fetishPosts.find(f => f.id === postId);
  const post = regularPost ?? fetishPost;

  if (!post) {
    return (
      <div className="rounded-xl border border-white/10 bg-background p-4 text-center text-sm text-gray-400">
        Post not found.
      </div>
    );
  }

  const comments = getCommentsForPost(postId);
  const sortedComments = [...comments].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  const displayComments = expanded ? sortedComments : sortedComments.slice(0, 2);

  const handleToggleExpand = () => {
    setExpanded(prev => !prev);
  };

  const handleSubmitComment = () => {
    if (!currentUser) return;
    if (!commentText.trim()) return;

    addComment(postId, commentText.trim());
    setCommentText('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  return (
    <div className={`bg-[#111015] border border-white/10 rounded-xl p-3 space-y-3 ${className} ${stickyFooterInput ? 'flex flex-col' : ''}`}>
      {showPostPreview && (
        <div className="pb-3 border-b border-white/10 space-y-2">
          <p className="text-sm font-medium text-foreground">Discuss</p>
          <p className="text-xs text-muted-foreground">{comments.length} comment{comments.length === 1 ? '' : 's'}</p>
          <div className="rounded-lg bg-white/5 p-2">
            <p className="text-xs text-muted-foreground mb-1">
              {('creator' in post ? post.creator.username : post.anonymousId || 'Anonymous')} • {new Date(post.timestamp).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-300 line-clamp-2">{post.content}</p>
          </div>
        </div>
      )}

      <div className={`space-y-2 overflow-y-auto ${maxHeightClass} pr-1 ${stickyFooterInput ? 'grow' : ''}`}>
        {comments.length === 0 ? (
          null
        ) : (
          displayComments.map(comment => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-3"
            >
              <img
                src={comment.user.avatar}
                alt={comment.user.username}
                className="w-8 h-8 rounded-full shrink-0"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{comment.user.username}</p>
                <p className="text-xs text-muted-foreground mb-1">{new Date(comment.timestamp).toLocaleString()}</p>
                <p className="text-sm text-gray-300">{comment.content}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {sortedComments.length > 2 && (
        <button
          onClick={handleToggleExpand}
          className="text-xs text-[#FF2D8D] hover:text-[#FF2D8D]/90"
          aria-label={expanded ? 'Collapse comments' : 'Expand comments'}
        >
          {expanded ? 'Show less comments' : `Show all ${sortedComments.length} comments`}
        </button>
      )}

      {currentUser ? (
        <div className={`${stickyFooterInput ? 'sticky bottom-0 z-10 bg-[#111015] border-t border-white/10 pt-2' : 'pt-2 border-t border-white/10'}`}>
          <div className="flex items-end gap-2">
            <textarea
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Write a comment..."
              rows={2}
              className="flex-1 resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground outline-none focus:border-[#FF2D8D]"
            />
            <button
              onClick={handleSubmitComment}
              disabled={!commentText.trim()}
              aria-label="Send comment"
              className="rounded-lg bg-[#FF2D8D] px-3 py-2 text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-xs text-gray-400">Login to leave a comment.</div>
      )}
    </div>
  );
}
