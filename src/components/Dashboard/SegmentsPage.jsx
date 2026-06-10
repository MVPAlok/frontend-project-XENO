import React, { useState } from 'react';

export default function SegmentsPage({ segments = [], setSegments, onPromptCampaign }) {
  const [activeSubTab, setActiveSubTab] = useState('saved'); // 'saved', 'visual', 'ai'
  const [segmentName, setSegmentName] = useState('');
  
  // Visual Builder State
  const [spendCriteria, setSpendCriteria] = useState('any');
  const [orderCriteria, setOrderCriteria] = useState('any');
  const [purchaseRecency, setPurchaseRecency] = useState('any');
  const [cityCriteria, setCityCriteria] = useState('any');
  const [categoryCriteria, setCategoryCriteria] = useState('any');
  const [engagementCriteria, setEngagementCriteria] = useState('any');

  // AI Builder State
  const [aiPrompt, setAiPrompt] = useState('Find customers who spent above ₹5000 and have not purchased in 60 days.');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState(null);

  // Trigger visual segment compilation
  const handleCreateVisualSegment = (e) => {
    e.preventDefault();
    if (!segmentName.trim()) {
      alert("Please enter a segment name");
      return;
    }

    const rules = [];
    if (spendCriteria !== 'any') rules.push(`Total Spend: ${spendCriteria}`);
    if (orderCriteria !== 'any') rules.push(`Order Count: ${orderCriteria}`);
    if (purchaseRecency !== 'any') rules.push(`Recency: ${purchaseRecency}`);
    if (cityCriteria !== 'any') rules.push(`City: ${cityCriteria}`);
    if (categoryCriteria !== 'any') rules.push(`Product: ${categoryCriteria}`);
    if (engagementCriteria !== 'any') rules.push(`Engagement: ${engagementCriteria}`);

    const newSegment = {
      id: `SEG-00${segments.length + 1}`,
      name: segmentName,
      type: "Dynamic Segment",
      users: `${Math.floor(Math.random() * 2000) + 300} Users`,
      description: rules.join(', ') || "No specific filters applied.",
      conversionLift: `+${(Math.random() * 20 + 5).toFixed(1)}%`,
      revenueAttributed: `₹${(Math.random() * 5 + 1).toFixed(1)}L`
    };

    setSegments([newSegment, ...segments]);
    setSegmentName('');
    setActiveSubTab('saved');
  };

  // Trigger AI Dry-run simulation
  const handleAiDryRun = () => {
    setIsAiLoading(true);
    setAiOutput(null);
    setTimeout(() => {
      setIsAiLoading(false);
      // Simulate analysis output matching the prompt
      setAiOutput({
        audienceSize: "1,580 matching customers",
        rules: "LTV > ₹5000 AND lastPurchaseDate < TODAY - 60 days",
        predictedConversion: "18.4%",
        revenueOpportunity: "₹2.8L",
        confidence: "94%"
      });
    }, 1500);
  };

  // Quick segment saving from AI dry-run
  const saveAiSegment = () => {
    if (!aiOutput) return;
    const name = `AI: Dormant ₹5k+ Users`;
    const newSegment = {
      id: `SEG-00${segments.length + 1}`,
      name: name,
      type: "AI Segment",
      users: aiOutput.audienceSize.split(' ')[0] + " Users",
      description: aiOutput.rules,
      conversionLift: `+${aiOutput.predictedConversion}`,
      revenueAttributed: aiOutput.revenueOpportunity
    };
    setSegments([newSegment, ...segments]);
    setAiOutput(null);
    setActiveSubTab('saved');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight mb-2">Segments Lab</h2>
          <p className="text-gray-500 text-sm">Build dynamic smart lists from customer demographics and purchase history.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSubTab('saved')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeSubTab === 'saved' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Saved Segments
          </button>
          <button
            onClick={() => setActiveSubTab('visual')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeSubTab === 'visual' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            Visual Builder
          </button>
          <button
            onClick={() => setActiveSubTab('ai')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeSubTab === 'ai' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] animate-pulse">auto_awesome</span>
            AI Builder
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      {activeSubTab === 'saved' && (
        <div className="space-y-8">
          
          {/* Segment cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {segments.map((seg, idx) => (
              <div
                key={seg.id}
                className="bg-white border border-gray-200/60 rounded-3xl p-6 hover:border-indigo-500/40 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      seg.type === 'AI Segment' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                      seg.type === 'Dynamic Segment' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                      'bg-indigo-50 text-indigo-600 border border-indigo-100'
                    }`}>
                      {seg.type}
                    </span>
                    <span className="text-xs font-bold text-gray-400">{seg.users}</span>
                  </div>
                  <h4 className="font-extrabold text-gray-800 text-base mb-1.5 group-hover:text-indigo-600 transition-colors">
                    {seg.name}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-6">
                    {seg.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Performance sub-stats */}
                  <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-4 text-center">
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Rev Attributed</span>
                      <strong className="text-xs font-black text-gray-700">{seg.revenueAttributed}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Conversion Lift</span>
                      <strong className="text-xs font-black text-emerald-500">{seg.conversionLift}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => onPromptCampaign(seg.name)}
                    className="w-full bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200 transition-colors py-2.5 rounded-xl text-xs font-bold text-gray-600 flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">campaign</span>
                    Prompt Campaign
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Saved Segments Performance Table */}
          <div className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-800 tracking-tight mb-1">Segment Analytics Dashboard</h3>
            <p className="text-xs font-semibold text-gray-400 mb-6">Attribution logs, historical CTR metrics, and growth indices.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-150 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <th className="pb-3.5 pl-2">Segment Name</th>
                    <th className="pb-3.5">Compile Type</th>
                    <th className="pb-3.5">Est. Audience</th>
                    <th className="pb-3.5 text-center">Avg open Rate</th>
                    <th className="pb-3.5 text-center">Avg click Rate</th>
                    <th className="pb-3.5 text-right pr-2">Rev Contribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-semibold text-gray-650">
                  <tr className="hover:bg-gray-50/50">
                    <td className="py-4 pl-2 font-bold text-gray-800">High-LTV Dormant</td>
                    <td className="py-4 text-gray-400 font-medium">Smart Segment</td>
                    <td className="py-4 text-gray-600">4,360</td>
                    <td className="py-4 text-center text-gray-700">76.4%</td>
                    <td className="py-4 text-center text-gray-700">22.1%</td>
                    <td className="py-4 text-right pr-2 font-black text-gray-800">₹8,40,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="py-4 pl-2 font-bold text-gray-800">First-Time Buyers</td>
                    <td className="py-4 text-gray-400 font-medium">Smart Segment</td>
                    <td className="py-4 text-gray-600">3,737</td>
                    <td className="py-4 text-center text-gray-700">62.8%</td>
                    <td className="py-4 text-center text-gray-700">14.5%</td>
                    <td className="py-4 text-right pr-2 font-black text-gray-800">₹4,20,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="py-4 pl-2 font-bold text-gray-800">Churn Risk List</td>
                    <td className="py-4 text-gray-400 font-medium">Smart Segment</td>
                    <td className="py-4 text-gray-600">1,245</td>
                    <td className="py-4 text-center text-gray-700">88.5%</td>
                    <td className="py-4 text-center text-gray-700">18.6%</td>
                    <td className="py-4 text-right pr-2 font-black text-gray-800">₹2,10,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'visual' && (
        <div className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm max-w-3xl">
          <h3 className="text-base font-bold text-gray-800 tracking-tight mb-1">Visual Logic Query Builder</h3>
          <p className="text-xs font-semibold text-gray-400 mb-6">Select attribute rules to compile a dynamic target list.</p>

          <form onSubmit={handleCreateVisualSegment} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Segment Name Input */}
              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Segment Name</label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai High Spenders - Inactive"
                  value={segmentName}
                  onChange={(e) => setSegmentName(e.target.value)}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none"
                />
              </div>

              {/* Total Spend */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Spend (LTV)</label>
                <select
                  value={spendCriteria}
                  onChange={(e) => setSpendCriteria(e.target.value)}
                  className="p-3 bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 rounded-xl"
                >
                  <option value="any">Any Spend</option>
                  <option value="Above ₹25,000">Above ₹25,000</option>
                  <option value="Above ₹50,000">Above ₹50,000</option>
                  <option value="Under ₹5,000">Under ₹5,000</option>
                </select>
              </div>

              {/* Order Count */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Count</label>
                <select
                  value={orderCriteria}
                  onChange={(e) => setOrderCriteria(e.target.value)}
                  className="p-3 bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 rounded-xl"
                >
                  <option value="any">Any Count</option>
                  <option value="1 Order">Exactly 1 Order</option>
                  <option value="Over 5 Orders">Over 5 Orders</option>
                  <option value="Over 15 Orders">Over 15 Orders</option>
                </select>
              </div>

              {/* Last Purchase Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Purchase Date</label>
                <select
                  value={purchaseRecency}
                  onChange={(e) => setPurchaseRecency(e.target.value)}
                  className="p-3 bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 rounded-xl"
                >
                  <option value="any">Any Date</option>
                  <option value="Within 14 Days">Within 14 Days</option>
                  <option value="Inactive > 45 Days">Inactive &gt; 45 Days</option>
                  <option value="Inactive > 90 Days">Inactive &gt; 90 Days</option>
                </select>
              </div>

              {/* City */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">City</label>
                <select
                  value={cityCriteria}
                  onChange={(e) => setCityCriteria(e.target.value)}
                  className="p-3 bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 rounded-xl"
                >
                  <option value="any">Any City</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>

              {/* Product Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product Category Purchase</label>
                <select
                  value={categoryCriteria}
                  onChange={(e) => setCategoryCriteria(e.target.value)}
                  className="p-3 bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 rounded-xl"
                >
                  <option value="any">Any Category</option>
                  <option value="Apparel">Apparel & Fashion</option>
                  <option value="Electronics">Consumer Tech</option>
                  <option value="Home decor">Home & Living</option>
                </select>
              </div>

              {/* Campaign Engagement */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Campaign Engagement</label>
                <select
                  value={engagementCriteria}
                  onChange={(e) => setEngagementCriteria(e.target.value)}
                  className="p-3 bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 rounded-xl"
                >
                  <option value="any">Any Response</option>
                  <option value="Opened > 3 campaigns">Opened &gt; 3 emails</option>
                  <option value="Clicked but not purchased">Clicked but not purchased</option>
                  <option value="No reply to WhatsApp">No reply to WhatsApp</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-md"
              >
                <span className="material-symbols-outlined text-[16px]">save</span>
                Save Segment
              </button>
              <button
                type="button"
                onClick={() => setActiveSubTab('saved')}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold px-6 py-3 rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {activeSubTab === 'ai' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Prompt input */}
          <div className="lg:col-span-7 bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 text-white flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[14px] animate-spin-slow">auto_awesome</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800 tracking-tight leading-none">AI Segment Compiler</h3>
                  <span className="text-[10px] font-semibold text-gray-400">Describe your list criteria in plain English.</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">NLP Filter Prompt</label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows="4"
                  className="w-full p-4 text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-indigo-500 focus:outline-none transition-all resize-none leading-relaxed"
                  placeholder="Ask Xeno to identify customers..."
                />
              </div>

              {/* Template prompts */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Example Prompts:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setAiPrompt("Find high-spenders based in Mumbai who haven't ordered since March.")}
                    className="bg-gray-50 hover:bg-indigo-50 text-[10px] text-gray-500 hover:text-indigo-600 px-2.5 py-1.5 rounded-xl border border-gray-150 transition-all font-semibold"
                  >
                    "Mumbai High Spenders Dormant"
                  </button>
                  <button
                    onClick={() => setAiPrompt("Select customers who purchased electronics twice but never answered a WhatsApp code.")}
                    className="bg-gray-50 hover:bg-indigo-50 text-[10px] text-gray-500 hover:text-indigo-600 px-2.5 py-1.5 rounded-xl border border-gray-150 transition-all font-semibold"
                  >
                    "Electronics repeat WhatsApp churns"
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex gap-2">
              <button
                onClick={handleAiDryRun}
                disabled={isAiLoading}
                className="bg-gradient-to-tr from-indigo-500 to-pink-500 hover:scale-[1.02] text-white font-bold px-6 py-3 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[16px]">{isAiLoading ? 'sync' : 'database_search'}</span>
                {isAiLoading ? 'Analyzing Database...' : 'Dry-Run Segmentation'}
              </button>
            </div>
          </div>

          {/* Analysis Report */}
          <div className="lg:col-span-5 bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
            {isAiLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-16">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce duration-300" style={{ animationDelay: '0ms' }} />
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-bounce duration-300" style={{ animationDelay: '150ms' }} />
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-bounce duration-300" style={{ animationDelay: '300ms' }} />
                </div>
                <p className="text-xs font-semibold text-gray-500">Querying SQL indexes, calculating converting scores...</p>
              </div>
            ) : aiOutput ? (
              <div className="space-y-5 flex-1 flex flex-col justify-between animate-in fade-in duration-300">
                <div>
                  <h4 className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 inline-block mb-4">
                    Dry Run Completed Successfully
                  </h4>

                  {/* Metrgrid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                      <span className="text-[9px] font-bold text-gray-400 block mb-0.5">Audience Size</span>
                      <strong className="text-gray-800 text-sm font-black">{aiOutput.audienceSize}</strong>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                      <span className="text-[9px] font-bold text-gray-400 block mb-0.5">Conv. Probability</span>
                      <strong className="text-emerald-500 text-sm font-black">{aiOutput.predictedConversion}</strong>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 col-span-2">
                      <span className="text-[9px] font-bold text-gray-400 block mb-0.5">Estimated Revenue Opportunity</span>
                      <strong className="text-indigo-600 text-base font-black">{aiOutput.revenueOpportunity}</strong>
                    </div>
                  </div>

                  {/* Logic code */}
                  <div className="mt-4 bg-gray-900 text-gray-300 font-mono text-[10px] p-3.5 rounded-xl leading-relaxed whitespace-pre-wrap">
                    <span className="text-indigo-400 font-bold block mb-1">Generated Rules:</span>
                    {aiOutput.rules}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={saveAiSegment}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                    Save Segment List
                  </button>
                  <button
                    onClick={() => setAiOutput(null)}
                    className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 font-bold px-3 py-2.5 rounded-xl text-xs transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-16 text-gray-400">
                <span className="material-symbols-outlined text-[40px] mb-2">bubble_chart</span>
                <p className="text-xs font-semibold">Dry-run outputs will display here.</p>
                <p className="text-[10px] text-gray-400 max-w-xs mt-1 leading-normal">
                  Describe a rule criteria in the prompt editor and hit segmentation to calculate estimated conversions.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
