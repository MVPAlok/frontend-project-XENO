import React from 'react';

const insights = [
  {
    title: 'High Response Probability',
    description: 'Your inactive customer segment has a 78% chance of responding to a personalized offer.',
    badge: '78% Rate',
    color: 'indigo',
    icon: 'target'
  },
  {
    title: 'WhatsApp vs. Email Lift',
    description: 'WhatsApp campaigns outperform Email by 2.3x for churned, high-value audiences.',
    badge: '2.3x Uplift',
    color: 'emerald',
    icon: 'chat'
  },
  {
    title: '30-Day Velocity Lift',
    description: 'Customers purchasing in the last 30 days show a 42% higher repeat rate when re-targeted.',
    badge: '+42% Lift',
    color: 'pink',
    icon: 'trending_up'
  }
];

export default function AiInsightsPanel() {
  return (
    <div className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow select-none h-full flex flex-col justify-between">
      
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[20px] text-indigo-500" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <h4 className="text-base font-bold text-gray-800 tracking-tight">AI Insights Feed</h4>
        </div>
        <p className="text-xs font-semibold text-gray-400">Contextual data findings generated 5m ago</p>
      </div>

      {/* Insights List */}
      <div className="space-y-4 flex-1 flex flex-col justify-center">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-2xl transition-all duration-300 hover:scale-[1.01] flex gap-4 items-start group"
          >
            {/* Icon Block */}
            <div className={`w-10 h-10 rounded-xl bg-white border border-gray-150 flex items-center justify-center text-indigo-500 shadow-sm shrink-0 group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined text-[20px]">
                {insight.icon}
              </span>
            </div>

            {/* Description Block */}
            <div className="space-y-1">
              <div className="flex justify-between items-center gap-2">
                <h5 className="text-xs font-black text-gray-800">{insight.title}</h5>
                <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full shrink-0">
                  {insight.badge}
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                {insight.description}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
