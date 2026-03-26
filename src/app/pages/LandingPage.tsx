import { Link } from 'react-router';
import { useApp } from '../context/AppContext';
import { Lock, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';

export default function LandingPage() {
  const { creators, posts } = useApp();
  const featuredCreators = creators.slice(0, 3);
  const featuredPosts = posts.slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#FF2D8D]/20 via-[#7B3FF2]/20 to-transparent" />

        <nav className="relative z-10 flex items-center justify-between px-4 md:px-8 py-6">
          <h1 className="bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] bg-clip-text text-transparent">
            FanVault
          </h1>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-foreground hover:bg-accent">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90 transition-opacity text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 md:py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            Connect with Your Favorite Creators
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Subscribe to exclusive content from the world's top creators. Get behind-the-scenes access,
            personal interactions, and premium content you won't find anywhere else.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                Get Started Free
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-700 hover:bg-white/5 w-full sm:w-auto"
              onClick={() => {
                document.getElementById('creators')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Creators
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Featured Creators */}
      <div id="creators" className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
        <h2 className="mb-8 text-center">Featured Creators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCreators.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/creator/${creator.id}`}>
                <div className="bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#FF2D8D]/50 transition-all group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={creator.banner}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                  </div>
                  <div className="p-6 relative -mt-16">
                    <img
                      src={creator.avatar}
                      alt={creator.username}
                      className="w-20 h-20 rounded-full border-4 border-[#0F0F14] mb-4"
                    />
                    <h3 className="mb-2">{creator.username}</h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{creator.bio}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{creator.subscriberCount?.toLocaleString()} subscribers</span>
                      <span className="text-[#FF2D8D]">${creator.subscriptionPrice}/mo</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Preview Posts (Blurred) */}
      <div className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
        <h2 className="mb-8 text-center">Exclusive Content Awaits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 group relative"
            >
              <div className="relative">
                <img
                  src={post.imageUrl}
                  alt=""
                  className="w-full aspect-square object-cover blur-xl"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-12 h-12 mx-auto mb-3 text-[#FF2D8D]" />
                    <p className="text-white mb-4">Subscribe to unlock</p>
                    <Link to="/signup">
                      <Button
                        size="sm"
                        className="bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={post.creator.avatar}
                    alt={post.creator.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{post.creator.username}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 md:px-8 py-20 max-w-4xl mx-auto text-center">
        <div className="bg-linear-to-br from-[#FF2D8D]/20 via-[#7B3FF2]/20 to-transparent rounded-3xl p-12 border border-white/10">
          <h2 className="mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of fans supporting their favorite creators. Sign up now and get exclusive access
            to premium content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90 w-full sm:w-auto"
              >
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 hover:bg-white/5 w-full sm:w-auto"
              >
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; 2026 FanVault. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}