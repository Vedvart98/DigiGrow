import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Calendar, Megaphone, MessageSquare,
  Mail, LogOut, TrendingUp, Users, Zap, Bell, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dashboardApi, bookingApi } from '../../services/api';
import toast from 'react-hot-toast';

// ===================== SIDEBAR =====================
const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Calendar, label: 'Bookings', path: '/admin/bookings' },
  { icon: Megaphone, label: 'Campaigns', path: '/admin/campaigns' },
  { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
  { icon: Users, label: 'Testimonials', path: '/admin/testimonials' },
];

function Sidebar({ active }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  return (
    <aside className="w-64 gradient-hero min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
          <div>
            <div className="font-syne font-bold text-white text-lg">DigiGrow</div>
            <div className="text-white/60 text-xs">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
              ${active === path
                ? 'bg-white/20 text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
          >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
            <ChevronRight size={16} className={`ml-auto transition-transform ${active === path ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />
          </Link>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 gradient-primary rounded-full flex items-center justify-center
            font-bold text-white text-sm">
            {user?.name?.slice(0, 2)?.toUpperCase() || 'AD'}
          </div>
          <div>
            <div className="text-white text-sm font-medium">{user?.name || 'Admin'}</div>
            <div className="text-white/50 text-xs">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-white/70 hover:text-red-400
            px-3 py-2 rounded-lg hover:bg-red-500/10 transition-all text-sm"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </aside>
  );
}

// ===================== STAT CARD =====================
function StatCard({ label, value, icon: Icon, color, change }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon size={22} className="text-white" />
        </div>
        {change && (
          <span className="text-green-500 text-sm font-semibold flex items-center gap-1">
            <TrendingUp size={14} /> {change}
          </span>
        )}
      </div>
      <div className="font-syne text-3xl font-bold text-dark mb-1">{value ?? '—'}</div>
      <div className="text-gray-500 text-sm">{label}</div>
    </motion.div>
  );
}

// ===================== DASHBOARD PAGE =====================
export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      dashboardApi.getStats().catch(() => null),
      bookingApi.getAll(0, 5).catch(() => null),
    ]).then(([statsRes, bookingsRes]) => {
      if (statsRes?.data) setStats(statsRes.data);
      if (bookingsRes?.data?.content) setRecentBookings(bookingsRes.data.content);
    }).finally(() => setLoading(false));
  }, []);

  const statusColor = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    CONFIRMED: 'bg-blue-100 text-blue-700',
    COMPLETED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active="/admin/dashboard" />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-syne text-3xl font-bold text-dark">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
            <Link
              to="/"
              className="gradient-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold"
            >
              View Website →
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Bookings"
            value={stats?.bookings?.total ?? '—'}
            icon={Calendar}
            color="gradient-primary"
            change="+12%"
          />
          <StatCard
            label="Pending Bookings"
            value={stats?.bookings?.pending ?? '—'}
            icon={Bell}
            color="bg-yellow-400"
          />
          <StatCard
            label="Active Campaigns"
            value={stats?.activeCampaigns ?? '—'}
            icon={Megaphone}
            color="bg-secondary"
            change="+3"
          />
          <StatCard
            label="Newsletter Subscribers"
            value={stats?.subscribers ?? '—'}
            icon={Mail}
            color="bg-green-500"
            change="+24"
          />
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-syne text-xl font-bold text-dark">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-primary text-sm font-semibold hover:underline">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading...</div>
          ) : recentBookings.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <Calendar size={48} className="mx-auto mb-4 opacity-30" />
              <p>No bookings yet. They'll appear here when clients book calls.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Name', 'Email', 'Phone', 'Service', 'Budget', 'Status', 'Date'].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-dark">{b.fullName}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{b.email}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{b.phone}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{b.serviceType?.replace(/-/g, ' ')}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{b.monthlyBudget || '—'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[b.status] || 'bg-gray-100 text-gray-600'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-IN') : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export { Sidebar };
