import React from 'react';

const funnelStages = [
  { name: 'Sent', value: '100,000', percentage: '100%', points: '10,5 90,5 82,20 18,20', color: 'rgba(79, 70, 229, 0.9)' },
  { name: 'Delivered', value: '98,000', percentage: '98%', points: '18,22 82,22 74,37 26,37', color: 'rgba(99, 102, 241, 0.8)' },
  { name: 'Opened', value: '65,000', percentage: '65%', points: '26,39 74,39 66,54 34,54', color: 'rgba(139, 92, 246, 0.7)' },
  { name: 'Clicked', value: '18,000', percentage: '18%', points: '34,56 66,56 58,71 42,71', color: 'rgba(168, 85, 247, 0.6)' },
  { name: 'Purchased', value: '5,200', percentage: '5.2%', points: '42,73 58,73 53,88 47,88', color: 'rgba(236, 72, 153, 0.55)' }
];

export default function AnalyticsSection() {
  return (
    <div className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow select-none">
      
      {/* Header */}
      <div className="mb-6">
        <h4 className="text-base font-bold text-gray-800 tracking-tight">Campaign Funnel Analytics</h4>
        <p className="text-xs font-semibold text-gray-400">Aggregated conversion drop-off across all touchpoints</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Funnel Chart (SVG) */}
        <div className="lg:col-span-7 flex justify-center relative">
          <svg className="w-full max-w-xs h-64 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            {funnelStages.map((stage, idx) => (
              <g key={idx} className="group cursor-pointer">
                {/* Trapazoid Shape */}
                <polygon
                  points={stage.points}
                  fill={stage.color}
                  className="transition-all duration-300 hover:brightness-110"
                />
                
                {/* SVG text descriptors */}
                <text
                  x="50"
                  y={(idx * 17) + 12}
                  textAnchor="middle"
                  fill="white"
                  className="text-[4px] font-extrabold select-none pointer-events-none tracking-wide"
                >
                  {stage.name}: {stage.value} ({stage.percentage})
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Right: Funnel metrics & Attribution */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Revenue Attribution</span>
              <span className="text-xs font-black text-indigo-600">88.4% AI-Led</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-pink-500 w-[88.4%] h-full rounded-full" />
            </div>
            <p className="text-[10px] text-gray-400 font-semibold mt-1.5 leading-normal">
              ₹10.9L of total revenue generated via automated AI campaigns
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Top Segment</span>
              <p className="font-extrabold text-gray-800 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-indigo-500">stars</span>
                High Value
              </p>
            </div>
            
            <div className="bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Conversion Lift</span>
              <p className="font-extrabold text-emerald-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-emerald-500">trending_up</span>
                +45.2%
              </p>
            </div>

            <div className="bg-gray-50/50 p-3 rounded-2xl border border-gray-100 col-span-2">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Best Performing Campaign</span>
              <p className="font-extrabold text-gray-850 truncate">
                Summer Flash Sale • 22.4% CTR
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
