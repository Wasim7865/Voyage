import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Plus, MapPin, Clock, Trash2, Pencil, Sparkles,
  Plane, Bed, Utensils, Briefcase, ShoppingBag, MoreHorizontal,
  CheckCircle, X, Save
} from 'lucide-react';
import api from '../../services/api';
import { PageLoader } from '../../components/ui/Loading';
import toast from 'react-hot-toast';
import { formatUsd } from '../../utils/currency';

const categoryConfig = {
  transport: { icon: Plane, color: 'bg-sky-100 text-sky-600' },
  accommodation: { icon: Bed, color: 'bg-voyage-100 text-voyage-600' },
  food: { icon: Utensils, color: 'bg-orange-100 text-orange-600' },
  activity: { icon: Briefcase, color: 'bg-emerald-100 text-emerald-600' },
  sightseeing: { icon: MapPin, color: 'bg-amber-100 text-amber-600' },
  shopping: { icon: ShoppingBag, color: 'bg-pink-100 text-pink-600' },
  other: { icon: MoreHorizontal, color: 'bg-navy-100 text-navy-600' },
};

const emptyActivity = {
  time: '',
  title: '',
  description: '',
  location: '',
  category: 'activity',
  cost: 0,
  completed: false,
};

export default function Itinerary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingDay, setAddingDay] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [saving, setSaving] = useState(false);
  const [newActivity, setNewActivity] = useState(emptyActivity);

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const data = await api.getTrip(id);
        setTrip(data.trip);
      } catch (error) {
        toast.error(error.message || 'Failed to load trip');
      } finally {
        setLoading(false);
      }
    };
    loadTrip();
  }, [id]);

  const totalDays = trip
    ? Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / 86400000)
    : 0;

  const handleSaveActivity = async () => {
    if (!addingDay) return;
    if (!newActivity.title) {
      toast.error('Activity title is required');
      return;
    }

    setSaving(true);
    try {
      const itinerary = [...trip.itinerary];
      const dayIndex = itinerary.findIndex(d => d.day === addingDay);

      if (dayIndex === -1) {
        itinerary.push({
          day: addingDay,
          date: new Date(new Date(trip.startDate).setDate(new Date(trip.startDate).getDate() + addingDay - 1)),
          title: `Day ${addingDay}`,
          activities: [newActivity]
        });
        itinerary.sort((a, b) => a.day - b.day);
      } else {
        if (editingActivity !== null) {
          itinerary[dayIndex].activities[editingActivity] = newActivity;
        } else {
          itinerary[dayIndex].activities = [...(itinerary[dayIndex].activities || []), newActivity];
        }
      }

      const data = await api.updateItinerary(id, itinerary);
      setTrip(data.trip);
      setAddingDay(null);
      setEditingActivity(null);
      setNewActivity(emptyActivity);
      toast.success(editingActivity !== null ? 'Activity updated' : 'Activity added');
    } catch (error) {
      toast.error(error.message || 'Failed to save activity');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteActivity = async (day, actIndex) => {
    if (!window.confirm('Delete this activity?')) return;
    const itinerary = [...trip.itinerary];
    const dayIndex = itinerary.findIndex(d => d.day === day);
    itinerary[dayIndex].activities.splice(actIndex, 1);
    try {
      const data = await api.updateItinerary(id, itinerary);
      setTrip(data.trip);
      toast.success('Activity deleted');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleToggleCompleted = async (day, actIndex) => {
    const itinerary = [...trip.itinerary];
    const dayIndex = itinerary.findIndex(d => d.day === day);
    itinerary[dayIndex].activities[actIndex].completed = !itinerary[dayIndex].activities[actIndex].completed;
    try {
      const data = await api.updateItinerary(id, itinerary);
      setTrip(data.trip);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const startAdd = (day) => {
    setAddingDay(day);
    setEditingActivity(null);
    setNewActivity(emptyActivity);
  };

  const startEdit = (day, actIndex, activity) => {
    setAddingDay(day);
    setEditingActivity(actIndex);
    setNewActivity({ ...activity });
  };

  const handleOptimize = async () => {
    try {
      toast.loading('Optimizing your itinerary...', { id: 'optimize' });
      const data = await api.optimizeItinerary(id);
      setTrip(data.trip);
      toast.success('Itinerary optimized!', { id: 'optimize' });
    } catch (error) {
      toast.error(error.message || 'Failed to optimize', { id: 'optimize' });
    }
  };

  if (loading) return <PageLoader />;
  if (!trip) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(`/trips/${id}`)} className="p-2.5 rounded-xl bg-white shadow-card hover:bg-navy-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-navy-600" />
          </button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-navy-900">Itinerary</h1>
            <p className="text-navy-400">{trip.title} · {totalDays} days</p>
          </div>
        </div>
        <button
          onClick={handleOptimize}
          className="bg-gradient-to-r from-voyage-600 to-voyage-500 text-white px-5 py-3 rounded-xl font-bold hover:from-voyage-700 hover:to-voyage-600 transition-all flex items-center gap-2 shadow-lg"
        >
          <Sparkles className="w-4 h-4" /> Optimize with AI
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {Array.from({ length: totalDays }).map((_, idx) => {
          const dayNum = idx + 1;
          const dayData = trip.itinerary?.find(d => d.day === dayNum);
          const date = new Date(trip.startDate);
          date.setDate(date.getDate() + idx);
          const activities = dayData?.activities || [];
          const completedCount = activities.filter(a => a.completed).length;

          return (
            <motion.div
              key={dayNum}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-3xl shadow-card overflow-hidden"
            >
              {/* Day Header */}
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-100 bg-gradient-to-r from-navy-50 to-voyage-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-voyage-500 to-voyage-600 text-white flex flex-col items-center justify-center shadow-md flex-shrink-0">
                    <span className="text-[10px] font-bold uppercase opacity-80">Day</span>
                    <span className="text-xl font-bold leading-none">{dayNum}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900">{dayData?.title || `Day ${dayNum}`}</h3>
                    <p className="text-sm text-navy-400">
                      {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {activities.length > 0 && (
                    <span className="text-xs font-medium bg-white px-3 py-1.5 rounded-full shadow-sm text-navy-500">
                      {completedCount}/{activities.length} done
                    </span>
                  )}
                  <button onClick={() => startAdd(dayNum)} className="btn-primary !py-2 !px-4 text-sm">
                    <Plus className="w-4 h-4 inline-block mr-1 -mt-0.5" /> Activity
                  </button>
                </div>
              </div>

              {/* Activities */}
              <div className="p-5 space-y-3">
                {activities.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-navy-300 mb-3">No activities planned for this day</p>
                    <button onClick={() => startAdd(dayNum)} className="text-voyage-600 font-semibold hover:text-voyage-700">
                      + Add first activity
                    </button>
                  </div>
                ) : (
                  activities.map((act, actIdx) => {
                    const config = categoryConfig[act.category] || categoryConfig.other;
                    return (
                      <div
                        key={actIdx}
                        className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                          act.completed ? 'bg-emerald-50/50 border-emerald-200' : 'border-navy-100 hover:border-voyage-200'
                        }`}
                      >
                        <button
                          onClick={() => handleToggleCompleted(dayNum, actIdx)}
                          className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                            act.completed ? 'bg-emerald-500 border-emerald-500' : 'border-navy-300 hover:border-voyage-500'
                          }`}
                        >
                          {act.completed && <CheckCircle className="w-4 h-4 text-white" />}
                        </button>

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <span className="text-xs font-bold text-voyage-600 bg-voyage-50 rounded-md px-2 py-1 flex-shrink-0 inline-flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {act.time || 'Anytime'}
                            </span>
                            <span className={`w-7 h-7 rounded-lg ${config.color} flex items-center justify-center flex-shrink-0`}>
                              <config.icon className="w-3.5 h-3.5" />
                            </span>
                            <h4 className={`font-semibold ${act.completed ? 'text-navy-400 line-through' : 'text-navy-900'}`}>
                              {act.title}
                            </h4>
                          </div>
                          {act.description && (
                            <p className="text-sm text-navy-400 mt-1">{act.description}</p>
                          )}
                          {act.location && (
                            <p className="text-xs text-navy-400 mt-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {act.location}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          {act.cost > 0 && <span className="text-sm font-bold text-voyage-600">{formatUsd(act.cost)}</span>}
                          <div className="flex gap-1">
                            <button onClick={() => startEdit(dayNum, actIdx, act)} className="p-1.5 rounded-lg text-navy-400 hover:text-voyage-600 hover:bg-voyage-50 transition-colors">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteActivity(dayNum, actIdx)} className="p-1.5 rounded-lg text-navy-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add/Edit Activity Modal */}
      <AnimatePresence>
        {addingDay !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => { setAddingDay(null); setEditingActivity(null); }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-navy-900">
                  {editingActivity !== null ? 'Edit Activity' : `Add Activity - Day ${addingDay}`}
                </h3>
                <button onClick={() => { setAddingDay(null); setEditingActivity(null); }} className="p-2 rounded-xl hover:bg-navy-50">
                  <X className="w-5 h-5 text-navy-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-1.5">Title</label>
                  <input
                    type="text"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                    placeholder="e.g. Visit the Museum"
                    className="input-field"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1.5">Time</label>
                    <input
                      type="time"
                      value={newActivity.time}
                      onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1.5">Category</label>
                    <select
                      value={newActivity.category}
                      onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
                      className="input-field"
                    >
                      {Object.keys(categoryConfig).map(cat => (
                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-1.5">Description</label>
                  <textarea
                    rows={2}
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                    placeholder="Details about this activity..."
                    className="input-field resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1.5">Location</label>
                    <input
                      type="text"
                      value={newActivity.location}
                      onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                      placeholder="e.g. Downtown area"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1.5">Cost (USD)</label>
                    <input
                      type="number"
                      value={newActivity.cost}
                      onChange={(e) => setNewActivity({ ...newActivity, cost: Number(e.target.value) || 0 })}
                      className="input-field"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveActivity}
                  disabled={saving}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <span className="w-5 h-5 border-2 border-voyage-300 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {editingActivity !== null ? 'Update Activity' : 'Add to Itinerary'}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}