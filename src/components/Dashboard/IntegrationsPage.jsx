import React from 'react';

export default function IntegrationsPage({ integrations = [], onToggleIntegration }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 select-none">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-gray-800 tracking-tight mb-2">Connected Integrations</h2>
        <p className="text-gray-500 text-sm">Configure third-party gateways, communication providers, and credentials.</p>
      </div>

      {/* Grid of integrations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {integrations.map(item => {
          const isConnected = item.status === 'Connected';
          return (
            <div
              key={item.id}
              className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div>
                {/* Logo and Status Toggle */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.color}`}>
                    <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                  </div>
                  
                  {/* Toggle Switch */}
                  <button
                    onClick={() => onToggleIntegration(item.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      isConnected ? 'bg-indigo-650' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isConnected ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Integration Details */}
                <h4 className="font-extrabold text-gray-800 text-base mb-1">{item.name}</h4>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wide mb-4">{item.provider}</p>
                
                {/* Health & latency logs */}
                <div className="space-y-2.5 font-semibold text-xs border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Connection Health</span>
                    <span className={isConnected ? 'text-emerald-500 font-bold' : 'text-gray-400'}>
                      {isConnected ? `${item.health}% Score` : 'Offline'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">API Status</span>
                    <span className={isConnected ? 'text-gray-700 font-bold' : 'text-gray-400'}>
                      {isConnected ? `${item.apiStatus} (${item.ping})` : '--'}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Sync</span>
                    <span className="text-gray-750">{isConnected ? item.lastSync : '--'}</span>
                  </div>
                </div>
              </div>

              {/* Configure button */}
              <div className="pt-6 border-t border-gray-50 mt-6">
                <button
                  disabled={!isConnected}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 disabled:opacity-40 disabled:hover:bg-gray-50 transition-colors py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">settings</span>
                  Configure Gateway
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
