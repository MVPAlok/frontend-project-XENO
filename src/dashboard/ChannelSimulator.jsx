import React from 'react';

export default function ChannelSimulator({ 
  metrics, 
  logs, 
  onClearLogs, 
  isPaused, 
  onTogglePause, 
  speed, 
  onToggleSpeed 
}) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-950">Simulated Channel Gateway</h2>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Real-time simulation monitor representing outbound SMS, WhatsApp, and Email APIs.</p>
        </div>
        
        {/* Simulator controls */}
        <div className="flex gap-2">
          <button
            onClick={onToggleSpeed}
            className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 bg-white rounded-xl shadow-xs transition-all font-bold text-xs"
          >
            <span className="material-symbols-outlined text-[16px] text-gray-500">speed</span>
            <span>Speed: {speed}s</span>
          </button>
          
          <button
            onClick={onTogglePause}
            className={`flex items-center gap-1.5 px-4 py-2 border rounded-xl shadow-sm transition-all font-bold text-xs ${
              isPaused 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' 
                : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isPaused ? 'play_arrow' : 'pause'}
            </span>
            <span>{isPaused ? 'Resume Stream' : 'Pause Stream'}</span>
          </button>

          <button
            onClick={onClearLogs}
            className="flex items-center gap-1.5 px-3 py-2 border border-red-200 hover:bg-red-50 text-red-600 bg-white rounded-xl shadow-xs transition-all font-bold text-xs"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
            <span>Clear Logs</span>
          </button>
        </div>
      </div>

      {/* Simulator Outbound Aggregates Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-5">
        <div className="bg-white border border-gray-200 p-5 rounded-[1.5rem] shadow-sm text-center">
          <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-2">Sent</span>
          <span className="text-xl font-extrabold text-gray-900 leading-none">{metrics.sent}</span>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-[1.5rem] shadow-sm text-center">
          <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-2 text-blue-500">Delivered</span>
          <span className="text-xl font-extrabold text-blue-600 leading-none">{metrics.delivered}</span>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-[1.5rem] shadow-sm text-center">
          <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-2 text-rose-500">Failed</span>
          <span className="text-xl font-extrabold text-rose-600 leading-none">{metrics.failed}</span>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-[1.5rem] shadow-sm text-center">
          <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-2 text-amber-500">Read</span>
          <span className="text-xl font-extrabold text-amber-600 leading-none">{metrics.read}</span>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-[1.5rem] shadow-sm text-center">
          <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-2 text-pink-500">Clicked</span>
          <span className="text-xl font-extrabold text-pink-600 leading-none">{metrics.clicked}</span>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-[1.5rem] shadow-sm text-center">
          <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-2 text-emerald-500">Converted</span>
          <span className="text-xl font-extrabold text-emerald-600 leading-none">{metrics.converted}</span>
        </div>
      </div>

      {/* Real-time event stream logs console */}
      <div className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden">
        {/* Terminal Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-800 mb-4 text-xs font-bold text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="ml-2 font-mono text-[10px]">API_OUTBOUND_STREAM_DAEMON</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>LISTENING FOR DISPATCHES</span>
          </div>
        </div>

        {/* Console Log Feed */}
        <div className="font-mono text-xs overflow-y-auto max-h-[380px] space-y-2.5 custom-scrollbar pr-2 min-h-[250px]">
          {logs.length > 0 ? (
            logs.map((log) => {
              let tagColor = 'text-gray-400';
              let badgeColor = 'bg-gray-800 text-gray-400 border-gray-700';

              if (log.type === 'Campaign Sent') { tagColor = 'text-indigo-400'; badgeColor = 'bg-indigo-950/50 text-indigo-400 border-indigo-900'; }
              else if (log.type === 'Delivered') { tagColor = 'text-blue-400'; badgeColor = 'bg-blue-950/50 text-blue-400 border-blue-900'; }
              else if (log.type === 'Read') { tagColor = 'text-amber-400'; badgeColor = 'bg-amber-950/50 text-amber-400 border-amber-900'; }
              else if (log.type === 'Clicked') { tagColor = 'text-pink-400'; badgeColor = 'bg-pink-950/50 text-pink-400 border-pink-900'; }
              else if (log.type === 'Converted') { tagColor = 'text-emerald-400'; badgeColor = 'bg-emerald-950/50 text-emerald-400 border-emerald-900'; }
              else if (log.type === 'Failed') { tagColor = 'text-rose-400'; badgeColor = 'bg-rose-950/50 text-rose-400 border-rose-900'; }

              return (
                <div key={log.id} className="flex justify-between items-start gap-4 py-1.5 border-b border-gray-800/40 hover:bg-gray-850/30 px-2 rounded-lg transition-colors">
                  <div className="flex items-start gap-2.5">
                    <span className="text-gray-600 font-bold">{log.time}</span>
                    <span className={`px-2 py-0.2 rounded border text-[9px] font-bold ${badgeColor}`}>
                      {log.channel}
                    </span>
                    <p className="text-gray-300 font-semibold leading-relaxed">
                      <span className={tagColor}>{log.type}</span> &bull; {log.message}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">{log.campaign}</span>
                </div>
              );
            })
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-gray-500 italic">
              <span className="material-symbols-outlined text-[32px] mb-2 animate-bounce text-gray-700">terminal</span>
              Awaiting campaign launch commands to initialize logs...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
