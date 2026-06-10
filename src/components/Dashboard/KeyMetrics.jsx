import React from 'react';

const metrics = [
  {
    title: 'Total Customers',
    value: '12,456',
    trend: '+12.4%',
    trendType: 'up',
    trendLabel: 'vs last month',
    color: 'indigo',
    gradient: 'from-blue-500 to-indigo-600',
    sparkline: 'M0 20 Q10 5, 20 22 T40 10 T60 5 T80 2 T100 0'
  },
  {
    title: 'Active Campaigns',
    value: '32',
    trend: '+3 today',
    trendType: 'up',
    trendLabel: 'vs yesterday',
    color: 'pink',
    gradient: 'from-purple-500 to-pink-600',
    sparkline: 'M0 20 Q10 25, 20 15 T40 22 T60 10 T80 5 T100 3'
  },
  {
    title: 'Revenue Generated',
    value: '₹12.4L',
    trend: '+18.2%',
    trendType: 'up',
    trendLabel: 'vs last month',
    color: 'emerald',
    gradient: 'from-emerald-400 to-teal-600',
    sparkline: 'M0 25 Q10 22, 20 18 T40 12 T60 15 T80 5 T100 0'
  },
  {
    title: 'Avg. Conversion Rate',
    value: '18.4%',
    trend: '+2.4%',
    trendType: 'up',
    trendLabel: 'vs last week',
    color: 'violet',
    gradient: 'from-indigo-400 to-purple-600',
    sparkline: 'M0 22 Q10 18, 20 20 T40 15 T60 12 T80 3 T100 0'
  }
];

export default function KeyMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
        >
          {/* Subtle bottom gradient accent on hover */}
          <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${metric.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{metric.title}</p>
              <h3 className="text-3xl font-black text-gray-800 tracking-tight leading-none">{metric.value}</h3>
            </div>
            
            {/* Trend Indicator */}
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold ${
              metric.trendType === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
            }`}>
              <span className="material-symbols-outlined text-[14px]">
                {metric.trendType === 'up' ? 'arrow_upward' : 'arrow_downward'}
              </span>
              <span>{metric.trend}</span>
            </div>
          </div>

          {/* Sparkline & Subtext */}
          <div className="flex items-end justify-between mt-6">
            <span className="text-[11px] font-semibold text-gray-400 tracking-wide">{metric.trendLabel}</span>
            
            {/* Sparkline Chart */}
            <div className="w-24 h-8 overflow-visible">
              <svg viewBox="0 0 100 30" className="w-full h-full">
                <path
                  d={metric.sparkline}
                  fill="none"
                  stroke={`url(#sparkGradient-${i})`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Glow filter definition */}
                <defs>
                  <linearGradient id={`sparkGradient-${i}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
