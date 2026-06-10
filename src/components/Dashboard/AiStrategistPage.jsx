import React, { useState } from 'react';

export default function AiStrategistPage({ onLaunchCampaign, activeSegmentPrompt = '' }) {
  const [goal, setGoal] = useState(
    activeSegmentPrompt 
      ? `Increase repeat purchases from ${activeSegmentPrompt} customers.` 
      : "Increase repeat purchases from dormant customers."
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeChannelTab, setActiveChannelTab] = useState('whatsapp'); // 'whatsapp', 'sms', 'email', 'rcs'
  const [hasGenerated, setHasGenerated] = useState(true);

  // Strategy Object
  const [strategy, setStrategy] = useState({
    segment: "1,240 Churned Customers",
    channel: "WhatsApp",
    reasoning: "Dormant users with previous high-spends show a 2.3x higher conversion rate on instant messaging (WhatsApp) compared to email templates. The 20% discount acts as a trigger to offset the 60-day purchase gap.",
    forecast: {
      revenue: "₹2.1L",
      ctr: "18.6%",
      conversion: "4.8%",
      confidence: 92
    },
    copies: {
      whatsapp: "Hi {{name}},\nWe miss you! ❤️ It has been over 60 days since your last purchase.\nEnjoy an exclusive 20% OFF this weekend on our fresh collections!\nUse code: WELCOMEBACK20 at checkout.",
      sms: "Hi {{name}}, we miss you! Enjoy 20% OFF this weekend at Xeno. Use code WELCOMEBACK20 on checkout. Link: xn.ai/back",
      email: "Subject: We've missed you, {{name}}! Here is 20% off...\n\nHi {{name}},\n\nIt's been too long since we last saw you shopping. To welcome you back, we've loaded an exclusive 20% discount code into your account.\n\nCode: WELCOMEBACK20\n\nShop the new arrivals now!\n\nBest,\nSarah Jenkins\nGrowth Director, Xeno AI",
      rcs: "✨ WE MISS YOU, {{name}}! ✨\nEnjoy 20% off this weekend! Tap below to open your catalog and redeem code WELCOMEBACK20 immediately.\n[ Button: View Catalog ]  [ Button: Redeem 20% ]"
    }
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setHasGenerated(false);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      // Alter copy and rates based on target goal to make it feel extremely responsive
      const isDormant = goal.toLowerCase().includes('dormant') || goal.toLowerCase().includes('inactive');
      setStrategy({
        segment: isDormant ? "1,850 Dormant VIPs" : "4,200 High-LTV Active Users",
        channel: isDormant ? "WhatsApp + Email" : "WhatsApp Business",
        reasoning: isDormant 
          ? "Targeting lapsed accounts with high average order values. Combining immediate mobile pushes (WhatsApp) with follow-up emails ensures maximum visibility."
          : "Active buyers are best engaged through instant channels with conversational prompts. Recommending a product drop alert.",
        forecast: {
          revenue: isDormant ? "₹3.8L" : "₹7.2L",
          ctr: isDormant ? "19.8%" : "24.6%",
          conversion: isDormant ? "5.1%" : "6.8%",
          confidence: isDormant ? 94 : 96
        },
        copies: {
          whatsapp: isDormant 
            ? "Hi {{name}},\nWe added a fresh ₹250 wallet credit to your account! 🎁\nValid for the next 48h. Use code BACK250 on your cart."
            : "Hey {{name}}! Your early access to the Summer Collection is officially LIVE. ☀️\nOrder now before stocks run out!",
          sms: isDormant 
            ? "Hey {{name}}, ₹250 cash added to your wallet! Code BACK250 valid for 48h. Tap: xn.ai/wallet"
            : "Hey {{name}}, Summer Collection early access is LIVE! Order now at Xeno: xn.ai/summer",
          email: isDormant 
            ? "Subject: ₹250 Wallet Credit Activated! 🎁\n\nHi {{name}},\n\nWe want to make your return special. We have credited ₹250 to your Xeno wallet. Use code BACK250 to redeem before it expires in 48 hours."
            : "Subject: Early Access: Summer Collection is LIVE! ☀️\n\nHi {{name}},\n\nAs one of our top buyers, you get exclusive first access to shop our Summer drop 24 hours before anyone else.",
          rcs: isDormant 
            ? "🎁 ₹250 Wallet Credit Activated! 🎁\nHi {{name}}, we added credit. Valid for 48h. Code: BACK250\n[ Button: Shop Wallet ]"
            : "☀️ SUMMER COLLECTION EARLY ACCESS ☀️\nHi {{name}}, shop the summer drop now!\n[ Button: Shop Early Access ]"
        }
      });
    }, 1800);
  };

  const handleLaunch = () => {
    // Package campaign details and pass up to parent state
    const cleanChannel = activeChannelTab.toUpperCase();
    const newCamp = {
      name: `${goal.slice(0, 20)}... AI Gen`,
      audience: strategy.segment,
      channel: cleanChannel,
      channelIcon: activeChannelTab === 'whatsapp' ? 'chat' : activeChannelTab === 'email' ? 'mail' : activeChannelTab === 'sms' ? 'sms' : 'cell_tower',
      channelColor: activeChannelTab === 'whatsapp' ? 'text-emerald-500 bg-emerald-50 border-emerald-100' : activeChannelTab === 'email' ? 'text-indigo-500 bg-indigo-50 border-indigo-100' : activeChannelTab === 'sms' ? 'text-blue-500 bg-blue-50 border-blue-100' : 'text-pink-500 bg-pink-50 border-pink-100',
      status: "Running",
      statusStyle: "bg-green-50 text-green-700 border-green-200",
      sent: parseInt(strategy.segment.replace(/,/g, '')),
      delivered: 0,
      opened: 0,
      clicked: 0,
      purchases: 0,
      revenue: 0,
      ctr: strategy.forecast.ctr,
      conversionRate: strategy.forecast.conversion,
      timeline: [
        { label: "AI campaign created & approved", time: "Just now" },
        { label: `Dispatch initialized via ${cleanChannel} gateway`, time: "Just now" }
      ]
    };
    onLaunchCampaign(newCamp);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 select-none">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-gray-800 tracking-tight mb-2">AI Campaign Planner</h2>
        <p className="text-gray-500 text-sm">Formulate marketing objectives, review predicted campaign metrics, and dispatch multi-channel copy.</p>
      </div>

      {/* Input panel */}
      <div className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-40 pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 text-white flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[16px] animate-spin-slow">auto_awesome</span>
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-800 tracking-tight leading-none">Strategist Agent Input</h3>
            <span className="text-[10px] font-semibold text-gray-400">Specify your business goal for AI target calculation.</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows="2"
            className="w-full p-4 pr-16 text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all resize-none leading-relaxed"
            placeholder="Type your marketing goal here... (e.g. Reactivate dormant buyers from Delhi who spent over ₹5000)"
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Quick Goals */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mr-1">Suggested Goals:</span>
              <button
                onClick={() => setGoal("Increase repeat purchases from dormant customers.")}
                className="bg-gray-50 hover:bg-indigo-50 text-[10px] text-gray-500 hover:text-indigo-600 px-3 py-1.5 rounded-xl border border-gray-150 transition-all font-semibold"
              >
                "Win back dormant users"
              </button>
              <button
                onClick={() => setGoal("Promote Summer Apparel Drop to high-value active customers.")}
                className="bg-gray-50 hover:bg-indigo-50 text-[10px] text-gray-500 hover:text-indigo-600 px-3 py-1.5 rounded-xl border border-gray-150 transition-all font-semibold"
              >
                "Promote Summer Drop"
              </button>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-gradient-to-tr from-indigo-500 to-pink-500 hover:scale-[1.02] text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[16px]">{isGenerating ? 'sync animate-spin' : 'auto_awesome'}</span>
              {isGenerating ? 'Analyzing Objective...' : 'Generate AI Campaign'}
            </button>
          </div>
        </div>
      </div>

      {/* Generating skeleton loader state */}
      {isGenerating && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            {/* Skeleton Card 1 */}
            <div className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm space-y-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-12 bg-gray-100 rounded-2xl"></div>
                <div className="h-12 bg-gray-100 rounded-2xl"></div>
              </div>
            </div>
            {/* Skeleton Card 2 */}
            <div className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm space-y-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-16 bg-gray-100 rounded-2xl"></div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm h-64 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-full bg-gray-50 rounded-2xl"></div>
            </div>
          </div>
        </div>
      )}

      {/* Strategy Workbench Output */}
      {hasGenerated && !isGenerating && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-in fade-in duration-300">
          
          {/* Left panel: Recommendations & Forecasts */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Target and Channel Recommendation */}
            <div className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Target Recommendations</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Recommended Segment</span>
                  <strong className="text-gray-800 text-sm font-black">{strategy.segment}</strong>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Primary Channel</span>
                  <strong className="text-gray-800 text-sm font-black">{strategy.channel}</strong>
                </div>
              </div>

              {/* Reasoning */}
              <div className="bg-indigo-50/20 border border-indigo-100/50 p-4 rounded-2xl">
                <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">AI Recommendation Reasoning</span>
                <p className="text-xs font-semibold text-gray-600 leading-relaxed font-sans">{strategy.reasoning}</p>
              </div>
            </div>

            {/* Campaign Forecast Panel */}
            <div className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm space-y-4 flex-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Campaign Yield Forecast</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Revenue Forecast */}
                <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 text-center">
                  <span className="text-[9px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Revenue Forecast</span>
                  <strong className="text-2xl font-black text-indigo-600">{strategy.forecast.revenue}</strong>
                </div>
                {/* CTR Forecast */}
                <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 text-center">
                  <span className="text-[9px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">CTR Forecast</span>
                  <strong className="text-2xl font-black text-gray-800">{strategy.forecast.ctr}</strong>
                </div>
                {/* Conversion Rate */}
                <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 text-center">
                  <span className="text-[9px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Expected Conv. Rate</span>
                  <strong className="text-2xl font-black text-emerald-500">{strategy.forecast.conversion}</strong>
                </div>
                {/* Confidence */}
                <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 text-center">
                  <span className="text-[9px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Confidence Score</span>
                  <strong className="text-2xl font-black text-purple-600">{strategy.forecast.confidence}%</strong>
                </div>
              </div>
            </div>

          </div>

          {/* Right panel: Content workbench */}
          <div className="lg:col-span-5 bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Personalized Copy Editor</h3>
              
              {/* Copy Channel tabs */}
              <div className="flex border border-gray-200 rounded-2xl p-1 bg-gray-50/50">
                <button
                  onClick={() => setActiveChannelTab('whatsapp')}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${
                    activeChannelTab === 'whatsapp' ? 'bg-white text-emerald-600 shadow-sm border border-gray-200/40' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => setActiveChannelTab('sms')}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${
                    activeChannelTab === 'sms' ? 'bg-white text-blue-600 shadow-sm border border-gray-200/40' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  SMS
                </button>
                <button
                  onClick={() => setActiveChannelTab('email')}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${
                    activeChannelTab === 'email' ? 'bg-white text-indigo-600 shadow-sm border border-gray-200/40' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Email
                </button>
                <button
                  onClick={() => setActiveChannelTab('rcs')}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${
                    activeChannelTab === 'rcs' ? 'bg-white text-pink-600 shadow-sm border border-gray-200/40' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  RCS
                </button>
              </div>

              {/* Text Preview / Edit block */}
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Message body template</label>
                <textarea
                  value={strategy.copies[activeChannelTab]}
                  onChange={(e) => {
                    const val = e.target.value;
                    setStrategy(prev => ({
                      ...prev,
                      copies: {
                        ...prev.copies,
                        [activeChannelTab]: val
                      }
                    }));
                  }}
                  rows="7"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold text-gray-700 focus:bg-white focus:outline-none focus:border-indigo-500 transition-all font-mono leading-relaxed"
                />
              </div>

              {/* Visual simulated mockup device */}
              <div className="bg-gray-50/50 border border-gray-150 rounded-2xl p-4 text-xs">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Simulated Live Preview</span>
                
                {activeChannelTab === 'whatsapp' && (
                  <div className="max-w-[280px] mx-auto bg-[#efeae2] border border-[#dad6d0] rounded-2xl p-3 shadow-inner font-sans relative">
                    <div className="bg-white rounded-2xl p-3 text-gray-800 text-[11px] leading-relaxed relative shadow-sm max-w-[90%] border border-emerald-100">
                      <p className="whitespace-pre-wrap font-medium">{strategy.copies.whatsapp.replace('{{name}}', 'Aarav')}</p>
                      <span className="absolute bottom-1 right-2 text-[8px] text-gray-400 font-bold block text-right mt-1">10:04 AM ✓✓</span>
                    </div>
                  </div>
                )}

                {activeChannelTab === 'sms' && (
                  <div className="max-w-[280px] mx-auto bg-gray-200 border border-gray-300 rounded-2xl p-3 shadow-inner font-sans">
                    <div className="bg-indigo-600 text-white rounded-2xl p-3 text-[11px] leading-relaxed shadow-sm max-w-[85%] ml-auto font-medium">
                      <p className="whitespace-pre-wrap">{strategy.copies.sms.replace('{{name}}', 'Aarav')}</p>
                    </div>
                  </div>
                )}

                {activeChannelTab === 'email' && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm font-sans space-y-2 text-gray-700 text-[11px] max-w-sm mx-auto">
                    <div className="border-b border-gray-100 pb-2">
                      <strong className="text-gray-400 font-bold">Subject:</strong> <span className="font-bold text-gray-800">{strategy.copies.email.split('\n')[0].replace('Subject: ', '').replace('{{name}}', 'Aarav')}</span>
                    </div>
                    <pre className="whitespace-pre-wrap font-sans font-medium text-gray-600 leading-relaxed">
                      {strategy.copies.email.substring(strategy.copies.email.indexOf('\n\n') + 2).replace('{{name}}', 'Aarav')}
                    </pre>
                  </div>
                )}

                {activeChannelTab === 'rcs' && (
                  <div className="max-w-[280px] mx-auto bg-white border border-gray-200 rounded-2xl p-4 shadow-md font-sans space-y-3">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-3.5 text-[11px] text-gray-700 font-medium leading-relaxed">
                      <span className="material-symbols-outlined text-indigo-500 block text-lg mb-1">auto_awesome</span>
                      <p className="whitespace-pre-wrap">{strategy.copies.rcs.split('\n')[0].replace('{{name}}', 'Aarav')}</p>
                      <p className="text-gray-500 mt-1">{strategy.copies.rcs.split('\n')[1].replace('{{name}}', 'Aarav')}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold">
                      <button className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-indigo-600 py-2 rounded-xl">View Catalog</button>
                      <button className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-indigo-600 py-2 rounded-xl">Redeem 20%</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Launch buttons */}
            <div className="flex gap-2 pt-4 border-t border-gray-100 mt-6">
              <button
                onClick={handleLaunch}
                className="creative-btn flex-1 py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                Approve & Launch Campaign
              </button>
              <button
                onClick={handleGenerate}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold px-3 py-3 rounded-xl text-xs transition-colors"
                title="Regenerate strategy parameters"
              >
                Regenerate
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
