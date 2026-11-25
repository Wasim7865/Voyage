import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, MapPin, Calendar, Wallet, Users, ArrowLeft, ArrowRight,
  Wand2, Loader2, Check
} from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function AIPlanner() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: 2000,
    travelers: 2,
    travelStyle: 'adventure',
    interests: [],
  });
  const [planning, setPlanning] = useState(false);
  const [preview, setPreview] = useState(null);

  const interestOptions = ['Culture', 'Food', 'Adventure', 'Nature', 'Shopping', 'Nightlife', 'History', 'Beach', 'Photography', 'Wellness'];

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handlePlan = async () => {
    if (!formData.destination) {
      toast.error('Please enter a destination');
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      toast.error('Please select your travel dates');
      return;
    }
    setPlanning(true);
    try {
      const data = await api.planTrip(formData);
      setPreview(data.trip);
      toast.success('AI crafted your trip plan!');
    } catch (error) {
      toast.error(error.message || 'Failed to plan trip');
    } finally {
      setPlanning(false);
    }
  };

  const days = formData.startDate && formData.endDate
    ? Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / 86400000)
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-bold text-navy-900 flex items-center gap-3">
          <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-voyage-500 to-voyage-600 flex items-center justify-center shadow-lg">
            <Wand2 className="w-5 h-5 text-white" />
          </span>
          AI Trip Planner
        </h1>
        <p className="text-navy-400 mt-1">Describe your dream trip and let AI craft the perfect plan</p>
      </motion.div>

      {!preview ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-8 shadow-card max-w-3xl">
          {/* Destination */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-navy-700 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-voyage-500" /> Destination
            </label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              placeholder="e.g. Bali, Paris, Tokyo..."
              className="input-field text-lg"
            />
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="input-field"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="input-field"
                min={formData.startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          {days > 0 && <div className="text-sm text-voyage-600 font-medium bg-voyage-50 rounded-xl px-4 py-3 mb-8">📅 {days}-day adventure detected</div>}

          {/* Budget & Travelers */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-voyage-500" /> Budget (USD)
              </label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) || 0 })}
                className="input-field text-lg font-bold"
              />
              <div className="flex gap-2 mt-2">
                {[1000, 2000, 3500, 5000].map(val => (
                  <button
                    key={val}
                    onClick={() => setFormData({ ...formData, budget: val })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${formData.budget === val ? 'bg-voyage-500 text-white' : 'bg-navy-50 text-navy-600 hover:bg-voyage-50'}`}
                  >
                    ${val.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-voyage-500" /> Number of Travelers
              </label>
              <div className="flex items-center gap-4 bg-navy-50 rounded-xl p-4">
                <button
                  onClick={() => setFormData({ ...formData, travelers: Math.max(1, formData.travelers - 1) })}
                  className="w-9 h-9 bg-white rounded-xl font-bold text-lg text-navy-700 shadow-sm hover:bg-navy-100"
                >
                  −
                </button>
                <span className="text-xl font-bold text-navy-900 flex-1 text-center">{formData.travelers}</span>
                <button
                  onClick={() => setFormData({ ...formData, travelers: Math.min(20, formData.travelers + 1) })}
                  className="w-9 h-9 bg-white rounded-xl font-bold text-lg text-navy-700 shadow-sm hover:bg-navy-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Travel Style */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-navy-700 mb-2">Travel Style</label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'adventure', label: '🎒 Adventure' },
                { id: 'relaxation', label: '🏖️ Relaxation' },
                { id: 'cultural', label: '🏛️ Cultural' },
                { id: 'romantic', label: '❤️ Romantic' },
                { id: 'family', label: '👨‍👩‍👧 Family' },
                { id: 'luxury', label: '✨ Luxury' },
              ].map(style => (
                <button
                  key={style.id}
                  onClick={() => setFormData({ ...formData, travelStyle: style.id })}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    formData.travelStyle === style.id
                      ? 'bg-gradient-to-r from-voyage-600 to-voyage-500 text-white shadow-md'
                      : 'bg-navy-50 text-navy-600 hover:bg-voyage-50'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-navy-700 mb-2">Interests</label>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-2 rounded-xl text-sm transition-all flex items-center gap-1.5 ${
                    formData.interests.includes(interest)
                      ? 'bg-voyage-500 text-white shadow-md'
                      : 'bg-navy-50 text-navy-600 hover:bg-voyage-50'
                  }`}
                >
                  {formData.interests.includes(interest) && <Check className="w-3.5 h-3.5" />}
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handlePlan}
            disabled={planning}
            className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
          >
            {planning ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Crafting your perfect trip...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Generate My Trip Plan
              </>
            )}
          </button>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-white rounded-3xl p-8 shadow-card mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-navy-900">{preview.title}</h2>
                <p className="text-navy-400">{preview.destinationName}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setPreview(null)} className="btn-secondary">
                  <ArrowLeft className="w-4 h-4 inline-block mr-1 -mt-0.5" /> Modify
                </button>
                <button onClick={() => navigate(`/trips/${preview._id}`)} className="btn-primary">
                  View Trip <ArrowRight className="w-4 h-4 inline-block ml-1 -mt-0.5" />
                </button>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-voyage-50 to-navy-50 rounded-2xl flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-voyage-500 flex-shrink-0" />
              <p className="text-sm text-navy-600">
                ✨ Your {preview.itinerary?.length} day itinerary is ready! AI has organized {preview.itinerary?.reduce((s, d) => s + d.activities.length, 0)} activities across your trip.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}