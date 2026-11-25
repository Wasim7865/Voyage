import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wallet, Sparkles, Loader2, TrendingUp, PiggyBank, RefreshCw,
  BedDouble, Plane, Utensils, Camera, ShoppingBag, MoreHorizontal,
  Lightbulb
} from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const breakdownIcons = {
  accommodation: BedDouble,
  transportation: Plane,
  food: Utensils,
  activities: Camera,
  shopping: ShoppingBag,
  other: MoreHorizontal,
};

const breakdownColors = {
  accommodation: 'from-voyage-500 to-voyage-600',
  transportation: 'from-emerald-500 to-teal-600',
  food: 'from-amber-500 to-orange-600',
  activities: 'from-sky-500 to-blue-600',
  shopping: 'from-pink-500 to-rose-600',
  other: 'from-navy-400 to-navy-600',
};

export default function AIBudgetPlanner() {
  const [formData, setFormData] = useState({
    destination: 'Bali',
    duration: 7,
    budget: 2000,
    style: 'moderate',
  });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const handlePlan = async () => {
    setLoading(true);
    try {
      const data = await api.getBudgetPlan(formData);
      setPlan(data.budgetPlan);
      toast.success('Budget plan generated!');
    } catch (error) {
      toast.error(error.message || 'Failed to generate budget plan');
    } finally {
      setLoading(false);
    }
  };

  const dailyBudget = plan ? Math.round((formData.budget / formData.duration)) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-bold text-navy-900 flex items-center gap-3">
          <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <Wallet className="w-5 h-5 text-white" />
          </span>
          AI Budget Planner
        </h1>
        <p className="text-navy-400 mt-1">Smart money allocation for your dream trip</p>
      </motion.div>

      {/* Input Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-8 shadow-card max-w-3xl">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-navy-700 mb-2">Destination</label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              placeholder="e.g. Bali, Paris, Tokyo"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy-700 mb-2">Duration (days)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) || 1 })}
              className="input-field"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-navy-700 mb-2">Total Budget</label>
          <div className="flex items-center gap-4 bg-navy-50 rounded-xl p-4">
            <PiggyBank className="w-5 h-5 text-emerald-500" />
            <span className="text-2xl font-bold text-emerald-600">$</span>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) || 0 })}
              className="flex-1 bg-transparent outline-none text-2xl font-bold text-navy-900"
            />
            <div className="flex gap-1">
              {[1000, 2500, 5000, 10000].map(val => (
                <button
                  key={val}
                  onClick={() => setFormData({ ...formData, budget: val })}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${formData.budget === val ? 'bg-emerald-500 text-white' : 'bg-white text-navy-600 hover:bg-emerald-50'}`}
                >
                  ${val.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-navy-700 mb-2">Travel Style</label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'budget', label: '🎒 Budget' },
              { id: 'moderate', label: '🌟 Moderate' },
              { id: 'luxury', label: '💎 Luxury' },
            ].map(style => (
              <button
                key={style.id}
                onClick={() => setFormData({ ...formData, style: style.id })}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  formData.style === style.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md'
                    : 'bg-navy-50 text-navy-600 hover:bg-emerald-50'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handlePlan} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Analyzing budget...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" /> Generate Budget Plan
            </>
          )}
        </button>
      </motion.div>

      {/* Results */}
      {plan && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="stat-card">
              <p className="text-3xl font-bold text-navy-900">${formData.budget.toLocaleString()}</p>
              <p className="text-sm text-navy-400">Total Budget</p>
            </div>
            <div className="stat-card">
              <p className="text-3xl font-bold text-emerald-600">${dailyBudget}</p>
              <p className="text-sm text-navy-400">Per Day</p>
            </div>
            <div className="stat-card">
              <p className="text-3xl font-bold text-voyage-600">{formData.duration}</p>
              <p className="text-sm text-navy-400">Trip Days</p>
            </div>
            <div className="stat-card">
              <p className="text-3xl font-bold text-amber-600">${plan.accommodation?.toLocaleString() ?? '0'}</p>
              <p className="text-sm text-navy-400">Accommodation</p>
            </div>
          </div>

          {/* Breakdown Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl p-8 shadow-card">
            <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" /> Budget Breakdown
            </h2>
            <div className="space-y-5">
              {Object.entries(plan).filter(([k]) => k !== 'tips').map(([key, value]) => {
                const Icon = breakdownIcons[key];
                const pct = Math.round((value / formData.budget) * 100);
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${breakdownColors[key]} flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </span>
                        <span className="text-sm font-semibold text-navy-800 capitalize">{key}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-navy-400">{pct}%</span>
                        <span className="font-bold text-navy-900">${value.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="h-2.5 bg-navy-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`h-full rounded-full bg-gradient-to-r ${breakdownColors[key]}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl p-8 shadow-card">
            <h2 className="text-xl font-bold text-navy-900 mb-5 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" /> AI Money-Saving Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {plan.tips?.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-amber-50/50 rounded-2xl border border-amber-100">
                  <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-navy-700">{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <button
            onClick={handlePlan}
            className="btn-secondary flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" /> Regenerate Plan
          </button>
        </motion.div>
      )}
    </div>
  );
}