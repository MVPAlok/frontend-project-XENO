import React, { useState } from 'react';

export default function CampaignsPage({ campaigns }) {
  const [selectedCamp, setSelectedCamp] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Running':
        return 'bg-purple-50 border-purple-100 text-purple-700 animate-pulse';
      case 'Completed':
        return 'bg-emerald-50 border-emerald-100 text-emerald-700';
      case 'Scheduled':
        return 'bg-blue-50 border-blue-100 text-blue-700';
      case 'Draft':
        return 'bg-gray-50 border-gray-150 text-gray-500';
      case 'Failed':
        return 'bg-rose-50 border-rose-100 text-rose-700';
      default:
        return 'bg-gray-50 border-gray-150 text-gray-500';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-950">Campaign Console</h2>
        <p className="text-xs text-gray-400 font-semibold mt-0.5">Deploy, manage, and monitor real-time marketing dispatches across all communication channels.</p>
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => {
          let channelIcon = 'chat';
          let channelColor = 'text-emerald-500';
          if (camp.channel === 'Email') { channelIcon = 'mail'; channelColor = 'text-indigo-500'; }
          else if (camp.channel === 'SMS') { channelIcon = 'sms'; channelColor = 'text-amber-500'; }
          else if (camp.channel === 'RCS') { channelIcon = 'forum'; channelColor = 'text-pink-500'; }

          // Calculate approximate conversion %
          const conversionRate = camp.metrics.sent > 0 
            ? ((camp.metrics.converted / camp.metrics.sent) * 100).toFixed(1) 
            : '0.0';

          return (
            <div
              key={camp.id}
              onClick={() => setSelectedCamp(camp)}
              className="bg-white border border-gray-200/60 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all hover:border-indigo-150 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className={`px-2.5 py-0.5 border text-[10px] font-bold rounded-full ${getStatusBadge(camp.status)}`}>
                    {camp.status}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{camp.id}</span>
                </div>
                
                <h3 className="text-sm font-bold text-gray-950 mb-1 truncate">{camp.name}</h3>
                <p className="text-[11px] text-gray-500 font-semibold mb-4">Audience: {camp.segment}</p>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-2">
                <div className="flex justify-between items-center text-[10px] font-semibold text-gray-500 mb-3">
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className={`material-symbols-outlined text-[16px] ${channelColor}`}>{channelIcon}</span>
                    <span>{camp.channel}</span>
                  </span>
                  <span>{camp.createdDate}</span>
                </div>

                {camp.metrics.sent > 0 ? (
                  <div className="grid grid-cols-3 gap-2 bg-gray-50/50 p-2.5 rounded-xl text-center">
                    <div>
                      <span className="block text-[8px] font-bold text-gray-450 uppercase tracking-wider">Sent</span>
                      <span className="text-xs font-bold text-gray-900">{camp.metrics.sent}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-gray-450 uppercase tracking-wider">Conversion</span>
                      <span className="text-xs font-bold text-emerald-600">{conversionRate}%</span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-gray-450 uppercase tracking-wider">Revenue</span>
                      <span className="text-xs font-bold text-gray-900">₹{camp.metrics.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-2.5 bg-gray-50/50 rounded-xl text-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    {camp.status === 'Draft' ? 'Draft Template' : 'Awaiting Execution'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Campaign Details Drawer */}
      {selectedCamp && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/35 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-300"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-start border-b border-gray-100 pb-5 mb-5">
              <div>
                <span className={`px-2.5 py-0.5 border text-[10px] font-bold rounded-full ${getStatusBadge(selectedCamp.status)}`}>
                  {selectedCamp.status}
                </span>
                <h3 className="text-base font-extrabold text-gray-900 mt-2.5">{selectedCamp.name}</h3>
                <p className="text-xs text-gray-400 font-semibold">Created by {selectedCamp.createdBy} on {selectedCamp.createdDate}</p>
              </div>
              <button 
                onClick={() => setSelectedCamp(null)}
                className="p-1.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-gray-700 transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Campaign Metadata Details */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50/50 border border-gray-100 rounded-2xl p-4 mb-6 text-xs font-semibold">
              <div>
                <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Target Segment</span>
                <span className="text-gray-900 font-bold block mt-0.5">{selectedCamp.segment}</span>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Channel Provider</span>
                <span className="text-gray-900 font-bold block mt-0.5">{selectedCamp.channel}</span>
              </div>
            </div>

            {/* Message Template Display */}
            <div className="mb-6">
              <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Message Payload Preview</span>
              <div className="bg-emerald-50/10 border border-emerald-100/40 rounded-2xl p-4 text-xs font-semibold leading-relaxed whitespace-pre-wrap max-w-md">
                {selectedCamp.message || `Hi Rahul 👋\n\nEnjoy our seasonal promotions! Shop using discount codes at checkout.\n\nOffer details inside.`}
              </div>
            </div>

            {/* Campaign Metrics Section */}
            <div>
              <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-4">Performance Metrics Attribution</span>
              
              {selectedCamp.metrics.sent > 0 ? (
                <div className="space-y-5">
                  {/* Grid KPI Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 p-4 rounded-xl text-center">
                      <span className="block text-[8px] font-bold text-gray-450 uppercase tracking-wider">Sent</span>
                      <span className="text-sm font-bold text-gray-900 mt-1 block">{selectedCamp.metrics.sent}</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl text-center">
                      <span className="block text-[8px] font-bold text-gray-450 uppercase tracking-wider">Delivered</span>
                      <span className="text-sm font-bold text-blue-600 mt-1 block">{selectedCamp.metrics.delivered}</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl text-center">
                      <span className="block text-[8px] font-bold text-gray-450 uppercase tracking-wider">Read/Opened</span>
                      <span className="text-sm font-bold text-amber-600 mt-1 block">{selectedCamp.metrics.read}</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl text-center">
                      <span className="block text-[8px] font-bold text-gray-450 uppercase tracking-wider">Clicked</span>
                      <span className="text-sm font-bold text-pink-600 mt-1 block">{selectedCamp.metrics.clicked}</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl text-center">
                      <span className="block text-[8px] font-bold text-gray-450 uppercase tracking-wider">Converted</span>
                      <span className="text-sm font-bold text-emerald-600 mt-1 block">{selectedCamp.metrics.converted}</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl text-center">
                      <span className="block text-[8px] font-bold text-gray-450 uppercase tracking-wider">Revenue</span>
                      <span className="text-sm font-bold text-emerald-600 mt-1 block">₹{selectedCamp.metrics.revenue.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Funnel Progress Bars */}
                  <div className="space-y-3 pt-3 border-t border-gray-100">
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Attribution Funnel</h5>
                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
                        <span>Delivered / Sent</span>
                        <span>{((selectedCamp.metrics.delivered / selectedCamp.metrics.sent) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{ width: `${(selectedCamp.metrics.delivered / selectedCamp.metrics.sent) * 100}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
                        <span>Read / Delivered</span>
                        <span>{((selectedCamp.metrics.read / selectedCamp.metrics.delivered) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full" style={{ width: `${(selectedCamp.metrics.read / selectedCamp.metrics.delivered) * 100}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
                        <span>Clicked / Read</span>
                        <span>{selectedCamp.metrics.read > 0 ? ((selectedCamp.metrics.clicked / selectedCamp.metrics.read) * 100).toFixed(1) : 0}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-pink-500 h-full" style={{ width: `${selectedCamp.metrics.read > 0 ? (selectedCamp.metrics.clicked / selectedCamp.metrics.read) * 100 : 0}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
                        <span>Converted / Clicked</span>
                        <span>{selectedCamp.metrics.clicked > 0 ? ((selectedCamp.metrics.converted / selectedCamp.metrics.clicked) * 100).toFixed(1) : 0}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full" style={{ width: `${selectedCamp.metrics.clicked > 0 ? (selectedCamp.metrics.converted / selectedCamp.metrics.clicked) * 100 : 0}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-400 text-center py-6">No performance metrics available for draft or scheduled campaigns.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
