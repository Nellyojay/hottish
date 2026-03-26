import { Link, useLocation } from 'react-router';
import { useApp } from '../context/AppContext';
import { Home, Search, MessageCircle, User, Bell, Menu, LogOut, LayoutDashboard, KanbanSquare, Settings } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';

export default function Navigation() {
  const { currentUser, setCurrentUser } = useApp();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  if (!currentUser) return null;

  const handleLogout = () => {
    setCurrentUser(null);
    setShowMenu(false);
    setShowMobileMenu(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto w-full px-4 py-3 flex items-center justify-between">
          <Link to="/home">
            <h1 className="bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] bg-clip-text text-transparent">
              FanVault
            </h1>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/home">
              <Button
                variant="ghost"
                size="sm"
                className={isActive('/home') ? 'text-[#FF2D8D]' : 'text-muted-foreground hover:text-foreground'}
              >
                <Home className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/search">
              <Button
                variant="ghost"
                size="sm"
                className={isActive('/search') ? 'text-[#FF2D8D]' : 'text-muted-foreground hover:text-foreground'}
              >
                <Search className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/messages">
              <Button
                variant="ghost"
                size="sm"
                className={isActive('/messages') ? 'text-[#FF2D8D]' : 'text-muted-foreground hover:text-foreground'}
              >
                <MessageCircle className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/notifications">
              <Button
                variant="ghost"
                size="sm"
                className={isActive('/notifications') ? 'text-[#FF2D8D]' : 'text-muted-foreground hover:text-foreground'}
              >
                <Bell className="w-5 h-5" />
              </Button>
            </Link>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMenu(!showMenu)}
                className="text-muted-foreground hover:text-foreground"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  className="w-8 h-8 rounded-full"
                />
              </Button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg border border-border shadow-lg py-2">
                  <Link to={`/creator/${currentUser.id}`} onClick={() => setShowMenu(false)}>
                    <button className="w-full px-4 py-2 text-left hover:bg-accent transition-colors">
                      Profile
                    </button>
                  </Link>
                  {currentUser.isCreator && (
                    <Link to="/dashboard" onClick={() => setShowMenu(false)}>
                      <button className="w-full px-4 py-2 text-left hover:bg-accent transition-colors">
                        Dashboard
                      </button>
                    </Link>
                  )}
                  <Link to="/kanban" onClick={() => setShowMenu(false)}>
                    <button className="w-full px-4 py-2 text-left hover:bg-accent transition-colors">
                      Kanban Board
                    </button>
                  </Link>
                  <Link to="/settings" onClick={() => setShowMenu(false)}>
                    <button className="w-full px-4 py-2 text-left hover:bg-accent transition-colors">
                      Settings
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-accent transition-colors text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-t border-border">
        <div className="flex items-center justify-around px-4 py-3">
          <Link to="/home">
            <Button
              variant="ghost"
              size="sm"
              className={isActive('/home') ? 'text-[#FF2D8D]' : 'text-muted-foreground'}
            >
              <Home className="w-6 h-6" />
            </Button>
          </Link>
          <Link to="/search">
            <Button
              variant="ghost"
              size="sm"
              className={isActive('/search') ? 'text-[#FF2D8D]' : 'text-muted-foreground'}
            >
              <Search className="w-6 h-6" />
            </Button>
          </Link>
          <Link to="/messages">
            <Button
              variant="ghost"
              size="sm"
              className={isActive('/messages') ? 'text-[#FF2D8D]' : 'text-muted-foreground'}
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </Link>
          <Link to="/notifications">
            <Button
              variant="ghost"
              size="sm"
              className={isActive('/notifications') ? 'text-[#FF2D8D]' : 'text-muted-foreground'}
            >
              <Bell className="w-6 h-6" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMobileMenu(true)}
            className="text-muted-foreground"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Sheet */}
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetContent
          side="right"
          className="bg-card border-l border-border w-[280px]"
        >
          <SheetHeader className="border-b border-border pb-4">
            <SheetTitle className="text-foreground">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  className="w-12 h-12 rounded-full border-2 border-linear-to-r from-[#FF2D8D] to-[#7B3FF2]"
                />
                <div className="text-left">
                  <div className="font-semibold">{currentUser.username}</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    {currentUser.isCreator ? 'Creator' : 'Fan'}
                  </div>
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-2 mt-6">
            <Link to={`/creator/${currentUser.id}`} onClick={() => setShowMobileMenu(false)}>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-left">
                <User className="w-5 h-5 text-[#FF2D8D]" />
                <span>My Profile</span>
              </button>
            </Link>

            {currentUser.isCreator && (
              <Link to="/dashboard" onClick={() => setShowMobileMenu(false)}>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-left">
                  <LayoutDashboard className="w-5 h-5 text-[#7B3FF2]" />
                  <span>Creator Dashboard</span>
                </button>
              </Link>
            )}

            <Link to="/kanban" onClick={() => setShowMobileMenu(false)}>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-left">
                <KanbanSquare className="w-5 h-5 text-[#FF2D8D]" />
                <span>Kanban Board</span>
              </button>
            </Link>

            <Link to="/settings" onClick={() => setShowMobileMenu(false)}>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-left">
                <Settings className="w-5 h-5 text-[#7B3FF2]" />
                <span>Settings</span>
              </button>
            </Link>

            <div className="my-4 border-t border-border" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 transition-colors text-left text-red-400"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}