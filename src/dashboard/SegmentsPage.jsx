import React from 'react';
import { mockSegments } from './mockData';

export default function SegmentsPage({ onNavigateToView, onGenerateCampaign, segments = mockSegments }) {
  
  const handleViewCustomers = (segment) => {
    // Navigate to customers page
    onNavigateToView('customers');
  };

  const handleGenerateCampaign = (segment) => {
    onGenerateCampaign(`Build a campaign for ${segment.name}: "${segment.description}" targeting expected conversion of ${segment.expectedConversion}.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-950">Intelligent Segments Lab</h2>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Define, configure, and generate AI campaigns tailored to distinct shopper behaviors.</p>
        </div>
        <button
          onClick={() => onGenerateCampaign("Identify a brand new customer segment that is likely to buy high-value jackets this winter.")}
          className="flex items-center gap-1.5 px-4 py-2 border border-indigo-200/60 hover:border-indigo-300 text-indigo-650 bg-indigo-50/40 hover:bg-indigo-50 rounded-xl shadow-xs transition-all hover:scale-[1.02] font-bold text-xs"
        >
          <span className="material-symbols-outlined text-[16px] text-indigo-500">add_circle</span>
          Create Custom Segment
        </button>
      </div>

      {/* Segments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {segments.map((segment) => (
          <div
            key={segment.id}
            className="bg-white border border-gray-200/65 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all hover:border-indigo-150 relative group flex flex-col justify-between"
          >
            {/* Colored header line matching segment design */}
            <div 
              className="absolute left-0 top-6 bottom-6 w-1 rounded-r-lg" 
              style={{ backgroundColor: segment.color }}
            />

            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-extrabold text-gray-905">{segment.name}</h3>
                <span className="text-[10px] font-bold bg-gray-50 border border-gray-100 text-gray-500 px-2 py-0.5 rounded-md">
                  {segment.count} customers
                </span>
              </div>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed mb-5">
                {segment.description}
              </p>

              {/* AI Confidence Meter */}
              <div className="mb-5 bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 mb-1.5">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-indigo-500 text-[13px] animate-pulse">smart_toy</span>
                    AI Confidence Score
                  </span>
                  <span className="text-indigo-650">{segment.confidenceScore}%</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-1000" 
                    style={{ width: `${segment.confidenceScore}%` }}
                  />
                </div>
              </div>

              {/* Segment metrics */}
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 mb-6">
                <div>
                  <span className="block text-[9px] font-bold text-gray-405 uppercase tracking-wider mb-0.5">Revenue Opportunity</span>
                  <span className="text-sm font-extrabold text-gray-900">₹{segment.revenuePotential.toLocaleString()}</span>
                </div>
                <div>
                  <span className="block text-[9px] font-bold text-gray-405 uppercase tracking-wider mb-0.5">Expected Conversion</span>
                  <span className="text-sm font-extrabold text-emerald-600">{segment.expectedConversion}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleViewCustomers(segment)}
                className="w-full py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-750 rounded-xl font-bold text-xs transition-all hover:scale-[1.01] flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                View List
              </button>
              
              <button
                onClick={() => handleGenerateCampaign(segment)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white rounded-xl font-bold text-xs shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                Draft Campaign
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
