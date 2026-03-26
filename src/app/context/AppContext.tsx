import { createContext, useContext, useState, type ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  isCreator: boolean;
  bio?: string;
  subscriptionPrice?: number;
  postCount?: number;
  subscriberCount?: number;
  banner?: string;
}

export interface Post {
  id: string;
  creatorId: string;
  creator: User;
  content: string;
  imageUrl: string;
  isPremium: boolean;
  price?: number;
  likes: number;
  comments: number;
  timestamp: Date;
  likedBy?: string[]; // User IDs who liked this post
}

export interface FetishPost {
  id: string;
  anonymousId: string; // Anonymous identifier for the author
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  likedBy?: string[];
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  timestamp: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'subscription' | 'message' | 'tip';
  content: string;
  fromUser?: User;
  timestamp: Date;
  read: boolean;
  postId?: string;
  fetishPostId?: string;
}

export interface Subscription {
  id: string;
  creatorId: string;
  subscribedAt: Date;
  renewsAt: Date;
}

export interface Message {
  id: string;
  fromUserId: string;
  toUserId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  fetishPostSnippet?: string; // Reference to fetish post if message is about one
}

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  subscriptions: Subscription[];
  addSubscription: (creatorId: string) => void;
  isSubscribedTo: (creatorId: string) => boolean;
  posts: Post[];
  fetishPosts: FetishPost[];
  creators: User[];
  messages: Message[];
  addMessage: (toUserId: string, content: string, fetishPostSnippet?: string) => void;
  walletBalance: number;
  toggleLike: (postId: string, isFetishPost?: boolean) => void;
  hasLiked: (postId: string, isFetishPost?: boolean) => boolean;
  comments: Comment[];
  addComment: (postId: string, content: string) => void;
  getCommentsForPost: (postId: string) => Comment[];
  notifications: Notification[];
  markNotificationAsRead: (notificationId: string) => void;
  addTip: (creatorId: string, amount: number) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockCreators: User[] = [
  {
    id: '1',
    username: 'SophiaRose',
    email: 'sophia@example.com',
    avatar: 'https://images.unsplash.com/photo-1696489283182-0446be970e40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRyYWN0aXZlJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzQwOTk0NDB8MA&ixlib=rb-4.1.0&q=80&w=400',
    isCreator: true,
    bio: '✨ Fitness & Lifestyle • Exclusive content daily • Top 1% creator',
    subscriptionPrice: 14.99,
    postCount: 342,
    subscriberCount: 12400,
    banner: 'https://images.unsplash.com/photo-1667857853419-fc7aa7fdbef6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJlYWNoJTIwc3Vuc2V0fGVufDF8fHx8MTc3NDA4NzA4OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    username: 'MaxFitPro',
    email: 'max@example.com',
    avatar: 'https://images.unsplash.com/photo-1588609229274-b39e162d1219?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kc29tZSUyMG1hbiUyMGZpdG5lc3N8ZW58MXx8fHwxNzc0MDk5NDQwfDA&ixlib=rb-4.1.0&q=80&w=400',
    isCreator: true,
    bio: '🏋️ Personal Trainer • Workout Plans • Nutrition Tips',
    subscriptionPrice: 9.99,
    postCount: 189,
    subscriberCount: 8700,
    banner: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1080',
  },
  {
    id: '3',
    username: 'ZenWithZara',
    email: 'zara@example.com',
    avatar: 'https://images.unsplash.com/photo-1712509576315-372df3130f76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjB3b21hbiUyMHlvZ2F8ZW58MXx8fHwxNzc0MDk5NDQxfDA&ixlib=rb-4.1.0&q=80&w=400',
    isCreator: true,
    bio: '🧘‍♀️ Yoga Instructor • Meditation • Mindfulness Journey',
    subscriptionPrice: 12.99,
    postCount: 256,
    subscriberCount: 9500,
    banner: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1080',
  },
  {
    id: '4',
    username: 'EllaGlam',
    email: 'ella@example.com',
    avatar: 'https://images.unsplash.com/photo-1734794070127-3ef2bad0510e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRyYWN0aXZlJTIwd29tYW4lMjBmYXNoaW9ufGVufDF8fHx8MTc3NDA5OTQ0MXww&ixlib=rb-4.1.0&q=80&w=400',
    isCreator: true,
    bio: '💄 Fashion & Beauty • Behind the scenes • VIP access',
    subscriptionPrice: 19.99,
    postCount: 421,
    subscriberCount: 15200,
    banner: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1080',
  },
  {
    id: '5',
    username: 'RhythmRider',
    email: 'rhythm@example.com',
    avatar: 'https://images.unsplash.com/photo-1629735951612-65b0f1724031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbiUyMGFydGlzdCUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc3NDA5OTQ0MXww&ixlib=rb-4.1.0&q=80&w=400',
    isCreator: true,
    bio: '🎵 Music Producer • Exclusive tracks • Studio sessions',
    subscriptionPrice: 11.99,
    postCount: 167,
    subscriberCount: 6800,
    banner: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1080',
  },
];

const mockPosts: Post[] = [
  {
    id: 'p1',
    creatorId: '1',
    creator: mockCreators[0],
    content: 'Morning workout complete! 💪 New exclusive routine dropping soon for subscribers!',
    imageUrl: 'https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29ya291dCUyMGd5bXxlbnwxfHx8fDE3NzQwNTEzNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isPremium: true,
    likes: 1243,
    comments: 87,
    timestamp: new Date('2026-03-21T08:30:00'),
  },
  {
    id: 'p2',
    creatorId: '2',
    creator: mockCreators[1],
    content: 'Check out my transformation journey! Subscribe for full workout plans 🔥',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800',
    isPremium: true,
    likes: 892,
    comments: 54,
    timestamp: new Date('2026-03-21T07:15:00'),
  },
  {
    id: 'p3',
    creatorId: '3',
    creator: mockCreators[2],
    content: 'Sunrise yoga session 🌅 Join me for exclusive meditation content',
    imageUrl: 'https://images.unsplash.com/photo-1635545999375-057ee4013deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHdlbGxuZXNzfGVufDF8fHx8MTc3NDAzMDQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    isPremium: true,
    likes: 567,
    comments: 32,
    timestamp: new Date('2026-03-21T06:00:00'),
  },
  {
    id: 'p4',
    creatorId: '4',
    creator: mockCreators[3],
    content: 'Behind the scenes from today\'s photoshoot ✨',
    imageUrl: 'https://images.unsplash.com/photo-1696377924143-e9ad743cc4c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwaG90b3Nob290fGVufDF8fHx8MTc3NDA5OTg1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    isPremium: true,
    likes: 2103,
    comments: 143,
    timestamp: new Date('2026-03-20T18:45:00'),
  },
  {
    id: 'p5',
    creatorId: '5',
    creator: mockCreators[4],
    content: 'New track preview! Full version for subscribers only 🎧',
    imageUrl: 'https://images.unsplash.com/photo-1637071220527-fbb98fa15892?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMHJlY29yZGluZ3xlbnwxfHx8fDE3NzQwOTM3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isPremium: true,
    likes: 734,
    comments: 61,
    timestamp: new Date('2026-03-20T15:30:00'),
  },
  {
    id: 'p6',
    creatorId: '1',
    creator: mockCreators[0],
    content: 'Throwback to last summer! What should I post next? 🌴',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    isPremium: false,
    likes: 3421,
    comments: 198,
    timestamp: new Date('2026-03-20T12:00:00'),
  },
];

const mockFetishPosts: FetishPost[] = [
  {
    id: 'f1',
    anonymousId: 'anon_butterfly23',
    content: 'I have this thing about watching people tie their shoes... Something about the focus and concentration drives me wild. Anyone else?',
    timestamp: new Date('2026-03-22T03:15:00'),
    likes: 234,
    comments: 45,
    likedBy: [],
  },
  {
    id: 'f2',
    anonymousId: 'anon_midnight_whisper',
    content: 'The sound of high heels on marble floors... I could listen to it all day. It\'s so mesmerizing and powerful.',
    timestamp: new Date('2026-03-22T01:30:00'),
    likes: 567,
    comments: 89,
    likedBy: [],
  },
  {
    id: 'f3',
    anonymousId: 'anon_velvet_dreams',
    content: 'I\'m obsessed with the smell of old books. Libraries are my happy place. The paper, the ink... pure bliss.',
    timestamp: new Date('2026-03-21T22:45:00'),
    likes: 412,
    comments: 67,
    likedBy: [],
  },
  {
    id: 'f4',
    anonymousId: 'anon_silver_fox',
    content: 'Anyone else get butterflies when someone rolls up their sleeves? That forearm reveal is *chef\'s kiss*',
    timestamp: new Date('2026-03-21T20:10:00'),
    likes: 891,
    comments: 134,
    likedBy: [],
  },
  {
    id: 'f5',
    anonymousId: 'anon_moonlight_shadow',
    content: 'Watching someone concentrate while they drive... The way their jaw sets, their hands on the wheel. I melt every time.',
    timestamp: new Date('2026-03-21T18:30:00'),
    likes: 723,
    comments: 98,
    likedBy: [],
  },
  {
    id: 'f6',
    anonymousId: 'anon_crimson_rose',
    content: 'I have a weakness for deep voices in the morning. That raspy, just-woke-up tone? Absolutely devastating.',
    timestamp: new Date('2026-03-21T15:20:00'),
    likes: 1034,
    comments: 156,
    likedBy: [],
  },
  {
    id: 'f7',
    anonymousId: 'anon_electric_pulse',
    content: 'The way someone bites their lip when they\'re thinking... I can\'t be the only one who finds this incredibly attractive?',
    timestamp: new Date('2026-03-21T12:05:00'),
    likes: 654,
    comments: 87,
    likedBy: [],
  },
  {
    id: 'f8',
    anonymousId: 'anon_starlight_seeker',
    content: 'Rain on windows while someone reads next to me. That\'s my ultimate fantasy. Simple but perfect.',
    timestamp: new Date('2026-03-21T09:40:00'),
    likes: 445,
    comments: 52,
    likedBy: [],
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [walletBalance] = useState(50.00);
  const [comments, setComments] = useState<Comment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [fetishPosts, setFetishPosts] = useState<FetishPost[]>(mockFetishPosts);
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    // Initialize from localStorage or default to dark
    try {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      return savedTheme || 'dark';
    } catch (error) {
      return 'dark';
    }
  });

  // Persist theme to localStorage
  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const addSubscription = (creatorId: string) => {
    const newSub: Subscription = {
      id: `sub-${Date.now()}`,
      creatorId,
      subscribedAt: new Date(),
      renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    };
    setSubscriptions([...subscriptions, newSub]);
  };

  const isSubscribedTo = (creatorId: string) => {
    return subscriptions.some(sub => sub.creatorId === creatorId);
  };

  const addMessage = (toUserId: string, content: string, fetishPostSnippet?: string) => {
    if (!currentUser) return;
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      fromUserId: currentUser.id,
      toUserId,
      content,
      timestamp: new Date(),
      read: false,
      fetishPostSnippet,
    };
    setMessages([...messages, newMessage]);
  };

  const toggleLike = (postId: string, isFetishPost?: boolean) => {
    if (!currentUser) return;
    if (isFetishPost) {
      setFetishPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id === postId) {
            const likedBy = post.likedBy || [];
            const hasLiked = likedBy.includes(currentUser.id);
            return {
              ...post,
              likedBy: hasLiked
                ? likedBy.filter(id => id !== currentUser.id)
                : [...likedBy, currentUser.id],
              likes: hasLiked ? post.likes - 1 : post.likes + 1
            };
          }
          return post;
        })
      );
    } else {
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id === postId) {
            const likedBy = post.likedBy || [];
            const hasLiked = likedBy.includes(currentUser.id);
            return {
              ...post,
              likedBy: hasLiked
                ? likedBy.filter(id => id !== currentUser.id)
                : [...likedBy, currentUser.id],
              likes: hasLiked ? post.likes - 1 : post.likes + 1
            };
          }
          return post;
        })
      );
    }
  };

  const hasLiked = (postId: string, isFetishPost?: boolean) => {
    if (!currentUser) return false;
    if (isFetishPost) {
      const post = fetishPosts.find(p => p.id === postId);
      return post?.likedBy?.includes(currentUser.id) || false;
    } else {
      const post = posts.find(p => p.id === postId);
      return post?.likedBy?.includes(currentUser.id) || false;
    }
  };

  const addComment = (postId: string, content: string) => {
    if (!currentUser) return;
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      postId,
      userId: currentUser.id,
      user: currentUser,
      content,
      timestamp: new Date(),
    };
    setComments([...comments, newComment]);
  };

  const getCommentsForPost = (postId: string) => {
    return comments.filter(comment => comment.postId === postId);
  };

  const markNotificationAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  const addTip = (creatorId: string, amount: number) => {
    if (!currentUser) return;
    const creatorIndex = mockCreators.findIndex(creator => creator.id === creatorId);
    if (creatorIndex !== -1) {
      const creator = mockCreators[creatorIndex];
      const updatedCreator = { ...creator, subscriberCount: (creator.subscriberCount || 0) + 1 };
      const updatedCreators = [...mockCreators];
      updatedCreators[creatorIndex] = updatedCreator;
      mockCreators.splice(creatorIndex, 1, updatedCreator);
    }
    const newNotification: Notification = {
      id: `notification-${Date.now()}`,
      userId: creatorId,
      type: 'tip',
      content: `${currentUser.username} sent you a tip of $${amount}`,
      fromUser: currentUser,
      timestamp: new Date(),
      read: false,
    };
    setNotifications([...notifications, newNotification]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        subscriptions,
        addSubscription,
        isSubscribedTo,
        posts,
        fetishPosts,
        creators: mockCreators,
        messages,
        addMessage,
        walletBalance,
        toggleLike,
        hasLiked,
        comments,
        addComment,
        getCommentsForPost,
        notifications,
        markNotificationAsRead,
        addTip,
        theme,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}