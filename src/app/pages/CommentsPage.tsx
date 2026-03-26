import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { ArrowLeft } from 'lucide-react';
import CommentsSection from '../components/CommentsSection';
import Navigation from '../components/Navigation';

export default function CommentsPage() {
  const { postId } = useParams<{ postId: string }>();
  const { currentUser, posts, fetishPosts } = useApp();
  const navigate = useNavigate();

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

  const regularPost = posts.find(p => p.id === postId);
  const fetishPost = fetishPosts.find(f => f.id === postId);
  const post = regularPost ?? fetishPost;

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-gray-400">Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-8">
      <Navigation />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#0F0F14]/90 backdrop-blur-lg border-b border-white/10 md:top-16">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            title="back"
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg">Comments</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-32 md:pt-40 pb-24">
        <CommentsSection postId={postId || ''} showPostPreview={true} initialExpanded={true} stickyFooterInput={true} maxHeightClass="max-h-[calc(100vh-280px)]" />
      </div>
    </div>
  );
}
