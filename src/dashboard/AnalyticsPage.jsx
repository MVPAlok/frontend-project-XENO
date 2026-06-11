import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  funnelData,
  revenueAttributionData,
  channelPerformanceData,
  trendPerformanceData
} from './mockData';

// Custom modern tooltips for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 border border-gray-150 p-3.5 rounded-2xl shadow-xl backdrop-blur-md">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
        {payload.map((item, idx) => (
          <p key={idx} className="text-xs font-extrabold" style={{ color: item.color }}>
            {item.name}: {typeof item.value === 'number' && item.name.includes('Revenue') ? `₹${item.value.toLocaleString()}` : item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [trendMetric, setTrendMetric] = useState('revenue'); // 'revenue' | 'conversions' | 'growth'

  const getMetricLabel = () => {
    if (trendMetric === 'revenue') return 'Revenue (₹)';
    if (trendMetric === 'conversions') return 'Conversions Count';
    return 'Customer Database Size';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-950">Analytics & Attribution Studio</h2>
        <p className="text-xs text-gray-400 font-semibold mt-0.5">Visualize attribution funnels, evaluate channel returns, and track growth curves over time.</p>
      </div>

      {/* Top row: Funnel & Revenue Attribution */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Campaign Funnel Card */}
        <div className="bg-white border border-gray-200/60 p-6 rounded-[2.5rem] shadow-sm space-y-6">
          <div>
            <h3 className="text-sm font-bold text-gray-905">Conversion Funnel Attribution</h3>
            <p className="text-[11px] text-gray-400 font-semibold">Drop-off rates from message dispatch to order conversion.</p>
          </div>

          <div className="space-y-4">
            {funnelData.map((stage, idx) => {
              const percentages = ['100%', '96%', '75%', '37.5%', '12.9%'];
              const colors = ['bg-indigo-600', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-emerald-500'];
              
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${colors[idx]}`} />
                      <span>{stage.name}</span>
                    </span>
                    <span>{stage.value.toLocaleString()} ({stage.percentage})</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3.5 rounded-full overflow-hidden flex relative">
                    <div 
                      className={`h-full ${colors[idx]} transition-all duration-1000`} 
                      style={{ width: percentages[idx] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue Attribution BarChart */}
        <div className="bg-white border border-gray-200/60 p-6 rounded-[2.5rem] shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-bold text-gray-905">Revenue Attribution by Campaign</h3>
              <p className="text-[11px] text-gray-400 font-semibold">Top performing campaigns ranked by direct conversions.</p>
            </div>
            <span className="text-[10px] font-bold bg-indigo-50 border border-indigo-100/50 text-indigo-700 px-2.5 py-0.5 rounded-full">
              Direct Sales
            </span>
          </div>

          <div className="h-64 text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueAttributionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" name="Revenue Generated" fill="#6b4cff" radius={[10, 10, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Middle row: Channels & Trends */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Channel Performance grouped BarChart */}
        <div className="bg-white border border-gray-200/60 p-6 rounded-[2.5rem] shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-gray-905">Channel Performance Comparison</h3>
            <p className="text-[11px] text-gray-400 font-semibold">Delivery, Open, and Conversion percentages by delivery format.</p>
          </div>

          <div className="h-64 text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="channel" stroke="#9ca3af" fontSize={10} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 'bold' }} />
                <Bar dataKey="deliveryRate" name="Delivery %" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="readRate" name="Read %" fill="#fb8c00" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clickRate" name="Click %" fill="#ec4899" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conversionRate" name="Conversion %" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Trend Chart */}
        <div className="bg-white border border-gray-200/60 p-6 rounded-[2.5rem] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h3 className="text-sm font-bold text-gray-955">Campaign Performance & Database Trends</h3>
              <p className="text-[11px] text-gray-400 font-semibold">Monitor historical business trajectories.</p>
            </div>
            
            <div className="flex border border-gray-200 rounded-xl p-1 bg-gray-50/50 self-start">
              <button
                onClick={() => setTrendMetric('revenue')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                  trendMetric === 'revenue' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setTrendMetric('conversions')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                  trendMetric === 'conversions' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Conversions
              </button>
              <button
                onClick={() => setTrendMetric('growth')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                  trendMetric === 'growth' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Growth
              </button>
            </div>
          </div>

          <div className="h-64 text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendPerformanceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={10} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey={trendMetric} 
                  name={getMetricLabel()} 
                  stroke="#8b5cf6" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorTrend)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
