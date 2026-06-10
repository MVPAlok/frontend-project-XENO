import React from 'react';

const channels = [
  {
    name: 'WhatsApp Business',
    icon: 'chat',
    revenue: '₹5.4L',
    ctr: '22.4%',
    conversions: '9.2%',
    openRate: '98.5%',
    share: 45, // percentage for visual bar width
    gradient: 'from-emerald-400 to-teal-500'
  },
  {
    name: 'Email Journeys',
    icon: 'mail',
    revenue: '₹3.8L',
    ctr: '14.5%',
    conversions: '5.4%',
    openRate: '42.1%',
    share: 32,
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    name: 'SMS Notifications',
    icon: 'sms',
    revenue: '₹2.1L',
    ctr: '18.6%',
    conversions: '6.8%',
    openRate: '90.2%',
    share: 17,
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    name: 'RCS Rich Messaging',
    icon: 'cell_tower',
    revenue: '₹1.1L',
    ctr: '28.1%',
    conversions: '11.2%',
    openRate: '95.4%',
    share: 9,
    gradient: 'from-pink-500 to-rose-500'
  }
];

export default function ChannelPerformance() {
  return (
    <div className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow select-none h-full flex flex-col justify-between">
      
      {/* Header */}
      <div className="mb-5">
        <h4 className="text-base font-bold text-gray-800 tracking-tight">Channel Performance</h4>
        <p className="text-xs font-semibold text-gray-400">Campaign effectiveness across delivery gateways</p>
      </div>

      {/* List of channels */}
      <div className="space-y-4 flex-1 flex flex-col justify-center">
        {channels.map((chan, i) => (
          <div key={i} className="space-y-1.5 group">
            
            {/* Header info */}
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-gray-400 group-hover:text-gray-600 transition-colors">
                  {chan.icon}
                </span>
                <span className="font-bold text-gray-700">{chan.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">CTR: <strong className="text-gray-700">{chan.ctr}</strong></span>
                <span className="font-black text-gray-800">{chan.revenue}</span>
              </div>
            </div>

            {/* Gradient Bar Track */}
            <div className="w-full h-3.5 bg-gray-100 rounded-full overflow-hidden relative shadow-inner">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${chan.gradient} transition-all duration-1000 ease-out origin-left`}
                style={{ width: `${chan.share * 2}%`, maxWidth: '100%' }} // scale slightly for visual visibility
              />
            </div>

            {/* Sub-metrics */}
            <div className="flex justify-between items-center text-[10px] text-gray-400 font-semibold px-0.5">
              <span>Open Rate: <strong className="text-gray-500">{chan.openRate}</strong></span>
              <span>Conversions: <strong className="text-gray-500">{chan.conversions}</strong></span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
