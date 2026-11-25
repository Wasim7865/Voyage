import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass, Globe2, Bot, Wallet, Package, ChevronRight, Search,
  Star, ArrowRight, Plane, Calendar, MapPin, Mail, Phone
} from 'lucide-react';
import api from '../../services/api';
import DestinationCard from '../../components/destinations/DestinationCard';
import { SkeletonCard } from '../../components/ui/Loading';

const features = [
  {
    icon: Bot,
    title: 'AI Trip Planner',
    description: 'Let our AI craft a personalized itinerary based on your preferences, budget, and travel style.',
    color: 'from-voyage-500 to-voyage-600',
    link: '/ai-planner'
  },
  {
    icon: Wallet,
    title: 'Smart Budget Planner',
    description: 'Get intelligent budget breakdowns and money-saving tips tailored to your destination and travel style.',
    color: 'from-emerald-500 to-teal-600',
    link: '/ai-budget'
  },
  {
    icon: Package,
    title: 'AI Packing Assistant',
    description: 'Never forget essential items again with AI-generated packing lists customized to your trip.',
    color: 'from-amber-500 to-orange-600',
    link: '/ai-packing'
  },
  {
    icon: Globe2,
    title: 'Curated Destinations',
    description: 'Explore hand-picked global destinations with insider tips, hidden gems, and local recommendations.',
    color: 'from-sky-500 to-blue-600',
    link: '/destinations'
  },
];

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const data = await api.getTrendingDestinations();
        setDestinations(data.destinations);
      } catch (error) {
        console.error('Failed to load destinations:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDestinations();
  }, []);

  return (
    <div className="bg-navy-950">
      {/* Hero */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/70 to-navy-900/30" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-voyage-500/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-voyage-300/20 rounded-full blur-3xl animate-pulse-slow" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-voyage-300 uppercase tracking-[0.35em] text-sm font-medium mb-6">
              Voyage · Plan Less, Travel More
            </p>
            <h1 className="font-serif text-5xl lg:text-7xl font-medium text-white leading-tight mb-6">
              Where will you go
              <span className="block italic text-voyage-300">next —</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/70 max-w-2xl mb-10">
              Voyage AI transforms how you plan travel — personalized itineraries,
              smart budgets, and curated destinations powered by next-generation artificial intelligence.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={(e) => { e.preventDefault(); window.location.href = `/destinations?search=${search}`; }}
              className="max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex items-center gap-2 shadow-glass"
            >
              <Search className="w-5 h-5 text-white/60 ml-3 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Where do you want to go?"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/50 px-2 py-3 text-lg"
              />
              <button type="submit" className="btn-primary flex-shrink-0 !px-8">
                Search
              </button>
            </form>

            {/* Quick actions */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/ai-planner" className="btn-primary">
                <Bot className="w-4 h-4 inline-block mr-2 -mt-1" />
                Plan with AI
                <ChevronRight className="w-4 h-4 inline-block ml-2 -mt-1" />
              </Link>
              <Link to="/destinations" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all">
                <Compass className="w-4 h-4" />
                Explore Destinations
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-2xl">
              {[
                { value: '64', label: 'Destinations' },
                { value: '6', label: 'Moods' },
                { value: '45', label: 'Countries' },
                { value: '4.7', label: 'Avg Rating' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="text-white"
                >
                  <p className="font-serif text-4xl font-medium">{stat.value}</p>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-voyage-300 uppercase tracking-[0.35em] text-sm font-medium mb-4">
              Explore
            </p>
            <h2 className="font-serif text-3xl lg:text-5xl font-medium text-white mb-4">
              Everything you need to
              <span className="italic text-voyage-300"> travel smarter</span>
            </h2>
            <p className="text-navy-300 max-w-2xl mx-auto text-lg">
              Powerful AI tools designed to make trip planning effortless, budget-friendly, and unforgettable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link to={feature.link} className="block">
                  <div className="bg-navy-900 border border-navy-800 rounded-2xl h-full p-6 hover:border-voyage-500/30 transition-all duration-300">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-navy-300 leading-relaxed">{feature.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-voyage-300 mt-4">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10"
          >
            <div>
              <p className="text-voyage-300 uppercase tracking-[0.35em] text-sm font-medium mb-3">
                Trending Now
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium text-white mb-3">
                Popular right now
              </h2>
              <p className="text-navy-300 text-lg">Most loved places by our travelers right now</p>
            </div>
            <Link to="/destinations" className="inline-flex items-center gap-2 text-voyage-300 font-semibold hover:text-voyage-200 mt-4 md:mt-0">
              See all 64 <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)
            ) : (
              destinations.map((destination) => (
                <DestinationCard key={destination._id} destination={destination} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-voyage-dark">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Plane className="w-16 h-16 text-white/80 mx-auto mb-6 animate-float" />
            <h2 className="font-serif text-3xl lg:text-5xl font-medium text-white mb-4">
              Ready to plan your
              <span className="block italic text-voyage-300">next adventure?</span>
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
              Join thousands of travelers who are discovering smarter ways to explore the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="btn-primary !px-8 !py-4 !rounded-xl !text-lg font-bold">
                Get Started Free
              </Link>
              <Link to="/ai-planner" className="bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
                Try AI Planner
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-voyage-500 to-voyage-600 rounded-xl flex items-center justify-center">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Voyage</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                Your intelligent travel companion. Plan smarter, explore further, and make every journey unforgettable.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-white/50">
                <li><Link to="/ai-planner" className="hover:text-white transition-colors">AI Trip Planner</Link></li>
                <li><Link to="/ai-assistant" className="hover:text-white transition-colors">AI Assistant</Link></li>
                <li><Link to="/ai-budget" className="hover:text-white transition-colors">Budget Planner</Link></li>
                <li><Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-white/50">
                <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-white transition-colors cursor-pointer">Press</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
              <ul className="space-y-3 text-sm text-white/50">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@voyageai.com</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (555) 012-3456</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-white/30 mb-4 md:mb-0">© 2026 Voyage AI. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-white/50">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
              <span className="hover:text-white transition-colors cursor-pointer">Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}