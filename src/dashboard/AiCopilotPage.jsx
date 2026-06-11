import React, { useState, useEffect } from 'react';

export default function AiCopilotPage({ initialPrompt, onLaunchCampaign }) {
  const [prompt, setPrompt] = useState(initialPrompt || '');
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState(null);
  
  // Custom message editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('We Miss You');
  const [editedMessage, setEditedMessage] = useState(
    "Hi Rahul 👋\n\nWe noticed you haven't shopped with us recently.\n\nUse WELCOME20 and enjoy 20% OFF on your next purchase.\n\nOffer expires in 7 days."
  );

  // Sync initialPrompt changes from other pages (e.g. Recommendations)
  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
      triggerAISimulation(initialPrompt);
    }
  }, [initialPrompt]);

  const triggerAISimulation = (customPrompt) => {
    setThinking(true);
    setResult(null);
    setIsEditing(false);

    // Simulate AI thinking and drafting
    setTimeout(() => {
      setThinking(false);
      
      const isVIP = customPrompt.toLowerCase().includes('vip') || customPrompt.toLowerCase().includes('spend');
      
      if (isVIP) {
        setEditedTitle('Exclusive VIP Privilege');
        setEditedMessage(
          "Hi Rahul 👋\n\nAs one of our top VIP shoppers, we are giving you exclusive early access to our Summer Clearance Sale!\n\nUse VIPSECRET at checkout for an extra 15% OFF everything.\n\nAccess expires in 48 hours."
        );
        setResult({
          audience: '150 Customers',
          reasoning: 'Spent over ₹10,000 in the past month.',
          channel: 'WhatsApp',
          channelReason: '98% delivery rate & 85% read rate within this VIP segment.',
          metrics: {
            reach: 148,
            readRate: '85%',
            clickRate: '57%',
            conversions: 42,
            revenue: '₹75,000'
          }
        });
      } else {
        setEditedTitle('We Miss You');
        setEditedMessage(
          "Hi Rahul 👋\n\nWe noticed you haven't shopped with us recently.\n\nUse WELCOME20 and enjoy 20% OFF on your next purchase.\n\nOffer expires in 7 days."
        );
        setResult({
          audience: '324 Customers',
          reasoning: 'No purchases recorded in the last 90 days.',
          channel: 'WhatsApp',
          channelReason: 'WhatsApp exhibits the highest historical engagement for inactive cohorts.',
          metrics: {
            reach: 290,
            readRate: '70%',
            clickRate: '35%',
            conversions: 30,
            revenue: '₹60,000'
          }
        });
      }
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    triggerAISimulation(prompt);
  };

  const handleLaunch = () => {
    if (!result) return;
    onLaunchCampaign({
      name: `AI: ${editedTitle} Campaign`,
      segment: result.audience.includes('324') ? 'Inactive Customers' : 'VIP Customers',
      channel: result.channel,
      status: 'Running',
      message: editedMessage,
      targetSize: parseInt(result.audience),
      metrics: {
        sent: parseInt(result.audience),
        delivered: result.metrics.reach,
        read: Math.floor(result.metrics.reach * parseFloat(result.metrics.readRate) / 100),
        clicked: Math.floor(result.metrics.reach * parseFloat(result.metrics.readRate) * parseFloat(result.metrics.clickRate) / 10000),
        converted: result.metrics.conversions,
        revenue: parseInt(result.metrics.revenue.replace(/[^0-9]/g, ''))
      }
    });
  };

  const handleSaveDraft = () => {
    if (!result) return;
    onLaunchCampaign({
      name: `AI: ${editedTitle} (Draft)`,
      segment: result.audience.includes('324') ? 'Inactive Customers' : 'VIP Customers',
      channel: result.channel,
      status: 'Draft',
      message: editedMessage,
      targetSize: parseInt(result.audience),
      metrics: { sent: 0, delivered: 0, read: 0, clicked: 0, converted: 0, revenue: 0 }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-950">AI Copilot Workbench</h2>
        <p className="text-xs text-gray-400 font-semibold mt-0.5">Describe your marketing goal in plain text and Xeno AI will model segments, copywrite, and recommend optimal channels.</p>
      </div>

      {/* Input Prompt Panel */}
      <div className="bg-white/80 border border-gray-200/60 rounded-[2rem] p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-indigo-500 animate-pulse text-[18px]">smart_toy</span>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Describe your marketing goal...</label>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Bring back customers who have not purchased in 3 months."
              className="flex-1 px-4 py-3.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold"
            />
            <button
              type="submit"
              disabled={thinking || !prompt.trim()}
              className="px-6 py-3.5 bg-indigo-650 hover:bg-indigo-750 text-white rounded-xl font-bold text-xs shadow-md transition-all hover:scale-[1.01] disabled:opacity-50 flex items-center gap-2"
            >
              {thinking ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                  Analyzing...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">psychology</span>
                  Analyze Goal
                </>
              )}
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-2">Suggestions:</span>
            <button
              type="button"
              onClick={() => {
                setPrompt("Bring back customers who have not purchased in 3 months.");
                triggerAISimulation("Bring back customers who have not purchased in 3 months.");
              }}
              className="px-3 py-1.5 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-650 rounded-xl font-bold text-[10px] border border-indigo-100/50 transition-colors"
            >
              Re-engage 90-day inactive shoppers
            </button>
            <button
              type="button"
              onClick={() => {
                setPrompt("Promote early access sale to VIP customers who spent more than ₹10,000 last month.");
                triggerAISimulation("Promote early access sale to VIP customers who spent more than ₹10,000 last month.");
              }}
              className="px-3 py-1.5 bg-purple-50/50 hover:bg-purple-50 text-purple-650 rounded-xl font-bold text-[10px] border border-purple-100/50 transition-colors"
            >
              VIP high-spender campaign
            </button>
          </div>
        </form>
      </div>

      {/* Loading Skeleton */}
      {thinking && (
        <div className="bg-white/80 border border-gray-200/50 rounded-[2.5rem] p-8 space-y-6 shadow-sm animate-pulse">
          <div className="h-6 bg-gray-200 rounded-md w-1/4" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
          <div className="h-24 bg-gray-100 rounded-2xl w-full" />
          <div className="h-10 bg-gray-200 rounded-xl w-1/3" />
        </div>
      )}

      {/* AI Response Panel */}
      {result && !thinking && (
        <div className="bg-white border border-indigo-100 rounded-[2.5rem] p-8 shadow-xl shadow-indigo-100/30 space-y-8 animate-in slide-in-from-bottom duration-300">
          
          {/* AI Insights Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-100">
            <div>
              <span className="block text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-2">Target Segment Modeling</span>
              <div className="bg-indigo-50/30 border border-indigo-100/50 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-gray-900">Suggested Audience</span>
                  <span className="text-xs font-extrabold text-indigo-650">{result.audience}</span>
                </div>
                <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                  Reasoning: {result.reasoning}
                </p>
              </div>
            </div>

            <div>
              <span className="block text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-2">Omnichannel Recommendation</span>
              <div className="bg-emerald-50/20 border border-emerald-100/50 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-gray-900">Recommended Channel</span>
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-600">
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    {result.channel}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                  Reason: {result.channelReason}
                </p>
              </div>
            </div>
          </div>

          {/* Generated Campaign Editor */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">AI Generated Message Template</span>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-bold text-indigo-650 hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">edit</span>
                {isEditing ? 'Done Editing' : 'Edit Campaign Details'}
              </button>
            </div>

            <div className="border border-gray-200 rounded-3xl overflow-hidden bg-gray-50/50">
              <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-indigo-600 text-[18px]">chat</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="font-bold text-sm bg-gray-50 border border-gray-200 px-3 py-1 rounded-lg focus:outline-none focus:bg-white w-full"
                  />
                ) : (
                  <h4 className="font-bold text-sm text-gray-900">{editedTitle}</h4>
                )}
              </div>
              
              <div className="p-6">
                {isEditing ? (
                  <textarea
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                    rows={5}
                    className="w-full text-xs bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 font-semibold leading-relaxed"
                  />
                ) : (
                  <div className="bg-emerald-50/20 max-w-sm rounded-[1.5rem] p-4 text-xs font-semibold leading-relaxed border border-emerald-100/30 whitespace-pre-line shadow-xs">
                    {editedMessage}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Predicted Metrics */}
          <div>
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">AI Expected Metrics & ROI Prediction</span>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white border border-gray-200 p-4 rounded-2xl">
                <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Reach Est.</span>
                <span className="text-sm font-extrabold text-gray-900 mt-1 block">{result.metrics.reach}</span>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-2xl">
                <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Read Rate</span>
                <span className="text-sm font-extrabold text-indigo-650 mt-1 block">{result.metrics.readRate}</span>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-2xl">
                <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Click Rate</span>
                <span className="text-sm font-extrabold text-pink-650 mt-1 block">{result.metrics.clickRate}</span>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-2xl">
                <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Conversions</span>
                <span className="text-sm font-extrabold text-emerald-600 mt-1 block">{result.metrics.conversions}</span>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-2xl col-span-2 md:col-span-1">
                <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Revenue Est.</span>
                <span className="text-sm font-extrabold text-emerald-650 mt-1 block">{result.metrics.revenue}</span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex justify-between items-center border-t border-gray-100 pt-6">
            <button
              onClick={() => triggerAISimulation(prompt)}
              className="text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              Regenerate Proposal
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleSaveDraft}
                className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-xs transition-all hover:scale-[1.01]"
              >
                Save Draft Template
              </button>
              
              <button
                onClick={handleLaunch}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-755 text-white rounded-xl font-bold text-xs shadow-md transition-all hover:scale-[1.01] flex items-center gap-2 animate-pulse"
              >
                <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                Launch AI Campaign
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
