import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Home, 
  ArrowLeft, 
  Search, 
  AlertTriangle,
  Compass,
  MapPin,
  RefreshCw,
  HelpCircle,
  MessageCircle,
  ChevronRight
} from 'lucide-react';

const NotFoundPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFloating(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const quickLinks = [
    { icon: <Home className="w-5 h-5" />, label: "Home", path: "/" },
    { icon: <TrendingUp className="w-5 h-5" />, label: "Trading Dashboard", path: "/dashboard" },
    { icon: <Search className="w-5 h-5" />, label: "Search Stocks", path: "/stocks" },
    { icon: <MessageCircle className="w-5 h-5" />, label: "Support", path: "/support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-600/15 rounded-full blur-3xl animate-pulse"
          style={{
            top: `${20 + mousePosition.y * 0.1}%`,
            right: `${10 + mousePosition.x * 0.05}%`
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 bg-gradient-to-tr from-indigo-500/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            bottom: `${15 + mousePosition.y * 0.08}%`,
            left: `${5 + mousePosition.x * 0.03}%`
          }}
        ></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-red-500/8 to-orange-500/8 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-teal-400/25 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-indigo-400/30 rounded-full animate-bounce delay-1500"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }, (_, i) => (
              <div 
                key={i} 
                className="border border-blue-400/20 rounded"
                style={{ 
                  animationDelay: `${(i * 50)}ms`,
                  animation: 'pulse 4s infinite' 
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <nav className="relative z-10 bg-slate-950/80 backdrop-blur-2xl border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl shadow-2xl shadow-blue-500/25 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              MockStreet
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-12 relative">
            <div className={`relative inline-block transition-transform duration-1000 ${isFloating ? 'transform -translate-y-2' : ''}`}>
              {/* Large 404 */}
              <div className="text-8xl sm:text-9xl lg:text-[12rem] font-black bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent leading-none mb-4">
                404
              </div>
              
              {/* Floating warning icon */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-xl border border-red-400/30 rounded-2xl flex items-center justify-center animate-bounce">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              
              {/* Compass icon */}
              <div className="absolute -bottom-6 -left-8 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-xl border border-blue-400/30 rounded-xl flex items-center justify-center animate-spin" style={{ animationDuration: '8s' }}>
                <Compass className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-6">
              Page Not Found
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-4 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for seems to have wandered off into the trading floor. 
              Don't worry, even the best traders sometimes take a wrong turn.
            </p>
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Error Code: 404 | Page Not Located</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl text-white font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-2xl shadow-blue-500/25 hover:scale-105 flex items-center gap-3">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              Go Back Home
            </button>
            
            <button className="group px-8 py-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl text-white font-bold text-lg hover:bg-slate-700/50 transition-all duration-300 backdrop-blur-sm flex items-center gap-3">
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Try Again
            </button>
          </div>

          {/* Quick Links */}
          <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/70 to-slate-700/90 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-xl">
                <Compass className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Quick Navigation</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  className="group flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-600/40 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/50 hover:border-slate-500/60 transition-all duration-200"
                >
                  <div className="p-2 bg-slate-700/50 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-200">
                    {link.icon}
                  </div>
                  <span className="font-medium flex-1 text-left">{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </button>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-900/20 via-teal-900/20 to-cyan-900/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-emerald-500/20 rounded-xl">
                  <HelpCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-emerald-300">Need Help?</h3>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                If you believe this is an error or you can't find what you're looking for, 
                our support team is here to help you get back on track.
              </p>
              <button className="w-full px-6 py-3 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-emerald-300 hover:bg-emerald-500/30 transition-all duration-200 font-medium">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-8 hidden lg:block">
        <div className="w-32 h-32 border-2 border-blue-400/10 rounded-full animate-pulse">
          <div className="w-24 h-24 border-2 border-purple-400/10 rounded-full m-4 animate-pulse delay-300">
            <div className="w-16 h-16 border-2 border-indigo-400/10 rounded-full m-4 animate-pulse delay-600"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/4 right-8 hidden lg:block">
        <div className="w-40 h-40 border border-slate-600/20 rounded-2xl rotate-45 animate-pulse">
          <div className="w-32 h-32 border border-slate-600/15 rounded-2xl m-4 animate-pulse delay-500">
            <div className="w-24 h-24 border border-slate-600/10 rounded-2xl m-4 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;