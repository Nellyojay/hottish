import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { Label } from '../components/ui/label';
import { Apple } from 'lucide-react';
import { GrGoogle } from 'react-icons/gr';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock login - create a user
    const mockUser = {
      id: 'user-demo',
      username: 'DemoUser',
      email: formData.email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
      isCreator: false,
    };

    setCurrentUser(mockUser);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] bg-clip-text text-transparent mb-2">
              FanVault
            </h1>
          </Link>
          <p className="text-gray-400">Welcome back</p>
        </div>

        <div className="bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full border-gray-700 hover:bg-white/5"
              type="button"
            >
              <GrGoogle className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-700 hover:bg-white/5"
              type="button"
            >
              <Apple className="w-5 h-5 mr-2" />
              Continue with Apple
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="p-2 rounded-lg bg-[#0F0F14] text-gray-400">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/5 border-gray-700 focus:border-[#FF2D8D] mt-1"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-[#FF2D8D] hover:underline">
                  Forgot?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-white/5 border-gray-700 focus:border-[#FF2D8D]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90 transition-opacity"
            >
              Log In
            </Button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#FF2D8D] hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}