import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp, type Post } from '../context/AppContext';
import { Heart, MessageCircle, Share2, Lock, DollarSign, Send } from 'lucide-react';
import { motion } from 'motion/react';
import Navigation from '../components/Navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';

export default function HomePage() {
  const navigate = useNavigate();
  const { currentUser, posts, creators, isSubscribedTo, toggleLike, hasLiked, addTip, fetishPosts, addMessage } = useApp();
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [tipAmount, setTipAmount] = useState<number>(5);
  const [showTipModal, setShowTipModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'feed' | 'confessions'>('feed');

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

  const handleUnlockPost = (post: Post) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (!isSubscribedTo(post.creatorId)) {
      setSelectedPost(post);
    }
  };

  const handleMessageCreator = (creatorId: string, fetishPostSnippet?: string) => {
    const creator = creators.find(c => c.id === creatorId);
    if (!creator) return;

    if (!isSubscribedTo(creatorId)) {
      alert('Subscribe to message this creator');
      return;
    }

    if (fetishPostSnippet) {
      // Include the confession snippet in the message
      addMessage(creatorId, `I saw your confession and wanted to reach out: "${fetishPostSnippet.slice(0, 50)}..."`, fetishPostSnippet);
    }

    navigate('/messages');
    alert(`Message sent to ${creator.username}`);
  };

  const handleShare = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const handleSendTip = () => {
    if (!selectedPost) return;
    if (tipAmount < 1) {
      alert('Minimum tip is $1');
      return;
    }
    addTip(selectedPost.creatorId, tipAmount);
    alert(`Tip of $${tipAmount} sent!`);
    setShowTipModal(false);
    setTipAmount(5);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-8">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4">
        {/* Tab Bar */}
        <div className="flex gap-0 mb-4 sticky top-0 md:top-15 bg-background z-30">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex-1 py-3 px-4 transition-all relative ${activeTab === 'feed' ? 'text-foreground' : 'text-muted-foreground'
              }`}
          >
            <span className="font-medium">Feed</span>
            {activeTab === 'feed' && (
              <motion.div
                layoutId="activeHomeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('confessions')}
            className={`flex-1 py-3 px-4 transition-all relative ${activeTab === 'confessions' ? 'text-foreground' : 'text-muted-foreground'
              }`}
          >
            <span className="font-medium">Confessions</span>
            {activeTab === 'confessions' && (
              <motion.div
                layoutId="activeHomeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2]"
              />
            )}
          </button>
        </div>

        {/* Feed Tab Content */}
        {activeTab === 'feed' && (
          <>
            {/* Stories/Highlights Row */}
            <div className="flex gap-4 overflow-x-auto pb-4 md:mt-20 mb-2 scrollbar-hide">
              {posts.slice(0, 5).map((post) => (
                <div key={post.id} className="flex flex-col items-center gap-2 shrink-0">
                  <div className="w-16 h-16 rounded-full p-0.5 bg-linear-to-br from-[#FF2D8D] to-[#7B3FF2]">
                    <img
                      src={post.creator.avatar}
                      alt={post.creator.username}
                      className="w-full h-full rounded-full border-2 border-[#0F0F14]"
                    />
                  </div>
                  <span className="text-xs text-gray-400">{post.creator.username.slice(0, 8)}</span>
                </div>
              ))}
            </div>

            {/* Feed Posts */}
            <div className="space-y-6">
              {posts.map((post, index) => {
                const isSubscribed = isSubscribedTo(post.creatorId);
                const isLocked = post.isPremium && !isSubscribed;
                const liked = hasLiked(post.id);

                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700"
                  >
                    {/* Post Header */}
                    <div className="flex items-center justify-between p-4">
                      <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => navigate(`/creator/${post.creatorId}`)}
                      >
                        <img
                          src={post.creator.avatar}
                          alt={post.creator.username}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p>{post.creator.username}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(post.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {post.isPremium && (
                        <div className="flex items-center gap-1 text-[#FF2D8D] text-sm">
                          <Lock className="w-4 h-4" />
                          Premium
                        </div>
                      )}
                    </div>

                    {/* Post Image */}
                    <div className="relative" onClick={() => handleUnlockPost(post)}>
                      {isLocked ? (
                        <>
                          <img
                            src={post.imageUrl}
                            alt=""
                            className="w-full aspect-square object-cover blur-md"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent flex items-center justify-center cursor-pointer">
                            <div className="text-center">
                              <Lock className="w-16 h-16 mx-auto mb-4 text-[#FF2D8D]" />
                              <h3 className="mb-2">Subscribe to unlock</h3>
                              <p className="text-gray-400 mb-4">
                                ${post.creator.subscriptionPrice}/month
                              </p>
                              <Button
                                onClick={(e: any) => {
                                  e.stopPropagation();
                                  //handleSubscribeClick(post.creatorId);
                                }}
                                className="bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90"
                              >
                                Subscribe Now
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <img
                          src={post.imageUrl}
                          alt=""
                          className="w-full aspect-square object-cover"
                        />
                      )}
                    </div>

                    {/* Post Actions */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`transition-colors p-0 ${liked ? 'text-[#FF2D8D]' : 'text-gray-400 hover:text-[#FF2D8D]'
                            }`}
                          onClick={() => toggleLike(post.id)}
                        >
                          <Heart className="w-6 h-6" fill={liked ? '#FF2D8D' : 'none'} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white transition-colors p-0"
                          disabled={isLocked}
                          onClick={() => !isLocked && navigate(`/comments/${post.id}`)}
                        >
                          {isLocked ? (
                            <Lock className="w-5 h-5" />
                          ) : (
                            <MessageCircle className="w-6 h-6" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white transition-colors p-0"
                          onClick={() => handleShare(`https://fanvault.com/post/${post.id}`)}
                        >
                          <Share2 className="w-6 h-6" />
                        </Button>
                        {!isLocked && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto text-[#FF2D8D] hover:text-[#FF2D8D]/80 transition-colors"
                            onClick={() => {
                              // handleTip(post.creatorId)
                            }}
                          >
                            <DollarSign className="w-5 h-5" />
                            Tip
                          </Button>
                        )}
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="mr-2">{post.likes.toLocaleString()} likes</span>
                        </p>
                        <p className="text-sm">
                          <span className="mr-2">{post.creator.username}</span>
                          <span className="text-gray-400">{post.content}</span>
                        </p>
                        {!isLocked && post.comments > 0 && (
                          <button
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                            onClick={() => navigate(`/comments/${post.id}`)}
                          >
                            View all {post.comments} comments
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        {/* Confessions Tab Content */}
        {activeTab === 'confessions' && (
          <div className="space-y-4">
            <div className="bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-xl border border-white/10 p-4 md:mt-20 mb-6">
              <p className="text-sm text-gray-400 text-center">
                🔒 Anonymous confessions • Share your thoughts freely
              </p>
            </div>

            {fetishPosts.map((post, index) => {
              const liked = hasLiked(post.id, true);

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-xl border border-white/10 p-5"
                >
                  {/* Anonymous Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#FF2D8D] to-[#7B3FF2] flex items-center justify-center text-lg">
                      👤
                    </div>
                    <div>
                      <p className="font-medium text-[#FF2D8D]">{post.anonymousId}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(post.timestamp).toLocaleDateString()} • Anonymous
                      </p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-600">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`transition-colors p-0 ${liked ? 'text-[#FF2D8D]' : 'text-gray-400 hover:text-[#FF2D8D]'}`}
                        onClick={() => toggleLike(post.id, true)}
                      >
                        <Heart className="w-5 h-5 mr-1" fill={liked ? '#FF2D8D' : 'none'} />
                        <span className="text-sm">{post.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white transition-colors p-0"
                        onClick={() => navigate(`/comments/${post.id}`)}
                      >
                        <MessageCircle className="w-5 h-5 mr-1" />
                        <span className="text-sm">{post.comments}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white transition-colors p-0"
                        onClick={() => handleShare(`https://fanvault.com/confession/${post.id}`)}
                      >
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#7B3FF2] hover:text-[#7B3FF2]/80 transition-colors"
                      onClick={() => {
                        handleMessageCreator(post.anonymousId, post.content)
                      }}
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Subscribe Modal */}
      <Dialog open={selectedPost !== null} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="bg-[#1A1A1F] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Subscribe to unlock this content</DialogTitle>
            <DialogDescription className="text-gray-400">
              Get unlimited access to all premium posts and exclusive content from this creator.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1 border-gray-700 hover:bg-white/5"
              onClick={() => setSelectedPost(null)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90"
              onClick={() => {
                const post = posts.find(p => p.id === selectedPost);
                if (post) {
                  //handleSubscribeClick(post.creatorId)
                };
              }}
            >
              Subscribe
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tip Modal */}
      <Dialog open={showTipModal} onOpenChange={setShowTipModal}>
        <DialogContent className="bg-[#1A1A1F] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Send a Tip</DialogTitle>
            <DialogDescription className="text-gray-400">
              Show your appreciation with a tip
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Amount ($)</label>
              <input
                type="number"
                value={tipAmount}
                onChange={(e) => setTipAmount(parseFloat(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF2D8D]"
                placeholder="5.00"
                step="0.01"
                min="1"
              />
            </div>
            <div className="flex gap-2">
              {['5.00', '10.00', '25.00', '50.00'].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setTipAmount(parseFloat(amount))}
                  className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm transition-colors"
                >
                  ${amount}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-gray-700 hover:bg-white/5"
                onClick={() => setShowTipModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90"
                onClick={handleSendTip}
              >
                Send Tip
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}