import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { ArrowLeft, CreditCard, Wallet, Check } from 'lucide-react';
import { Label } from '../components/ui/label';
import { motion } from 'motion/react';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function PaymentPage() {
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const { creators, currentUser, addSubscription, walletBalance } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'apple' | 'google'>('card');
  const [processing, setProcessing] = useState(false);

  const creator = creators.find(c => c.id === creatorId);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-[#0F0F14] text-white flex items-center justify-center">
        <p>Creator not found</p>
      </div>
    );
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      if (creatorId) {
        addSubscription(creatorId);
        alert(`Successfully subscribed! You are now subscribed to ${creator.username}`);
        navigate(`/creator/${creatorId}`);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0F0F14] text-white pb-20 md:pb-8">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 pt-20 md:pt-24">
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
          <h1 className="mb-8">Subscribe to {creator.username}</h1>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Subscription Details */}
            <div className="bg-linear-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-fit">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={creator.avatar}
                  alt={creator.username}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3>{creator.username}</h3>
                  <p className="text-sm text-gray-400">{creator.subscriberCount?.toLocaleString()} subscribers</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Subscription</span>
                  <span>${creator.subscriptionPrice}/month</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">First payment</span>
                  <span>${creator.subscriptionPrice}</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between">
                    <span>Total due today</span>
                    <span className="text-[#FF2D8D]">${creator.subscriptionPrice}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#FF2D8D]/10 rounded-lg p-4 space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF2D8D]" />
                  Full access to all content
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF2D8D]" />
                  Direct messaging
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF2D8D]" />
                  Cancel anytime
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF2D8D]" />
                  Renews monthly
                </p>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-linear-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="mb-6">Payment Method</h3>

              {/* Payment Method Selection */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-lg border transition-all ${paymentMethod === 'card'
                    ? 'border-[#FF2D8D] bg-[#FF2D8D]/10'
                    : 'border-white/10 hover:border-white/20'
                    }`}
                >
                  <CreditCard className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm">Card</p>
                </button>
                <button
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-4 rounded-lg border transition-all ${paymentMethod === 'wallet'
                    ? 'border-[#FF2D8D] bg-[#FF2D8D]/10'
                    : 'border-white/10 hover:border-white/20'
                    }`}
                >
                  <Wallet className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm">Wallet</p>
                  <p className="text-xs text-gray-400">${walletBalance}</p>
                </button>
                <button
                  onClick={() => setPaymentMethod('apple')}
                  className={`p-4 rounded-lg border transition-all ${paymentMethod === 'apple'
                    ? 'border-[#FF2D8D] bg-[#FF2D8D]/10'
                    : 'border-white/10 hover:border-white/20'
                    }`}
                >
                  <div className="text-2xl mb-2"></div>
                  <p className="text-sm">Apple Pay</p>
                </button>
                <button
                  onClick={() => setPaymentMethod('google')}
                  className={`p-4 rounded-lg border transition-all ${paymentMethod === 'google'
                    ? 'border-[#FF2D8D] bg-[#FF2D8D]/10'
                    : 'border-white/10 hover:border-white/20'
                    }`}
                >
                  <div className="text-2xl mb-2">G</div>
                  <p className="text-sm">Google Pay</p>
                </button>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-4">
                {paymentMethod === 'card' && (
                  <>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        required
                        className="bg-white/5 border-gray-700 focus:border-[#FF2D8D] mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry</Label>
                        <Input
                          id="expiry"
                          type="text"
                          placeholder="MM/YY"
                          required
                          className="bg-white/5 border-gray-700 focus:border-[#FF2D8D] mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="text"
                          placeholder="123"
                          required
                          className="bg-white/5 border-gray-700 focus:border-[#FF2D8D] mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Billing Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        defaultValue={currentUser.email}
                        required
                        className="bg-white/5 border-gray-700 focus:border-[#FF2D8D] mt-1"
                      />
                    </div>
                  </>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="bg-[#7B3FF2]/10 rounded-lg p-4">
                    <p className="text-sm mb-2">Available Balance</p>
                    <p className="mb-4">${walletBalance.toFixed(2)}</p>
                    {walletBalance < (creator.subscriptionPrice || 0) && (
                      <p className="text-sm text-red-400">Insufficient balance</p>
                    )}
                  </div>
                )}

                <div className="bg-gray-900/50 rounded-lg p-4 text-sm text-gray-400">
                  <p className="mb-2">Subscription Terms:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Subscription renews monthly on {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</li>
                    <li>• Cancel anytime before renewal date</li>
                    <li>• No refunds for partial months</li>
                    <li>• Auto-renewal can be disabled in settings</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  disabled={processing || (paymentMethod === 'wallet' && walletBalance < (creator.subscriptionPrice || 0))}
                  className="w-full bg-linear-to-r from-[#FF2D8D] to-[#7B3FF2] hover:opacity-90 disabled:opacity-50"
                >
                  {processing ? 'Processing...' : `Subscribe for $${creator.subscriptionPrice}/mo`}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
