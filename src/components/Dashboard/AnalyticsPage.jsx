import React from 'react';

export default function AnalyticsPage() {
  const funnelStages = [
    { name: 'Sent', value: '100,000', percentage: '100%', points: '10,5 90,5 82,20 18,20', color: 'rgba(79, 70, 229, 0.9)' },
    { name: 'Delivered', value: '98,000', percentage: '98%', points: '18,22 82,22 74,37 26,37', color: 'rgba(99, 102, 241, 0.8)' },
    { name: 'Opened', value: '65,000', percentage: '65%', points: '26,39 74,39 66,54 34,54', color: 'rgba(139, 92, 246, 0.7)' },
    { name: 'Clicked', value: '18,000', percentage: '18%', points: '34,56 66,56 58,71 42,71', color: 'rgba(168, 85, 247, 0.6)' },
    { name: 'Purchased', value: '5,200', percentage: '5.2%', points: '42,73 58,73 53,88 47,88', color: 'rgba(236, 72, 153, 0.55)' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 select-none">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-gray-800 tracking-tight mb-2">Analytics Center</h2>
        <p className="text-gray-500 text-sm">Analyze multi-channel customer conversions, attribution matrices, and ROI metrics.</p>
      </div>

      {/* Attribution & Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Total Revenue Generated</span>
          <strong className="text-2xl font-black text-gray-800">₹14.8L</strong>
          <span className="text-[10px] font-bold text-emerald-500 block mt-1">+16.2% vs last month</span>
        </div>
        <div className="bg-white border border-gray-200/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">AI-Led Attribution</span>
          <strong className="text-2xl font-black text-indigo-600">₹10.9L</strong>
          <span className="text-[10px] font-semibold text-gray-400 block mt-1">88.4% of total sales</span>
        </div>
        <div className="bg-white border border-gray-200/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Avg conversion Rate</span>
          <strong className="text-2xl font-black text-emerald-500">18.4%</strong>
          <span className="text-[10px] font-bold text-emerald-500 block mt-1">+2.4% vs last week</span>
        </div>
        <div className="bg-white border border-gray-200/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Customer Retention Index</span>
          <strong className="text-2xl font-black text-purple-650">94.2%</strong>
          <span className="text-[10px] font-semibold text-gray-400 block mt-1">Churn minimized by 4.2%</span>
        </div>
      </div>

      {/* Main Charts: Funnel & Revenue Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Campaign Funnel Analysis */}
        <div className="lg:col-span-6 bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h4 className="text-base font-bold text-gray-800 tracking-tight">Conversion Funnel Analytics</h4>
            <p className="text-xs font-semibold text-gray-400">Aggregated conversion drop-off across all campaign gateways</p>
          </div>
          
          <div className="flex justify-center relative my-4">
            <svg className="w-full max-w-xs h-64 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              {funnelStages.map((stage, idx) => (
                <g key={idx} className="group cursor-pointer">
                  <polygon
                    points={stage.points}
                    fill={stage.color}
                    className="transition-all duration-300 hover:brightness-110"
                  />
                  <text
                    x="50"
                    y={(idx * 17) + 12}
                    textAnchor="middle"
                    fill="white"
                    className="text-[4.5px] font-extrabold select-none pointer-events-none tracking-wide"
                  >
                    {stage.name}: {stage.value} ({stage.percentage})
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Revenue Analytics (SVG line chart) */}
        <div className="lg:col-span-6 bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h4 className="text-base font-bold text-gray-800 tracking-tight">Revenue Trend Analysis</h4>
            <p className="text-xs font-semibold text-gray-400">Attributed daily retail revenue logs (June 1 - June 10)</p>
          </div>
          
          {/* SVG Line chart representing revenue */}
          <div className="relative w-full h-64 my-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
              {/* Background Grid Lines */}
              <line x1="50" y1="20" x2="480" y2="20" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="50" y1="70" x2="480" y2="70" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="50" y1="120" x2="480" y2="120" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="50" y1="170" x2="480" y2="170" stroke="#f3f4f6" strokeWidth="1" />
              
              {/* Y Axis Labels */}
              <text x="15" y="25" className="text-[10px] fill-gray-400 font-bold">₹10L</text>
              <text x="15" y="75" className="text-[10px] fill-gray-400 font-bold">₹6L</text>
              <text x="15" y="125" className="text-[10px] fill-gray-400 font-bold">₹3L</text>
              <text x="15" y="175" className="text-[10px] fill-gray-400 font-bold">₹0</text>
              
              {/* X Axis Labels */}
              <text x="50" y="195" className="text-[10px] fill-gray-400 font-bold">Jun 1</text>
              <text x="157" y="195" className="text-[10px] fill-gray-400 font-bold">Jun 3</text>
              <text x="264" y="195" className="text-[10px] fill-gray-400 font-bold">Jun 5</text>
              <text x="371" y="195" className="text-[10px] fill-gray-400 font-bold">Jun 7</text>
              <text x="480" y="195" className="text-[10px] fill-gray-400 font-bold">Jun 10</text>

              {/* Area Under Line (Gradient fill) */}
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 50,170 Q 120,90 200,120 T 350,50 T 480,30 L 480,170 Z"
                fill="url(#areaGrad)"
              />

              {/* Smooth Spline Curve */}
              <path
                d="M 50,170 Q 120,90 200,120 T 350,50 T 480,30"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>

              {/* Data points */}
              <circle cx="50" cy="170" r="5" fill="#4f46e5" stroke="white" strokeWidth="2" />
              <circle cx="200" cy="120" r="5" fill="#8b5cf6" stroke="white" strokeWidth="2" />
              <circle cx="350" cy="50" r="5" fill="#c084fc" stroke="white" strokeWidth="2" />
              <circle cx="480" cy="30" r="5" fill="#ec4899" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>

      </div>

      {/* Comparisons: Segment Yield & Channel Yield */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Top Channels & Segments Progress */}
        <div className="lg:col-span-8 bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm space-y-6">
          <h4 className="text-base font-bold text-gray-800 tracking-tight">Segment & Channel Yield Map</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-semibold text-xs text-gray-650">
            {/* Top Segments */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 pb-1.5">Top Performing Segments</span>
              
              {/* High LTV */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-750">High-LTV Dormant</span>
                  <span className="text-indigo-650 font-bold">₹8.4L attributed</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full w-[85%]" />
                </div>
              </div>

              {/* First-Time buyers */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-750">First-Time Buyers</span>
                  <span className="text-indigo-650 font-bold">₹4.2L attributed</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full w-[45%]" />
                </div>
              </div>

              {/* Churn Risk list */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-750">Churn Risk List</span>
                  <span className="text-indigo-650 font-bold">₹2.1L attributed</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-400 h-full rounded-full w-[25%]" />
                </div>
              </div>
            </div>

            {/* Top Channels */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 pb-1.5">Top Performing Channels</span>
              
              {/* WhatsApp */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-750 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-emerald-500">chat</span> WhatsApp Business
                  </span>
                  <span className="text-emerald-600 font-bold">22.4% CTR</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-[88%]" />
                </div>
              </div>

              {/* RCS */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-750 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-pink-500">cell_tower</span> RCS Rich Messaging
                  </span>
                  <span className="text-pink-600 font-bold">28.1% CTR</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-pink-500 h-full rounded-full w-[94%]" />
                </div>
              </div>

              {/* SMS */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-750 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-blue-500">sms</span> SMS Notifications
                  </span>
                  <span className="text-blue-600 font-bold">18.6% CTR</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full w-[65%]" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-750 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-indigo-500">mail</span> Email Journeys
                  </span>
                  <span className="text-indigo-600 font-bold">14.5% CTR</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full w-[45%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights panel */}
        <div className="lg:col-span-4 bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm space-y-4">
          <h4 className="text-base font-bold text-gray-800 tracking-tight">AI Insights Feed</h4>
          
          <div className="space-y-3">
            {/* Insight 1 */}
            <div className="bg-indigo-50/20 border border-indigo-100/30 p-3.5 rounded-2xl flex gap-3 text-xs">
              <span className="material-symbols-outlined text-indigo-500 text-[18px] mt-0.5">auto_awesome</span>
              <div>
                <strong className="text-gray-800 font-extrabold block">WhatsApp performs 2.3x better</strong>
                <p className="text-gray-500 font-medium leading-relaxed mt-0.5">
                  WhatsApp messaging yields 2.3x better CTR than Email campaigns for reactivating churned, high-value audiences.
                </p>
              </div>
            </div>

            {/* Insight 2 */}
            <div className="bg-pink-50/20 border border-pink-100/30 p-3.5 rounded-2xl flex gap-3 text-xs">
              <span className="material-symbols-outlined text-pink-500 text-[18px] mt-0.5">query_stats</span>
              <div>
                <strong className="text-gray-800 font-extrabold block">Optimal Recency Window</strong>
                <p className="text-gray-500 font-medium leading-relaxed mt-0.5">
                  Customers inactive for 45+ days respond best to discount offers rather than catalog highlights.
                </p>
              </div>
            </div>

            {/* Insight 3 */}
            <div className="bg-emerald-50/20 border border-emerald-100/30 p-3.5 rounded-2xl flex gap-3 text-xs">
              <span className="material-symbols-outlined text-emerald-500 text-[18px] mt-0.5">trending_up</span>
              <div>
                <strong className="text-gray-800 font-extrabold block">Weekend purchasing bias</strong>
                <p className="text-gray-500 font-medium leading-relaxed mt-0.5">
                  Acquisition conversion lift increases by 42% on Saturdays between 11:00 AM and 3:00 PM.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
