import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, MapPin, Heart, Share2, Globe2, Users, Wallet, Clock,
  Thermometer, Shield, ChevronLeft, ArrowRight, Calendar, Briefcase,
  Sparkles, Compass
} from 'lucide-react';
import api from '../../services/api';
import { PageLoader } from '../../components/ui/Loading';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { formatCurrency } from '../../utils/currency';

export default function DestinationDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const loadDestination = async () => {
      setLoading(true);
      try {
        const data = await api.getDestination(id);
        setDestination(data.destination);
        if (user) {
          const saved = await api.getSavedDestinations();
          const found = saved.savedDestinations.find(s => s.destination?._id?.toString() === id);
          if (found) setIsSaved(true);
        }
      } catch (error) {
        toast.error(error.message || 'Failed to load destination');
      } finally {
        setLoading(false);
      }
    };
    loadDestination();
  }, [id, user]);

  const handleSave = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      if (isSaved) {
        const saved = await api.getSavedDestinations();
        const item = saved.savedDestinations.find(s => s.destination?._id?.toString() === id);
        if (item) await api.removeSavedDestination(item._id);
        setIsSaved(false);
        toast.success('Removed from saved');
      } else {
        await api.saveDestination(id);
        setIsSaved(true);
        toast.success('Saved to your trips!');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <PageLoader />;
  if (!destination) return null;

  const images = destination.images?.length ? destination.images : [destination.image];
  const daysPerMonth = 30;

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Public header if not logged in */}
      <header className="bg-navy-900/80 backdrop-blur-lg border-b border-navy-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-voyage-500 to-voyage-600 rounded-xl flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Voyage AI</span>
          </Link>
          <Link to="/destinations" className="btn-ghost flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" /> All Destinations
          </Link>
        </div>
      </header>

      {/* Gallery */}
      <div className="relative h-[50vh] lg:h-[60vh] bg-navy-900">
        <img
          src={images[activeImage]}
          alt={destination.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80`; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/10 backdrop-blur-lg text-white p-3 rounded-xl hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Action buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button onClick={handleSave} className={`p-3 rounded-xl backdrop-blur-lg transition-all ${isSaved ? 'bg-voyage-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
          <button className="p-3 rounded-xl bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery thumbnails */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-6 flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-navy-900 border border-navy-800 rounded-3xl p-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {destination.tags?.map(tag => (
                  <span key={tag} className="text-xs font-medium bg-voyage-500/15 text-voyage-300 px-3 py-1 rounded-full capitalize">
                    {tag.replace('-', ' ')}
                  </span>
                ))}
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-white">{destination.name}</h1>
                  <p className="text-navy-300 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-4 h-4" /> {destination.country} · {destination.continent}
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-amber-50 rounded-2xl px-4 py-3">
                  <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                  <div>
                    <p className="text-xl font-bold text-navy-900">{destination.rating?.toFixed(1)}</p>
                    <p className="text-xs text-navy-500">{destination.reviewCount} reviews</p>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-navy-300 leading-relaxed">{destination.description}</p>
            </motion.div>

            {/* Highlights */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-navy-900 border border-navy-800 rounded-3xl p-8">
              <h2 className="font-serif text-xl font-semibold text-white mb-5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-voyage-400" /> Top Highlights
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {destination.highlights?.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-3 bg-navy-800 rounded-xl p-4">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-voyage-500 to-voyage-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-navy-200">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Activities */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-navy-900 border border-navy-800 rounded-3xl p-8">
              <h2 className="font-serif text-xl font-semibold text-white mb-5">Popular Activities</h2>
              <div className="space-y-4">
                {destination.activities?.map((activity, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-navy-800 hover:border-voyage-500/30 hover:bg-voyage-500/5 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-voyage-500/15 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5 text-voyage-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{activity.name}</p>
                        <p className="text-sm text-navy-300">{activity.description}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-navy-400">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {activity.duration}</span>
                          <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {activity.rating}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-voyage-400">{formatCurrency(activity.price, destination)}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Facilities Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-navy-900 border border-navy-800 rounded-3xl p-8">
              <h2 className="font-serif text-xl font-semibold text-white mb-5">Essential Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Globe2, label: 'Languages', value: destination.languages?.join(', ') },
                  { icon: Clock, label: 'Best Time', value: destination.bestTimeToVisit },
                  { icon: Thermometer, label: 'Climate', value: destination.climate },
                  { icon: Shield, label: 'Safety Rating', value: `${destination.safetyRating}/5` },
                  { icon: Users, label: 'Time Zone', value: destination.timezone },
                  { icon: MapPin, label: 'Visa Required', value: destination.visaRequired ? 'Yes' : 'No' },
                ].map((info, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-navy-800">
                    <info.icon className="w-5 h-5 text-voyage-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-navy-400">{info.label}</p>
                      <p className="text-sm font-medium text-navy-100">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24 self-start">
            {/* Booking Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-navy-900 border border-navy-800 rounded-3xl p-8">
              <h3 className="font-serif text-lg font-semibold text-white mb-6">Plan Your Trip</h3>
              <div className="flex items-center justify-between mb-5 pb-5 border-b border-navy-800">
                <div>
                  <p className="text-sm text-navy-400">Daily Budget</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(destination.avgDailyBudget, destination)}</p>
                </div>
                <span className="text-lg font-bold text-voyage-400">{destination.priceRange}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-navy-500 flex items-center gap-2"><Wallet className="w-4 h-4" /> Est. per month</span>
                <span className="font-semibold">{formatCurrency(destination.avgDailyBudget * daysPerMonth, destination)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-navy-500 flex items-center gap-2"><Users className="w-4 h-4" /> For couples</span>
                <span className="font-semibold">{formatCurrency(destination.avgDailyBudget * 1.7, destination)}/day</span>
              </div>

              <Link
                to={user ? `/trips/create?destination=${destination._id}` : '/login'}
                className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                {user ? 'Create Trip' : 'Sign In to Plan'}
              </Link>
              <button onClick={handleSave} className="btn-secondary w-full mt-3 flex items-center justify-center gap-2">
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-voyage-500 text-voyage-500' : ''}`} />
                {isSaved ? 'Saved' : 'Save Destination'}
              </button>
            </motion.div>

            {/* Weather */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-gradient-voyage rounded-3xl p-8 text-white shadow-card">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Globe2 className="w-5 h-5" /> Climate & Weather
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Climate</span>
                  <span className="font-semibold capitalize">{destination.climate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Safety</span>
                  <span className="flex items-center gap-1 font-semibold"><Shield className="w-4 h-4" /> {destination.safetyRating}/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Currency</span>
                  <span className="font-semibold">{destination.currencyName} ({destination.currencySymbol})</span>
                </div>
              </div>
            </motion.div>

            {/* AI CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-navy-900 rounded-3xl p-8 text-white shadow-card">
              <div className="w-12 h-12 bg-gradient-to-br from-voyage-500 to-voyage-600 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">AI Travel Assistant</h3>
              <p className="text-sm text-white/60 mb-5">
                Get personalized recommendations, budget tips, and packing lists for {destination.name}.
              </p>
              <Link to={user ? '/ai-assistant' : '/login'} className="block bg-white text-navy-900 py-3 rounded-xl font-semibold text-center hover:bg-voyage-50 transition-colors">
                Ask AI Assistant
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}