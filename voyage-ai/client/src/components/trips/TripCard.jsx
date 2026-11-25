import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Trash2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { formatUsd } from '../../utils/currency';

const statusStyles = {
  planning: 'bg-amber-50 text-amber-600 border-amber-200',
  upcoming: 'bg-voyage-50 text-voyage-600 border-voyage-200',
  ongoing: 'bg-green-50 text-green-600 border-green-200',
  completed: 'bg-blue-50 text-blue-600 border-blue-200',
  cancelled: 'bg-red-50 text-red-500 border-red-200',
};

export default function TripCard({ trip, onDelete }) {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculatedDays = Math.ceil(
    (new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)
  );

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm(`Delete trip "${trip.title}"?`)) {
      try {
        await api.deleteTrip(trip._id);
        toast.success('Trip deleted');
        onDelete?.(trip._id);
      } catch (error) {
        toast.error(error.message || 'Failed to delete trip');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      <div onClick={() => navigate(`/trips/${trip._id}`)}>
        {/* Cover */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={trip.coverImage || trip.destination?.image || `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80`}
            alt={trip.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Status Badge */}
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur ${statusStyles[trip.status]}`}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </span>

          {trip.aiGenerated && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gradient-to-r from-voyage-500 to-voyage-600 text-white shadow-lg">
              ✨ AI Made
            </span>
          )}

          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-lg font-bold text-white drop-shadow">{trip.title}</h3>
            <p className="text-sm text-white/80 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {trip.destinationName}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center bg-navy-50 rounded-xl p-3">
              <Calendar className="w-4 h-4 text-voyage-500 mb-1" />
              <span className="text-[10px] text-navy-400">Start</span>
              <span className="text-xs font-semibold text-navy-800">
                {formatDate(trip.startDate)}
              </span>
            </div>
            <div className="flex flex-col items-center bg-navy-50 rounded-xl p-3">
              <Users className="w-4 h-4 text-voyage-500 mb-1" />
              <span className="text-[10px] text-navy-400">Travelers</span>
              <span className="text-xs font-semibold text-navy-800">{trip.travelers || 1}</span>
            </div>
            <div className="flex flex-col items-center bg-navy-50 rounded-xl p-3">
              <Calendar className="w-4 h-4 text-voyage-500 mb-1" />
              <span className="text-[10px] text-navy-400">Days</span>
              <span className="text-xs font-semibold text-navy-800">{calculatedDays || 1}</span>
            </div>
          </div>

          {/* Budget */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-navy-500">Budget</span>
              <span className="font-semibold text-navy-800">
                {formatUsd(trip.budget?.total || 0)}
              </span>
            </div>
            <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-voyage-500 to-voyage-400 rounded-full transition-all duration-500"
                style={{
                  width: `${trip.budget?.total ? Math.min(100, ((trip.budget?.spent || 0) / trip.budget.total) * 100) : 0}%`
                }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Link to={`/trips/${trip._id}`} className="text-sm font-semibold text-voyage-600 hover:text-voyage-700 flex items-center gap-1">
              Open Trip <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleDelete}
              className="text-navy-300 hover:text-red-500 transition-colors p-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}