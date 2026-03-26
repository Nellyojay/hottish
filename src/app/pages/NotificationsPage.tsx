import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Heart, MessageCircle, UserPlus, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';
import Navigation from '../components/Navigation';

export default function NotificationsPage() {
  const { currentUser, markNotificationAsRead } = useApp();
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

  // Mock notifications for demonstration
  const mockNotifications = [
    {
      id: 'n1',
      userId: currentUser.id,
      type: 'like' as const,
      content: 'liked your post',
      fromUser: {
        id: '2',
        username: 'MaxFitPro',
        avatar: 'https://images.unsplash.com/photo-1588609229274-b39e162d1219?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kc29tZSUyMG1hbiUyMGZpdG5lc3N8ZW58MXx8fHwxNzc0MDk5NDQwfDA&ixlib=rb-4.1.0&q=80&w=400',
      },
      timestamp: new Date('2026-03-22T02:30:00'),
      read: false,
    },
    {
      id: 'n2',
      userId: currentUser.id,
      type: 'comment' as const,
      content: 'commented on your post: "This is amazing! 🔥"',
      fromUser: {
        id: '3',
        username: 'ZenWithZara',
        avatar: 'https://images.unsplash.com/photo-1712509576315-372df3130f76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjB3b21hbiUyMHlvZ2F8ZW58MXx8fHwxNzc0MDk5NDQxfDA&ixlib=rb-4.1.0&q=80&w=400',
      },
      timestamp: new Date('2026-03-22T01:15:00'),
      read: false,
    },
    {
      id: 'n3',
      userId: currentUser.id,
      type: 'subscription' as const,
      content: 'subscribed to your content',
      fromUser: {
        id: '4',
        username: 'EllaGlam',
        avatar: 'https://images.unsplash.com/photo-1734794070127-3ef2bad0510e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRyYWN0aXZlJTIwd29tYW4lMjBmYXNoaW9ufGVufDF8fHx8MTc3NDA5OTQ0MXww&ixlib=rb-4.1.0&q=80&w=400',
      },
      timestamp: new Date('2026-03-21T23:45:00'),
      read: false,
    },
    {
      id: 'n4',
      userId: currentUser.id,
      type: 'tip' as const,
      content: 'sent you a tip of $10.00',
      fromUser: {
        id: '5',
        username: 'RhythmRider',
        avatar: 'https://images.unsplash.com/photo-1629735951612-65b0f1724031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbiUyMGFydGlzdCUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc3NDA5OTQ0MXww&ixlib=rb-4.1.0&q=80&w=400',
      },
      timestamp: new Date('2026-03-21T20:30:00'),
      read: true,
    },
    {
      id: 'n5',
      userId: currentUser.id,
      type: 'message' as const,
      content: 'sent you a message',
      fromUser: {
        id: '1',
        username: 'SophiaRose',
        avatar: 'https://images.unsplash.com/photo-1696489283182-0446be970e40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRyYWN0aXZlJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzQwOTk0NDB8MA&ixlib=rb-4.1.0&q=80&w=400',
      },
      timestamp: new Date('2026-03-21T18:15:00'),
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-[#FF2D8D]" fill="#FF2D8D" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-[#7B3FF2]" />;
      case 'subscription':
        return <UserPlus className="w-5 h-5 text-[#FF2D8D]" />;
      case 'tip':
        return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Heart className="w-5 h-5 text-gray-400" />;
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (notification.type === 'message') {
      navigate('/messages');
    } else if (notification.fromUser) {
      navigate(`/creator/${notification.fromUser.id}`);
    }
    if (!notification.read) {
      markNotificationAsRead(notification.id);
    }
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-8">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 pt-20 md:pt-24">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] bg-clip-text text-transparent">
            Notifications
          </h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-400 mt-1">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {mockNotifications.length > 0 ? (
            mockNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleNotificationClick(notification)}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${notification.read
                  ? 'bg-white/2 border-white/5 hover:border-white/10'
                  : 'bg-linear-to-br from-white/10 to-white/5 border-[#FF2D8D]/30 hover:border-[#FF2D8D]/50'
                  }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={notification.fromUser?.avatar}
                    alt={notification.fromUser?.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#0F0F14] rounded-full p-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{notification.fromUser?.username}</span>{' '}
                    <span className="text-gray-400">{notification.content}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {getTimeAgo(notification.timestamp)}
                  </p>
                </div>

                {/* Unread Indicator */}
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-[#FF2D8D] shrink-0 mt-2" />
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p>No notifications yet</p>
              <p className="text-sm mt-2">When you get notifications, they'll show up here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(timestamp: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - timestamp.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else {
    return timestamp.toLocaleDateString();
  }
}