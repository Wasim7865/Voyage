import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sun, Moon, Monitor, Palette, Ruler, Shield, User,
  Plane, Bed, Wallet, Trash2,
  LogOut, Lock, KeyRound, Check, ChevronRight
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import toast from 'react-hot-toast';

const sections = [
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'travel', label: 'Travel Preferences', icon: Plane },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'account', label: 'Account', icon: User },
];

const travelStyles = [
  { value: 'adventure', label: 'Adventure', desc: 'Thrilling experiences' },
  { value: 'relaxation', label: 'Relaxation', desc: 'Peaceful getaways' },
  { value: 'cultural', label: 'Cultural', desc: 'History & traditions' },
  { value: 'romantic', label: 'Romantic', desc: 'Couples retreats' },
  { value: 'family', label: 'Family', desc: 'Kid-friendly trips' },
  { value: 'business', label: 'Business', desc: 'Work travel' },
  { value: 'eco', label: 'Eco-Tourism', desc: 'Sustainable travel' },
];

const tripPaces = [
  { value: 'relaxed', label: 'Relaxed', desc: 'Flexible, unhurried' },
  { value: 'moderate', label: 'Moderate', desc: 'Balanced itinerary' },
  { value: 'packed', label: 'Packed', desc: 'See everything' },
];

const accommodationTypes = [
  { value: 'hotel', label: 'Hotels', desc: 'Traditional stays' },
  { value: 'hostel', label: 'Hostels', desc: 'Budget-friendly' },
  { value: 'airbnb', label: 'Vacation Rentals', desc: 'Home-like stays' },
  { value: 'resort', label: 'Resorts', desc: 'All-inclusive' },
  { value: 'boutique', label: 'Boutique', desc: 'Unique properties' },
];

const budgetRanges = [
  { value: 'budget', label: 'Budget', desc: 'Under $50/day' },
  { value: 'moderate', label: 'Moderate', desc: '$50-150/day' },
  { value: 'luxury', label: 'Luxury', desc: '$150-500/day' },
  { value: 'ultra-luxury', label: 'Ultra Luxury', desc: '$500+/day' },
];

function SettingToggle({ enabled, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-semibold text-navy-800">{label}</p>
        {description && <p className="text-xs text-navy-400 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
          enabled ? 'bg-voyage-500' : 'bg-navy-200'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
            enabled ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </div>
  );
}

function OptionCard({ selected, onClick, icon: Icon, label, desc }) {
  return (
    <button
      onClick={onClick}
      className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
        selected
          ? 'border-voyage-500 bg-voyage-50 shadow-md'
          : 'border-navy-100 bg-white hover:border-navy-200 hover:bg-navy-50'
      }`}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-voyage-500 rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
      {Icon && (
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
          selected ? 'bg-voyage-100 text-voyage-600' : 'bg-navy-50 text-navy-400'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      <p className={`text-sm font-semibold ${selected ? 'text-voyage-700' : 'text-navy-800'}`}>{label}</p>
      {desc && <p className="text-xs text-navy-400 mt-0.5">{desc}</p>}
    </button>
  );
}

export default function Settings() {
  const { settings, updateSetting, resetSettings } = useSettings();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('appearance');
  const [showClearSearches, setShowClearSearches] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saving, setSaving] = useState(false);

  const handleClearSearches = () => {
    localStorage.removeItem('voyage-recent-searches');
    setShowClearSearches(false);
    toast.success('Recent searches cleared');
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setSaving(true);
    try {
      const { default: api } = await import('../../services/api');
      const data = await api.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      // Refresh the stored JWT so sessions carry the freshly-signed token.
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      toast.success('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = () => {
    setShowSignOut(false);
    logout();
    navigate('/');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-navy-900">Settings</h1>
        <p className="text-navy-400 mt-1">Customize your travel experience</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-64 flex-shrink-0"
        >
          <div className="bg-white rounded-3xl shadow-card p-2 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-voyage-600 to-voyage-500 text-white shadow-md'
                    : 'text-navy-500 hover:bg-navy-50'
                }`}
              >
                <section.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 min-w-0"
        >
          {activeSection === 'appearance' && (
            <div className="bg-white rounded-3xl shadow-card p-8">
              <h2 className="text-xl font-bold text-navy-900 mb-2">Appearance</h2>
              <p className="text-navy-400 text-sm mb-8">Choose how Voyage looks on your device</p>

              <div className="space-y-8">
                {/* Theme Selection */}
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-4 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-voyage-500" /> Theme
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <OptionCard
                      selected={settings.theme === 'light'}
                      onClick={() => updateSetting('theme', 'light')}
                      icon={Sun}
                      label="Light"
                      desc="Bright and clear"
                    />
                    <OptionCard
                      selected={settings.theme === 'dark'}
                      onClick={() => updateSetting('theme', 'dark')}
                      icon={Moon}
                      label="Dark"
                      desc="Easy on the eyes"
                    />
                    <OptionCard
                      selected={settings.theme === 'system'}
                      onClick={() => updateSetting('theme', 'system')}
                      icon={Monitor}
                      label="System"
                      desc="Match your device"
                    />
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-4">Preview</label>
                  <div className={`p-6 rounded-2xl border-2 ${
                    settings.theme === 'dark'
                      ? 'bg-navy-900 border-navy-700'
                      : settings.theme === 'system'
                      ? 'bg-gradient-to-r from-white to-navy-50 border-navy-100'
                      : 'bg-white border-navy-100'
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        settings.theme === 'dark' ? 'bg-voyage-600' : 'bg-gradient-to-br from-voyage-500 to-voyage-600'
                      }`}>
                        <Plane className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${settings.theme === 'dark' ? 'text-white' : 'text-navy-900'}`}>
                          Sample Card
                        </p>
                        <p className={`text-xs ${settings.theme === 'dark' ? 'text-navy-300' : 'text-navy-400'}`}>
                          Preview of your theme
                        </p>
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${
                      settings.theme === 'dark' ? 'bg-navy-800' : 'bg-navy-50'
                    }`}>
                      <p className={`text-sm ${settings.theme === 'dark' ? 'text-navy-200' : 'text-navy-600'}`}>
                        This is how content will appear with your selected theme.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'travel' && (
            <div className="bg-white rounded-3xl shadow-card p-8">
              <h2 className="text-xl font-bold text-navy-900 mb-2">Travel Preferences</h2>
              <p className="text-navy-400 text-sm mb-8">Help us personalize your travel recommendations</p>

              <div className="space-y-8">
                {/* Travel Style */}
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-4 flex items-center gap-2">
                    <Plane className="w-4 h-4 text-voyage-500" /> Preferred Travel Style
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {travelStyles.map(style => (
                      <OptionCard
                        key={style.value}
                        selected={settings.travelPreferences.travelStyle === style.value}
                        onClick={() => updateSetting('travelPreferences.travelStyle', style.value)}
                        label={style.label}
                        desc={style.desc}
                      />
                    ))}
                  </div>
                </div>

                {/* Trip Pace */}
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-4 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-emerald-500" /> Trip Pace
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {tripPaces.map(pace => (
                      <OptionCard
                        key={pace.value}
                        selected={settings.travelPreferences.tripPace === pace.value}
                        onClick={() => updateSetting('travelPreferences.tripPace', pace.value)}
                        label={pace.label}
                        desc={pace.desc}
                      />
                    ))}
                  </div>
                </div>

                {/* Accommodation Type */}
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-4 flex items-center gap-2">
                    <Bed className="w-4 h-4 text-blue-500" /> Accommodation Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {accommodationTypes.map(type => (
                      <OptionCard
                        key={type.value}
                        selected={settings.travelPreferences.accommodationType === type.value}
                        onClick={() => updateSetting('travelPreferences.accommodationType', type.value)}
                        label={type.label}
                        desc={type.desc}
                      />
                    ))}
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-4 flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-amber-500" /> Budget Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {budgetRanges.map(range => (
                      <OptionCard
                        key={range.value}
                        selected={settings.travelPreferences.budgetRange === range.value}
                        onClick={() => updateSetting('travelPreferences.budgetRange', range.value)}
                        label={range.label}
                        desc={range.desc}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="bg-white rounded-3xl shadow-card p-8">
              <h2 className="text-xl font-bold text-navy-900 mb-2">Privacy</h2>
              <p className="text-navy-400 text-sm mb-8">Control your data and privacy settings</p>

              <div className="space-y-6 max-w-2xl">
                <div className="divide-y divide-navy-100">
                  <SettingToggle
                    enabled={settings.privacy.savePreferences}
                    onChange={(val) => updateSetting('privacy.savePreferences', val)}
                    label="Save Travel Preferences"
                    description="Remember your travel style and preferences for personalized recommendations"
                  />
                  <SettingToggle
                    enabled={settings.privacy.saveRecentSearches}
                    onChange={(val) => updateSetting('privacy.saveRecentSearches', val)}
                    label="Save Recent Searches"
                    description="Keep a history of your destination searches for quick access"
                  />
                </div>

                <div className="pt-4 border-t border-navy-100">
                  <h3 className="text-sm font-semibold text-navy-700 mb-2">Clear Data</h3>
                  <p className="text-xs text-navy-400 mb-4">Remove locally stored data from this device</p>
                  <button
                    onClick={() => setShowClearSearches(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-500 font-semibold text-sm hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Clear Recent Searches
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'account' && (
            <div className="space-y-6">
              {/* Profile Info */}
              <div className="bg-white rounded-3xl shadow-card p-8">
                <h2 className="text-xl font-bold text-navy-900 mb-2">Account</h2>
                <p className="text-navy-400 text-sm mb-6">Manage your account settings</p>

                <div className="flex items-center gap-4 p-4 bg-navy-50 rounded-2xl mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-voyage-400 to-voyage-600 flex items-center justify-center text-xl font-bold text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">{user?.name}</p>
                    <p className="text-sm text-navy-400">{user?.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-2 text-voyage-600 font-semibold text-sm hover:text-voyage-700 transition-colors"
                >
                  Edit Full Profile <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Change Password */}
              <div className="bg-white rounded-3xl shadow-card p-8">
                <h3 className="text-lg font-bold text-navy-900 mb-1">Change Password</h3>
                <p className="text-navy-400 text-sm mb-6">Update your password to keep your account secure</p>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="input-field !pl-11"
                        placeholder="Enter current password"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">New Password</label>
                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="input-field !pl-11"
                        placeholder="Minimum 6 characters"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">Confirm New Password</label>
                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="input-field !pl-11"
                        placeholder="Repeat new password"
                      />
                    </div>
                  </div>
                  <button onClick={handlePasswordChange} disabled={saving} className="btn-primary inline-flex items-center gap-2">
                    <Shield className="w-4 h-4" /> {saving ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </div>

              {/* Sign Out */}
              <div className="bg-white rounded-3xl shadow-card p-8">
                <h3 className="text-lg font-bold text-navy-900 mb-2">Session</h3>
                <p className="text-navy-400 text-sm mb-4">Sign out of your account on this device</p>
                <button
                  onClick={() => setShowSignOut(true)}
                  className="flex items-center gap-2 text-red-500 font-semibold text-sm hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Clear Searches Confirmation */}
      <ConfirmDialog
        open={showClearSearches}
        onClose={() => setShowClearSearches(false)}
        onConfirm={handleClearSearches}
        title="Clear Recent Searches?"
        message="This will remove all your recent search history from this device. This action cannot be undone."
        confirmText="Clear Searches"
        cancelText="Cancel"
        icon={<Trash2 className="w-6 h-6" />}
      />

      {/* Sign Out Confirmation */}
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
    </div>
  );
}
