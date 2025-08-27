import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Zap, AlertCircle, RefreshCw, ArrowLeft, Calendar, Filter, Search, Clock, DollarSign, ArrowUpRight, ArrowDownRight, Plus, Minus, Download, Eye, ChevronLeft, ChevronRight, BarChart3, PieChart, Settings, Bell } from 'lucide-react';

const TransactionHistoryInterface = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('table');
  const itemsPerPage = 10;

  // Mock transaction data
  const mockTransactions = [
    { 
      tradeId: "TXN8901", 
      symbol: "AAPL", 
      name: "Apple Inc",
      type: "BUY", 
      qty: 15, 
      price: 180.0, 
      totalAmount: 2700.0,
      tradeDate: "2025-08-27T14:30:00Z",
      status: "COMPLETED",
      fees: 2.99,
      exchange: "NASDAQ"
    },
    { 
      tradeId: "TXN8902", 
      symbol: "TSLA", 
      name: "Tesla Inc",
      type: "BUY", 
      qty: 8, 
      price: 240.0, 
      totalAmount: 1920.0,
      tradeDate: "2025-08-27T11:15:00Z",
      status: "COMPLETED",
      fees: 1.99,
      exchange: "NASDAQ"
    },
    { 
      tradeId: "TXN8903", 
      symbol: "AAPL", 
      name: "Apple Inc",
      type: "SELL", 
      qty: 5, 
      price: 189.0, 
      totalAmount: 945.0,
      tradeDate: "2025-08-26T16:45:00Z",
      status: "COMPLETED",
      fees: 1.99,
      exchange: "NASDAQ"
    },
    { 
      tradeId: "TXN8904", 
      symbol: "NVDA", 
      name: "NVIDIA Corporation",
      type: "BUY", 
      qty: 5, 
      price: 420.0, 
      totalAmount: 2100.0,
      tradeDate: "2025-08-26T09:30:00Z",
      status: "COMPLETED",
      fees: 2.99,
      exchange: "NASDAQ"
    },
    { 
      tradeId: "TXN8905", 
      symbol: "MSFT", 
      name: "Microsoft Corporation",
      type: "BUY", 
      qty: 12, 
      price: 340.0, 
      totalAmount: 4080.0,
      tradeDate: "2025-08-25T13:20:00Z",
      status: "COMPLETED",
      fees: 3.99,
      exchange: "NASDAQ"
    },
    { 
      tradeId: "TXN8906", 
      symbol: "GOOGL", 
      name: "Alphabet Inc",
      type: "BUY", 
      qty: 6, 
      price: 125.0, 
      totalAmount: 750.0,
      tradeDate: "2025-08-25T10:00:00Z",
      status: "COMPLETED",
      fees: 1.99,
      exchange: "NASDAQ"
    },
    { 
      tradeId: "TXN8907", 
      symbol: "TSLA", 
      name: "Tesla Inc",
      type: "SELL", 
      qty: 3, 
      price: 235.0, 
      totalAmount: 705.0,
      tradeDate: "2025-08-24T15:30:00Z",
      status: "COMPLETED",
      fees: 1.99,
      exchange: "NASDAQ"
    },
    { 
      tradeId: "TXN8908", 
      symbol: "AAPL", 
      name: "Apple Inc",
      type: "BUY", 
      qty: 10, 
      price: 175.0, 
      totalAmount: 1750.0,
      tradeDate: "2025-08-24T11:45:00Z",
      status: "COMPLETED",
      fees: 2.99,
      exchange: "NASDAQ"
    },
    { 
      tradeId: "TXN8909", 
      symbol: "NVDA", 
      name: "NVIDIA Corporation",
      type: "SELL", 
      qty: 2, 
      price: 410.0, 
      totalAmount: 820.0,
      tradeDate: "2025-08-23T14:15:00Z",
      status: "COMPLETED",
      fees: 1.99,
      exchange: "NASDAQ"
    },
    { 
      tradeId: "TXN8910", 
      symbol: "MSFT", 
      name: "Microsoft Corporation",
      type: "BUY", 
      qty: 8, 
      price: 335.0, 
      totalAmount: 2680.0,
      tradeDate: "2025-08-23T12:00:00Z",
      status: "COMPLETED",
      fees: 2.99,
      exchange: "NASDAQ"
    },
    { 
      tradeId: "TXN8911", 
      symbol: "GOOGL", 
      name: "Alphabet Inc",
      type: "SELL", 
      qty: 4, 
      price: 120.0, 
      totalAmount: 480.0,
      tradeDate: "2025-08-22T16:30:00Z",
      status: "COMPLETED",
      fees: 1.99,
      exchange: "NASDAQ"
    },
    { 
      tradeId: "TXN8912", 
      symbol: "AAPL", 
      name: "Apple Inc",
      type: "BUY", 
      qty: 20, 
      price: 170.0, 
      totalAmount: 3400.0,
      tradeDate: "2025-08-22T10:15:00Z",
      status: "COMPLETED",
      fees: 3.99,
      exchange: "NASDAQ"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter(transaction => 
        transaction.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.tradeId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'ALL') {
      filtered = filtered.filter(transaction => transaction.type === typeFilter);
    }

    if (dateFilter !== 'ALL') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'TODAY':
          filterDate.setDate(now.getDate());
          break;
        case 'WEEK':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'MONTH':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        default:
          break;
      }
      
      filtered = filtered.filter(transaction => 
        new Date(transaction.tradeDate) >= filterDate
      );
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1);
  }, [searchTerm, typeFilter, dateFilter, transactions]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const refreshTransactions = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const exportTransactions = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Trade ID,Symbol,Type,Quantity,Price,Total Amount,Date,Status,Fees\n"
      + filteredTransactions.map(t => 
          `${t.tradeId},${t.symbol},${t.type},${t.qty},${t.price},${t.totalAmount},${t.tradeDate},${t.status},${t.fees || 0}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setTypeFilter('ALL');
    setDateFilter('ALL');
  };

  // Calculate summary statistics
  const totalBuyAmount = filteredTransactions
    .filter(t => t.type === 'BUY')
    .reduce((sum, t) => sum + t.totalAmount, 0);
  
  const totalSellAmount = filteredTransactions
    .filter(t => t.type === 'SELL')
    .reduce((sum, t) => sum + t.totalAmount, 0);

  const totalBuyCount = filteredTransactions.filter(t => t.type === 'BUY').length;
  const totalSellCount = filteredTransactions.filter(t => t.type === 'SELL').length;
  const totalFees = filteredTransactions.reduce((sum, t) => sum + (t.fees || 0), 0);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <RefreshCw className="w-16 h-16 text-blue-400 animate-spin mx-auto mb-6" />
            <div className="absolute inset-0 w-16 h-16 bg-blue-400/20 rounded-full animate-pulse blur-xl mx-auto"></div>
          </div>
          <p className="text-gray-300 text-xl font-medium">Loading Transactions...</p>
          <p className="text-gray-500 text-sm mt-2">Fetching your trading history</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <p className="text-red-400 text-xl font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-300 hover:bg-red-500/30 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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

      {/* Header */}
      <div className="bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800/60 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium">Back</span>
              </button>
              <div className="relative flex-shrink-0">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl shadow-2xl shadow-blue-500/25">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-950 animate-pulse"></div>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                  Transaction History
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
                  <p className="text-blue-400 text-sm font-medium">Trading Activity Dashboard</p>
                  <div className="hidden sm:flex items-center gap-2 px-2 py-1 bg-green-500/20 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 text-xs font-medium">Live</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={refreshTransactions}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-3 bg-blue-500/20 border border-blue-400/30 rounded-xl backdrop-blur-sm text-blue-300 hover:bg-blue-500/30 transition-all duration-200 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="text-sm font-medium">Refresh</span>
              </button>
              <button 
                onClick={exportTransactions}
                className="flex items-center gap-2 px-4 py-3 bg-emerald-500/20 border border-emerald-400/30 rounded-xl backdrop-blur-sm text-emerald-300 hover:bg-emerald-500/30 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/70 to-slate-700/90 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-2xl group hover:scale-105 transition-transform duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl group-hover:bg-emerald-500/30 transition-colors duration-200">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-slate-400 text-sm font-semibold">Total Bought</h3>
            </div>
            <div className="text-2xl font-bold text-emerald-400 mb-2">
              {formatPrice(totalBuyAmount)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">{totalBuyCount} transactions</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400 opacity-60" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/70 to-slate-700/90 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-2xl group hover:scale-105 transition-transform duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-500/20 rounded-xl group-hover:bg-red-500/30 transition-colors duration-200">
                <TrendingDown className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-slate-400 text-sm font-semibold">Total Sold</h3>
            </div>
            <div className="text-2xl font-bold text-red-400 mb-2">
              {formatPrice(totalSellAmount)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">{totalSellCount} transactions</span>
              <ArrowDownRight className="w-4 h-4 text-red-400 opacity-60" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/70 to-slate-700/90 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-2xl group hover:scale-105 transition-transform duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors duration-200">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-slate-400 text-sm font-semibold">Total Trades</h3>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {filteredTransactions.length}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">All time</span>
              <BarChart3 className="w-4 h-4 text-blue-400 opacity-60" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/70 to-slate-700/90 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-2xl group hover:scale-105 transition-transform duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors duration-200">
                <DollarSign className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-slate-400 text-sm font-semibold">Net Flow</h3>
            </div>
            <div className={`text-2xl font-bold mb-2 ${
              (totalBuyAmount - totalSellAmount) >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {formatPrice(Math.abs(totalBuyAmount - totalSellAmount))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                {totalBuyAmount >= totalSellAmount ? 'Net bought' : 'Net sold'}
              </span>
              <Zap className="w-4 h-4 text-purple-400 opacity-60" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/70 to-slate-700/90 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-2xl group hover:scale-105 transition-transform duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-orange-500/20 rounded-xl group-hover:bg-orange-500/30 transition-colors duration-200">
                <PieChart className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-slate-400 text-sm font-semibold">Total Fees</h3>
            </div>
            <div className="text-2xl font-bold text-orange-400 mb-2">
              {formatPrice(totalFees)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Trading costs</span>
              <Minus className="w-4 h-4 text-orange-400 opacity-60" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/70 to-slate-700/90 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-2xl mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1 min-w-0">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by symbol, name, or trade ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600/40 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white text-xl"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {['ALL', 'BUY', 'SELL'].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    typeFilter === type
                      ? type === 'BUY'
                        ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 shadow-lg shadow-emerald-500/20'
                        : type === 'SELL'
                        ? 'bg-red-500/30 text-red-300 border border-red-500/50 shadow-lg shadow-red-500/20'
                        : 'bg-blue-500/30 text-blue-300 border border-blue-500/50 shadow-lg shadow-blue-500/20'
                      : 'bg-slate-700/30 text-slate-400 border border-slate-600/30 hover:bg-slate-600/40 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex gap-2 flex-wrap">
              {['ALL', 'TODAY', 'WEEK', 'MONTH'].map((period) => (
                <button
                  key={period}
                  onClick={() => setDateFilter(period)}
                  className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    dateFilter === period
                      ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/50 shadow-lg shadow-indigo-500/20'
                      : 'bg-slate-700/30 text-slate-400 border border-slate-600/30 hover:bg-slate-600/40 hover:text-white'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            <div className="flex gap-2 border border-slate-600/30 rounded-xl p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'table' 
                    ? 'bg-slate-700 text-white shadow-lg' 
                    : 'text-slate-500 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'cards' 
                    ? 'bg-slate-700 text-white shadow-lg' 
                    : 'text-slate-500 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <PieChart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Display */}
        <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/70 to-slate-700/90 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 lg:p-8 shadow-2xl mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Eye className="w-6 h-6 text-blue-400" />
              Recent Transactions
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-lg text-sm text-blue-300 font-medium">
                {filteredTransactions.length}
              </span>
            </h3>
            <div className="text-sm text-slate-400 bg-slate-800/50 px-3 py-2 rounded-lg">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length} transactions
            </div>
          </div>
          
          {viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left text-slate-400 font-semibold text-sm pb-4 pr-4">Trade ID</th>
                    <th className="text-left text-slate-400 font-semibold text-sm pb-4 px-2">Stock</th>
                    <th className="text-center text-slate-400 font-semibold text-sm pb-4 px-2">Type</th>
                    <th className="text-right text-slate-400 font-semibold text-sm pb-4 px-2 hidden sm:table-cell">Qty</th>
                    <th className="text-right text-slate-400 font-semibold text-sm pb-4 px-2">Price</th>
                    <th className="text-right text-slate-400 font-semibold text-sm pb-4 px-2 hidden md:table-cell">Total</th>
                    <th className="text-right text-slate-400 font-semibold text-sm pb-4 px-2 hidden lg:table-cell">Fees</th>
                    <th className="text-right text-slate-400 font-semibold text-sm pb-4 pl-2">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.map((transaction, index) => (
                    <tr key={transaction.tradeId} className="border-b border-slate-800/30 hover:bg-slate-800/20 transition-all duration-200 group">
                      <td className="py-4 pr-4">
                        <div className="font-mono text-sm text-slate-300 truncate group-hover:text-white transition-colors duration-200">
                          {transaction.tradeId}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg ${
                            transaction.type === 'BUY' 
                              ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' 
                              : 'bg-gradient-to-br from-red-500 to-red-600'
                          }`}>
                            {transaction.symbol.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors duration-200">
                              {transaction.symbol}
                            </div>
                            <div className="text-slate-500 text-xs truncate hidden sm:block">
                              {transaction.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-center">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-xs shadow-lg ${
                          transaction.type === 'BUY'
                            ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                            : 'bg-red-500/25 text-red-300 border border-red-500/40'
                        }`}>
                          {transaction.type === 'BUY' ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          <span>{transaction.type}</span>
                        </div>
                      </td>
                      <td className="text-right text-white font-semibold text-sm py-4 px-2 hidden sm:table-cell group-hover:text-blue-300 transition-colors duration-200">
                        {transaction.qty.toLocaleString()}
                      </td>
                      <td className="text-right text-white font-semibold text-sm py-4 px-2 group-hover:text-blue-300 transition-colors duration-200">
                        {formatPrice(transaction.price)}
                      </td>
                      <td className="text-right text-white font-bold text-sm py-4 px-2 hidden md:table-cell group-hover:text-blue-300 transition-colors duration-200">
                        {formatPrice(transaction.totalAmount)}
                      </td>
                      <td className="text-right text-slate-400 font-medium text-sm py-4 px-2 hidden lg:table-cell">
                        {formatPrice(transaction.fees || 0)}
                      </td>
                      <td className="py-4 pl-2 text-right">
                        <div className="text-white text-sm font-semibold group-hover:text-blue-300 transition-colors duration-200">
                          {formatDate(transaction.tradeDate)}
                        </div>
                        <div className="text-slate-500 text-xs font-medium">
                          {formatTime(transaction.tradeDate)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {currentTransactions.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400 text-xl font-medium">No transactions found</p>
                  <p className="text-slate-600 text-sm mt-2">Try adjusting your search or filter criteria</p>
                  <button 
                    onClick={clearFilters}
                    className="mt-4 px-6 py-3 bg-blue-500/20 border border-blue-400/30 rounded-xl text-blue-300 hover:bg-blue-500/30 transition-all duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentTransactions.map((transaction) => (
                <div key={transaction.tradeId} className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-xl border border-slate-600/40 rounded-xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-200 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${
                        transaction.type === 'BUY' 
                          ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' 
                          : 'bg-gradient-to-br from-red-500 to-red-600'
                      }`}>
                        {transaction.symbol.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors duration-200">
                          {transaction.symbol}
                        </h4>
                        <p className="text-slate-400 text-sm truncate">{transaction.name}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-lg font-bold text-xs ${
                      transaction.type === 'BUY'
                        ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                        : 'bg-red-500/25 text-red-300 border border-red-500/40'
                    }`}>
                      {transaction.type}
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Quantity:</span>
                      <span className="text-white font-semibold">{transaction.qty.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Price:</span>
                      <span className="text-white font-semibold">{formatPrice(transaction.price)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Total:</span>
                      <span className="text-white font-bold text-lg">{formatPrice(transaction.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Fees:</span>
                      <span className="text-orange-400 font-medium">{formatPrice(transaction.fees || 0)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-slate-600/40">
                    <div className="text-xs text-slate-500 font-mono">
                      {transaction.tradeId}
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm font-semibold">
                        {formatDate(transaction.tradeDate)}
                      </div>
                      <div className="text-slate-400 text-xs">
                        {formatTime(transaction.tradeDate)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {currentTransactions.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <AlertCircle className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400 text-xl font-medium">No transactions found</p>
                  <p className="text-slate-600 text-sm mt-2">Try adjusting your search or filter criteria</p>
                  <button 
                    onClick={clearFilters}
                    className="mt-4 px-6 py-3 bg-blue-500/20 border border-blue-400/30 rounded-xl text-blue-300 hover:bg-blue-500/30 transition-all duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 pt-6 border-t border-slate-700/50">
              <div className="text-sm text-slate-400 text-center sm:text-left flex items-center gap-2">
                <span>Page {currentPage} of {totalPages}</span>
                <span className="hidden sm:inline text-slate-600">•</span>
                <span className="hidden sm:inline">{filteredTransactions.length} total results</span>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 hover:bg-slate-600/50 hover:border-slate-500/60 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 hover:bg-slate-600/50 hover:border-slate-500/60 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          currentPage === pageNum
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-slate-700/50 border border-slate-600/50 text-slate-300 hover:bg-slate-600/50 hover:border-slate-500/60'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 hover:bg-slate-600/50 hover:border-slate-500/60 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 hover:bg-slate-600/50 hover:border-slate-500/60 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions Footer */}
        <div className="bg-gradient-to-r from-slate-900/90 via-slate-800/70 to-slate-900/90 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Need help with your transactions?</h4>
                <p className="text-slate-400 text-sm">Contact our support team for assistance</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-6 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-300 hover:bg-slate-600/50 hover:border-slate-500/60 transition-all duration-200 font-medium">
                Contact Support
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg shadow-blue-500/25">
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryInterface;