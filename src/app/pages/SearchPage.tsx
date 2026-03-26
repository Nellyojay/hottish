import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';

export default function SearchPage() {
  const { creators, posts, currentUser } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'creators' | 'posts'>('creators');

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

  const filteredCreators = creators.filter(creator =>
    creator.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.bio?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.creator.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-8">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 pt-20 md:pt-24">
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-2xl mb-4 bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] bg-clip-text text-transparent">
            Search
          </h1>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search creators, posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-input border border-border rounded-full py-3 pl-12 pr-12 focus:outline-none focus:border-accent transition-colors"
            />
            {searchQuery && (
              <button
                title='X'
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-white/10">
          <button
            onClick={() => setActiveTab('creators')}
            className={`pb-3 px-4 transition-colors relative ${activeTab === 'creators' ? 'text-[#FF2D8D]' : 'text-gray-400'
              }`}
          >
            Creators
            {activeTab === 'creators' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-3 px-4 transition-colors relative ${activeTab === 'posts' ? 'text-[#FF2D8D]' : 'text-gray-400'
              }`}
          >
            Posts
            {activeTab === 'posts' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2]"
              />
            )}
          </button>
        </div>

        {/* Results */}
        {searchQuery ? (
          <div className="space-y-4">
            {activeTab === 'creators' ? (
              filteredCreators.length > 0 ? (
                filteredCreators.map((creator, index) => (
                  <motion.div
                    key={creator.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => navigate(`/creator/${creator.id}`)}
                    className="flex items-center gap-4 p-4 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#FF2D8D]/50 transition-colors cursor-pointer"
                  >
                    <img
                      src={creator.avatar}
                      alt={creator.username}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{creator.username}</p>
                      <p className="text-sm text-gray-400 line-clamp-1">{creator.bio}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {creator.subscriberCount?.toLocaleString()} subscribers
                      </p>
                    </div>
                    <Button className="bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90">
                      View
                    </Button>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400">
                  No creators found
                </div>
              )
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => navigate(`/creator/${post.creatorId}`)}
                  className="bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-[#FF2D8D]/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 p-4">
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
                  <img
                    src={post.imageUrl}
                    alt=""
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-300 line-clamp-2">{post.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {post.likes.toLocaleString()} likes • {post.comments} comments
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-400">
                No posts found
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            Start typing to search
          </div>
        )}
      </div>
    </div>
  );
}