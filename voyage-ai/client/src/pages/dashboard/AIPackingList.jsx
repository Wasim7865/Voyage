import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package, Sparkles, Loader2, RefreshCw, Check, Shirt,
  FileText, Cpu, Heart, RefreshCcw, Briefcase
} from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const categoryConfig = {
  essentials: { icon: Briefcase, color: 'from-voyage-500 to-voyage-600', label: 'Essentials' },
  clothing: { icon: Shirt, color: 'from-emerald-500 to-teal-600', label: 'Clothing' },
  tech: { icon: Cpu, color: 'from-amber-500 to-orange-600', label: 'Tech & Electronics' },
  toiletries: { icon: Heart, color: 'from-pink-500 to-rose-600', label: 'Toiletries' },
  documents: { icon: FileText, color: 'from-sky-500 to-blue-600', label: 'Documents' },
};

export default function AIPackingList() {
  const [formData, setFormData] = useState({
    destination: 'Bali',
    duration: 7,
    climate: 'tropical',
    activities: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [checked, setChecked] = useState(new Set());

  const handleGenerate = async () => {
    setLoading(true);
    setChecked(new Set());
    try {
      const data = await api.getPackingList({
        ...formData,
        activities: formData.activities.split(',').map(a => a.trim()).filter(Boolean)
      });
      setResult(data.packingList);
      toast.success('Packing list generated!');
    } catch (error) {
      toast.error(error.message || 'Failed to generate packing list');
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (item) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  };

  const allItems = result ? Object.values(result).flat() : [];
  const checkedCount = checked.size;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-bold text-navy-900 flex items-center gap-3">
          <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
            <Package className="w-5 h-5 text-white" />
          </span>
          AI Packing List
        </h1>
        <p className="text-navy-400 mt-1">Never forget essential items for your trip</p>
      </motion.div>

      {/* Input */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-8 shadow-card max-w-3xl">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
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
              max="90"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) || 1 })}
              className="input-field"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-navy-700 mb-2">Climate</label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'tropical', label: '🏝️ Tropical' },
              { id: 'temperate', label: '🌤️ Temperate' },
              { id: 'cold', label: '❄️ Cold' },
              { id: 'arid', label: '🏜️ Arid' },
            ].map(climate => (
              <button
                key={climate.id}
                onClick={() => setFormData({ ...formData, climate: climate.id })}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  formData.climate === climate.id
                    ? 'bg-gradient-to-r from-amber-600 to-orange-500 text-white shadow-md'
                    : 'bg-navy-50 text-navy-600 hover:bg-amber-50'
                }`}
              >
                {climate.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-navy-700 mb-2">
            Planned Activities <span className="text-navy-400 font-normal">(comma separated, optional)</span>
          </label>
          <input
            type="text"
            value={formData.activities}
            onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
            placeholder="e.g. hiking, swimming, city tours"
            className="input-field"
          />
        </div>

        <button onClick={handleGenerate} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Packing smart...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" /> Generate Packing List
            </>
          )}
        </button>
      </motion.div>

      {/* Results */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Progress */}
          <div className="bg-white rounded-3xl p-6 shadow-card flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-navy-800">Packing Progress</span>
                <span className="text-sm font-bold text-voyage-600">{checkedCount}/{allItems.length}</span>
              </div>
              <div className="h-3 bg-navy-100 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${allItems.length ? (checkedCount / allItems.length) * 100 : 0}%` }}
                  className="h-full bg-gradient-to-r from-voyage-500 to-voyage-400 rounded-full"
                />
              </div>
            </div>
            <button onClick={() => { setChecked(new Set()); }} className="p-2.5 rounded-xl bg-navy-50 text-navy-500 hover:bg-voyage-50 hover:text-voyage-600 transition-colors">
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Category Lists */}
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(result).map(([category, items]) => {
              const config = categoryConfig[category];
              return (
                <motion.div key={category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 shadow-card">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                      <config.icon className="w-5 h-5 text-white" />
                    </span>
                    <h3 className="font-bold text-navy-900">{config.label}</h3>
                    <span className="ml-auto text-xs font-semibold bg-navy-50 text-navy-500 px-2.5 py-1 rounded-full">
                      {items.length} items
                    </span>
                  </div>
                  <div className="space-y-2">
                    {items.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => toggleItem(item)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                          checked.has(item)
                            ? 'bg-emerald-50 border border-emerald-200'
                            : 'bg-navy-50/50 hover:bg-voyage-50/50'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                          checked.has(item) ? 'bg-emerald-500 border-emerald-500' : 'border-navy-300'
                        }`}>
                          {checked.has(item) && <Check className="w-3.5 h-3.5 text-white" />}
                        </span>
                        <span className={`text-sm text-left ${checked.has(item) ? 'text-navy-400 line-through' : 'text-navy-700 font-medium'}`}>
                          {item}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button onClick={handleGenerate} className="btn-secondary flex items-center gap-2 mx-auto">
            <RefreshCw className="w-4 h-4" /> Regenerate List
          </button>
        </motion.div>
      )}
    </div>
  );
}