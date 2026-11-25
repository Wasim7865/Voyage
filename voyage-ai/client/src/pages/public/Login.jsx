import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Compass, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const data = await login(email, password);
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role) => {
    if (role === 'admin') {
      setEmail('admin@voyageai.com');
      setPassword('admin123');
    } else {
      setEmail('demo@voyageai.com');
      setPassword('demo123');
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800">
      {/* Left Panel - Hidden on mobile */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950/80 to-voyage-900/60" />
        <div className="relative z-10 text-center px-12 max-w-lg">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Welcome Back to
              <span className="block bg-gradient-to-r from-voyage-300 to-voyage-500 bg-clip-text text-transparent">Voyage AI</span>
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Your journey continues. Explore new horizons and plan amazing adventures with AI.
            </p>
            <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
              <Sparkles className="w-4 h-4 text-voyage-300" />
              25,000+ travelers plan with Voyage AI
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-voyage-500 to-voyage-600 rounded-2xl flex items-center justify-center">
              <Compass className="w-7 h-7 text-white" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-navy-900 mb-2">Sign In</h1>
            <p className="text-navy-400 mb-8">Plan your next adventure</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field !pl-12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field !pl-12 !pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-navy-500 cursor-pointer">
                  <input type="checkbox" className="rounded text-voyage-500 focus:ring-voyage-500" />
                  Remember me
                </label>
                <span className="text-voyage-600 font-semibold hover:text-voyage-700 cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-voyage-300 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-navy-100" />
                <span className="text-xs text-navy-400 font-medium">Quick Demo Access</span>
                <div className="flex-1 h-px bg-navy-100" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => fillDemo('user')}
                  className="py-3 rounded-xl border border-voyage-200 bg-voyage-50 text-voyage-700 text-sm font-semibold hover:bg-voyage-100 transition-colors"
                >
                  User Demo
                </button>
                <button
                  onClick={() => fillDemo('admin')}
                  className="py-3 rounded-xl border border-navy-200 bg-navy-50 text-navy-700 text-sm font-semibold hover:bg-navy-100 transition-colors"
                >
                  Admin Demo
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-navy-400 mt-8">
              Don't have an account?{' '}
              <Link to="/register" className="text-voyage-600 font-semibold hover:text-voyage-700">
                Create Account
              </Link>
            </p>
          </div>

          <p className="text-center text-white/40 text-sm mt-6">
            <Link to="/" className="hover:text-white/60 transition-colors">← Back to Home</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}