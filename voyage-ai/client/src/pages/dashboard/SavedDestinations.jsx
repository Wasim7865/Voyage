import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Star, Trash2, ArrowRight, Clock, Briefcase } from 'lucide-react';
import api from '../../services/api';
import { PageLoader, EmptyState } from '../../components/ui/Loading';
import toast from 'react-hot-toast';
import { formatCurrency } from '../../utils/currency';

export default function SavedDestinations() {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSaved = async () => {
      try {
        const data = await api.getSavedDestinations();
        // Only keep those with a valid destination populated
        setSaved(data.savedDestinations.filter(s => s.destination));
      } catch (error) {
        console.error('Failed to load saved destinations:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSaved();
  }, []);

  const handleRemove = async (item) => {
    try {
      await api.removeSavedDestination(item._id);
      setSaved(prev => prev.filter(s => s._id !== item._id));
      toast.success('Removed from saved');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-bold text-navy-900 flex items-center gap-3">
          <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
            <Heart className="w-5 h-5 text-white" />
          </span>
          Saved Destinations
        </h1>
        <p className="text-navy-400 mt-1">Your wishlist of amazing places to visit</p>
      </motion.div>

      {saved.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-card">
          <EmptyState
            icon={Heart}
            title="No saved destinations yet"
            description="Browse destinations and tap the heart icon to save places you'd love to visit."
            action={<Link to="/destinations" className="btn-primary">Explore Destinations</Link>}
          />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {saved.map((item) => {
            const d = item.destination;
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-2xl transition-all group"
              >
                <Link to={`/destinations/${d._id}`} className="block relative h-52 overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80`; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur rounded-full px-2.5 py-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold">{d.rating?.toFixed(1)}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemove(item);
                    }}
                    className="absolute top-3 right-3 p-2.5 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{d.name}</h3>
                    <p className="text-sm text-white/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {d.country}
                    </p>
                  </div>
                </Link>
                <div className="p-5">
                  <p className="text-sm text-navy-500 line-clamp-2 mb-4">{d.shortDescription}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {d.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] font-medium bg-voyage-50 text-voyage-700 px-2 py-1 rounded-md capitalize">
                        {tag.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-navy-100">
                    <div className="text-sm">
                      <span className="text-navy-400">Budget: </span>
                      <span className="font-bold text-navy-800">{formatCurrency(d.avgDailyBudget, d)}/day</span>
                    </div>
                    <Link to={`/trips/create?destination=${d._id}`} className="text-voyage-600 font-semibold text-sm hover:text-voyage-700 flex items-center gap-1">
                      Plan Trip <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}