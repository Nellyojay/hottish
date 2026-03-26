import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Apple } from 'lucide-react';
import { GrGoogle } from 'react-icons/gr';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    ageConfirm: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!formData.agreeTerms || !formData.ageConfirm) {
      alert('Please accept the terms and confirm you are 18+');
      return;
    }

    // Create mock user
    const newUser = {
      id: `user-${Date.now()}`,
      username: formData.username,
      email: formData.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username}`,
      isCreator: false,
    };

    setCurrentUser(newUser);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="mb-2 bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] bg-clip-text text-transparent">
              FanVault
            </h1>
          </Link>
          <p className="text-muted-foreground">Create your account</p>
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
              <span className="p-2 rounded-lg bg-[#0F0F14] text-gray-400">Or sign up with email</span>
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
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="@username"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-white/5 border-gray-700 focus:border-[#FF2D8D] mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-white/5 border-gray-700 focus:border-[#FF2D8D] mt-1"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="bg-white/5 border-gray-700 focus:border-[#FF2D8D] mt-1"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked: any) =>
                    setFormData({ ...formData, agreeTerms: checked as boolean })
                  }
                  className="border-gray-700 data-[state=checked]:bg-linear-to-r data-[state=checked]:from-[#FF2D8D] data-[state=checked]:to-[#7B3FF2]"
                />
                <label htmlFor="terms" className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="age"
                  checked={formData.ageConfirm}
                  onCheckedChange={(checked: any) =>
                    setFormData({ ...formData, ageConfirm: checked as boolean })
                  }
                  className="border-gray-700 data-[state=checked]:bg-linear-to-r data-[state=checked]:from-[#FF2D8D] data-[state=checked]:to-[#7B3FF2]"
                />
                <label htmlFor="age" className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I confirm that I am at least 18 years old
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90 transition-opacity"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FF2D8D] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}