import React, { useState } from 'react';
import { mockSegments } from './mockData';

const segmentDetails = {
  'seg-1': {
    rule: 'No purchases in 90 days',
    why: 'Lifecycle purchase interval analysis indicates high churn risk if not re-engaged within 95 days.',
    campaign: '90-Day Win-Back Promo',
    channel: 'WhatsApp',
    source: 'AI Generated'
  },
  'seg-2': {
    rule: 'Spent more than ₹10,000',
    why: 'High-value cohort representing 60%+ of overall store sales. Promos drive heavy checkout volumes.',
    campaign: 'Summer Splash VIP Clearance',
    channel: 'WhatsApp',
    source: 'AI Generated'
  },
  'seg-3': {
    rule: 'Purchased within 14 days',
    why: 'Highly engaged recently. Open to up-sells and new product arrivals with low resistance.',
    campaign: 'New Arrivals Re-Engagement',
    channel: 'WhatsApp',
    source: 'AI Generated'
  },
  'seg-4': {
    rule: 'Ordered more than 8 times',
    why: 'Loyal customer base. Periodic loyalty reward campaigns maintain their high lifecycle frequency.',
    campaign: 'Festival Bonanza Launch',
    channel: 'SMS',
    source: 'AI Generated'
  },
  'seg-5': {
    rule: 'Voucher code applied on past order',
    why: 'Price-sensitive customers. Require coupon-centric copy to trigger checkout clicks.',
    campaign: 'Weekend Surprise Coupon',
    channel: 'RCS',
    source: 'AI Generated'
  },
  'seg-6': {
    rule: 'Purchasing drop rate > 45%',
    why: 'Calculated frequency drop indicates early attrition behavior. Retain via re-engagement email.',
    campaign: 'Churn Prevention Campaign',
    channel: 'Email',
    source: 'AI Generated'
  }
};

const segmentCRMDetails = {
  'seg-1': {
    members: ['Rahul Sharma', 'Saisha Verma', 'Dev Shah', 'Riya Pillai'],
    overlap: 'VIP Customers (52 overlap)',
    trend: '+12 New Members / -18 Lost'
  },
  'seg-2': {
    members: ['Priya Gupta', 'Ananya Reddy', 'Siddharth Iyer', 'Neha Nair'],
    overlap: 'Recent Buyers (68 overlap)',
    trend: '+24 New Members / -4 Lost'
  },
  'seg-3': {
    members: ['Aarav Mehta', 'Ishaan Kumar', 'Kabir Shah', 'Diya Verma'],
    overlap: 'Frequent Shoppers (124 overlap)',
    trend: '+45 New Members / -2 Lost'
  },
  'seg-4': {
    members: ['Karan Singh', 'Arjun Kapoor', 'Kiara Joshi', 'Vihaan Rao'],
    overlap: 'Recent Buyers (92 overlap)',
    trend: '+18 New Members / -6 Lost'
  },
  'seg-5': {
    members: ['Aditya Verma', 'Vivaan Patel', 'Ananya Mehra', 'Pooja Reddy'],
    overlap: 'At Risk Customers (110 overlap)',
    trend: '+32 New Members / -15 Lost'
  },
  'seg-6': {
    members: ['Dev Kumar', 'Rahul Joshi', 'Neha Verma', 'Saisha Nair'],
    overlap: 'Coupon Sensitive (42 overlap)',
    trend: '+8 New Members / -28 Lost'
  }
};

export default function SegmentsPage({ onNavigateToView, onGenerateCampaign, segments = mockSegments }) {
  const [hoveredCardId, setHoveredCardId] = useState(null);
  
  const handleViewCustomers = (segment) => {
    onNavigateToView('customers');
  };

  const handleGenerateCampaign = (segment) => {
    const details = segmentDetails[segment.id] || {
      rule: 'Custom filter applied',
      why: 'Created manually by marketing manager.',
      campaign: 'Custom Re-Engagement',
      channel: 'Email',
      source: 'Created Manually'
    };
    onGenerateCampaign(`Build a campaign for ${segment.name}: "${segment.description}" targeting expected conversion of ${segment.expectedConversion} using ${details.channel}.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div className="text-left">
          <h2 className="text-xl font-bold text-gray-950">Intelligent Segments Lab</h2>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Define, configure, and generate AI campaigns tailored to distinct shopper behaviors.</p>
        </div>
        <button
          onClick={() => onGenerateCampaign("Identify a brand new customer segment that is likely to buy high-value jackets this winter.")}
          className="flex items-center gap-1.5 px-4 py-2 border border-indigo-200/60 hover:border-indigo-300 text-indigo-650 bg-indigo-50/40 hover:bg-indigo-50 rounded-xl shadow-xs transition-all hover:scale-[1.02] font-bold text-xs"
        >
          <span className="material-symbols-outlined text-[16px] text-indigo-500">add_circle</span>
          Create Custom Segment
        </button>
      </div>

      {/* Segments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {segments.map((segment) => {
          const details = segmentDetails[segment.id] || {
            rule: 'Custom filter rules',
            why: 'Defined manually by marketing staff.',
            campaign: 'Custom Loyalty Promo',
            channel: 'Email',
            source: 'Created Manually'
          };
          const crmDetails = segmentCRMDetails[segment.id] || {
            members: ['Guest User', 'Anonymous'],
            overlap: 'None detected',
            trend: '+0 New / -0 Lost'
          };

          const isHovered = hoveredCardId === segment.id;

          return (
            <div
              key={segment.id}
              onMouseEnter={() => setHoveredCardId(segment.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className="bg-white border border-gray-250/65 rounded-[2.5rem] p-6 shadow-sm transition-all duration-300 relative group flex flex-col justify-between"
              style={{
                transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: isHovered 
                  ? `0 20px 40px ${segment.color}15, 0 0 0 1px ${segment.color}`
                  : '0 4px 20px rgba(0,0,0,0.015)',
                borderColor: isHovered ? segment.color : '#e5e7eb'
              }}
            >
              {/* Colored header line matching segment design */}
              <div 
                className="absolute left-0 top-6 bottom-6 w-1 rounded-r-lg transition-transform duration-350" 
                style={{ 
                  backgroundColor: segment.color,
                  transform: isHovered ? 'scaleY(1.08)' : 'scaleY(1)'
                }}
              />

              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="text-left">
                    <h3 className="text-sm font-extrabold text-gray-950">{segment.name}</h3>
                    <span className={`inline-block mt-1 px-2.5 py-0.5 text-[9px] font-black rounded-md border ${
                      details.source === 'AI Generated' 
                        ? 'bg-indigo-50 border-indigo-100/50 text-indigo-700' 
                        : 'bg-amber-50 border-amber-100/50 text-amber-700'
                    }`}>
                      {details.source}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-gray-50 border border-gray-150 text-gray-550 px-2 py-0.5 rounded-md">
                    {segment.count} customers
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-450 font-semibold leading-relaxed text-left">
                  {segment.description}
                </p>

                {/* Preview Members List */}
                <div className="bg-gray-50/50 border border-gray-150 p-3 rounded-2xl text-[10px] text-gray-600 text-left">
                  <span className="text-gray-400 font-bold block uppercase tracking-wider mb-1">Preview Members</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {crmDetails.members.map(m => (
                      <span key={m} className="bg-white border border-gray-150 px-2 py-0.5 rounded-lg font-bold text-gray-700">{m}</span>
                    ))}
                  </div>
                </div>

                {/* Segment Relationships & Trends */}
                <div className="space-y-2 border-t border-gray-100 pt-3 text-left">
                  <div className="flex justify-between items-center text-[10px] font-semibold text-gray-500">
                    <span className="text-gray-400 font-bold uppercase tracking-wider">Overlap Cohorts</span>
                    <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">join_inner</span>
                      {crmDetails.overlap}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-semibold text-gray-500">
                    <span className="text-gray-400 font-bold uppercase tracking-wider">30D Trend</span>
                    <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {crmDetails.trend}
                    </span>
                  </div>
                </div>

                {/* Logic Rule */}
                <div className="bg-gray-50 border border-gray-150 p-2.5 rounded-xl text-[10px] font-semibold text-gray-600 text-left">
                  <span className="text-gray-400 font-bold block uppercase tracking-wider mb-0.5">Segment Logic Rule</span>
                  <code className="text-indigo-600 font-mono text-[9px]">{details.rule}</code>
                </div>

                {/* AI Explanation */}
                <div className="border-l-2 border-indigo-200 pl-3 py-0.5 text-left">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Why AI Created This Segment</span>
                  <p className="text-[10px] text-gray-500 font-semibold leading-relaxed italic mt-0.5">
                    "{details.why}"
                  </p>
                </div>

                {/* AI Confidence Meter */}
                <div className="bg-indigo-50/20 p-3 rounded-2xl border border-indigo-100/50 text-left">
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 mb-1.5">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-indigo-500 text-[13px] animate-pulse">smart_toy</span>
                      AI Confidence Score
                    </span>
                    <span className="text-indigo-650">{segment.confidenceScore}%</span>
                  </div>
                  <div className="w-full bg-gray-250 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 transition-all duration-1000" 
                      style={{ width: `${segment.confidenceScore}%` }}
                    />
                  </div>
                </div>

                {/* Segment metrics & Recommendations */}
                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-650 text-left">
                  <div>
                    <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Revenue Opportunity</span>
                    <span className="text-sm font-extrabold text-gray-950">₹{segment.revenuePotential.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Expected Conversion</span>
                    <span className="text-sm font-extrabold text-emerald-600">{segment.expectedConversion}</span>
                  </div>
                  <div className="col-span-2 space-y-2 pt-2 border-t border-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Recommended Campaign</span>
                      <span className="text-[10px] font-extrabold text-indigo-950 truncate max-w-[140px]">{details.campaign}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Recommended Channel</span>
                      <span className="text-[10px] font-extrabold text-emerald-600 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">chat</span>
                        {details.channel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <button
                  onClick={() => handleViewCustomers(segment)}
                  className="w-full py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-750 rounded-xl font-bold text-xs transition-all hover:scale-[1.01] flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  View List
                </button>
                
                <button
                  onClick={() => handleGenerateCampaign(segment)}
                  className="w-full py-2.5 bg-indigo-650 hover:bg-indigo-750 text-white rounded-xl font-bold text-xs shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                  Draft Campaign
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
