import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Shield, TrendingUp, Activity, Trash2, Search,
  Globe2, Plane, MapPin, Mail, Calendar, MessageSquare
} from 'lucide-react';
import api from '../../services/api';
import { PageLoader } from '../../components/ui/Loading';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const [statsData, usersData, destData] = await Promise.all([
          api.getAdminStats(),
          api.getUsers({ limit: 30 }),
          api.getDestinations({ limit: 30 }),
        ]);
        setStats(statsData.stats);
        setUsers(usersData.users);
        setDestinations(destData.destinations);
      } catch (error) {
        toast.error(error.message || 'Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };
    loadAdminData();
  }, []);

  const handleDeleteUser = async (userId, name) => {
    if (!window.confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    try {
      await api.deleteUser(userId);
      setUsers(prev => prev.filter(u => u._id !== userId));
      toast.success('User deleted');
    } catch (error) {
      toast.error(error.message || 'Failed to delete user');
    }
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <PageLoader />;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'destinations', label: 'Destinations', icon: Globe2 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center shadow-lg">
            <Shield className="w-5 h-5 text-voyage-300" />
          </span>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-navy-900">Admin Dashboard</h1>
            <p className="text-navy-400">Manage your platform</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-card w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-navy-800 to-navy-900 text-white shadow-md'
                : 'text-navy-500 hover:bg-navy-50'
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'from-voyage-500 to-voyage-600' },
              { label: 'Active Users', value: stats?.activeUsers || 0, icon: Activity, color: 'from-emerald-500 to-teal-600' },
              { label: 'Admins', value: stats?.adminCount || 0, icon: Shield, color: 'from-amber-500 to-orange-600' },
              { label: 'Destinations', value: destinations.length, icon: Globe2, color: 'from-sky-500 to-blue-600' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-navy-900">{stat.value}</p>
                    <p className="text-xs text-navy-400">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Users */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl p-8 shadow-card">
            <h2 className="text-xl font-bold text-navy-900 mb-6">Recent Signups</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-semibold text-navy-400 border-b border-navy-100">
                    <th className="pb-3">User</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {(stats?.recentUsers || []).map(user => (
                    <tr key={user._id} className="border-b border-navy-50 last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-voyage-400 to-voyage-600 flex items-center justify-center text-sm font-semibold text-white">
                            {user.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-navy-800 text-sm">{user.name}</p>
                            <p className="text-xs text-navy-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-xs font-semibold text-voyage-600 bg-voyage-50 px-2.5 py-1 rounded-full capitalize">{user.role}</span>
                      </td>
                      <td className="py-3 text-sm text-navy-500">
                        {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl p-8 shadow-card">
          {/* Search */}
          <div className="flex items-center gap-3 bg-navy-50 rounded-xl px-4 mb-6">
            <Search className="w-5 h-5 text-navy-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users by name or email..."
              className="flex-1 bg-transparent outline-none py-3 text-navy-700"
            />
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-navy-400 border-b border-navy-100">
                  <th className="pb-3">User</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Joined</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user._id} className="border-b border-navy-50 last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-voyage-400 to-voyage-600 flex items-center justify-center text-sm font-semibold text-white">
                          {user.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <p className="font-semibold text-navy-800 text-sm">{user.name}</p>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-navy-500 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-navy-300" /> {user.email}
                    </td>
                    <td className="py-3">
                      <span className="text-xs font-semibold text-voyage-600 bg-voyage-50 px-2.5 py-1 rounded-full capitalize">{user.role}</span>
                    </td>
                    <td className="py-3 text-sm text-navy-500">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-3">
                      <div className="flex justify-end">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => handleDeleteUser(user._id, user.name)}
                            className="p-2 rounded-lg text-navy-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'destinations' && (
        <div className="bg-white rounded-3xl p-8 shadow-card">
          <h2 className="text-xl font-bold text-navy-900 mb-6">All Destinations</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {destinations.map(dest => (
              <div key={dest._id} className="flex items-center gap-4 p-4 rounded-2xl border border-navy-100 hover:border-voyage-200 hover:bg-voyage-50/30 transition-all">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                  onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80`; }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy-900">{dest.name}</p>
                  <p className="text-xs text-navy-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {dest.country}
                  </p>
                  <p className="text-xs text-voyage-600 mt-1 font-semibold">{dest.priceRange}</p>
                </div>
                <span className="text-xs font-semibold bg-voyage-50 text-voyage-700 px-2.5 py-1 rounded-full shrink-0">
                  ★ {dest.rating?.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}