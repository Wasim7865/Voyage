import { motion } from 'framer-motion';
import { Star, Clock, MapPin, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/currency';

export default function DestinationCard({ destination, onSave, isSaved }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="bg-navy-900 border border-navy-800 rounded-2xl overflow-hidden hover:border-voyage-500/30 transition-all duration-300 group cursor-pointer"
    >
      <Link to={`/destinations/${destination._id}`} className="block">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Rating badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur rounded-full px-2.5 py-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold">{destination.rating?.toFixed(1)}</span>
            <span className="text-xs text-navy-400">({destination.reviewCount})</span>
          </div>

          {/* Save button */}
          {onSave && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onSave(destination);
              }}
              className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                isSaved
                  ? 'bg-voyage-500 text-white'
                  : 'bg-white/90 text-navy-600 hover:bg-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>
          )}

          {/* Price badge */}
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur rounded-lg px-2.5 py-1">
            <span className="text-xs font-semibold text-navy-800">{destination.priceRange}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-serif font-semibold text-white group-hover:text-voyage-300 transition-colors">
                {destination.name}
              </h3>
              <p className="text-sm text-navy-300 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                {destination.country}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-voyage-400">{formatCurrency(destination.avgDailyBudget, destination)}</p>
              <p className="text-xs text-navy-400">/day</p>
            </div>
          </div>

          <p className="mt-3 text-sm text-navy-300 line-clamp-2">
            {destination.shortDescription || destination.description}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {destination.tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium bg-voyage-500/15 text-voyage-200 px-2 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center gap-1 text-sm font-semibold text-voyage-300 mt-4 group-hover:gap-2 transition-all">
            Details <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}