import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, TrendingUp, BarChart3, LogIn } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess({
          token: data.token,
          userId: data.userId,
          username: data.username
        });
        // Store token in localStorage or context
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);
        
        // Clear form
        setFormData({ email: '', password: '' });
      } else {
        setErrors({ 
          submit: data.message || 'Login failed. Please check your credentials.' 
        });
      }
    } catch (error) {
      setErrors({ 
        submit: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-tr from-blue-500/10 to-cyan-600/10 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-2xl sm:blur-3xl"></div>
      </div>

      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg relative z-10">
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-6 sm:p-8 mx-4 sm:mx-0">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-3 sm:mb-4 shadow-lg">
              <LogIn className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm sm:text-base">Sign in to MockStreet</p>
            <div className="flex items-center justify-center gap-2 mt-2 sm:mt-3">
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
              <span className="text-xs sm:text-sm text-green-400 font-medium">Continue Trading</span>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-500/10 border border-green-400/30 rounded-lg backdrop-blur-sm">
              <p className="text-green-300 font-medium text-sm sm:text-base">Welcome back, {success.username}!</p>
              <p className="text-green-400/80 text-xs sm:text-sm mt-1">Login successful</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-4 sm:space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-white placeholder-gray-500 backdrop-blur-sm text-sm sm:text-base ${
                    errors.email ? 'border-red-400/50' : 'border-gray-600/50'
                  }`}
                  placeholder="your.email@example.com"
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1 sm:mb-2">
                <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-300">
                  Password
                </label>
                <button className="text-xs sm:text-sm text-green-400 hover:text-green-300 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-white placeholder-gray-500 backdrop-blur-sm text-sm sm:text-base ${
                    errors.password ? 'border-red-400/50' : 'border-gray-600/50'
                  }`}
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600/50 bg-gray-800/50 text-green-500 focus:ring-green-500 focus:ring-offset-gray-900 focus:ring-2"
                />
                <span className="ml-2 text-xs sm:text-sm text-gray-400">Remember me</span>
              </label>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-3 bg-red-500/10 border border-red-400/30 rounded-lg backdrop-blur-sm">
                <p className="text-red-300 text-xs sm:text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2.5 sm:py-3 px-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-green-500/25 text-sm sm:text-base"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                  <span className="hidden xs:inline">Signing In...</span>
                  <span className="xs:hidden">Loading...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="hidden xs:inline">Access Trading Dashboard</span>
                  <span className="xs:hidden">Sign In</span>
                </div>
              )}
            </button>

            {/* Quick Login Demo */}
            <div className="p-3 sm:p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg">
              <p className="text-blue-300 text-xs sm:text-sm font-medium mb-2">Quick Demo Access</p>
              <button 
                onClick={() => setFormData({ email: 'demo@mockstreet.com', password: 'demo123' })}
                className="w-full px-3 py-1.5 bg-blue-600/20 text-blue-300 text-xs rounded border border-blue-500/30 hover:bg-blue-600/30 transition-colors"
              >
                Try Demo Account
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              New to MockStreet?{' '}
              <a href="/register" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                Create an account
              </a>
            </p>
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-700/50">
              <p className="text-xs text-gray-500 px-2">
                <span className="hidden sm:inline">Secure login • Protected trading • Advanced analytics</span>
                <span className="sm:hidden">Secure • Protected • Advanced</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;