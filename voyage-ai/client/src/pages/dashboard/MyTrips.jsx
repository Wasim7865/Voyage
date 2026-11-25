import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, PlusCircle, Search, Filter, Calendar } from 'lucide-react';
import api from '../../services/api';
import TripCard from '../../components/trips/TripCard';
import { PageLoader, EmptyState } from '../../components/ui/Loading';

const tabs = [
  { id: '', label: 'All' },
  { id: 'planning', label: 'Planning' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'completed', label: 'Completed' },
];

export default function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');

  const loadTrips = useCallback(async () => {
    setLoading(true);
    try {
      const params = { limit: 50 };
      if (status) params.status = status;
      const data = await api.getTrips(params);
      setTrips(data.trips);
    } catch (error) {
      console.error('Failed to load trips:', error);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => { loadTrips(); }, [loadTrips]);

  const filteredTrips = trips.filter(t =>
    t.title?.toLowerCase().includes(search.toLowerCase()) ||
    t.destinationName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-navy-900 mb-1">My Trips</h1>
          <p className="text-navy-400">Manage and track all your travel plans</p>
        </div>
        <Link to="/trips/create" className="btn-primary inline-flex items-center gap-2 self-start md:self-auto">
          <PlusCircle className="w-4 h-4" /> New Trip
        </Link>
      </motion.div>

      {/* Search & Tabs */}
      <div className="bg-white rounded-2xl p-4 shadow-card space-y-4">
        <div className="flex items-center gap-3 bg-navy-50 rounded-xl px-4">
          <Search className="w-5 h-5 text-navy-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your trips..."
            className="flex-1 bg-transparent outline-none py-3 text-navy-700 placeholder:text-navy-400"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatus(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                status === tab.id
                  ? 'bg-gradient-to-r from-voyage-600 to-voyage-500 text-white shadow-md'
                  : 'text-navy-600 hover:bg-navy-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" />
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Trips Grid */}
      {loading ? (
        <PageLoader />
      ) : filteredTrips.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title={search ? 'No trips found' : 'No trips yet'}
          description={search ? 'Try a different search term.' : 'Start planning your next adventure!'}
          action={
            <Link to="/trips/create" className="btn-primary inline-flex items-center gap-2">
              <PlusCircle className="w-4 h-4" /> Create a Trip
            </Link>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTrips.map(trip => (
            <TripCard key={trip._id} trip={trip} onDelete={(id) => setTrips(prev => prev.filter(t => t._id !== id))} />
          ))}
        </div>
      )}
    </div>
  );
}