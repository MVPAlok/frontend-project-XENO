import React, { useState } from 'react';

const segments = [
  { id: 'high', label: 'High Value Customers', value: 35, count: '4,360', color: '#4f46e5', ringColor: 'stroke-indigo-500' },
  { id: 'new', label: 'New Customers', value: 30, count: '3,737', color: '#10b981', ringColor: 'stroke-emerald-500' },
  { id: 'inactive', label: 'Inactive Customers', value: 25, count: '3,114', color: '#f59e0b', ringColor: 'stroke-amber-500' },
  { id: 'risk', label: 'At Risk Customers', value: 10, count: '1,245', color: '#ec4899', ringColor: 'stroke-pink-500' }
];

export default function CustomerDistribution() {
  const [activeSegment, setActiveSegment] = useState(null);

  // Circumference for r=40 is 251.32
  const circumference = 251.32;
  
  // Compute stroke offsets
  let currentOffset = 0;
  const renderSegments = segments.map((seg, index) => {
    const strokeDash = (seg.value / 100) * circumference;
    const offset = circumference - strokeDash + currentOffset;
    currentOffset -= strokeDash;

    const isHovered = activeSegment === index;
    const isAnyHovered = activeSegment !== null;

    return {
      ...seg,
      strokeDash,
      offset,
      isHovered,
      opacity: isAnyHovered ? (isHovered ? 1.0 : 0.4) : 0.85,
      strokeWidth: isHovered ? 12 : 9
    };
  });

  return (
    <div className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between select-none">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-base font-bold text-gray-800 tracking-tight">Customer Distribution</h4>
          <p className="text-xs font-semibold text-gray-400">Segmentation breakdown by activity profile</p>
        </div>
        <span className="material-symbols-outlined text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">info</span>
      </div>

      {/* Chart and Legend Area */}
      <div className="flex flex-col sm:flex-row items-center gap-6 justify-center flex-1">
        
        {/* SVG Donut */}
        <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#f3f4f6"
              strokeWidth="9"
            />
            {/* Active segments */}
            {renderSegments.map((seg, i) => (
              <circle
                key={seg.id}
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke={seg.color}
                strokeWidth={seg.strokeWidth}
                strokeDasharray={`${seg.strokeDash} ${circumference}`}
                strokeDashoffset={seg.offset}
                strokeLinecap="round"
                className="transition-all duration-300 cursor-pointer"
                style={{ opacity: seg.opacity }}
                onMouseEnter={() => setActiveSegment(i)}
                onMouseLeave={() => setActiveSegment(null)}
              />
            ))}
          </svg>

          {/* Center Info Text */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-gray-800 tracking-tight">
              {activeSegment !== null ? `${segments[activeSegment].value}%` : '12.4K'}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
              {activeSegment !== null ? segments[activeSegment].id : 'Total Users'}
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex-1 space-y-2.5 w-full">
          {segments.map((seg, i) => {
            const isHovered = activeSegment === i;
            return (
              <div
                key={seg.id}
                onMouseEnter={() => setActiveSegment(i)}
                onMouseLeave={() => setActiveSegment(null)}
                className={`flex items-center justify-between p-2 rounded-xl transition-all duration-200 cursor-default ${
                  isHovered ? 'bg-gray-50 scale-[1.01]' : 'hover:bg-gray-50/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {/* Dot color */}
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className={`text-xs font-semibold text-gray-600 transition-colors ${isHovered ? 'text-indigo-600' : ''}`}>
                    {seg.label}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-gray-800">{seg.count}</span>
                  <span className="text-[10px] font-bold text-gray-400 ml-1.5">{seg.value}%</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
