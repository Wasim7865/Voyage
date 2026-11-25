import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plane, MapPin, Wallet, Calendar, TrendingUp, PlusCircle,
  Clock, Users, ArrowRight, Sparkles
} from 'lucide-react';
import api from '../../services/api';
import { PageLoader, SkeletonCard } from '../../components/ui/Loading';
import TripCard from '../../components/trips/TripCard';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [stats, setStats] = useState({ totalTrips: 0, upcomingTrips: 0, byStatus: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [tripsData, statsData] = await Promise.all([
          api.getTrips({ limit: 4 }),
          api.getTripStats()
        ]);
        setTrips(tripsData.trips);
        setStats(statsData.stats);
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const upcomingCount = stats.upcomingTrips;

  const statCards = [
    { label: 'Total Trips', value: stats.totalTrips, icon: Plane, color: 'from-voyage-500 to-voyage-600' },
    { label: 'Upcoming', value: upcomingCount, icon: Calendar, color: 'from-emerald-500 to-teal-600' },
    {
      label: 'Active Budget',
      value: `$${trips.reduce((sum, t) => sum + (t.budget?.total || 0), 0).toLocaleString()}`,
      icon: Wallet, color: 'from-amber-500 to-orange-600'
    },
    { label: 'Days Planned', value: trips.reduce((sum, t) => sum + Math.ceil((new Date(t.endDate) - new Date(t.startDate)) / 86400000) || 0, 0), icon: Clock, color: 'from-sky-500 to-blue-600' },
  ];

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl lg:text-3xl font-bold text-navy-900 mb-1">
          Welcome back, {user?.name?.split(' ')[0] || 'Traveler'}! 👋
        </h1>
        <p className="text-navy-400">Ready to plan your next adventure?</p>
      </motion.div>

      {/* Quick Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-voyage rounded-3xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Let AI Plan Your Trip
            </h2>
            <p className="text-white/70 max-w-lg">
              Describe your dream trip and our AI will create personalized itineraries with budgets, activities, and more.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/ai-planner" className="bg-white text-voyage-700 px-6 py-3 rounded-xl font-bold hover:bg-voyage-50 transition-all shadow-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> AI Planner
            </Link>
            <Link to="/trips/create" className="bg-white/10 backdrop-blur border border-white/30 px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center gap-2">
              <PlusCircle className="w-4 h-4" /> Manual
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="stat-card"
          >
            <div className="flex flex-col gap-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy-900">{stat.value}</p>
                <p className="text-sm text-navy-400">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Trips */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-navy-900">Recent Trips</h2>
            <p className="text-sm text-navy-400">Your latest travel plans</p>
          </div>
          <Link to="/trips" className="text-voyage-600 font-semibold hover:text-voyage-700 flex items-center gap-1 text-sm">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {trips.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-card">
            <div className="mx-auto w-16 h-16 bg-voyage-50 rounded-2xl flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-voyage-500" />
            </div>
            <h3 className="text-lg font-bold text-navy-800 mb-2">No trips yet</h3>
            <p className="text-sm text-navy-400 mb-6">Start planning your next adventure!</p>
            <Link to="/trips/create" className="btn-primary inline-flex items-center gap-2">
              <PlusCircle className="w-4 h-4" /> Create Your First Trip
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip._id} trip={trip} onDelete={(id) => setTrips(prev => prev.filter(t => t._id !== id))} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}