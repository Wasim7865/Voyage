import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Calendar, Wallet, Users, Sparkles, ArrowLeft, ArrowRight,
  Check, Compass, PartyPopper
} from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const steps = [
  { id: 1, title: 'Destination', icon: MapPin },
  { id: 2, title: 'Dates & Travelers', icon: Calendar },
  { id: 3, title: 'Budget', icon: Wallet },
  { id: 4, title: 'Review', icon: Check },
];

export default function CreateTrip() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [creating, setCreating] = useState(false);

  const [formData, setFormData] = useState({
    destination: searchParams.get('destination') || '',
    destinationName: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: 1000,
    title: '',
    description: '',
    currency: 'USD',
  });

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const data = await api.getDestinations({ limit: 20 });
        setDestinations(data.destinations);

        // Auto-set destination if passed via URL
        const destId = searchParams.get('destination');
        if (destId) {
          const found = data.destinations.find(d => d._id === destId);
          if (found) {
            setFormData(prev => ({
              ...prev,
              destination: destId,
              destinationName: `${found.name}, ${found.country}`
            }));
          }
        }
      } catch (error) {
        console.error('Failed to load destinations:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDestinations();
  }, [searchParams]);

  const filteredDestinations = destinations.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateStep = () => {
    if (currentStep === 1 && !formData.destination) {
      toast.error('Please choose a destination');
      return false;
    }
    if (currentStep === 2) {
      if (!formData.startDate || !formData.endDate) {
        toast.error('Please select travel dates');
        return false;
      }
      if (new Date(formData.endDate) <= new Date(formData.startDate)) {
        toast.error('End date must be after start date');
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    setCurrentStep(prev => Math.min(4, prev + 1));
  };

  const prev = () => setCurrentStep(prev => Math.max(1, prev - 1));

  const handleCreate = async () => {
    if (!formData.title) {
      toast.error('Please give your trip a title');
      return;
    }
    setCreating(true);
    try {
      const trip = await api.createTrip({
        title: formData.title,
        description: formData.description,
        destination: formData.destination,
        destinationName: formData.destinationName,
        startDate: formData.startDate,
        endDate: formData.endDate,
        travelers: formData.travelers,
        budget: {
          total: formData.budget,
          currency: formData.currency,
          breakdown: {
            accommodation: Math.round(formData.budget * 0.3),
            transportation: Math.round(formData.budget * 0.2),
            food: Math.round(formData.budget * 0.25),
            activities: Math.round(formData.budget * 0.15),
            shopping: Math.round(formData.budget * 0.05),
            other: Math.round(formData.budget * 0.05),
          }
        },
        status: 'planning'
      });
      toast.success('Trip created successfully!');
      navigate(`/trips/${trip.trip._id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to create trip');
    } finally {
      setCreating(false);
    }
  };

  const days = formData.startDate && formData.endDate
    ? Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / 86400000)
    : 0;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-navy-900 mb-1">Create New Trip</h1>
        <p className="text-navy-400">Plan your next adventure step by step</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                currentStep > step.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                  : currentStep === step.id
                  ? 'bg-gradient-to-r from-voyage-600 to-voyage-500 text-white shadow-lg scale-110'
                  : 'bg-navy-100 text-navy-400'
              }`}>
                {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span className={`text-xs font-semibold mt-2 ${currentStep >= step.id ? 'text-navy-800' : 'text-navy-400'}`}>
                {step.title}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 mt-[-18px] rounded-full transition-all duration-300 ${currentStep > step.id ? 'bg-emerald-400' : 'bg-navy-100'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl p-8 shadow-card"
        >
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-1">Where are you going?</h2>
              <p className="text-navy-400 mb-6">Choose your dream destination</p>

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search destinations..."
                className="input-field mb-4"
              />

              {loading ? (
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-24 bg-navy-100 rounded-2xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                  {filteredDestinations.map(dest => (
                    <button
                      key={dest._id}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          destination: dest._id,
                          destinationName: `${dest.name}, ${dest.country}`
                        });
                      }}
                      className={`relative rounded-2xl overflow-hidden text-left group transition-all ${
                        formData.destination === dest._id ? 'ring-3 ring-voyage-500 shadow-lg' : 'hover:shadow-md'
                      }`}
                    >
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80`; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-2 left-3 right-3">
                        <p className="text-white text-sm font-bold">{dest.name}</p>
                        <p className="text-white/70 text-xs">{dest.country}</p>
                      </div>
                      {formData.destination === dest._id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-voyage-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-1">When are you traveling?</h2>
              <p className="text-navy-400 mb-6">Set your travel dates</p>

              <div className="grid md:grid-cols-2 gap-6">
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

              {days > 0 && (
                <div className="mt-4 p-3 bg-voyage-50 rounded-xl text-sm text-voyage-700 font-medium">
                  📅 Your trip will be <strong>{days} days</strong> long
                </div>
              )}

              <div className="mt-6">
                <label className="block text-sm font-semibold text-navy-700 mb-2">Number of Travelers</label>
                <div className="flex items-center gap-4 bg-navy-50 rounded-xl p-4">
                  <Users className="w-5 h-5 text-voyage-500" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, travelers: Math.max(1, formData.travelers - 1) })}
                    className="w-9 h-9 bg-white rounded-xl font-bold text-lg text-navy-700 shadow-sm hover:bg-navy-100 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-xl font-bold text-navy-900 w-8 text-center">{formData.travelers}</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, travelers: Math.min(20, formData.travelers + 1) })}
                    className="w-9 h-9 bg-white rounded-xl font-bold text-lg text-navy-700 shadow-sm hover:bg-navy-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-1">Set Your Budget</h2>
              <p className="text-navy-400 mb-6">How much do you want to spend?</p>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-navy-700 mb-2">Trip Budget (USD)</label>
                <div className="flex items-center gap-4 bg-navy-50 rounded-xl p-4">
                  <span className="text-2xl font-bold text-voyage-600">$</span>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) || 0 })}
                    className="flex-1 bg-transparent outline-none text-2xl font-bold text-navy-900"
                  />
                  <div className="flex gap-1">
                    {[500, 1000, 2500, 5000].map(val => (
                      <button
                        key={val}
                        onClick={() => setFormData({ ...formData, budget: val })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${formData.budget === val ? 'bg-voyage-500 text-white' : 'bg-white text-navy-600 hover:bg-voyage-50'}`}
                      >
                        ${val.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {formData.budget > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-navy-700">Suggested Breakdown</p>
                  {[
                    { label: 'Accommodation', pct: 0.3, color: 'bg-voyage-500' },
                    { label: 'Food', pct: 0.25, color: 'bg-emerald-500' },
                    { label: 'Activities', pct: 0.2, color: 'bg-amber-500' },
                    { label: 'Transport', pct: 0.15, color: 'bg-sky-500' },
                    { label: 'Other', pct: 0.1, color: 'bg-navy-400' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-navy-600 font-medium">{item.label}</span>
                        <span className="text-navy-800 font-semibold">${Math.round(formData.budget * item.pct).toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                  <PartyPopper className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-navy-900 text-center mb-1">Almost Done!</h2>
              <p className="text-navy-400 text-center mb-8">Give your trip a name and final details</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2">Trip Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Bali Adventure 2026"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2">Description (optional)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="What makes this trip special?"
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>

                {/* Summary */}
                <div className="bg-navy-50 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Destination</span>
                    <span className="font-semibold text-navy-800 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {formData.destinationName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Duration</span>
                    <span className="font-semibold text-navy-800">{days} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Travelers</span>
                    <span className="font-semibold text-navy-800">{formData.travelers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Budget</span>
                    <span className="font-semibold text-navy-800">${formData.budget.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prev}
          disabled={currentStep === 1}
          className="btn-secondary inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        {currentStep < 4 ? (
          <button onClick={next} className="btn-primary inline-flex items-center gap-2">
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleCreate}
            disabled={creating}
            className="btn-primary inline-flex items-center gap-2"
          >
            {creating ? (
              <span className="w-5 h-5 border-2 border-voyage-300 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Create Trip
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}