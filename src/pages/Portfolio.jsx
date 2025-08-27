import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, Zap, AlertCircle, PieChart, BarChart3, RefreshCw, Wallet, ArrowUpRight, ArrowDownRight, ArrowLeft, Eye, Target } from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Pie } from 'recharts';

const PortfolioInterface = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Mock portfolio data - simulating API response
  const mockPortfolioData = {
    userId: "u123",
    holdings: [
      { 
        symbol: "AAPL", 
        name: "Apple Inc",
        qty: 15, 
        avgPrice: 180.0, 
        currentPrice: 189.56, 
        profitLoss: 143.4,
        profitLossPercent: 5.31,
        totalValue: 2843.40,
        dayChange: +2.34,
        dayChangePercent: +1.25
      },
      { 
        symbol: "TSLA", 
        name: "Tesla Inc",
        qty: 8, 
        avgPrice: 240.0, 
        currentPrice: 242.13, 
        profitLoss: 17.04,
        profitLossPercent: 0.89,
        totalValue: 1937.04,
        dayChange: -5.67,
        dayChangePercent: -2.29
      },
      { 
        symbol: "NVDA", 
        name: "NVIDIA Corporation",
        qty: 5, 
        avgPrice: 420.0, 
        currentPrice: 445.20, 
        profitLoss: 126.0,
        profitLossPercent: 6.0,
        totalValue: 2226.0,
        dayChange: +8.90,
        dayChangePercent: +2.04
      },
      { 
        symbol: "MSFT", 
        name: "Microsoft Corporation",
        qty: 12, 
        avgPrice: 340.0, 
        currentPrice: 355.75, 
        profitLoss: 189.0,
        profitLossPercent: 4.63,
        totalValue: 4269.0,
        dayChange: +1.25,
        dayChangePercent: +0.35
      },
      { 
        symbol: "GOOGL", 
        name: "Alphabet Inc",
        qty: 6, 
        avgPrice: 125.0, 
        currentPrice: 138.42, 
        profitLoss: 80.52,
        profitLossPercent: 10.74,
        totalValue: 830.52,
        dayChange: +0.89,
        dayChangePercent: +0.65
      }
    ],
    totalValue: 12105.96,
    totalInvestment: 10750.0,
    totalProfitLoss: 555.96,
    totalProfitLossPercent: 5.17,
    dayChange: +147.71,
    dayChangePercent: +1.23
  };

  // Colors for pie chart
  const chartColors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPortfolioData(mockPortfolioData);
      setLoading(false);
    }, 1500);
  }, []);

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

  const refreshPortfolio = async () => {
    setRefreshing(true);
    // Simulate API refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update with slight variations to show refresh
    const updatedData = {
      ...mockPortfolioData,
      holdings: mockPortfolioData.holdings.map(holding => ({
        ...holding,
        currentPrice: holding.currentPrice + (Math.random() - 0.5) * 2,
        dayChange: holding.dayChange + (Math.random() - 0.5) * 1,
      }))
    };
    
    setPortfolioData(updatedData);
    setRefreshing(false);
  };

  // Prepare data for charts
  const pieChartData = portfolioData?.holdings.map((holding, index) => ({
    name: holding.symbol,
    value: holding.totalValue,
    color: chartColors[index % chartColors.length]
  })) || [];

  const barChartData = portfolioData?.holdings.map(holding => ({
    symbol: holding.symbol,
    profitLoss: holding.profitLoss,
    profitLossPercent: holding.profitLossPercent
  })) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-green-500/5 to-emerald-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/5 to-cyan-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/3 to-pink-500/3 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        <div className="absolute top-20 left-10 w-2 h-2 bg-green-400/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-emerald-400/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-blue-400/20 rounded-full animate-bounce delay-1000"></div>
      </div>

      {/* Header */}
      <div className="bg-gray-950/90 backdrop-blur-2xl border-b border-gray-800/50 sticky top-0 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Back</span>
              </button>
              <div className="relative flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 rounded-2xl shadow-2xl shadow-green-500/20">
                  <PieChart className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent truncate">
                  Portfolio Overview
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 animate-pulse flex-shrink-0" />
                  <p className="text-green-400 text-xs sm:text-sm font-medium truncate">Your Holdings</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={refreshPortfolio}
                disabled={refreshing}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-500/10 border border-blue-400/20 rounded-xl backdrop-blur-sm text-blue-300 hover:bg-blue-500/20 transition-all duration-200 disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="text-xs sm:text-sm font-medium">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Value */}
          <div className="bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 sm:p-3 bg-blue-500/20 rounded-xl">
                <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <h3 className="text-gray-400 text-sm sm:text-base font-medium">Total Value</h3>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {formatPrice(portfolioData?.totalValue || 0)}
            </div>
            <div className={`flex items-center gap-1 text-xs sm:text-sm font-medium ${
              (portfolioData?.dayChange || 0) >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {(portfolioData?.dayChange || 0) >= 0 ? (
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
              <span>{formatChange(portfolioData?.dayChange || 0)} ({formatChangePercent(portfolioData?.dayChangePercent || 0)})</span>
            </div>
          </div>

          {/* Total P&L */}
          <div className="bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 sm:p-3 rounded-xl ${
                (portfolioData?.totalProfitLoss || 0) >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
                {(portfolioData?.totalProfitLoss || 0) >= 0 ? (
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                )}
              </div>
              <h3 className="text-gray-400 text-sm sm:text-base font-medium">Total P&L</h3>
            </div>
            <div className={`text-2xl sm:text-3xl font-bold mb-2 ${
              (portfolioData?.totalProfitLoss || 0) >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {formatPrice(portfolioData?.totalProfitLoss || 0)}
            </div>
            <div className={`text-xs sm:text-sm font-medium ${
              (portfolioData?.totalProfitLoss || 0) >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {formatChangePercent(portfolioData?.totalProfitLossPercent || 0)}
            </div>
          </div>

          {/* Total Investment */}
          <div className="bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 sm:p-3 bg-purple-500/20 rounded-xl">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              </div>
              <h3 className="text-gray-400 text-sm sm:text-base font-medium">Invested</h3>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {formatPrice(portfolioData?.totalInvestment || 0)}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 font-medium">
              Original cost basis
            </div>
          </div>

          {/* Holdings Count */}
          <div className="bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 sm:p-3 bg-orange-500/20 rounded-xl">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
              </div>
              <h3 className="text-gray-400 text-sm sm:text-base font-medium">Holdings</h3>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {portfolioData?.holdings?.length || 0}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 font-medium">
              Active positions
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Portfolio Allocation */}
          <div className="bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <PieChart className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              Portfolio Allocation
            </h3>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    dataKey="value"
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ symbol, percent }) => `${symbol} ${(percent * 100).toFixed(1)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [formatPrice(value), 'Value']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* P&L Performance */}
          <div className="bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              P&L Performance
            </h3>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="symbol" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 10 }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'profitLoss' ? formatPrice(value) : `${value.toFixed(2)}%`,
                      name === 'profitLoss' ? 'P&L Amount' : 'P&L %'
                    ]}
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '12px'
                    }}
                  />
                  <Bar 
                    dataKey="profitLoss" 
                    fill="#10b981" 
                    radius={[4, 4, 0, 0]}
                    stroke="#065f46"
                    strokeWidth={1}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            Current Holdings
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left text-gray-400 font-semibold text-sm sm:text-base pb-3 pr-4">Stock</th>
                  <th className="text-right text-gray-400 font-semibold text-sm sm:text-base pb-3 px-2 hidden sm:table-cell">Qty</th>
                  <th className="text-right text-gray-400 font-semibold text-sm sm:text-base pb-3 px-2 hidden md:table-cell">Avg Price</th>
                  <th className="text-right text-gray-400 font-semibold text-sm sm:text-base pb-3 px-2">Current</th>
                  <th className="text-right text-gray-400 font-semibold text-sm sm:text-base pb-3 px-2 hidden lg:table-cell">Day Change</th>
                  <th className="text-right text-gray-400 font-semibold text-sm sm:text-base pb-3 px-2">P&L</th>
                  <th className="text-right text-gray-400 font-semibold text-sm sm:text-base pb-3 pl-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData?.holdings?.map((holding, index) => (
                  <tr key={holding.symbol} className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors duration-200">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0`}
                             style={{ backgroundColor: chartColors[index % chartColors.length] }}>
                          {holding.symbol.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white text-sm sm:text-base">{holding.symbol}</div>
                          <div className="text-gray-500 text-xs sm:text-sm truncate">{holding.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right text-white text-sm sm:text-base px-2 hidden sm:table-cell">{holding.qty}</td>
                    <td className="text-right text-gray-300 text-sm sm:text-base px-2 hidden md:table-cell">{formatPrice(holding.avgPrice)}</td>
                    <td className="text-right text-white font-medium text-sm sm:text-base px-2">{formatPrice(holding.currentPrice)}</td>
                    <td className={`text-right font-medium text-sm sm:text-base px-2 hidden lg:table-cell ${
                      holding.dayChange >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {formatChange(holding.dayChange)} ({formatChangePercent(holding.dayChangePercent)})
                    </td>
                    <td className={`text-right font-bold text-sm sm:text-base px-2 ${
                      holding.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <div>{formatPrice(holding.profitLoss)}</div>
                      <div className="text-xs">{formatChangePercent(holding.profitLossPercent)}</div>
                    </td>
                    <td className="text-right text-white font-bold text-sm sm:text-base pl-2">{formatPrice(holding.totalValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioInterface;