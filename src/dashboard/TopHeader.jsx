import React, { useState, useEffect } from 'react';

export default function TopHeader({ user, onSearch, onOpenCopilot }) {
  const [selectedBrand, setSelectedBrand] = useState('Acme Retail Inc.');
  const [showDropdown, setShowDropdown] = useState(false);
  const brands = ['Acme Retail Inc.', 'Zephyr Apparel', 'Apex Cosmetics', 'Core Nutrition'];

  // Typing effect for search placeholder
  const placeholders = [
    "Ask anything about customers...",
    "Search for churn risk segments...",
    "Find VIP expansion opportunities...",
    "Analyze last week's revenue..."
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-[5.5rem] shrink-0 bg-white/70 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-20 select-none relative">
      {/* Faint bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-indigo-200/30 via-purple-300/40 to-indigo-100/35" />

      {/* Brand & Store Selector */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all font-bold text-xs text-gray-750 shadow-xs premium-hover-lift"
          >
            <span className="material-symbols-outlined text-[16px] text-indigo-500">storefront</span>
            <span>{selectedBrand}</span>
            <span className="material-symbols-outlined text-[16px] text-gray-400">keyboard_arrow_down</span>
          </button>
          
          {showDropdown && (
            <div className="absolute top-11 left-0 w-56 border border-gray-200/80 rounded-xl bg-white shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-250">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => {
                    setSelectedBrand(brand);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-indigo-50/50 hover:text-indigo-650 transition-colors ${
                    selectedBrand === brand ? 'text-indigo-600 bg-indigo-50/20' : 'text-gray-650'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Search Bar - Taller, Larger, Inner Shadow & Sparkle Icon */}
      <div className="flex-1 max-w-lg mx-8 group">
        <div className="relative flex items-center transition-all duration-300">
          {/* Animated glow behind the search bar that appears on group focus */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl blur opacity-0 group-focus-within:opacity-40 transition-opacity duration-300 pointer-events-none" />
          
          <span className="material-symbols-outlined absolute left-4 text-[18px] text-indigo-500 sparkle-pulse-icon pointer-events-none z-10">auto_awesome</span>
          <input
            type="text"
            onChange={(e) => onSearch && onSearch(e.target.value)}
            placeholder={placeholders[placeholderIndex]}
            className="relative z-10 w-full pl-11 pr-4 py-3 text-xs bg-gray-50/80 border border-gray-200 rounded-xl shadow-inner-soft focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/50 focus:outline-none transition-all duration-500 placeholder:text-gray-400 font-semibold"
          />
        </div>
      </div>

      {/* Utility Panel */}
      <div className="flex items-center gap-4">
        {/* AI Assistant shortcut - Premium gradient button */}
        <button
          onClick={onOpenCopilot}
          className="premium-gradient-btn flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-[0_4px_14px_0_rgba(124,58,237,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_0_rgba(124,58,237,0.4)] active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px] text-cyan-300 sparkle-pulse-icon">auto_awesome</span>
          <span>Ask AI Copilot</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl transition-all shadow-xs text-gray-500">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200/50">
          <img
            alt={user?.firstName || 'User'}
            className="w-8 h-8 rounded-full border border-gray-150 object-cover"
            src={user?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstName || 'Admin'}`}
          />
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-gray-800">{user?.firstName ? `${user.firstName} ${user.lastName}` : 'Sarah Jenkins'}</p>
            <span className="text-[9px] text-indigo-650 font-bold bg-indigo-50 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
              {user?.role || 'Administrator'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
