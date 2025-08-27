import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  Shield, 
  Users, 
  ArrowRight, 
  Play, 
  Check, 
  Star, 
  BarChart3, 
  PieChart, 
  Smartphone, 
  Monitor, 
  Globe, 
  Lock, 
  Wallet, 
  LineChart,
  Menu,
  X,
  ChevronDown,
  Award,
  Target,
  Clock
} from 'lucide-react';

const MockStreetHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Real-time Trading",
      description: "Execute buy and sell orders instantly with live market data and real-time price updates."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Portfolio Analytics",
      description: "Track your investments with comprehensive analytics, profit/loss calculations, and performance metrics."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description: "Bank-grade security with JWT authentication and encrypted transactions for peace of mind."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Optimized",
      description: "Trade on the go with our fully responsive design that works seamlessly across all devices."
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Transaction History",
      description: "Complete trading history with advanced filtering, search, and export capabilities."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Ultra-fast order execution and real-time market data with minimal latency."
    }
  ];

  const stats = [
    { label: "Active Traders", value: "10,000+", icon: <Users className="w-6 h-6" /> },
    { label: "Trades Executed", value: "1M+", icon: <Activity className="w-6 h-6" /> },
    { label: "Success Rate", value: "99.9%", icon: <Target className="w-6 h-6" /> },
    { label: "Uptime", value: "99.99%", icon: <Clock className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Day Trader",
      content: "MockStreet's interface is incredibly intuitive. The real-time data and fast execution have significantly improved my trading performance.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Investment Advisor",
      content: "The portfolio analytics and transaction history features are exactly what my clients need. Professional-grade tools at their fingertips.",
      rating: 5
    },
    {
      name: "Jennifer Kim",
      role: "Retail Investor",
      content: "As a beginner, I appreciate how clean and organized everything is. MockStreet makes trading accessible without overwhelming complexity.",
      rating: 5
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-500/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/8 to-teal-500/8 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-teal-400/25 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-indigo-400/30 rounded-full animate-bounce delay-1500"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800/60 shadow-2xl' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl shadow-2xl shadow-blue-500/25 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                MockStreet
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors duration-200 font-medium">Features</a>
              <a href="#free-platform" className="text-slate-300 hover:text-white transition-colors duration-200 font-medium">Free Platform</a>
              <a href="#about" className="text-slate-300 hover:text-white transition-colors duration-200 font-medium">About</a>
              <button className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200">
                Login
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25">
                Get Started Free
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800/60 shadow-2xl">
              <div className="px-4 py-6 space-y-4">
                <a href="#features" className="block text-slate-300 hover:text-white transition-colors duration-200 font-medium">Features</a>
                <a href="#free-platform" className="block text-slate-300 hover:text-white transition-colors duration-200 font-medium">Free Platform</a>
                <a href="#about" className="block text-slate-300 hover:text-white transition-colors duration-200 font-medium">About</a>
                <div className="pt-4 space-y-2">
                  <button className="w-full px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200">
                    Login
                  </button>
                  <button className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25">
                    Get Started Free
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full backdrop-blur-sm">
                <span className="text-blue-300 text-sm font-medium">New: Advanced Portfolio Analytics</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                Trade Smarter
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Not Harder
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience the future of trading with MockStreet's powerful platform. Real-time data, 
              lightning-fast execution, and professional-grade tools for traders of all levels.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl text-white font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-2xl shadow-blue-500/25 hover:scale-105 flex items-center gap-3">
                Start Trading Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl text-white font-bold text-lg hover:bg-slate-700/50 transition-all duration-200 backdrop-blur-sm flex items-center gap-3">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-xl border border-slate-600/40 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <div className="text-blue-400">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Everything you need to trade with confidence and stay ahead of the market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-900/90 via-slate-800/70 to-slate-700/90 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-8 shadow-2xl group hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors duration-200">
                    <div className="text-blue-400">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-6">
              Trusted by Traders
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              See what our community of traders says about MockStreet
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/70 to-slate-700/90 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-8 lg:p-12 shadow-2xl">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl lg:text-2xl text-white font-medium mb-8 leading-relaxed">
                  "{testimonials[activeTestimonial].content}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonials[activeTestimonial].name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-slate-400 text-sm">
                      {testimonials[activeTestimonial].role}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === activeTestimonial ? 'bg-blue-400' : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Free Platform Section */}
      <section id="free-platform" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-6">
              Completely Free Platform
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              All features available to everyone at no cost. No hidden fees, no premium tiers.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/70 to-slate-700/90 backdrop-blur-xl border border-emerald-500/50 rounded-2xl p-8 lg:p-12 shadow-2xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  100% Free Forever
                </div>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-emerald-400 mb-4">$0</div>
                <p className="text-slate-300 text-lg">No subscription fees, no trading commissions, no hidden costs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Unlimited trades</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Real-time market data</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Advanced portfolio analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Complete transaction history</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Mobile app access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">API access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Priority support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Export capabilities</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white font-bold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-2xl shadow-emerald-500/25 hover:scale-105 flex items-center gap-3 mx-auto">
                  Get Started for Free
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/20 via-indigo-900/20 to-purple-900/20 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join thousands of traders who trust MockStreet for their trading needs. 
            Start your journey today with our free account.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl text-white font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-2xl shadow-blue-500/25 hover:scale-105 flex items-center gap-3">
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl text-white font-bold text-lg hover:bg-slate-700/50 transition-all duration-200 backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl shadow-2xl shadow-blue-500/25 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                  MockStreet
                </span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                The modern trading platform built for today's traders. 
                Fast, secure, and powerful.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors duration-200 cursor-pointer">
                  <Globe className="w-4 h-4 text-slate-400" />
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors duration-200 cursor-pointer">
                  <Activity className="w-4 h-4 text-slate-400" />
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors duration-200 cursor-pointer">
                  <BarChart3 className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">API</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Security</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Contact Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Documentation</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Community</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800/60 pt-8 mt-8 text-center">
            <p className="text-slate-400">
              © 2025 MockStreet. All rights reserved. Built with ❤️ for traders.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MockStreetHomepage;