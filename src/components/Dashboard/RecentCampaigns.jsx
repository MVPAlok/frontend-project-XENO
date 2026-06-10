import React from 'react';

const defaultCampaigns = [
  {
    name: 'Summer Flash Sale',
    audience: '24,500 VIPs',
    channel: 'WhatsApp',
    channelIcon: 'chat',
    channelColor: 'text-emerald-500 bg-emerald-50 border-emerald-100',
    status: 'Running',
    statusStyle: 'bg-green-50 text-green-700 border-green-200',
    ctr: '22.4%',
    revenue: '₹4.8L'
  },
  {
    name: 'Weekend Win Back',
    audience: '1,240 Customers',
    channel: 'SMS',
    channelIcon: 'sms',
    channelColor: 'text-blue-500 bg-blue-50 border-blue-100',
    status: 'Running',
    statusStyle: 'bg-green-50 text-green-700 border-green-200',
    ctr: '18.6%',
    revenue: '₹2.1L'
  },
  {
    name: 'VIP Early Access',
    audience: '5,000 Customers',
    channel: 'Email',
    channelIcon: 'mail',
    channelColor: 'text-indigo-500 bg-indigo-50 border-indigo-100',
    status: 'Scheduled',
    statusStyle: 'bg-purple-50 text-purple-700 border-purple-200',
    ctr: '--',
    revenue: '--'
  },
  {
    name: 'Welcome Series Journey',
    audience: '3,450 New Users',
    channel: 'RCS',
    channelIcon: 'cell_tower',
    channelColor: 'text-pink-500 bg-pink-50 border-pink-100',
    status: 'Completed',
    statusStyle: 'bg-blue-50 text-blue-700 border-blue-200',
    ctr: '28.1%',
    revenue: '₹3.9L'
  }
];

export default function RecentCampaigns({ campaigns }) {
  const displayCampaigns = campaigns || defaultCampaigns;

  return (
    <div className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow select-none overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-base font-bold text-gray-800 tracking-tight">Recent Campaigns</h4>
          <p className="text-xs font-semibold text-gray-400">Real-time status of AI marketing execution</p>
        </div>
        <button className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
          <span>View All</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <th className="pb-3.5 pl-2">Campaign Name</th>
              <th className="pb-3.5">Audience Size</th>
              <th className="pb-3.5">Channel</th>
              <th className="pb-3.5">Status</th>
              <th className="pb-3.5 text-center">CTR</th>
              <th className="pb-3.5 text-right pr-2">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs font-semibold text-gray-600">
            {displayCampaigns.map((camp, idx) => {
              const formattedRev = typeof camp.revenue === 'number'
                ? (camp.revenue === 0 ? '--' : `₹${(camp.revenue / 100000).toFixed(1)}L`)
                : camp.revenue;

              return (
                <tr
                  key={idx}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  {/* Campaign Name */}
                  <td className="py-4 pl-2 font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {camp.name}
                  </td>
                  
                  {/* Audience Size */}
                  <td className="py-4 text-gray-500 font-medium">
                    {camp.audience}
                  </td>
                  
                  {/* Channel Icon Badge */}
                  <td className="py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold ${camp.channelColor}`}>
                      <span className="material-symbols-outlined text-[14px]">
                        {camp.channelIcon}
                      </span>
                      <span>{camp.channel}</span>
                    </div>
                  </td>
                  
                  {/* Status Badge */}
                  <td className="py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold ${camp.statusStyle || 'bg-gray-50 text-gray-750'}`}>
                      {camp.status === 'Running' && (
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      )}
                      <span>{camp.status}</span>
                    </div>
                  </td>
                  
                  {/* Performance CTR */}
                  <td className="py-4 text-center font-bold text-gray-750">
                    {camp.ctr}
                  </td>
                  
                  {/* Revenue Generated */}
                  <td className="py-4 text-right pr-2 font-black text-gray-800">
                    {formattedRev}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}

