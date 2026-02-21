import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Zap, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@digigrow.agency');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/admin/dashboard');
      console.log("Hi");
    } catch (err) {
      console.log("Bye");
      toast.error('Invalid credentials. Try admin@digigrow.agency / Admin@123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Zap size={32} className="text-white" />
          </div>
          <h1 className="font-syne text-3xl font-extrabold text-white">DigiGrow Admin</h1>
          <p className="text-white/70 mt-2">Sign in to manage your agency</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border-2 border-gray-200 focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Admin@123"
                className="w-full border-2 border-gray-200 focus:border-primary rounded-xl px-4 py-3 pr-12 outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-primary text-white py-4 rounded-xl font-semibold text-base
              hover:shadow-xl transition-all disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In to Dashboard'}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Default: admin@digigrow.agency / Admin@123
          </p>
        </form>
      </div>
    </div>
  );
}
