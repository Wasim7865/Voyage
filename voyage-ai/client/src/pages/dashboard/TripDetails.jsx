import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Calendar, Users, Wallet, Clock, ArrowLeft, Trash2,
  Pencil, Sparkles, ChevronRight, Plane, Train, Briefcase,
  ShoppingBag, Utensils, Bed, MoreHorizontal, CheckCircle
} from 'lucide-react';
import api from '../../services/api';
import { PageLoader } from '../../components/ui/Loading';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { formatUsd } from '../../utils/currency';

const categoryIcons = {
  transport: Plane,
  accommodation: Bed,
  food: Utensils,
  activity: Briefcase,
  sightseeing: MapPin,
  shopping: ShoppingBag,
  other: MoreHorizontal,
};

const statusStyles = {
  planning: 'bg-amber-50 text-amber-600 border-amber-200',
  upcoming: 'bg-voyage-50 text-voyage-600 border-voyage-200',
  ongoing: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  completed: 'bg-blue-50 text-blue-600 border-blue-200',
  cancelled: 'bg-red-50 text-red-500 border-red-200',
};

export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [optimizing, setOptimizing] = useState(false);

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const data = await api.getTrip(id);
        setTrip(data.trip);
      } catch (error) {
        toast.error(error.message || 'Failed to load trip');
        navigate('/trips');
      } finally {
        setLoading(false);
      }
    };
    loadTrip();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this trip permanently?')) return;
    try {
      await api.deleteTrip(id);
      toast.success('Trip deleted');
      navigate('/trips');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOptimize = async () => {
    setOptimizing(true);
    try {
      const data = await api.optimizeItinerary(id);
      setTrip(data.trip);
      toast.success(data.message || 'Itinerary optimized!');
    } catch (error) {
      toast.error(error.message || 'Failed to optimize');
    } finally {
      setOptimizing(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const data = await api.updateTrip(id, { status: newStatus });
      setTrip(data.trip);
      toast.success(`Trip marked as ${newStatus}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <PageLoader />;
  if (!trip) return null;

  const days = Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / 86400000) || 1;
  const budgetPct = trip.budget?.total ? Math.round(((trip.budget.spent || 0) / trip.budget.total) * 100) : 0;
  const activitiesCount = trip.itinerary?.reduce((sum, day) => sum + ((day.activities?.length) || 0), 0) || 0;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden h-72">
        <img
          src={trip.coverImage || trip.destination?.image || `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80`}
          alt={trip.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80`; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <button onClick={() => navigate(-1)} className="absolute top-5 left-5 bg-white/10 backdrop-blur-lg text-white p-3 rounded-xl hover:bg-white/20 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur ${statusStyles[trip.status]}`}>
                {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
              </span>
              {trip.aiGenerated && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gradient-to-r from-voyage-500 to-voyage-600 text-white shadow-lg">
                  ✨ AI Made
                </span>
              )}
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white drop-shadow">{trip.title}</h1>
            <p className="text-white/80 flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4" /> {trip.destinationName}
            </p>
          </div>

          <div className="flex gap-2">
            <Link to={`/trips/${id}/itinerary`} className="bg-white text-voyage-700 px-5 py-3 rounded-xl font-bold hover:bg-voyage-50 transition-all shadow-lg">
              View Itinerary
            </Link>
            <button onClick={handleOptimize} disabled={optimizing} className="bg-voyage-500 text-white px-5 py-3 rounded-xl font-bold hover:bg-voyage-600 transition-all flex items-center gap-2 disabled:opacity-50">
              {optimizing ? (
                <span className="w-4 h-4 border-2 border-voyage-300 border-t-white rounded-full animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {optimizing ? 'Optimizing...' : 'Optimize with AI'}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Travelers', value: `${trip.travelers}`, icon: Users, color: 'from-voyage-500 to-voyage-600' },
          { label: 'Days', value: `${days}`, icon: Calendar, color: 'from-emerald-500 to-teal-600' },
          { label: 'Activities', value: `${activitiesCount}`, icon: Briefcase, color: 'from-amber-500 to-orange-600' },
          { label: 'Budget', value: formatUsd(trip.budget?.total || 0), icon: Wallet, color: 'from-sky-500 to-blue-600' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-navy-900">{stat.value}</p>
                <p className="text-xs text-navy-400">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 shadow-card">
            <h2 className="text-xl font-bold text-navy-900 mb-4">Trip Overview</h2>
            <p className="text-navy-600 leading-relaxed">{trip.description || 'No description yet. This trip is awaiting your notes!'}</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-navy-50 rounded-2xl">
                <Clock className="w-5 h-5 text-voyage-500" />
                <div>
                  <p className="text-xs text-navy-400">Start Date</p>
                  <p className="font-semibold text-navy-800">
                    {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-navy-50 rounded-2xl">
                <Calendar className="w-5 h-5 text-voyage-500" />
                <div>
                  <p className="text-xs text-navy-400">End Date</p>
                  <p className="font-semibold text-navy-800">
                    {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Itinerary Preview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-8 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy-900">Itinerary</h2>
              <Link to={`/trips/${id}/itinerary`} className="text-voyage-600 font-semibold hover:text-voyage-700 text-sm flex items-center gap-1">
                Full View <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {trip.itinerary?.length > 0 ? (
              <div className="space-y-4">
                {trip.itinerary.slice(0, 3).map(day => (
                  <div key={day._id || day.day} className="flex gap-4 p-4 rounded-2xl border border-navy-100 hover:bg-voyage-50/50 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-voyage-500 to-voyage-600 text-white flex flex-col items-center justify-center">
                      <span className="text-xs font-bold">Day</span>
                      <span className="text-lg font-bold leading-none">{day.day}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">{day.title || `Day ${day.day}`}</p>
                      <p className="text-sm text-navy-400">{day.activities?.length} activities planned</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {day.activities?.slice(0, 3).map((act, i) => (
                          <span key={i} className="text-[10px] bg-navy-50 text-navy-500 px-2 py-0.5 rounded-full">
                            {act.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-10 h-10 text-navy-300 mx-auto mb-3" />
                <p className="text-navy-400 mb-4">No itinerary yet. Add activities to build your day-by-day plan.</p>
                <Link to={`/trips/${id}/itinerary`} className="btn-primary inline-flex items-center gap-2">
                  <Pencil className="w-4 h-4" /> Build Itinerary
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Budget Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-3xl p-8 shadow-card">
            <h2 className="text-lg font-bold text-navy-900 mb-5">Budget Overview</h2>
            <div className="text-center mb-5">
              <p className="text-3xl font-bold text-navy-900">{formatUsd(trip.budget?.total || 0)}</p>
              <p className="text-sm text-navy-400">Total budget</p>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-navy-500">Spent: {formatUsd(trip.budget?.spent || 0)}</span>
                <span className="text-navy-800 font-semibold">{budgetPct}%</span>
              </div>
              <div className="h-2.5 bg-navy-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${budgetPct > 80 ? 'bg-red-500' : budgetPct > 50 ? 'bg-amber-400' : 'bg-gradient-to-r from-voyage-500 to-voyage-400'}`} style={{ width: `${budgetPct}%` }} />
              </div>
            </div>
            <div className="space-y-3 mt-6">
              {trip.budget?.breakdown && Object.entries(trip.budget.breakdown).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-navy-500 capitalize">{key}</span>
                  <span className="font-semibold text-navy-800">{formatUsd(value || 0)}</span>
                </div>
              ))}
            </div>
            <Link to="/ai-budget" className="btn-secondary w-full mt-6 text-center block">
              AI Budget Planner
            </Link>
          </motion.div>

          {/* Status Controls */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl p-8 shadow-card">
            <h2 className="text-lg font-bold text-navy-900 mb-4">Trip Status</h2>
            <div className="space-y-2">
              {['planning', 'upcoming', 'ongoing', 'completed', 'cancelled'].map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={trip.status === status}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-all ${
                    trip.status === status
                      ? 'bg-gradient-to-r from-voyage-600 to-voyage-500 text-white shadow-md'
                      : 'text-navy-600 hover:bg-navy-50'
                  }`}
                >
                  <span className="capitalize">{status}</span>
                  {trip.status === status && <CheckCircle className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-3xl p-8 shadow-card">
            <button onClick={handleDelete} className="w-full flex items-center justify-center gap-2 text-red-500 font-semibold hover:text-red-600 py-2 rounded-xl hover:bg-red-50 transition-colors">
              <Trash2 className="w-4 h-4" /> Delete Trip
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}