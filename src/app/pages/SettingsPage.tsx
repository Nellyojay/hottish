import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Moon, Sun, User, Bell, Shield, HelpCircle, Info, ArrowLeft } from 'lucide-react';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';

export default function SettingsPage() {
  const { currentUser, theme, setTheme } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-[#0F0F14] pb-20 md:pb-0 md:pt-16">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button
            title='back'
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} color='orange' />
          </button>
          <h1 className="bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-gray-400">Manage your account preferences</p>
        </div>

        {/* Account Section */}
        <div className="bg-card rounded-xl border border-border/50 backdrop-blur-lg mb-4 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-[#FF2D8D]" />
              <h3 className="text-foreground">Account</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
                <div>
                  <div className="font-medium text-foreground">{currentUser.username}</div>
                  <div className="text-sm text-muted-foreground">{currentUser.email}</div>
                </div>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  className="w-12 h-12 rounded-full border-2 border-[#FF2D8D]"
                />
              </div>
              {currentUser.isCreator && (
                <div className="p-3 rounded-lg bg-linear-to-r from-[#FF2D8D]/10 to-[#7B3FF2]/10 border border-[#FF2D8D]/20">
                  <div className="text-sm font-medium text-foreground">Creator Account</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    You have access to creator features
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-card rounded-xl border border-border/50 backdrop-blur-lg mb-4 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Sun className="w-5 h-5 text-[#7B3FF2]" />
              <h3 className="text-foreground">Appearance</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-[#FF2D8D]" />
                  ) : (
                    <Sun className="w-5 h-5 text-[#FF2D8D]" />
                  )}
                  <div>
                    <div className="font-medium text-foreground">Dark Mode</div>
                    <div className="text-sm text-muted-foreground">
                      {theme === 'dark' ? 'Dark theme enabled' : 'Light theme enabled'}
                    </div>
                  </div>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(checked: any) => setTheme(checked ? 'dark' : 'light')}
                  className={`${theme === 'dark' ? 'bg-white' : 'bg-amber-500'}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-card rounded-xl border border-border/50 backdrop-blur-lg mb-4 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Bell className="w-5 h-5 text-[#FF2D8D]" />
              <h3 className="text-foreground">Notifications</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                <div>
                  <div className="font-medium text-foreground">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive notifications on your device</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                <div>
                  <div className="font-medium text-foreground">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Get updates via email</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                <div>
                  <div className="font-medium text-foreground">New Subscribers</div>
                  <div className="text-sm text-muted-foreground">Notify when someone subscribes</div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Security Section */}
        <div className="bg-card rounded-xl border border-border/50 backdrop-blur-lg mb-4 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-5 h-5 text-[#7B3FF2]" />
              <h3 className="text-foreground">Privacy & Security</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                <div>
                  <div className="font-medium text-foreground">Private Account</div>
                  <div className="text-sm text-muted-foreground">Require approval for new followers</div>
                </div>
                <Switch />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                <div>
                  <div className="font-medium text-foreground">Two-Factor Authentication</div>
                  <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-card rounded-xl border border-border/50 backdrop-blur-lg overflow-hidden">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Info className="w-5 h-5 text-[#FF2D8D]" />
              <h3 className="text-foreground">About</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors text-left">
                <div>
                  <div className="font-medium text-foreground">Help Center</div>
                  <div className="text-sm text-muted-foreground">Get support and answers</div>
                </div>
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
              </button>
              <Separator className="bg-border/50" />
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-sm text-muted-foreground">Version 1.0.0</div>
                <div className="text-xs text-muted-foreground mt-1">© 2026 FanVault. All rights reserved.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
