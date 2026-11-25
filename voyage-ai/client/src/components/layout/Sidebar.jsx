import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, MapPin, PlusCircle, Compass, Bot, Wallet,
  Package, Heart, User, LogOut, ChevronLeft, ChevronRight, Shield, Plane
} from 'lucide-react';
import { useState } from 'react';
import ConfirmDialog from '../ui/ConfirmDialog';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/trips', icon: MapPin, label: 'My Trips' },
  { to: '/trips/create', icon: PlusCircle, label: 'Create Trip' },
  { to: '/destinations', icon: Compass, label: 'Destinations' },
  { to: '/ai-planner', icon: Plane, label: 'AI Trip Planner' },
  { to: '/ai-assistant', icon: Bot, label: 'AI Assistant' },
  { to: '/ai-budget', icon: Wallet, label: 'Budget Planner' },
  { to: '/ai-packing', icon: Package, label: 'Packing List' },
  { to: '/saved', icon: Heart, label: 'Saved Places' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showSignOut, setShowSignOut] = useState(false);

  // Only runs when the user confirms sign-out in the dialog
  const handleSignOut = () => {
    setShowSignOut(false);
    logout();
    navigate('/');
  };

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-navy-900 via-navy-900 to-navy-950 text-white z-40 transition-all duration-300 flex flex-col ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 bg-gradient-to-br from-voyage-500 to-voyage-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Compass className="w-6 h-6 text-white" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-xl font-bold tracking-tight">Voyage</h1>
            <p className="text-[10px] text-voyage-300 font-medium tracking-widest uppercase">AI Travel</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? 'sidebar-link-active' : 'sidebar-link'
            }
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </NavLink>
        ))}

        {user?.role === 'admin' && (
          <>
            <div className="border-t border-white/10 my-4" />
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? 'sidebar-link-active' : 'sidebar-link'
              }
            >
              <Shield className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm">Admin Panel</span>}
            </NavLink>
          </>
        )}
      </nav>

      {/* User & Toggle */}
      <div className="p-4 border-t border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-voyage-400 to-voyage-600 flex items-center justify-center text-sm font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-navy-400 truncate">{user?.email}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <NavLink to="/profile" className="sidebar-link flex-1" title="Profile">
            <User className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">Profile</span>}
          </NavLink>
          <button onClick={() => setShowSignOut(true)} className="sidebar-link text-red-400 hover:text-red-300 hover:bg-red-500/10" title="Logout">
            <LogOut className="w-5 h-5" />
          </button>
          <button
            onClick={onToggle}
            className="sidebar-link hidden lg:flex"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sign out confirmation */}
      <ConfirmDialog
        open={showSignOut}
        onClose={() => setShowSignOut(false)}
        onConfirm={handleSignOut}
        title="Are you sure you want to sign out?"
        message="You'll need to sign back in to access your trips, saved places, and personalized plans."
        confirmText="Sign Out"
        cancelText="Cancel"
        icon={<LogOut className="w-6 h-6" />}
      />
    </aside>
  );
}
