import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search, Filter, BarChart3, DollarSign, ArrowUpRight, ArrowDownRight, RefreshCw, Star, Activity, Zap } from 'lucide-react';

const StocksListingPage = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('symbol');
  const [filterBy, setFilterBy] = useState('all');

  // Mock data for demonstration - replace with actual API call
  const mockStocks = [
    { symbol: "AAPL", name: "Apple Inc", lastPrice: 189.56, change: +2.34, changePercent: +1.25, volume: "45.2M", marketCap: "2.98T" },
    { symbol: "TSLA", name: "Tesla Inc", lastPrice: 242.13, change: -5.87, changePercent: -2.37, volume: "89.7M", marketCap: "768B" },
    { symbol: "GOOGL", name: "Alphabet Inc", lastPrice: 138.21, change: +1.12, changePercent: +0.82, volume: "25.4M", marketCap: "1.75T" },
    { symbol: "MSFT", name: "Microsoft Corp", lastPrice: 378.85, change: +4.23, changePercent: +1.13, volume: "32.1M", marketCap: "2.81T" },
    { symbol: "AMZN", name: "Amazon.com Inc", lastPrice: 145.86, change: -2.14, changePercent: -1.45, volume: "41.8M", marketCap: "1.51T" },
    { symbol: "NVDA", name: "NVIDIA Corporation", lastPrice: 456.78, change: +12.45, changePercent: +2.81, volume: "67.3M", marketCap: "1.12T" },
    { symbol: "META", name: "Meta Platforms Inc", lastPrice: 312.64, change: -3.21, changePercent: -1.02, volume: "38.9M", marketCap: "812B" },
    { symbol: "NFLX", name: "Netflix Inc", lastPrice: 423.17, change: +7.89, changePercent: +1.90, volume: "15.6M", marketCap: "188B" }
  ];

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call - replace with actual fetch to /stocks
      await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate delay
      
      // Replace this with actual API call:
      // const response = await fetch('/stocks');
      // const data = await response.json();
      
      setStocks(mockStocks);
    } catch (err) {
      setError('Failed to fetch stocks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedStocks = stocks
    .filter(stock => {
      const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterBy === 'gainers') return matchesSearch && stock.change > 0;
      if (filterBy === 'losers') return matchesSearch && stock.change < 0;
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'price': return b.lastPrice - a.lastPrice;
        case 'change': return b.change - a.change;
        case 'changePercent': return b.changePercent - a.changePercent;
        default: return a.symbol.localeCompare(b.symbol);
      }
    });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const formatChange = (change) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}`;
  };

  const formatChangePercent = (changePercent) => {
    const sign = changePercent >= 0 ? '+' : '';
    return `${sign}${changePercent.toFixed(2)}%`;
  };

  const getTopGainer = () => {
    return stocks.reduce((max, stock) => stock.changePercent > max.changePercent ? stock : max, stocks[0] || {});
  };

  const getTopLoser = () => {
    return stocks.reduce((min, stock) => stock.changePercent < min.changePercent ? stock : min, stocks[0] || {});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-green-500/5 to-emerald-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/5 to-cyan-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/3 to-pink-500/3 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-green-400/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-emerald-400/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-blue-400/20 rounded-full animate-bounce delay-1000"></div>
      </div>

      {/* Header */}
      <div className="bg-gray-950/90 backdrop-blur-2xl border-b border-gray-800/50 sticky top-0 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-2xl shadow-2xl shadow-green-500/20">
                  <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"></div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  MockStreet Markets
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 animate-pulse" />
                  <p className="text-green-400 text-xs sm:text-sm font-medium">Live Market Data</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Market Status */}
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-400/20 rounded-xl backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-sm font-medium">Market Open</span>
              </div>
              
              <button
                onClick={fetchStocks}
                disabled={loading}
                className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-green-600/20 text-green-300 rounded-xl border border-green-500/30 hover:border-green-400/50 hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-300 disabled:opacity-50 text-sm font-medium shadow-lg hover:shadow-green-500/20"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh Markets</span>
                <span className="sm:hidden">Refresh</span>
              </button>
            </div>
          </div>

          {/* Market Summary */}
          {!loading && stocks.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
              <div className="bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-green-600/10 border border-green-400/20 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-300 text-xs sm:text-sm font-medium">Top Gainer</span>
                </div>
                <div className="text-white font-bold text-sm sm:text-base">{getTopGainer().symbol}</div>
                <div className="text-green-400 text-xs">{formatChangePercent(getTopGainer().changePercent || 0)}</div>
              </div>
              
              <div className="bg-gradient-to-br from-red-500/10 via-red-500/5 to-red-600/10 border border-red-400/20 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="w-4 h-4 text-red-400" />
                  <span className="text-red-300 text-xs sm:text-sm font-medium">Top Loser</span>
                </div>
                <div className="text-white font-bold text-sm sm:text-base">{getTopLoser().symbol}</div>
                <div className="text-red-400 text-xs">{formatChangePercent(getTopLoser().changePercent || 0)}</div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-blue-600/10 border border-blue-400/20 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 text-xs sm:text-sm font-medium">Total Stocks</span>
                </div>
                <div className="text-white font-bold text-sm sm:text-base">{stocks.length}</div>
                <div className="text-blue-400 text-xs">Available</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-purple-600/10 border border-purple-400/20 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300 text-xs sm:text-sm font-medium">Active Trades</span>
                </div>
                <div className="text-white font-bold text-sm sm:text-base">142</div>
                <div className="text-purple-400 text-xs">Today</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/80 backdrop-blur-2xl border border-gray-700/40 rounded-2xl p-4 sm:p-6 mb-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Search */}
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-green-400 transition-colors duration-200" />
                <input
                  type="text"
                  placeholder="Search stocks by symbol or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 sm:pl-14 pr-4 py-3 sm:py-4 bg-gray-800/50 border border-gray-600/40 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-500 text-sm sm:text-base backdrop-blur-sm transition-all duration-200 hover:border-gray-500/60"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative group">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 sm:px-6 py-3 sm:py-4 bg-gray-800/50 border border-gray-600/40 rounded-xl text-white text-sm sm:text-base focus:ring-2 focus:ring-green-500/50 backdrop-blur-sm hover:border-gray-500/60 transition-all duration-200 cursor-pointer min-w-0 pr-10"
                >
                  <option value="symbol">Sort by Symbol</option>
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="change">Sort by Change</option>
                  <option value="changePercent">Sort by Change %</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative group">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="appearance-none px-4 sm:px-6 py-3 sm:py-4 bg-gray-800/50 border border-gray-600/40 rounded-xl text-white text-sm sm:text-base focus:ring-2 focus:ring-green-500/50 backdrop-blur-sm hover:border-gray-500/60 transition-all duration-200 cursor-pointer min-w-0 pr-10"
                >
                  <option value="all">All Stocks</option>
                  <option value="gainers">🚀 Gainers Only</option>
                  <option value="losers">📉 Losers Only</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <RefreshCw className="w-12 h-12 text-green-400 animate-spin" />
              <div className="absolute inset-0 w-12 h-12 border-2 border-green-400/20 rounded-full animate-ping"></div>
            </div>
            <p className="text-gray-400 mt-6 text-lg font-medium">Loading market data...</p>
            <p className="text-gray-500 mt-2 text-sm">Fetching real-time prices</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-r from-red-500/20 via-red-500/10 to-red-500/20 border border-red-400/30 rounded-2xl p-6 sm:p-8 mb-8 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                <span className="text-red-400 text-lg">⚠</span>
              </div>
              <p className="text-red-300 text-base sm:text-lg font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Stocks Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredAndSortedStocks.map((stock, index) => (
              <div
                key={stock.symbol}
                className="group relative bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 sm:p-6 hover:border-gray-600/70 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 cursor-pointer overflow-hidden animate-fadeInUp"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                {/* Stock Header */}
                <div className="relative flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-white text-base sm:text-lg lg:text-xl truncate">
                        {stock.symbol}
                      </h3>
                      <Star className="w-4 h-4 text-gray-500 hover:text-yellow-400 transition-colors cursor-pointer" />
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base truncate">
                      {stock.name}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>Vol: {stock.volume}</span>
                      <span>Cap: {stock.marketCap}</span>
                    </div>
                  </div>
                  <div className="ml-3 flex-shrink-0">
                    <div className={`p-2 rounded-xl ${stock.change >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      {stock.change >= 0 ? (
                        <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className="relative mb-4">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {formatPrice(stock.lastPrice)}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm sm:text-base font-semibold ${
                      stock.change >= 0 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      {stock.change >= 0 ? (
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      ) : (
                        <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                      {formatChange(stock.change)}
                    </div>
                    <div className={`text-sm sm:text-base font-bold ${
                      stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {formatChangePercent(stock.changePercent)}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="relative">
                  <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-500/30 to-blue-600/30 border border-blue-500/40 text-blue-300 rounded-xl hover:from-blue-500/40 hover:to-blue-600/40 hover:border-blue-400/60 transition-all duration-200 text-sm font-medium group-hover:shadow-lg group-hover:shadow-blue-500/20 flex items-center justify-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>View Chart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredAndSortedStocks.length === 0 && (
          <div className="text-center py-16">
            <div className="relative inline-block">
              <Search className="w-16 h-16 mx-auto mb-6 text-gray-600" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                <span className="text-red-400 text-sm">✕</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No stocks found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => { setSearchTerm(''); setFilterBy('all'); }}
              className="px-6 py-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-400 border border-green-500/30 rounded-xl hover:from-green-500/30 hover:to-emerald-600/30 transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StocksListingPage;