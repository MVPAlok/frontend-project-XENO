import React, { useState } from 'react';

export default function CampaignsPage({ campaigns = [], onCreateCampaignClick }) {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredCampaigns = statusFilter === 'All' 
    ? campaigns 
    : campaigns.filter(c => c.status === statusFilter);

  // Status colors utility
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Running':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Scheduled':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Draft':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'Failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-650';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight mb-2">Campaign Intelligence & Execution</h2>
          <p className="text-gray-500 text-sm">Monitor delivery rates, click engagement, and direct revenue attribution loops.</p>
        </div>
        <button
          onClick={onCreateCampaignClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors self-start shadow-md"
        >
          <span className="material-symbols-outlined text-[16px]">add_circle</span>
          Create Campaign
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-gray-200 gap-6 text-xs font-bold">
        {['All', 'Running', 'Completed', 'Scheduled', 'Draft', 'Failed'].map(tab => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={`pb-3.5 relative transition-all ${
              statusFilter === tab ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab} Campaigns
            {statusFilter === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Campaigns Table Card */}
      <div className="bg-white border border-gray-200/60 rounded-3xl shadow-sm overflow-hidden">
        {filteredCampaigns.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-[48px] text-gray-300 mb-3">campaign</span>
            <h4 className="text-base font-bold text-gray-700">No Campaigns Found</h4>
            <p className="text-xs text-gray-400 max-w-xs leading-relaxed mt-1">
              There are no campaigns matching the selected status filters. Build a new campaign using the AI Strategist!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 font-bold text-gray-400 uppercase tracking-widest">
                  <th className="py-4 px-6">Campaign Name</th>
                  <th className="py-4 px-6">Audience</th>
                  <th className="py-4 px-6">Channel</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Sent</th>
                  <th className="py-4 px-6 text-center">Opened</th>
                  <th className="py-4 px-6 text-center">Clicked</th>
                  <th className="py-4 px-6 text-center">Purchases</th>
                  <th className="py-4 px-6 text-right pr-6">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-semibold text-gray-650">
                {filteredCampaigns.map(camp => (
                  <tr
                    key={camp.id}
                    onClick={() => setSelectedCampaign(camp)}
                    className="hover:bg-gray-50/50 cursor-pointer transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <span className="font-extrabold text-gray-850 block">{camp.name}</span>
                        <span className="text-[10px] text-gray-400 block font-medium">{camp.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-500">
                      {camp.audience}
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold ${camp.channelColor}`}>
                        <span className="material-symbols-outlined text-[14px]">
                          {camp.channelIcon}
                        </span>
                        <span>{camp.channel}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold ${getStatusBadgeClass(camp.status)}`}>
                        {camp.status === 'Running' && (
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        )}
                        <span>{camp.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center text-gray-500 font-medium">
                      {camp.sent ? camp.sent.toLocaleString('en-IN') : '--'}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-500 font-medium">
                      {camp.opened ? camp.opened.toLocaleString('en-IN') : '--'}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-500 font-medium">
                      {camp.clicked ? camp.clicked.toLocaleString('en-IN') : '--'}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-500 font-medium">
                      {camp.purchases ? camp.purchases.toLocaleString('en-IN') : '--'}
                    </td>
                    <td className="py-4 px-6 text-right pr-6 font-black text-gray-800">
                      {camp.revenue ? `₹${(camp.revenue / 100000).toFixed(1)}L` : '--'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Campaign Details Drawer */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/35 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedCampaign(null)}
          />
          
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-350">
              
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-150 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${selectedCampaign.channelColor}`}>
                    <span className="material-symbols-outlined text-[20px]">{selectedCampaign.channelIcon}</span>
                  </div>
                  <div>
                    <h3 className="font-black text-gray-800 text-sm max-w-[220px] truncate">{selectedCampaign.name}</h3>
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Campaign Performance Center</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="w-8 h-8 rounded-full hover:bg-gray-200/50 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Meta details */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-3 text-xs">
                  <div className="flex justify-between border-b border-gray-150 pb-2">
                    <span className="text-gray-400 font-bold">Campaign Status</span>
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${getStatusBadgeClass(selectedCampaign.status)}`}>
                      {selectedCampaign.status}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-150 pb-2">
                    <span className="text-gray-400 font-bold">Target Audience</span>
                    <span className="text-gray-800 font-bold">{selectedCampaign.audience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-bold">Expected Channel</span>
                    <span className="text-gray-800 font-bold">{selectedCampaign.channel}</span>
                  </div>
                </div>

                {/* Performance numbers */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl">
                    <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Attributed Revenue</span>
                    <strong className="text-base font-black text-indigo-600">
                      ₹{selectedCampaign.revenue ? selectedCampaign.revenue.toLocaleString('en-IN') : '0'}
                    </strong>
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl">
                    <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Total Purchases</span>
                    <strong className="text-base font-black text-gray-800">{selectedCampaign.purchases || '0'}</strong>
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl">
                    <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Click CTR</span>
                    <strong className="text-base font-black text-gray-800">{selectedCampaign.ctr || '0%'}</strong>
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl">
                    <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Conversion Lift</span>
                    <strong className="text-base font-black text-emerald-500">{selectedCampaign.conversionRate || '0%'}</strong>
                  </div>
                </div>

                {/* Conversion Funnel */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-150 pb-1">Delivery Funnel Breakdown</h4>
                  
                  {selectedCampaign.sent > 0 ? (
                    <div className="space-y-3 font-semibold text-xs">
                      {/* Sent */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Sent</span>
                          <span className="text-gray-800">{selectedCampaign.sent.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full rounded-full w-full" />
                        </div>
                      </div>

                      {/* Delivered */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Delivered</span>
                          <span className="text-gray-800">
                            {selectedCampaign.delivered.toLocaleString()} (
                            {((selectedCampaign.delivered / selectedCampaign.sent) * 100).toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-indigo-400 h-full rounded-full" 
                            style={{ width: `${(selectedCampaign.delivered / selectedCampaign.sent) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Opened */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Opened</span>
                          <span className="text-gray-800">
                            {selectedCampaign.opened.toLocaleString()} (
                            {selectedCampaign.delivered > 0 ? ((selectedCampaign.opened / selectedCampaign.delivered) * 100).toFixed(1) : 0}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-purple-400 h-full rounded-full" 
                            style={{ width: `${selectedCampaign.delivered > 0 ? (selectedCampaign.opened / selectedCampaign.delivered) * 100 : 0}%` }}
                          />
                        </div>
                      </div>

                      {/* Clicked */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Clicked</span>
                          <span className="text-gray-800">
                            {selectedCampaign.clicked.toLocaleString()} (
                            {selectedCampaign.opened > 0 ? ((selectedCampaign.clicked / selectedCampaign.opened) * 100).toFixed(1) : 0}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-pink-400 h-full rounded-full" 
                            style={{ width: `${selectedCampaign.opened > 0 ? (selectedCampaign.clicked / selectedCampaign.opened) * 100 : 0}%` }}
                          />
                        </div>
                      </div>

                      {/* Purchased */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Purchased</span>
                          <span className="text-gray-800">
                            {selectedCampaign.purchases.toLocaleString()} (
                            {selectedCampaign.clicked > 0 ? ((selectedCampaign.purchases / selectedCampaign.clicked) * 100).toFixed(1) : 0}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-400 h-full rounded-full" 
                            style={{ width: `${selectedCampaign.clicked > 0 ? (selectedCampaign.purchases / selectedCampaign.clicked) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">No delivery metrics recorded yet.</p>
                  )}
                </div>

                {/* Timeline logs */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-150 pb-1">Dispatch Logs Timeline</h4>
                  {selectedCampaign.timeline && selectedCampaign.timeline.length > 0 ? (
                    <div className="space-y-3 pl-3 border-l border-gray-200">
                      {selectedCampaign.timeline.map((t, idx) => (
                        <div key={idx} className="relative text-xs">
                          {/* Dot indicator */}
                          <div className="absolute -left-[16px] top-1 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-white" />
                          <div>
                            <span className="font-extrabold text-gray-800 block">{t.label}</span>
                            <span className="text-[10px] text-gray-400 block font-semibold">{t.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">No timeline entries.</p>
                  )}
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
