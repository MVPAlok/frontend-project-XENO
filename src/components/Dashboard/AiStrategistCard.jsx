import React, { useState } from 'react';

export default function AiStrategistCard({ onPrompt }) {
  const [goal, setGoal] = useState("Bring back customers who haven't purchased in 60 days.");
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategy, setStrategy] = useState({
    audience: "1,240 Churned Customers",
    channel: "WhatsApp",
    revenue: "₹2.1L",
    ctr: "18.6%",
    copy: "Hi {{name}},\nWe miss you. ❤️\nEnjoy 20% off this weekend on your next purchase!",
    confidence: 92
  });

  const handleGenerate = () => {
    if (onPrompt) {
      onPrompt();
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // Update values slightly to show active generation
      setStrategy({
        audience: "1,850 Lapsed Buyers",
        channel: "WhatsApp + Email Flow",
        revenue: "₹3.4L",
        ctr: "21.3%",
        copy: "Hi {{name}},\nIt's been too long! We added a fresh ₹250 credit to your wallet.\nUse code BACK250 to redeem. Expiring in 48h!",
        confidence: 95
      });
    }, 1500);
  };

  const handleAction = () => {
    if (onPrompt) {
      onPrompt();
    }
  };

  return (
    <div className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden h-full flex flex-col justify-between select-none">
      
      {/* Glow overlays */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 text-white flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[16px] animate-spin-slow" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <div>
            <h4 className="text-sm font-black text-gray-800 tracking-tight leading-none">AI Growth Strategist</h4>
            <span className="text-[10px] font-semibold text-gray-400">Agent Active • v4.0.2</span>
          </div>
        </div>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
          99.8% Uptime
        </span>
      </div>

      {/* Workspace */}
      <div className="flex-1 flex flex-col gap-4">
        
        {/* User Prompt / Goal */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Your Marketing Goal</label>
          <div className="relative">
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows="2"
              className="w-full p-3.5 pr-14 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all resize-none font-medium leading-relaxed"
              placeholder="Describe your campaign goal..."
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="absolute right-3.5 bottom-3.5 w-8 h-8 bg-gradient-to-tr from-indigo-500 to-pink-500 hover:scale-105 transition-all text-white rounded-xl flex items-center justify-center shadow-md disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>

        {/* AI Output Section */}
        {isGenerating ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 gap-3 text-center">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce duration-300" style={{ animationDelay: '0ms' }} />
              <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-bounce duration-300" style={{ animationDelay: '150ms' }} />
              <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-bounce duration-300" style={{ animationDelay: '300ms' }} />
            </div>
            <p className="text-xs font-semibold text-gray-500">AI Strategist is planning segments, copy & channels...</p>
          </div>
        ) : (
          <div className="flex-1 space-y-4 animate-in fade-in duration-300">
            
            {/* Metadata Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Audience Segment</p>
                <p className="font-extrabold text-gray-800">{strategy.audience}</p>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Best Channel</p>
                <p className="font-extrabold text-gray-800">{strategy.channel}</p>
              </div>
            </div>

            {/* Content Preview */}
            <div className="bg-indigo-50/30 border border-indigo-100/50 p-4 rounded-2xl relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Personalized Content Draft</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Confidence Score: {strategy.confidence}%
                </span>
              </div>
              <pre className="text-xs font-medium text-gray-700 font-sans whitespace-pre-wrap leading-relaxed">
                {strategy.copy}
              </pre>
            </div>

            {/* Quick stats block */}
            <div className="flex items-center justify-between text-xs px-1 text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-emerald-500">trending_up</span>
                <span>Expected Rev: <strong className="text-gray-700">{strategy.revenue}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-indigo-500">touch_app</span>
                <span>CTR Forecast: <strong className="text-gray-700">{strategy.ctr}</strong></span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button onClick={handleAction} className="creative-btn flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md">
                <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                Launch Now
              </button>
              <button onClick={handleAction} className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 py-3 rounded-xl font-bold text-xs text-gray-600 transition-colors flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">tune</span>
                Refine Copy
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
