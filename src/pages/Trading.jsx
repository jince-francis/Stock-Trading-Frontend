import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, DollarSign, Activity, Zap, AlertCircle, CheckCircle, X, Plus, Minus, BarChart3, RefreshCw, Wallet, ArrowUpRight, ArrowDownRight, ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';

const TradingInterface = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState(null);
  const [tradeType, setTradeType] = useState('buy');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [balance, setBalance] = useState(100000);
  const [showModal, setShowModal] = useState(false);

  // Get stock data from navigation state or use default
  const stockFromNavigation = location.state?.stock;

  // Mock stock data - use navigation data if available
  const mockStock = stockFromNavigation || {
    symbol: "AAPL",
    name: "Apple Inc",
    lastPrice: 189.56,
    change: +2.34,
    changePercent: +1.25,
    volume: "45.2M",
    marketCap: "2.98T",
    high: 192.10,
    low: 186.20,
    open: 187.50
  };

  // Generate realistic chart data based on current stock price
  const generateChartData = (currentPrice, days = 30) => {
    const data = [];
    let price = currentPrice - (Math.random() * 15 + 5); // Start 5-20 points below current
    
    for (let i = days; i >= 0; i--) {
      const volatility = 0.02; // 2% max daily change
      const change = (Math.random() - 0.5) * 2 * volatility * price;
      price += change;
      
      // Add some trend toward current price as we get closer to today
      const trendFactor = (days - i) / days;
      const trendAdjustment = (currentPrice - price) * trendFactor * 0.1;
      price += trendAdjustment;
      
      data.push({
        time: i === 0 ? 'Now' : `${i}d`,
        price: Number(price.toFixed(2))
      });
    }
    
    // Ensure the last point matches current price
    data[data.length - 1].price = currentPrice;
    return data;
  };

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setSelectedStock(mockStock);
    setChartData(generateChartData(mockStock.lastPrice));
  }, [stockFromNavigation]);

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

  const calculateTotal = () => {
    if (!selectedStock) return 0;
    return selectedStock.lastPrice * quantity;
  };

  const canAffordTrade = () => {
    if (tradeType === 'sell') return true;
    return balance >= calculateTotal();
  };

  const executeTrade = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const endpoint = tradeType === 'buy' ? '/trade/buy' : '/trade/sell';
      const requestData = {
        symbol: selectedStock.symbol,
        qty: quantity
      };

      const mockResponse = {
        message: tradeType === 'buy' 
          ? "Buy order executed successfully" 
          : "Sell order executed successfully",
        tradeId: `TXN${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        updatedBalance: tradeType === 'buy' 
          ? balance - calculateTotal()
          : balance + calculateTotal()
      };

      setBalance(mockResponse.updatedBalance);
      
      setSuccess({
        message: mockResponse.message,
        tradeId: mockResponse.tradeId,
        amount: calculateTotal(),
        type: tradeType
      });

      setQuantity(1);
      setShowModal(true);

    } catch (err) {
      setError('Trade execution failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSuccess(null);
    setError(null);
  };

  if (!selectedStock) return null;

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
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Back</span>
              </button>
              <div className="relative flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl shadow-2xl shadow-blue-500/20">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent truncate">
                  Trade Center
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 animate-pulse flex-shrink-0" />
                  <p className="text-blue-400 text-xs sm:text-sm font-medium truncate">Execute Trades</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-500/10 border border-green-400/20 rounded-xl backdrop-blur-sm">
                <Wallet className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                <span className="text-green-300 text-xs sm:text-sm font-medium whitespace-nowrap">
                  Balance: {formatPrice(balance)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Trading Interface */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        {/* Stock Chart Section */}
        <div className="bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-2xl">
          <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 lg:gap-8 mb-6">
            {/* Stock Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 flex-wrap">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white truncate">{selectedStock.symbol}</h2>
                <div className={`p-2 sm:p-3 rounded-xl flex-shrink-0 ${selectedStock.change >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  {selectedStock.change >= 0 ? (
                    <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                  )}
                </div>
              </div>
              <p className="text-gray-400 text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 truncate">{selectedStock.name}</p>
              
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 mb-6">
                <div className="flex-1 min-w-0">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                    {formatPrice(selectedStock.lastPrice)}
                  </div>
                  <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-bold text-base sm:text-lg ${
                    selectedStock.change >= 0 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {selectedStock.change >= 0 ? (
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    ) : (
                      <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    )}
                    <span className="whitespace-nowrap">
                      {formatChange(selectedStock.change)} ({formatChangePercent(selectedStock.changePercent)})
                    </span>
                  </div>
                </div>
              </div>

              {/* Stock Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-3 sm:p-4">
                  <p className="text-gray-500 text-xs sm:text-sm mb-1">Open</p>
                  <p className="text-white font-bold text-sm sm:text-base lg:text-lg truncate">{formatPrice(selectedStock.open || selectedStock.lastPrice * 0.98)}</p>
                </div>
                <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-3 sm:p-4">
                  <p className="text-gray-500 text-xs sm:text-sm mb-1">High</p>
                  <p className="text-green-400 font-bold text-sm sm:text-base lg:text-lg truncate">{formatPrice(selectedStock.high || selectedStock.lastPrice * 1.02)}</p>
                </div>
                <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-3 sm:p-4">
                  <p className="text-gray-500 text-xs sm:text-sm mb-1">Low</p>
                  <p className="text-red-400 font-bold text-sm sm:text-base lg:text-lg truncate">{formatPrice(selectedStock.low || selectedStock.lastPrice * 0.95)}</p>
                </div>
                <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-3 sm:p-4">
                  <p className="text-gray-500 text-xs sm:text-sm mb-1">Volume</p>
                  <p className="text-white font-bold text-sm sm:text-base lg:text-lg truncate">{selectedStock.volume}</p>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="w-full xl:w-1/2 xl:max-w-2xl">
              <div className="bg-gray-800/20 border border-gray-700/30 rounded-xl p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
                  <h3 className="text-white font-bold text-base sm:text-lg">30-Day Price Chart</h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-400">Price Movement</span>
                  </div>
                </div>
                <div className="h-48 sm:h-56 lg:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                      <XAxis 
                        dataKey="time" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 10 }}
                        interval="preserveStartEnd"
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 10 }}
                        domain={['dataMin - 2', 'dataMax + 2']}
                        width={50}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#10b981"
                        strokeWidth={2}
                        fill="url(#priceGradient)"
                        dot={false}
                        activeDot={{ 
                          r: 4, 
                          fill: '#10b981',
                          stroke: '#ffffff',
                          strokeWidth: 2
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Form - Same width as chart section */}
        <div className="w-full">
          <div className="bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">Place Your Order</h3>
              
              {/* Trade Type Toggle */}
              <div className="flex bg-gray-800/50 rounded-2xl p-2 mb-6 sm:mb-8 border border-gray-700/30">
                <button
                  onClick={() => setTradeType('buy')}
                  className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 ${
                    tradeType === 'buy'
                      ? 'bg-gradient-to-r from-green-500/40 to-emerald-600/40 text-green-300 border-2 border-green-500/50 shadow-lg shadow-green-500/20'
                      : 'text-gray-400 hover:text-green-300 hover:bg-green-500/10'
                  }`}
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>Buy Stock</span>
                </button>
                <button
                  onClick={() => setTradeType('sell')}
                  className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 ${
                    tradeType === 'sell'
                      ? 'bg-gradient-to-r from-red-500/40 to-red-600/40 text-red-300 border-2 border-red-500/50 shadow-lg shadow-red-500/20'
                      : 'text-gray-400 hover:text-red-300 hover:bg-red-500/10'
                  }`}
                >
                  <Minus className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>Sell Stock</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Quantity Input */}
                <div>
                  <label className="block text-gray-300 text-base sm:text-lg font-semibold mb-3 sm:mb-4">Select Quantity</label>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 sm:p-4 bg-gray-700/50 border-2 border-gray-600/50 rounded-xl text-gray-300 hover:bg-gray-600/50 hover:border-gray-500/60 transition-all duration-200 hover:scale-105 flex-shrink-0"
                    >
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gray-800/50 border-2 border-gray-600/40 rounded-xl text-white text-center text-xl sm:text-2xl font-bold focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 min-w-0"
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 sm:p-4 bg-gray-700/50 border-2 border-gray-600/50 rounded-xl text-gray-300 hover:bg-gray-600/50 hover:border-gray-500/60 transition-all duration-200 hover:scale-105 flex-shrink-0"
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gradient-to-r from-gray-800/40 via-gray-800/20 to-gray-800/40 border-2 border-gray-700/50 rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
                  <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>Order Summary</span>
                  </h4>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center py-1 sm:py-2">
                      <span className="text-gray-400 font-medium text-sm sm:text-base">Order Type</span>
                      <span className={`font-bold text-sm sm:text-base px-2 sm:px-3 py-1 rounded-lg ${tradeType === 'buy' ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'}`}>
                        {tradeType.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 sm:py-2">
                      <span className="text-gray-400 font-medium text-sm sm:text-base">Stock Symbol</span>
                      <span className="text-white font-bold text-sm sm:text-base">{selectedStock.symbol}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 sm:py-2">
                      <span className="text-gray-400 font-medium text-sm sm:text-base">Price per Share</span>
                      <span className="text-white font-bold text-sm sm:text-base">{formatPrice(selectedStock.lastPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 sm:py-2">
                      <span className="text-gray-400 font-medium text-sm sm:text-base">Quantity</span>
                      <span className="text-white font-bold text-sm sm:text-base">{quantity} shares</span>
                    </div>
                    <div className="border-t-2 border-gray-700/50 pt-3 sm:pt-4 mt-3 sm:mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-bold text-base sm:text-xl">Total Amount</span>
                        <span className="text-white text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                          {formatPrice(calculateTotal())}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Balance Check */}
              {tradeType === 'buy' && !canAffordTrade() && (
                <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-3 sm:p-4 mt-4 sm:mt-6">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-300 font-medium text-sm sm:text-base">Insufficient balance</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-3 sm:p-4 mt-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-300 font-medium text-sm sm:text-base">{error}</p>
                  </div>
                </div>
              )}

              {/* Execute Trade Button */}
              <button
                onClick={executeTrade}
                disabled={loading || (tradeType === 'buy' && !canAffordTrade())}
                className={`w-full mt-6 sm:mt-8 py-4 sm:py-5 px-6 sm:px-8 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 flex items-center justify-center gap-3 sm:gap-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 ${
                  tradeType === 'buy'
                    ? 'bg-gradient-to-r from-green-500/40 to-emerald-600/40 border-2 border-green-500/50 text-green-300 hover:from-green-500/50 hover:to-emerald-600/50 hover:border-green-400/70 shadow-2xl hover:shadow-green-500/30'
                    : 'bg-gradient-to-r from-red-500/40 to-red-600/40 border-2 border-red-500/50 text-red-300 hover:from-red-500/50 hover:to-red-600/50 hover:border-red-400/70 shadow-2xl hover:shadow-red-500/30'
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 animate-spin flex-shrink-0" />
                    <span>Processing Trade...</span>
                  </>
                ) : (
                  <>
                    {tradeType === 'buy' ? <Plus className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" /> : <Minus className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />}
                    <span>{tradeType === 'buy' ? 'Execute Buy Order' : 'Execute Sell Order'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && success && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-4 ${
                success.type === 'buy' ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
                <CheckCircle className={`w-6 h-6 sm:w-8 sm:h-8 ${
                  success.type === 'buy' ? 'text-green-400' : 'text-red-400'
                }`} />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Trade Successful!</h3>
              <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">{success.message}</p>
              
              <div className="bg-gray-800/30 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-left">
                <div className="flex justify-between mb-2 text-sm sm:text-base">
                  <span className="text-gray-400">Trade ID:</span>
                  <span className="text-white font-mono truncate ml-2">{success.tradeId}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm sm:text-base">
                  <span className="text-gray-400">Amount:</span>
                  <span className="text-white font-medium">{formatPrice(success.amount)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-400">New Balance:</span>
                  <span className="text-green-400 font-medium">{formatPrice(balance)}</span>
                </div>
              </div>
              
              <button
                onClick={closeModal}
                className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-blue-500/30 to-blue-600/30 border border-blue-500/40 text-blue-300 rounded-xl hover:from-blue-500/40 hover:to-blue-600/40 hover:border-blue-400/60 transition-all duration-200 font-medium text-sm sm:text-base"
              >
                Continue Trading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingInterface;