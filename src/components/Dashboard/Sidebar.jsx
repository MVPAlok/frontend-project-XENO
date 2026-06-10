import React from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'customers', label: 'Customers', icon: 'group' },
  { id: 'segments', label: 'Segments', icon: 'bubble_chart' },
  { id: 'strategist', label: 'AI Strategist', icon: 'auto_awesome' },
  { id: 'campaigns', label: 'Campaigns', icon: 'campaign' },
  { id: 'analytics', label: 'Analytics', icon: 'bar_chart' },
  { id: 'simulator', label: 'Channel Simulator', icon: 'hub' },
  { id: 'integrations', label: 'Integrations', icon: 'extension' },
  { id: 'settings', label: 'Settings', icon: 'settings' }
];

export default function Sidebar({ activeTab, setActiveTab, onBack }) {
  const logoSrc = "data:image/png;base64,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";

  return (
    <aside className="w-[260px] border-r border-gray-200/50 bg-white/70 backdrop-blur-md flex flex-col h-screen sticky top-0 shrink-0 z-30 select-none">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100/60">
        <img alt="Xeno AI Logo" className="h-9 w-9 object-contain drop-shadow-md" src={logoSrc} />
        <span className="text-xl font-extrabold text-gray-900 tracking-tight">Xeno AI</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative group overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-pink-500/5 text-[#4f46e5] shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50/80'
              }`}
            >
              {/* Active vertical accent bar */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-r" />
              )}
              
              <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:scale-110 ${
                isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'
              }`} style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Back to Landing Page / User Signout Link */}
      <div className="p-4 border-t border-gray-100/60">
        <button
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 transition-all font-semibold text-sm shadow-sm hover:scale-[1.02]"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Exit Dashboard
        </button>
      </div>
    </aside>
  );
}
