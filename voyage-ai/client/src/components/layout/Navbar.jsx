import { useState } from 'react';
import { Search, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ title }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  return (
    <header className="bg-white/80 dark:bg-navy-900/80 backdrop-blur-lg border-b border-navy-100 dark:border-navy-800 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-xl font-bold text-navy-900 dark:text-white">{title || 'Dashboard'}</h2>
        </div>
        <div className="flex items-center gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(query.trim() ? `/destinations?search=${encodeURIComponent(query.trim())}` : '/destinations');
            }}
            className="hidden md:flex items-center gap-2 bg-navy-50 dark:bg-navy-800 rounded-xl px-4 py-2.5"
          >
            <Search className="w-4 h-4 text-navy-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations, trips..."
              className="bg-transparent border-none outline-none text-sm text-navy-700 dark:text-navy-200 placeholder:text-navy-400 w-48"
            />
          </form>
          <button
            onClick={() => navigate('/settings')}
            className="p-2.5 rounded-xl hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-navy-600 dark:text-navy-300" />
          </button>
        </div>
      </div>
    </header>
  );
}
