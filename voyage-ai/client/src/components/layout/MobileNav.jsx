import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MapPin, Compass, Bot, User } from 'lucide-react';

const items = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { to: '/trips', icon: MapPin, label: 'Trips' },
  { to: '/destinations', icon: Compass, label: 'Explore' },
  { to: '/ai-assistant', icon: Bot, label: 'AI' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-navy-900/95 backdrop-blur-lg border-t border-navy-100 dark:border-navy-800 z-50 safe-bottom">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
                isActive ? 'text-voyage-600 dark:text-voyage-400' : 'text-navy-400 dark:text-navy-500'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
