import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Upload, Image as ImageIcon, Video, DollarSign } from 'lucide-react';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { motion } from 'motion/react';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function CreatorDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useApp();
  const [postCount, setPostCount] = useState(0);
  const POST_LIMIT = 50;

  const [formData, setFormData] = useState({
    caption: '',
    mediaType: 'image' as 'image' | 'video',
    postType: 'subscribers' as 'free' | 'subscribers' | 'ppv',
    price: '',
  });

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (postCount >= POST_LIMIT) {
      alert(`Daily limit reached: Maximum ${POST_LIMIT} posts per day`);
      return;
    }

    // Simulate post creation
    alert('Post created successfully! Your content is now live',
    );

    setPostCount(prev => prev + 1);
    setFormData({
      caption: '',
      mediaType: 'image',
      postType: 'subscribers',
      price: '',
    });
  };

  return (
    <div className="min-h-screen bg-[#0F0F14] text-white pb-20 md:pb-8">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 pt-20 md:pt-24">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="mb-2">Create Post</h1>
              <p className="text-gray-400">Share exclusive content with your subscribers</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Posts today</p>
              <p className="text-[#FF2D8D]">{postCount}/{POST_LIMIT}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Upload Area */}
            <div className="bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="mb-4">Upload Media</h3>

              <div className="mb-6">
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => setFormData({ ...formData, mediaType: 'image' })}
                    className={`flex-1 p-4 rounded-lg border transition-all ${formData.mediaType === 'image'
                      ? 'border-[#FF2D8D] bg-[#FF2D8D]/10'
                      : 'border-white/10 hover:border-white/20'
                      }`}
                  >
                    <ImageIcon className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm">Image</p>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, mediaType: 'video' })}
                    className={`flex-1 p-4 rounded-lg border transition-all ${formData.mediaType === 'video'
                      ? 'border-[#FF2D8D] bg-[#FF2D8D]/10'
                      : 'border-white/10 hover:border-white/20'
                      }`}
                  >
                    <Video className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm">Video</p>
                  </button>
                </div>

                <div className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center hover:border-[#FF2D8D] transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-400">
                    {formData.mediaType === 'image' ? 'PNG, JPG up to 10MB' : 'MP4, MOV up to 100MB'}
                  </p>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-black/30 rounded-lg aspect-square flex items-center justify-center">
                <p className="text-gray-500">Preview will appear here</p>
              </div>
            </div>

            {/* Post Details */}
            <div className="bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="mb-4">Post Details</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="caption">Caption</Label>
                  <Textarea
                    id="caption"
                    placeholder="Write a caption..."
                    value={formData.caption}
                    onChange={(e: any) => setFormData({ ...formData, caption: e.target.value })}
                    className="bg-white/5 border-gray-700 focus:border-[#FF2D8D] mt-1 min-h-30"
                  />
                </div>

                <div>
                  <Label>Post Type</Label>
                  <div className="grid grid-cols-1 gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, postType: 'free', price: '' })}
                      className={`p-3 rounded-lg border text-left transition-all ${formData.postType === 'free'
                        ? 'border-[#FF2D8D] bg-[#FF2D8D]/10'
                        : 'border-white/10 hover:border-white/20'
                        }`}
                    >
                      <p className="mb-1">Free Post</p>
                      <p className="text-xs text-gray-400">Visible to everyone</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, postType: 'subscribers', price: '' })}
                      className={`p-3 rounded-lg border text-left transition-all ${formData.postType === 'subscribers'
                        ? 'border-[#FF2D8D] bg-[#FF2D8D]/10'
                        : 'border-white/10 hover:border-white/20'
                        }`}
                    >
                      <p className="mb-1">Subscribers Only</p>
                      <p className="text-xs text-gray-400">Only for active subscribers</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, postType: 'ppv' })}
                      className={`p-3 rounded-lg border text-left transition-all ${formData.postType === 'ppv'
                        ? 'border-[#FF2D8D] bg-[#FF2D8D]/10'
                        : 'border-white/10 hover:border-white/20'
                        }`}
                    >
                      <p className="mb-1">Pay-Per-View</p>
                      <p className="text-xs text-gray-400">One-time purchase</p>
                    </button>
                  </div>
                </div>

                {formData.postType === 'ppv' && (
                  <div>
                    <Label htmlFor="price">Price (USD)</Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="pl-10 bg-white/5 border-gray-700 focus:border-[#FF2D8D]"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="bg-[#7B3FF2]/10 rounded-lg p-4 text-sm">
                  <p className="mb-2 text-[#7B3FF2]">Rate Limits:</p>
                  <ul className="space-y-1 text-xs text-gray-400">
                    <li>• Maximum 50 posts per day</li>
                    <li>• Posts today: {postCount}/{POST_LIMIT}</li>
                    <li>• Resets at midnight UTC</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  disabled={postCount >= POST_LIMIT || !formData.caption}
                  className="w-full bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90 disabled:opacity-50"
                >
                  Publish Post
                </Button>
              </form>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <p className="text-gray-400 mb-2">Total Subscribers</p>
              <p className="mb-1">1,245</p>
              <p className="text-sm text-green-400">+12% this month</p>
            </div>

            <div className="bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <p className="text-gray-400 mb-2">Monthly Revenue</p>
              <p className="mb-1">$18,675</p>
              <p className="text-sm text-green-400">+8% this month</p>
            </div>

            <div className="bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <p className="text-gray-400 mb-2">Engagement Rate</p>
              <p className="mb-1">94.2%</p>
              <p className="text-sm text-green-400">+3% this week</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
