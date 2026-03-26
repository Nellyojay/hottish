import { useParams, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { ArrowLeft, MessageCircle, Lock, Heart, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';

export default function CreatorProfilePage() {
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const { creators, posts, currentUser, isSubscribedTo } = useApp();

  const creator = creators.find(c => c.id === creatorId);
  const creatorPosts = posts.filter(p => p.creatorId === creatorId);
  const isSubscribed = currentUser && creatorId ? isSubscribedTo(creatorId) : false;
  const isOwnProfile = currentUser?.id === creatorId;

  if (!creator) {
    return (
      <div className="min-h-screen bg-[#0F0F14] text-white flex items-center justify-center">
        <p>Creator not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F14] text-white pb-20 md:pb-8">
      <Navigation />

      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="px-4 pt-20 md:pt-24 pb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        </div>

        {/* Banner */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img
            src={creator.banner}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0F0F14] via-transparent to-transparent" />
        </div>

        {/* Profile Info */}
        <div className="px-4 md:px-8">
          <div className="relative -mt-20 mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-[#0F0F14] overflow-hidden bg-linear-to-br from-[#FF2D8D] to-[#7B3FF2] p-1">
              <img
                src={creator.avatar}
                alt={creator.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <div className="mb-6">
            <h1 className="mb-2">{creator.username}</h1>
            <p className="text-gray-400 mb-4">{creator.bio}</p>

            <div className="flex gap-6 text-sm mb-6">
              <div>
                <span className="block">{creator.postCount}</span>
                <span className="text-gray-400">Posts</span>
              </div>
              <div>
                <span className="block">{creator.subscriberCount?.toLocaleString()}</span>
                <span className="text-gray-400">Subscribers</span>
              </div>
            </div>

            {/* Action Buttons */}
            {!isOwnProfile && (
              <div className="flex gap-3">
                {isSubscribed || !currentUser ? (
                  <Button
                    className="flex-1 bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90"
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </Button>
                ) : (
                  <Button
                    className="flex-1 bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90"
                    onClick={() => navigate(`/subscribe/${creatorId}`)}
                  >
                    Subscribe ${creator.subscriptionPrice}/mo
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="border-gray-700 hover:bg-white/5"
                  disabled={!currentUser || Boolean(!isSubscribed && currentUser)}
                  onClick={() => {
                    if (isSubscribed) {
                      navigate('/messages');
                    }
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            )}

            {!currentUser && (
              <p className="text-sm text-gray-400 mt-4 text-center">
                <a href="/login" className="text-[#FF2D8D] hover:underline">
                  Log in
                </a>{' '}
                to subscribe and message
              </p>
            )}
          </div>

          {/* Subscription Benefits Card */}
          {!isSubscribed && !isOwnProfile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-linear-to-br from-[#FF2D8D]/10 via-[#7B3FF2]/10 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8"
            >
              <h3 className="mb-4">What you'll get:</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF2D8D]" />
                  Full access to {creator.postCount}+ exclusive posts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF2D8D]" />
                  Direct messaging with {creator.username}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF2D8D]" />
                  Cancel anytime
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF2D8D]" />
                  Behind-the-scenes content
                </li>
              </ul>
            </motion.div>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {creatorPosts.map((post, index) => {
              const isLocked = post.isPremium && !isSubscribed && !isOwnProfile;

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => {
                    if (!isLocked) {
                      // Could open full post view
                    }
                  }}
                >
                  <img
                    src={post.imageUrl}
                    alt=""
                    className={`w-full h-full object-cover ${isLocked ? 'blur-xl' : ''}`}
                  />

                  {isLocked && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-[#FF2D8D]" />
                    </div>
                  )}

                  {!isLocked && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <div className="flex items-center gap-1 text-white">
                        <Heart className="w-5 h-5" fill="white" />
                        {post.likes > 1000 ? `${(post.likes / 1000).toFixed(1)}k` : post.likes}
                      </div>
                      <div className="flex items-center gap-1 text-white">
                        <MessageCircle className="w-5 h-5" />
                        {post.comments}
                      </div>
                    </div>
                  )}

                  {post.isPremium && (
                    <div className="absolute top-2 right-2">
                      <Lock className="w-4 h-4 text-white drop-shadow-lg" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {creatorPosts.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No posts yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
