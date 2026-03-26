import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Send, Lock, Search } from 'lucide-react';
import { motion } from 'motion/react';
import Navigation from '../components/Navigation';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export default function MessagesPage() {
  const navigate = useNavigate();
  const { currentUser, creators, messages, addMessage, isSubscribedTo } = useApp();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const MESSAGE_LIMIT = 100;

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

  // Get conversations with creators
  const conversations = creators
    .filter(creator => creator.isCreator)
    .map(creator => {
      const creatorMessages = messages.filter(
        m => (m.fromUserId === currentUser.id && m.toUserId === creator.id) ||
          (m.fromUserId === creator.id && m.toUserId === currentUser.id)
      );
      const lastMessage = creatorMessages[creatorMessages.length - 1];

      return {
        creator,
        messages: creatorMessages,
        lastMessage,
        isSubscribed: isSubscribedTo(creator.id),
      };
    })
    .filter(conv =>
      conv.creator.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage?.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const selectedConversation = conversations.find(c => c.creator.id === selectedChat);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedChat || !messageText.trim()) return;

    // Check rate limit
    if (messageCount >= MESSAGE_LIMIT) {
      alert(`Rate limit: Maximum ${MESSAGE_LIMIT} messages per hour`);
      return;
    }

    // Check subscription
    if (!selectedConversation?.isSubscribed) {
      alert('You must subscribe to message this creator');
      return;
    }

    addMessage(selectedChat, messageText);
    setMessageText('');
    setMessageCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-8">
      <Navigation />

      <div className="max-w-6xl mx-auto pt-20 md:pt-24 h-screen flex flex-col md:flex-row">
        {/* Conversations List */}
        <div className={`w-full md:w-80 border-r border-white/10 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-white/10">
            <h2 className="mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search messages..."
                className="pl-10 bg-white/5 border-gray-700 focus:border-[#FF2D8D]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.creator.id}
                onClick={() => setSelectedChat(conv.creator.id)}
                className={`w-full p-4 flex items-center gap-3 hover:bg-white/5 transition-colors border-b border-white/5 ${selectedChat === conv.creator.id ? 'bg-white/5' : ''
                  }`}
              >
                <div className="relative">
                  <img
                    src={conv.creator.avatar}
                    alt={conv.creator.username}
                    className="w-12 h-12 rounded-full"
                  />
                  {!conv.isSubscribed && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FF2D8D] rounded-full flex items-center justify-center">
                      <Lock className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div className="flex-1 text-left overflow-hidden">
                  <p className="truncate">{conv.creator.username}</p>
                  {conv.lastMessage ? (
                    <p className="text-sm text-gray-400 truncate">
                      {conv.lastMessage.content}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">
                      {conv.isSubscribed ? 'Start a conversation' : 'Subscribe to message'}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
          {selectedChat && selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedChat(null)}
                  className="md:hidden"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <img
                  src={selectedConversation.creator.avatar}
                  alt={selectedConversation.creator.username}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => navigate(`/creator/${selectedConversation.creator.id}`)}
                />
                <div className="flex-1">
                  <p>{selectedConversation.creator.username}</p>
                  <p className="text-xs text-gray-400">
                    {selectedConversation.isSubscribed ? 'Active subscriber' : 'Not subscribed'}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {!selectedConversation.isSubscribed ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center max-w-sm">
                      <Lock className="w-16 h-16 mx-auto mb-4 text-[#FF2D8D]" />
                      <h3 className="mb-2">Subscribe to message this creator</h3>
                      <p className="text-gray-400 mb-6">
                        Get unlimited messaging access when you subscribe to {selectedConversation.creator.username}
                      </p>
                      <Button
                        onClick={() => navigate(`/subscribe/${selectedConversation.creator.id}`)}
                        className="bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90"
                      >
                        Subscribe ${selectedConversation.creator.subscriptionPrice}/mo
                      </Button>
                    </div>
                  </div>
                ) : selectedConversation.messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  selectedConversation.messages.map((msg) => {
                    const isOwn = msg.fromUserId === currentUser.id;
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${isOwn
                            ? 'bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2]'
                            : 'bg-white/5'
                            }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/10">
                {selectedConversation.isSubscribed ? (
                  <>
                    <div className="text-xs text-gray-400 mb-2">
                      Messages sent: {messageCount}/{MESSAGE_LIMIT} per hour
                    </div>
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type a message..."
                        className="bg-white/5 border-gray-700 focus:border-[#FF2D8D]"
                        disabled={messageCount >= MESSAGE_LIMIT}
                      />
                      <Button
                        type="submit"
                        disabled={!messageText.trim() || messageCount >= MESSAGE_LIMIT}
                        className="bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-gray-400 py-2">
                    <Lock className="w-4 h-4" />
                    <span className="text-sm">Subscribe to send messages</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}