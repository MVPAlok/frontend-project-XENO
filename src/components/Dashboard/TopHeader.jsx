import React, { useState } from 'react';

export default function TopHeader() {
  const [workspace, setWorkspace] = useState("Main Workspace");
  const [isWSDropdownOpen, setIsWSDropdownOpen] = useState(false);
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  const workspaces = ["Main Workspace", "Growth Team", "Enterprise Hub"];
  const dateRanges = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Quarter", "Custom Range"];

  return (
    <header className="h-20 shrink-0 border-b border-gray-200/50 bg-white/70 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-20 select-none">
      
      {/* Left: Workspace Selector & Search */}
      <div className="flex items-center gap-6">
        
        {/* Workspace Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setIsWSDropdownOpen(!isWSDropdownOpen);
              setIsDateDropdownOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100/80 transition-colors text-sm font-bold text-gray-800"
          >
            <span className="material-symbols-outlined text-[20px] text-indigo-500">grid_view</span>
            <span>{workspace}</span>
            <span className="material-symbols-outlined text-[16px] text-gray-400">keyboard_arrow_down</span>
          </button>

          {isWSDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200/60 rounded-2xl shadow-xl p-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
              {workspaces.map((ws) => (
                <button
                  key={ws}
                  onClick={() => {
                    setWorkspace(ws);
                    setIsWSDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-xl font-medium transition-colors ${
                    ws === workspace
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {ws}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Vertical Separator */}
        <div className="w-[1px] h-5 bg-gray-200" />

        {/* Global Search Bar */}
        <div className="relative flex items-center w-80">
          <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-gray-400">search</span>
          <input
            type="text"
            placeholder="Search campaigns, users, analytics..."
            className="w-full pl-10 pr-12 py-2 text-sm bg-gray-100/60 border border-transparent rounded-xl focus:bg-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all placeholder-gray-400"
          />
          <kbd className="absolute right-3.5 px-1.5 py-0.5 text-[10px] font-bold text-gray-400 bg-white border border-gray-200/80 rounded-md shadow-sm pointer-events-none">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Date Range Picker, Notifications, User Profile */}
      <div className="flex items-center gap-4">
        
        {/* Date Range Picker */}
        <div className="relative">
          <button
            onClick={() => {
              setIsDateDropdownOpen(!isDateDropdownOpen);
              setIsWSDropdownOpen(false);
            }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-gray-400">calendar_today</span>
            <span>{dateRange}</span>
            <span className="material-symbols-outlined text-[16px] text-gray-400">keyboard_arrow_down</span>
          </button>

          {isDateDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200/60 rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {dateRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setDateRange(range);
                    setIsDateDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-xl font-medium transition-colors ${
                    range === dateRange
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all relative shadow-sm">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-full ring-2 ring-white animate-pulse" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md relative group shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
              alt="Sarah Jenkins Profile"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-800 leading-tight">Sarah Jenkins</span>
            <span className="text-[11px] font-semibold text-gray-400 tracking-wide">Growth Director</span>
          </div>
        </div>

      </div>

    </header>
  );
}
