import React from 'react';

export default function AiInsightBanner({ onCreateCampaign }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-white/70 backdrop-blur-md p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group mb-8">
      {/* Decorative blurred gradient orb */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-300 rounded-full blur-[80px] opacity-20 group-hover:opacity-35 transition-opacity duration-700" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-indigo-300 to-violet-400 rounded-full blur-[80px] opacity-15 group-hover:opacity-25 transition-opacity duration-700" />

      {/* Main content grid */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        
        {/* Recommendation details */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100/50 rounded-full text-xs font-bold text-indigo-600 mb-4 shadow-sm">
            <span className="material-symbols-outlined text-[16px] animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <span>AI STRATEGIST RECOMMENDATION</span>
          </div>

          <h2 className="text-2xl font-black text-gray-900 leading-tight mb-2 tracking-tight">
            <span className="text-rose-500 font-extrabold">1,240 customers</span> are at risk of churn.
          </h2>

          <p className="text-gray-600 font-medium text-base max-w-2xl leading-relaxed mb-6">
            Recommended Action: Launch a win-back campaign with a 20% personalized offer via WhatsApp to capture immediate weekend attention.
          </p>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 bg-white border border-gray-150 px-5 py-3 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Potential Revenue</p>
                <p className="text-lg font-black text-gray-800">₹2.1L</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-gray-150 px-5 py-3 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <span className="material-symbols-outlined text-[20px]">ads_click</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Predicted CTR</p>
                <p className="text-lg font-black text-gray-800">18.6%</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-gray-150 px-5 py-3 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Confidence Score</p>
                <p className="text-lg font-black text-gray-800">92%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="shrink-0">
          <button
            onClick={onCreateCampaign}
            className="creative-btn w-full lg:w-auto px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 hover:scale-[1.03] transition-all shadow-lg text-white"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            Create Campaign
          </button>
        </div>

      </div>
    </div>
  );
}
