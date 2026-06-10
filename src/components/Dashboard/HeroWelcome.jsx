import React from 'react';

export default function HeroWelcome() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date("2026-06-10T19:34:18+05:30").toLocaleDateString('en-US', options);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2 mb-1">
          Good Morning, Sarah <span className="animate-bounce duration-1000">☀️</span>
        </h1>
        <p className="text-gray-500 font-medium text-sm leading-relaxed">
          Here's what your AI marketing campaigns are accomplishing today.
        </p>
      </div>

      <div className="flex items-center gap-2.5 bg-white border border-gray-150 px-4 py-2 rounded-2xl shadow-sm self-start md:self-auto">
        <span className="material-symbols-outlined text-[18px] text-indigo-500" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        <span className="text-xs font-bold text-gray-600 tracking-wide">{formattedDate}</span>
      </div>
    </div>
  );
}
