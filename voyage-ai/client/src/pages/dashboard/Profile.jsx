import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, MapPin, Phone, Save, Shield,
  Globe2, PiggyBank, LogOut, Briefcase, Lock, KeyRound
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { PageLoader } from '../../components/ui/Loading';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await api.getMe();
        setProfile(data.user);
      } catch (error) {
        toast.error(error.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleProfileSave = async () => {
    setSaving(true);
    try {
      const data = await api.updateProfile(profile);
      updateUser?.(data.user);
      setProfile(data.user);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
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

  const toggleInterest = (interest) => {
    const id = `interest-${interest}`;
    setProfile(prev => ({
      ...prev,
      travelPreferences: {
        ...prev.travelPreferences,
        interests: prev.travelPreferences?.interests?.includes(interest)
          ? prev.travelPreferences.interests.filter(i => i !== interest)
          : [...(prev.travelPreferences?.interests || []), interest]
      }
    }));
  };

  // Only runs when the user confirms sign-out in the dialog
  const handleSignOut = () => {
    setShowSignOut(false);
    logout();
    navigate('/');
  };

  if (loading || !profile) return <PageLoader />;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Globe2 },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-card overflow-hidden">
        {/* Cover */}
        <div className="relative h-40 bg-gradient-voyage">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
        </div>

        {/* User Info */}
        <div className="px-8 pb-6 -mt-14 relative">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex items-end gap-5">
              <div className="relative">
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-voyage-400 to-voyage-600 flex items-center justify-center text-4xl font-bold text-white border-4 border-white shadow-xl">
                  {profile.name?.charAt(0)?.toUpperCase()}
                </div>
              </div>
              <div className="pb-1">
                <h1 className="text-2xl font-bold text-navy-900">{profile.name}</h1>
                <p className="text-navy-400 flex items-center gap-1.5">
                  <Mail className="w-4 h-4" /> {profile.email}
                </p>
              </div>
            </div>
            <span className="px-3 py-1.5 bg-voyage-50 text-voyage-700 rounded-xl text-sm font-semibold capitalize self-start sm:self-auto">
              {profile.role}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-8 py-4 border-t border-navy-100 flex gap-4 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-voyage-600 to-voyage-500 text-white shadow-md'
                  : 'text-navy-500 hover:bg-navy-50'
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-8 shadow-card max-w-3xl">
            <h2 className="text-xl font-bold text-navy-900 mb-6">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                  <input
                    type="text"
                    value={profile.name || ''}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="input-field !pl-11"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                  <input type="email" value={profile.email} disabled className="input-field !pl-11 opacity-60 cursor-not-allowed" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                  <input
                    type="tel"
                    value={profile.phone || ''}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="input-field !pl-11"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                  <input
                    type="text"
                    value={profile.location || ''}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="City, Country"
                    className="input-field !pl-11"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold text-navy-700 mb-2">Bio</label>
              <textarea
                value={profile.bio || ''}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Tell us a little about yourself and your travel style..."
                rows={3}
                maxLength={500}
                className="input-field resize-none"
              />
              <p className="text-xs text-navy-400 mt-1 text-right">{profile.bio?.length || 0}/500</p>
            </div>
            <button onClick={handleProfileSave} disabled={saving} className="btn-primary mt-6 inline-flex items-center gap-2">
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="bg-white rounded-3xl p-8 shadow-card max-w-3xl">
            <h2 className="text-xl font-bold text-navy-900 mb-6">Travel Preferences</h2>
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2 flex items-center gap-2">
                  <PiggyBank className="w-4 h-4 text-emerald-500" /> Budget Style
                </label>
                <div className="flex flex-wrap gap-2">
                  {['budget', 'moderate', 'luxury'].map(style => (
                    <button
                      key={style}
                      onClick={() => setProfile({
                        ...profile,
                        travelPreferences: { ...profile.travelPreferences, budget: style }
                      })}
                      className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${
                        profile.travelPreferences?.budget === style
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md'
                          : 'bg-navy-50 text-navy-600 hover:bg-emerald-50'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-voyage-500" /> Travel Style
                </label>
                <div className="flex flex-wrap gap-2">
                  {['adventure', 'relaxation', 'cultural', 'romantic', 'family', 'business'].map(style => (
                    <button
                      key={style}
                      onClick={() => setProfile({
                        ...profile,
                        travelPreferences: { ...profile.travelPreferences, travelStyle: style }
                      })}
                      className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${
                        profile.travelPreferences?.travelStyle === style
                          ? 'bg-gradient-to-r from-voyage-600 to-voyage-500 text-white shadow-md'
                          : 'bg-navy-50 text-navy-600 hover:bg-voyage-50'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {['photography', 'hiking', 'local cuisine', 'cultural experiences', 'nightlife', 'shopping', 'beach', 'wildlife', 'museums', 'wellness'].map(interest => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-2 rounded-xl text-sm transition-all capitalize ${
                        profile.travelPreferences?.interests?.includes(interest)
                          ? 'bg-voyage-500 text-white shadow-md'
                          : 'bg-navy-50 text-navy-600 hover:bg-voyage-50'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleProfileSave} disabled={saving} className="btn-primary inline-flex items-center gap-2">
                <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-white rounded-3xl p-8 shadow-card max-w-3xl">
            <h2 className="text-xl font-bold text-navy-900 mb-1">Change Password</h2>
            <p className="text-navy-400 mb-6">Regularly updating your password keeps your account secure</p>
            <div className="space-y-5 max-w-md">
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

            <div className="mt-8 pt-8 border-t border-navy-100">
              <h3 className="font-bold text-navy-900 mb-2">Session</h3>
              <p className="text-sm text-navy-400 mb-4">Log out of this device to end your current session</p>
              <button onClick={() => setShowSignOut(true)} className="flex items-center gap-2 text-red-500 font-semibold hover:text-red-600">
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>
          </div>
        )}
      </motion.div>

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
    </div>
  );
}