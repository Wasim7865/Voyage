import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Compass, Plane } from 'lucide-react';
import api from '../../services/api';
import DestinationCard from '../../components/destinations/DestinationCard';
import { PageLoader, EmptyState } from '../../components/ui/Loading';
import { useAuth } from '../../context/AuthContext';

export default function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState({ continent: '', climate: '', sort: 'rating' });
  const [showFilters, setShowFilters] = useState(false);
  const [savedIds, setSavedIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadDestinations = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (search) params.search = search;
      if (filters.continent) params.continent = filters.continent;
      if (filters.climate) params.climate = filters.climate;
      if (filters.sort) params.sort = filters.sort;

      const data = await api.getDestinations(params);
      setDestinations(data.destinations);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to load destinations:', error);
    } finally {
      setLoading(false);
    }
  }, [search, filters, page]);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(loadDestinations, 300);
    return () => clearTimeout(timer);
  }, [loadDestinations]);

  useEffect(() => {
    if (user) {
      api.getSavedDestinations().then((data) => {
        setSavedIds(new Set(data.savedDestinations.map(s => s.destination?._id)));
      }).catch(() => {});
    }
  }, [user]);

  const handleSave = async (destination) => {
    if (!user) return;
    try {
      if (savedIds.has(destination._id)) {
        const saved = await api.getSavedDestinations();
        const item = saved.savedDestinations.find(s => s.destination?._id === destination._id);
        if (item) await api.removeSavedDestination(item._id);
        setSavedIds(prev => {
          const next = new Set(prev);
          next.delete(destination._id);
          return next;
        });
      } else {
        await api.saveDestination(destination._id);
        setSavedIds(prev => new Set([...prev, destination._id]));
      }
    } catch (error) {
      console.error('Failed to toggle save:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    if (search) {
      setSearchParams({ search });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Public Header */}
      {!user && (
        <header className="sticky top-0 z-50 bg-navy-900/80 backdrop-blur-lg border-b border-navy-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-voyage-500 to-voyage-600 rounded-xl flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Voyage</span>
            </Link>
            <div className="flex gap-3">
              <Link to="/login" className="btn-ghost">Sign In</Link>
              <Link to="/register" className="bg-gradient-to-r from-voyage-600 to-voyage-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-voyage-700 hover:to-voyage-600 transition-all shadow-md">
                Get Started
              </Link>
            </div>
          </div>
        </header>
      )}

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-serif text-3xl lg:text-4xl font-medium text-white mb-2">
            Explore <span className="italic text-voyage-300">Destinations</span>
          </h1>
          <p className="text-navy-300 mb-8">Discover the world's most amazing places to travel</p>
        </motion.div>

        {/* Search & Filters */}
        <div className="bg-navy-900 border border-navy-800 rounded-2xl p-4 mb-8">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 bg-navy-800 rounded-xl px-4">
              <Search className="w-5 h-5 text-navy-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, country, or description..."
                className="flex-1 bg-transparent outline-none py-3 text-navy-200 placeholder:text-navy-400"
              />
              {search && (
                <button onClick={() => { setSearch(''); setSearchParams({}); }} className="text-navy-400 hover:text-navy-200">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 py-3 rounded-xl border transition-all flex items-center gap-2 ${showFilters ? 'bg-voyage-500/15 border-voyage-500/40 text-voyage-300' : 'border-navy-700 text-navy-300 hover:bg-navy-800'}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </form>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-navy-800"
            >
              <div>
                <label className="text-xs font-semibold text-navy-300 mb-1.5 block">Continent</label>
                <select
                  value={filters.continent}
                  onChange={(e) => { setFilters({ ...filters, continent: e.target.value }); setPage(1); }}
                  className="input-field"
                >
                  <option value="">All Continents</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="North America">North America</option>
                  <option value="South America">South America</option>
                  <option value="Africa">Africa</option>
                  <option value="Oceania">Oceania</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-navy-300 mb-1.5 block">Climate</label>
                <select
                  value={filters.climate}
                  onChange={(e) => { setFilters({ ...filters, climate: e.target.value }); setPage(1); }}
                  className="input-field"
                >
                  <option value="">All Climates</option>
                  <option value="tropical">Tropical</option>
                  <option value="temperate">Temperate</option>
                  <option value="arid">Arid</option>
                  <option value="mediterranean">Mediterranean</option>
                  <option value="continental">Continental</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-navy-300 mb-1.5 block">Sort By</label>
                <select
                  value={filters.sort}
                  onChange={(e) => { setFilters({ ...filters, sort: e.target.value }); setPage(1); }}
                  className="input-field"
                >
                  <option value="rating">Top Rated</option>
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => { setFilters({ continent: '', climate: '', sort: 'rating' }); setPage(1); }}
                  className="text-sm text-voyage-300 font-semibold hover:text-voyage-200"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-navy-300">
            Showing <span className="font-semibold text-white">{destinations.length}</span> destinations
          </p>
          <span className="text-xs font-medium bg-voyage-500/15 text-voyage-300 px-3 py-1 rounded-full">
            {totalPages} pages
          </span>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-navy-900 border border-navy-800 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-56 bg-navy-800" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-navy-800 rounded w-1/2" />
                  <div className="h-4 bg-navy-800 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <EmptyState
            icon={Plane}
            title="No destinations found"
            description="Try adjusting your search or filters to find more amazing places to explore."
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
                onSave={user ? handleSave : null}
                isSaved={savedIds.has(destination._id)}
              />
            ))}
          </div>
        )}

        {/* Pagination — windowed so every page stays reachable (the old
            `.slice(0, 5)` rendered only the first 5 buttons, hiding page 6+). */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage(prev => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl border border-navy-700 text-navy-300 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-navy-800 transition-all"
            >
              Previous
            </button>

            {(() => {
              // Show a sliding window of ≤5 page numbers around the current
              // page, plus first/last with ellipses when page count is large.
              const pageBtn = (p, key, label, clickable = true) => (
                <button
                  key={key}
                  onClick={() => clickable && setPage(p)}
                  disabled={!clickable}
                  className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                    !clickable
                      ? 'cursor-default text-navy-400'
                      : page === p
                        ? 'bg-gradient-to-r from-voyage-600 to-voyage-500 text-white shadow-md'
                        : 'border border-navy-700 text-navy-300 hover:bg-navy-800'
                  }`}
                >
                  {label}
                </button>
              );

              const btns = [];
              if (totalPages <= 5) {
                for (let i = 1; i <= totalPages; i++) btns.push(pageBtn(i, i, i));
              } else {
                const winStart = Math.max(1, Math.min(page - 2, totalPages - 4));
                const winEnd = winStart + 4;
                if (winStart > 1) {
                  btns.push(pageBtn(1, 'first', 1));
                  if (winStart > 2) btns.push(pageBtn(winStart - 1, 'ellipsis-l', '…', false));
                }
                for (let i = winStart; i <= winEnd; i++) btns.push(pageBtn(i, i, i));
                if (winEnd < totalPages) {
                  if (winEnd < totalPages - 1) btns.push(pageBtn(winEnd + 1, 'ellipsis-r', '…', false));
                  btns.push(pageBtn(totalPages, 'last', totalPages));
                }
              }
              return btns;
            })()}

            <button
              onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl border border-navy-700 text-navy-300 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-navy-800 transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}