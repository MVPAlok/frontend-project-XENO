import React, { useState } from 'react';
import { dashboardKPIs, mockSegments } from './mockData';

export default function DashboardOverview({ 
  onNavigateToView, 
  onGenerateCampaign, 
  kpis = dashboardKPIs,
  simMetrics = { sent: 1089, delivered: 1046, failed: 43, read: 892, clicked: 182, converted: 88 } 
}) {
  const [activeSegment, setActiveSegment] = useState(mockSegments[0]);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Recommendation action handlers
  const handleGenerateWinback = () => {
    onGenerateCampaign("Bring back 324 inactive customers who haven't purchased in over 90 days with a win-back offer.");
  };

  const handleGenerateVIP = () => {
    onGenerateCampaign("Draft an early access campaign for 150 VIP customers who spent more than ₹10,000 last month.");
  };

  // Sparkline SVG path helpers
  const sparklinePaths = {
    'Total Customers': 'M 0,25 Q 15,5 30,20 T 60,10',
    'Total Revenue': 'M 0,25 Q 10,5 20,20 T 40,5 T 60,15',
    'Active Campaigns': 'M 0,30 L 12,25 L 24,15 L 36,20 L 48,10 L 60,0',
    'Conversion Rate': 'M 0,15 Q 15,30 30,10 T 60,5',
    'Avg Customer CLV': 'M 0,20 Q 15,5 30,25 T 60,10',
    'Campaign Attributed Rev': 'M 0,30 Q 15,20 30,10 T 60,0'
  };  // KPI Details for consistency mapping
  const kpiDetails = {
    'Total Customers': {
      icon: 'group',
      glowClass: 'card-top-glow-indigo',
      iconBg: 'bg-indigo-50 border-indigo-100/60 text-indigo-600',
      insight: '+45 new signups today',
      confidence: '98% AI Match',
      actionLabel: 'View list',
      actionView: 'customers'
    },
    'Total Revenue': {
      icon: 'payments',
      glowClass: 'card-top-glow-purple',
      iconBg: 'bg-purple-50 border-purple-100/60 text-purple-600',
      insight: '₹8,240 from campaigns today',
      confidence: '99% Accuracy',
      actionLabel: 'Audit logs',
      actionView: 'analytics'
    },
    'Active Campaigns': {
      icon: 'campaign',
      glowClass: 'card-top-glow-emerald',
      iconBg: 'bg-emerald-50 border-emerald-100/60 text-emerald-600',
      insight: '3 ending within 24h',
      confidence: '94% Health',
      actionLabel: 'Manage',
      actionView: 'campaigns'
    },
    'Conversion Rate': {
      icon: 'trending_up',
      glowClass: 'card-top-glow-cyan',
      iconBg: 'bg-cyan-50 border-cyan-100/60 text-cyan-600',
      insight: '+1.2% over weekly avg',
      confidence: '96% Confirmed',
      actionLabel: 'Funnel view',
      actionView: 'copilot'
    },
    'Avg Customer CLV': {
      icon: 'stars',
      glowClass: 'card-top-glow-rose',
      iconBg: 'bg-rose-50 border-rose-100/60 text-rose-600',
      insight: 'Up ₹430 this month',
      confidence: '92% Projected',
      actionLabel: 'Predict LTV',
      actionView: 'segments'
    },
    'Campaign Attributed Rev': {
      icon: 'insights',
      glowClass: 'card-top-glow-indigo',
      iconBg: 'bg-indigo-50 border-indigo-100/60 text-indigo-650',
      insight: '46% of total company rev',
      confidence: '95% Attributed',
      actionLabel: 'ROI report',
      actionView: 'analytics'
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12 select-none">
      
      {/* 1. AI MISSION CONTROL HERO PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Cognitive recommendation - AI Intelligence Card */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-2xl border border-gray-200/60 px-8 py-8 rounded-[2rem] shadow-xl relative overflow-hidden flex flex-col justify-between group/hero transition-all duration-500 hover:shadow-2xl">
          {/* Soft ambient background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 via-white/40 to-purple-50/10 pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-400/[0.04] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-400/[0.03] rounded-full blur-3xl pointer-events-none" />

          {/* Embedded Real Image with Faded-to-White Gradient Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none select-none z-0">
            <img 
              src="/assets/ai_hero_illustration.png" 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.30] group-hover/hero:opacity-[0.38] transition-opacity duration-700"
            />
            {/* White fade-out gradient from left — softer to reveal more image */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
            {/* Bottom white fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/20" />
          </div>
          
          <div className="relative z-10">
            {/* Status badge */}
            <div className="flex items-center gap-2.5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.18em]">
                AI Cognitive Core  •  Recommendation Active
              </span>
            </div>

            {/* Headline – refined sizing hierarchy */}
            <h1 className="text-2xl md:text-[2.1rem] font-bold text-gray-900 tracking-[-0.02em] leading-[1.18] mb-4">
              Recoverable revenue spike{' '}
              <br className="hidden md:block" />
              detected in <span className="hero-gradient-text font-bold">Inactive Cohorts</span>
            </h1>
            
            {/* Description */}
            <p className="text-[13px] text-gray-500 font-medium leading-[1.65] mb-7 max-w-lg">
              Our models identified <strong className="text-gray-700">324 shoppers</strong> disengaged for 90+ days. Launching the suggested smart win-back campaign is projected to recover <strong className="text-gray-700">₹75,000</strong> with high confidence.
            </p>

            {/* Metric row – cleaner card feel */}
            <div className="flex items-center gap-0 bg-gray-50/80 border border-gray-100 rounded-xl mb-7 max-w-md overflow-hidden">
              <div className="flex-1 px-4 py-3 border-r border-gray-100/80">
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-1.5">Recoverable Rev</span>
                <span className="text-xl font-bold text-gray-900">₹1,20,000</span>
              </div>
              <div className="flex-1 px-4 py-3 border-r border-gray-100/80">
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-1.5">Est. Conversion</span>
                <span className="text-xl font-bold text-emerald-600">15.4%</span>
              </div>
              <div className="flex-1 px-4 py-3">
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-1.5">Expected ROI</span>
                <span className="text-xl font-bold text-indigo-600">4.8x</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="relative z-10">
            <button
              onClick={handleGenerateWinback}
              className="creative-btn px-6 py-4 rounded-xl font-bold text-[13px] flex items-center gap-2 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              Execute Win-Back Campaign
            </button>
          </div>
        </div>

        {/* Right Side: Visual Centerpiece (SVG Network Cluster) */}
        <div className="lg:col-span-5 bg-white/70 backdrop-blur-xl border border-indigo-100/80 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col justify-center items-center min-h-[350px]">
          <div className="absolute inset-0 bg-dot-pattern opacity-[0.35] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="absolute top-6 left-6 flex items-center gap-1.5 bg-gray-50/50 px-3 py-1 rounded-full border border-gray-100">
            <span className="material-symbols-outlined text-[14px] text-indigo-650 animate-spin">sync</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pulsing Cluster Topology</span>
          </div>

          {/* Interactive Network Graph */}
          <svg className="w-full h-full max-w-[320px] max-h-[300px]" viewBox="0 0 200 200">
            <defs>
              <radialGradient id="brain-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="g-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Connecting Links */}
            <line x1="100" y1="100" x2="40" y2="60" stroke="url(#g-line)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="100" y1="100" x2="160" y2="70" stroke="url(#g-line)" strokeWidth="1.5" />
            <line x1="100" y1="100" x2="50" y2="150" stroke="url(#g-line)" strokeWidth="1.5" />
            <line x1="100" y1="100" x2="150" y2="140" stroke="url(#g-line)" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Animated flow dots along paths */}
            <circle r="3" fill="#22d3ee">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 100,100 L 40,60" />
            </circle>
            <circle r="3" fill="#ec4899">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 100,100 L 160,70" />
            </circle>
            <circle r="3" fill="#10b981">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 100,100 L 50,150" />
            </circle>

            {/* Nodes */}
            <circle cx="100" cy="100" r="22" fill="url(#brain-glow)" />
            <circle cx="100" cy="100" r="12" fill="#4f46e5" className="animate-pulse" />
            <circle cx="100" cy="100" r="6" fill="#ffffff" />

            {/* Inactive cluster */}
            <g 
              onMouseEnter={() => setHoveredNode('inactive')} 
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
              onClick={handleGenerateWinback}
            >
              <circle cx="40" cy="60" r="14" fill="#f59e0b" fillOpacity="0.2" />
              <circle cx="40" cy="60" r="8" fill="#f59e0b" />
              <circle cx="40" cy="60" r="14" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="pulse-ring" />
            </g>

            {/* VIP cluster */}
            <g 
              onMouseEnter={() => setHoveredNode('vip')} 
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
              onClick={handleGenerateVIP}
            >
              <circle cx="160" cy="70" r="16" fill="#8b5cf6" fillOpacity="0.2" />
              <circle cx="160" cy="70" r="10" fill="#8b5cf6" />
              <circle cx="160" cy="70" r="16" fill="none" stroke="#8b5cf6" strokeWidth="1.5" className="pulse-ring" />
            </g>

            {/* Active Buyers */}
            <g 
              onMouseEnter={() => setHoveredNode('active')} 
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
            >
              <circle cx="50" cy="150" r="15" fill="#10b981" fillOpacity="0.2" />
              <circle cx="50" cy="150" r="9" fill="#10b981" />
            </g>

            {/* Coupon Sensitive */}
            <g 
              onMouseEnter={() => setHoveredNode('coupon')} 
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
            >
              <circle cx="150" cy="140" r="13" fill="#ec4899" fillOpacity="0.2" />
              <circle cx="150" cy="140" r="7" fill="#ec4899" />
            </g>
          </svg>

          {/* Node Hover Tooltips */}
          <div className="mt-4 min-h-[24px] text-center">
            {hoveredNode === 'inactive' && (
              <span className="text-xs font-bold text-amber-600 animate-in fade-in">
                Inactive Shoppers: 324 • Click to Optimize
              </span>
            )}
            {hoveredNode === 'vip' && (
              <span className="text-xs font-bold text-purple-650 animate-in fade-in">
                VIP Shoppers: 150 • Early Access Target
              </span>
            )}
            {hoveredNode === 'active' && (
              <span className="text-xs font-bold text-emerald-600 animate-in fade-in">
                Recent Buyers: 540 • Highly Engaged
              </span>
            )}
            {hoveredNode === 'coupon' && (
              <span className="text-xs font-bold text-pink-500 animate-in fade-in">
                Coupon Sensitive: 680 • Active Promos
              </span>
            )}
            {!hoveredNode && (
              <span className="text-xs font-bold text-gray-400">
                Hover over nodes to explore customer clusters
              </span>
            )}
          </div>
        </div>

      </div>

      {/* 2. METRIC CAPSULES (Clean consistency metrics cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 relative z-10">
        {Object.values(kpis).map((kpi, idx) => {
          const sparklinePath = sparklinePaths[kpi.label] || 'M 0,15 L 60,15';
          const isPositive = kpi.change.includes('+');

          // Hover alternate metrics map
          const hoverMetrics = {
            'Total Customers': 'Avg LTV: ₹4k',
            'Total Revenue': 'Avg AOV: ₹1,245',
            'Active Campaigns': 'Open Rate: 48%',
            'Conversion Rate': 'Drop-off: 12%',
            'Avg Customer CLV': 'CAC: ₹420',
            'Campaign Attributed Rev': 'ROI: 4.2x'
          };

          return (
            <div 
              key={idx} 
              className="group/kpi bg-white p-5 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between min-h-[110px] premium-hover-lift relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-indigo-50/0 group-hover/kpi:from-indigo-50/40 group-hover/kpi:to-purple-50/10 transition-colors duration-500 z-0 pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-4 relative z-10">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate mr-2 transition-colors group-hover/kpi:text-indigo-600">
                  {kpi.label}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 transition-all duration-300 group-hover/kpi:scale-110 ${
                  isPositive ? 'bg-emerald-50 text-emerald-600 group-hover/kpi:bg-emerald-100 group-hover/kpi:shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-rose-50 text-rose-600 group-hover/kpi:bg-rose-100 group-hover/kpi:shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                }`}>
                  {kpi.change}
                </span>
              </div>

              <div className="flex justify-between items-end relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 leading-none relative">
                  <span className="block group-hover/kpi:opacity-0 group-hover/kpi:-translate-y-4 transition-all duration-300 absolute inset-0">{kpi.value}</span>
                  <span className="block opacity-0 translate-y-4 group-hover/kpi:opacity-100 group-hover/kpi:translate-y-0 transition-all duration-300 text-indigo-700">{hoverMetrics[kpi.label]}</span>
                  <span className="invisible">{kpi.value}</span> {/* spacer */}
                </h3>
                <div className="w-[48px] h-[22px] shrink-0 opacity-70 group-hover/kpi:opacity-100 transition-opacity">
                  <svg className="w-full h-full" viewBox="0 0 60 30">
                    <path 
                      d={sparklinePath} 
                      fill="none" 
                      stroke={isPositive ? '#10b981' : '#f43f5e'} 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                      className="group-hover/kpi:animate-sparkline"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. AI OPPORTUNITIES (Clean minimal cards) */}
      <div>
        <div className="flex items-center justify-between mb-6 mt-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 text-[24px]">polyline</span>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Active Opportunities</h2>
          </div>
          <span className="text-[11px] text-gray-800 font-bold bg-gray-50 px-3 py-1.5 rounded-full">
            Portfolio Potential: ₹2,15,000
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
          {/* Card 1: Recover Revenue */}
          <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between premium-hover-lift hover-shadow-orange group/opp relative overflow-hidden">
            {/* Embedded Faded SVG Illustration (Shopping Bags) */}
            <svg className="absolute -bottom-2 -right-2 w-28 h-28 opacity-[0.03] group-hover/opp:opacity-[0.08] pointer-events-none select-none text-amber-500 z-0 transition-all duration-500 group-hover/opp:scale-110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 40 H75 V85 C75 87.76 72.76 90 70 90 H30 C27.24 90 25 87.76 25 85 V40 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
              <path d="M38 40 V30 C38 23.37 43.37 18 50 18 C56.63 18 62 23.37 62 30 V40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <path d="M42 55 H58 M50 47 V63" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>

            <div className="relative z-10 flex justify-between items-start mb-5">
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50/80 px-2.5 py-1 rounded-md uppercase tracking-wider group-hover/opp:bg-amber-100 transition-colors">
                REVENUE RECOVERY
              </span>
              <span className="text-[11px] font-bold text-gray-800 bg-gray-100 px-2.5 py-1 rounded-md transition-colors group-hover/opp:bg-gray-200">
                4.8x ROI
              </span>
            </div>
            
            <div className="relative z-10 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover/opp:text-indigo-900 transition-colors">Recover Revenue</h3>
              <p className="text-xs text-gray-400 font-semibold">Targeting 324 inactive shoppers</p>
            </div>

            <div className="relative z-10 flex items-center justify-between mb-8">
              <div className="overflow-hidden h-[45px] relative">
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Opportunity Value</span>
                <span className="text-3xl font-bold text-gray-900 absolute left-0 bottom-0 group-hover/opp:-translate-y-8 group-hover/opp:opacity-0 transition-all duration-300">₹1,20,000</span>
                <span className="text-3xl font-bold text-indigo-700 absolute left-0 bottom-0 translate-y-8 opacity-0 group-hover/opp:translate-y-0 group-hover/opp:opacity-100 transition-all duration-300">₹1,20,000</span>
              </div>
              <div className="relative w-12 h-12 shrink-0 group-hover/opp:scale-110 transition-transform duration-500">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-indigo-600 transition-all duration-1000 ease-out opacity-50 group-hover/opp:opacity-100" strokeDasharray="92, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-gray-900">92%</div>
              </div>
            </div>

            <button
              onClick={handleGenerateWinback}
              className="relative z-10 w-full py-3 border border-indigo-100 hover:bg-indigo-50/50 text-indigo-600 font-bold text-[13px] rounded-xl transition-all duration-300 group-hover/opp:shadow-[0_0_15px_rgba(79,70,229,0.2)] group-hover/opp:border-indigo-300 group-hover/opp:bg-indigo-50"
            >
              Configure Win-Back
            </button>
          </div>

          {/* Card 2: VIP Expansion */}
          <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between premium-hover-lift hover-shadow-purple group/opp relative overflow-hidden">
            {/* Embedded Faded SVG Illustration (Premium Crown) */}
            <svg className="absolute -bottom-2 -right-2 w-28 h-28 opacity-[0.03] group-hover/opp:opacity-[0.08] pointer-events-none select-none text-purple-500 z-0 transition-all duration-500 group-hover/opp:scale-110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 75 L22 30 L40 50 L50 20 L60 50 L78 30 L85 75 H15 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
              <path d="M10 82 H90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <circle cx="22" cy="28" r="4" fill="currentColor" />
              <circle cx="50" cy="18" r="4" fill="currentColor" />
              <circle cx="78" cy="28" r="4" fill="currentColor" />
            </svg>

            <div className="relative z-10 flex justify-between items-start mb-5">
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md uppercase tracking-wider group-hover/opp:bg-purple-100 transition-colors">
                COHORT EXPANSION
              </span>
              <span className="text-[11px] font-bold text-gray-800 bg-gray-100 px-2.5 py-1 rounded-md transition-colors group-hover/opp:bg-gray-200">
                6.2x ROI
              </span>
            </div>
            
            <div className="relative z-10 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover/opp:text-purple-900 transition-colors">VIP Expansion</h3>
              <p className="text-xs text-gray-400 font-semibold">Targeting 150 top VIP shoppers</p>
            </div>

            <div className="relative z-10 flex items-center justify-between mb-8">
              <div className="overflow-hidden h-[45px] relative">
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Opportunity Value</span>
                <span className="text-3xl font-bold text-gray-900 absolute left-0 bottom-0 group-hover/opp:-translate-y-8 group-hover/opp:opacity-0 transition-all duration-300">₹75,000</span>
                <span className="text-3xl font-bold text-purple-700 absolute left-0 bottom-0 translate-y-8 opacity-0 group-hover/opp:translate-y-0 group-hover/opp:opacity-100 transition-all duration-300">₹75,000</span>
              </div>
              <div className="relative w-12 h-12 shrink-0 group-hover/opp:scale-110 transition-transform duration-500">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-purple-600 transition-all duration-1000 ease-out opacity-50 group-hover/opp:opacity-100" strokeDasharray="89, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-gray-900">89%</div>
              </div>
            </div>

            <button
              onClick={handleGenerateVIP}
              className="relative z-10 w-full py-3 border border-indigo-100 hover:bg-purple-50/50 text-indigo-600 font-bold text-[13px] rounded-xl transition-all duration-300 group-hover/opp:shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover/opp:border-purple-300 group-hover/opp:bg-purple-50 group-hover/opp:text-purple-700"
            >
              Unlock VIP Rewards
            </button>
          </div>

          {/* Card 3: Channel Optimization */}
          <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between premium-hover-lift hover-shadow-blue group/opp relative overflow-hidden">
            {/* Embedded Faded SVG Illustration (Communication Network) */}
            <svg className="absolute -bottom-2 -right-2 w-28 h-28 opacity-[0.03] group-hover/opp:opacity-[0.08] pointer-events-none select-none text-cyan-500 z-0 transition-all duration-500 group-hover/opp:scale-110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 30 H60 V60 H30 L15 70 V30 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
              <path d="M80 40 V65 L70 75 H50 V60" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeDasharray="3 3" />
              <circle cx="30" cy="45" r="3" fill="currentColor" />
              <circle cx="40" cy="45" r="3" fill="currentColor" />
              <circle cx="50" cy="45" r="3" fill="currentColor" />
            </svg>

            <div className="relative z-10 flex justify-between items-start mb-5">
              <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md uppercase tracking-wider group-hover/opp:bg-cyan-100 transition-colors">
                OPTIMIZATION INSIGHT
              </span>
              <span className="text-[11px] font-bold text-gray-800 bg-gray-100 px-2.5 py-1 rounded-md transition-colors group-hover/opp:bg-gray-200">
                5.5x ROI
              </span>
            </div>
            
            <div className="relative z-10 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover/opp:text-cyan-900 transition-colors">Channel Optimization</h3>
              <p className="text-xs text-gray-400 font-semibold">Route from SMS/Email to WhatsApp</p>
            </div>

            <div className="relative z-10 flex items-center justify-between mb-8">
              <div className="overflow-hidden h-[45px] relative">
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Conversion Lift</span>
                <span className="text-3xl font-bold text-gray-900 absolute left-0 bottom-0 group-hover/opp:-translate-y-8 group-hover/opp:opacity-0 transition-all duration-300">+18% Lift</span>
                <span className="text-3xl font-bold text-cyan-600 absolute left-0 bottom-0 translate-y-8 opacity-0 group-hover/opp:translate-y-0 group-hover/opp:opacity-100 transition-all duration-300">+18% Lift</span>
              </div>
              <div className="relative w-12 h-12 shrink-0 group-hover/opp:scale-110 transition-transform duration-500">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-slate-800 transition-all duration-1000 ease-out opacity-50 group-hover/opp:opacity-100 group-hover/opp:text-cyan-500" strokeDasharray="94, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-gray-900">94%</div>
              </div>
            </div>

            <button
              onClick={() => onNavigateToView('copilot')}
              className="relative z-10 w-full py-3 border border-cyan-100 hover:bg-cyan-50/50 text-cyan-600 font-bold text-[13px] rounded-xl transition-all duration-300 group-hover/opp:shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover/opp:border-cyan-300 group-hover/opp:bg-cyan-50"
            >
              Analyze Conversion Funnel
            </button>
          </div>
        </div>
      </div>

      {/* 4. INTERACTIVE SEGMENT TOPOLOGY */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        
        {/* Bubbles Grid */}
        <div className="xl:col-span-8 bg-white/70 backdrop-blur-xl border border-gray-200/60 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 bg-dot-pattern opacity-[0.4] pointer-events-none" />
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="mb-6 relative z-10">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Interactive Segment Topology</h3>
            <p className="text-xs text-gray-400 font-bold">Bubble diameter represents group population volume</p>
          </div>

          {/* Circles Container with Background Connection Lines */}
          <div className="relative flex flex-wrap items-center justify-around gap-8 py-8 min-h-[280px]">
            <svg className="absolute inset-0 w-full h-full opacity-[0.22] pointer-events-none select-none z-0" xmlns="http://www.w3.org/2000/svg">
              {/* Draw glowing mesh lines connecting center coordinates */}
              <path d="M 110 130 L 260 90 L 440 160 L 600 100 L 260 90 L 440 160 M 110 130 L 440 160 M 260 90 L 600 100" stroke="url(#segmentLineGrad)" strokeWidth="2.5" strokeDasharray="5 5" />
              <defs>
                <linearGradient id="segmentLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            {mockSegments.map((seg, idx) => {
              // Map count to circle size (diameter between 90px and 160px)
              const minCount = 150;
              const maxCount = 680;
              const minSize = 90;
              const maxSize = 160;
              const size = minSize + ((seg.count - minCount) / (maxCount - minCount)) * (maxSize - minSize);
              
              const isActive = activeSegment.id === seg.id;

              return (
                <div key={seg.id} className={`relative group topo-node-${(idx % 3) + 1}`}>
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl pointer-events-none transition-all duration-300 whitespace-nowrap z-50 translate-y-2 group-hover:translate-y-0">
                    {seg.name} • {seg.count} Shoppers
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                  </div>

                  <button
                    onClick={() => setActiveSegment(seg)}
                    className={`rounded-full flex flex-col justify-center items-center p-5 transition-all duration-500 overflow-hidden ${
                      isActive 
                        ? 'scale-110 shadow-[0_12px_36px_rgba(79,70,229,0.25)] ring-4 ring-indigo-100/70 z-10 border-2 border-indigo-400' 
                        : 'hover:scale-110 shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-gray-200/50 hover:border-gray-300'
                    }`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    background: isActive 
                      ? `radial-gradient(circle at center, ${seg.color}25 0%, ${seg.color}08 100%)`
                      : `radial-gradient(circle at center, ${seg.color}10 0%, ${seg.color}03 100%)`,
                    borderColor: isActive ? seg.color : `${seg.color}40`,
                    boxShadow: isActive ? `0 0 25px ${seg.color}15, inset 0 0 12px ${seg.color}10` : `inset 0 0 8px rgba(255,255,255,0.8)`
                  }}
                >
                  {/* Glowing Node Center Dot */}
                  <div 
                    className={`absolute w-2.5 h-2.5 rounded-full top-3 right-1/2 translate-x-1/2 ${isActive ? 'animate-ping opacity-75' : ''}`}
                    style={{ backgroundColor: seg.color }}
                  />
                  <div 
                    className="absolute w-2 h-2 rounded-full top-3 right-1/2 translate-x-1/2"
                    style={{ backgroundColor: seg.color }}
                  />
                  
                  <span className="text-sm font-semibold text-gray-900 tracking-tight text-center max-w-[90%] truncate mt-1">
                    {seg.name.split(' ')[0]}
                  </span>
                  
                  <span className="text-xl font-semibold text-gray-950 leading-none my-1" style={{ color: seg.color }}>
                    {seg.count.toLocaleString()}
                  </span>
                  
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    shoppers
                  </span>

                  <span className="text-xs font-semibold mt-1.5 px-1.5 py-0.5 rounded bg-white/80 border border-gray-150/60 shadow-2xs text-gray-600 transition-colors group-hover:bg-white">
                    {seg.confidenceScore}% Match
                  </span>
                </button>
              </div>
              );
            })}
          </div>
        </div>

        {/* Selected Bubble Deep Intelligence */}
        <div className="xl:col-span-4 bg-white/70 backdrop-blur-xl border border-indigo-100 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col justify-between card-top-glow-indigo">
          <div className="absolute inset-0 bg-dot-pattern opacity-[0.3] pointer-events-none" />
          <div 
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-2xl opacity-15 pointer-events-none"
            style={{ backgroundColor: activeSegment.color }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Segment Intelligence
              </span>
              <span 
                className="w-3.5 h-3.5 rounded-full animate-pulse shadow-sm" 
                style={{ backgroundColor: activeSegment.color }}
              />
            </div>

            <h3 className="text-xl font-medium text-gray-900 leading-snug mb-2">
              {activeSegment.name}
            </h3>
            <p className="text-xs text-gray-500 font-semibold leading-relaxed mb-6">
              {activeSegment.description}
            </p>

            <div className="space-y-4 border-t border-gray-100 pt-5">
              <div className="flex justify-between items-center group">
                <span className="text-xs font-bold text-gray-400">Total Group Size</span>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 border border-white flex items-center justify-center text-[8px] font-bold text-indigo-700">JS</div>
                    <div className="w-5 h-5 rounded-full bg-pink-100 border border-white flex items-center justify-center text-[8px] font-bold text-pink-700">AK</div>
                    <div className="w-5 h-5 rounded-full bg-emerald-100 border border-white flex items-center justify-center text-[8px] font-bold text-emerald-700">+</div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 animate-in fade-in slide-in-from-bottom-1">{activeSegment.count}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400">Expected Conversion</span>
                <span className="text-sm font-semibold text-emerald-600">{activeSegment.expectedConversion}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400">Total Revenue Value</span>
                <span className="text-sm font-semibold text-indigo-950">₹{activeSegment.revenuePotential.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400">AI Trust Score</span>
                <span className="text-sm font-semibold text-indigo-650">{activeSegment.confidenceScore}% Trust</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onGenerateCampaign(`Draft high-performing customized campaign targeting ${activeSegment.name} segment with an estimate ROI of ${(activeSegment.revenuePotential / 25000).toFixed(1)}x.`);
            }}
            className="w-full mt-8 py-3.5 creative-btn rounded-xl font-bold text-xs shadow-md transition-all hover:scale-[1.01] relative z-10"
          >
            Launch Segment Campaign
          </button>
        </div>

      </div>

      {/* 5. LIVE CAMPAIGN COMMAND CENTER */}
      <div className="bg-white/70 backdrop-blur-xl border border-indigo-150 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />
        
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <h3 className="text-lg font-bold text-gray-900">Campaign Dispatches Flow</h3>
          </div>
          <button
            onClick={() => onNavigateToView('simulator')}
            className="text-xs text-indigo-650 font-bold hover:underline"
          >
            Simulator Central Panel
          </button>
        </div>

        {/* Horizontal Funnel Flow with particles */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center relative py-6">
          
          {/* Node 1: Campaign */}
          <div className="text-center relative z-10 group/node cursor-default">
            <div className="w-14 h-14 bg-indigo-50 border border-indigo-200 rounded-full flex items-center justify-center mx-auto shadow-md mb-3 transition-all duration-300 group-hover/node:scale-110 group-hover/node:shadow-[0_0_15px_rgba(79,70,229,0.3)] group-hover/node:bg-indigo-100 relative">
              <span className="material-symbols-outlined text-indigo-600 text-[22px] transition-transform duration-300 group-hover/node:-translate-y-1">rocket_launch</span>
              <div className="absolute opacity-0 group-hover/node:opacity-100 bottom-1 bg-white rounded-full transition-opacity">
                <span className="material-symbols-outlined text-[12px] text-emerald-500 font-bold block">check_circle</span>
              </div>
            </div>
            <h4 className="text-xs font-semibold text-gray-900 transition-colors group-hover/node:text-indigo-700">1. Campaigns</h4>
            <p className="text-sm font-bold text-gray-400 uppercase mt-1 group-hover/node:text-indigo-500 transition-colors">Active: 8</p>
          </div>

          {/* Node 2: Delivered */}
          <div className="text-center relative z-10 group/node cursor-default">
            <div className="w-14 h-14 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center mx-auto shadow-md mb-3 transition-all duration-300 group-hover/node:scale-110 group-hover/node:shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover/node:bg-blue-100 relative">
              <span className="material-symbols-outlined text-blue-600 text-[22px] transition-transform duration-300 group-hover/node:-translate-y-1">mark_email_read</span>
              <div className="absolute opacity-0 group-hover/node:opacity-100 bottom-1 bg-white rounded-full transition-opacity">
                <span className="material-symbols-outlined text-[12px] text-emerald-500 font-bold block">check_circle</span>
              </div>
            </div>
            <h4 className="text-xs font-semibold text-gray-900 transition-colors group-hover/node:text-blue-700">2. Delivered</h4>
            <p className="text-sm font-semibold text-blue-600 mt-1">{simMetrics.delivered.toLocaleString()}</p>
          </div>

          {/* Node 3: Read */}
          <div className="text-center relative z-10 group/node cursor-default">
            <div className="w-14 h-14 bg-purple-50 border border-purple-200 rounded-full flex items-center justify-center mx-auto shadow-md mb-3 transition-all duration-300 group-hover/node:scale-110 group-hover/node:shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover/node:bg-purple-100 relative">
              <span className="material-symbols-outlined text-purple-600 text-[22px] transition-transform duration-300 group-hover/node:-translate-y-1">visibility</span>
              <div className="absolute opacity-0 group-hover/node:opacity-100 bottom-1 bg-white rounded-full transition-opacity">
                <span className="material-symbols-outlined text-[12px] text-emerald-500 font-bold block">check_circle</span>
              </div>
            </div>
            <h4 className="text-xs font-semibold text-gray-900 transition-colors group-hover/node:text-purple-700">3. Opened/Read</h4>
            <p className="text-sm font-semibold text-purple-600 mt-1">{simMetrics.read.toLocaleString()}</p>
          </div>

          {/* Node 4: Clicked */}
          <div className="text-center relative z-10 group/node cursor-default">
            <div className="w-14 h-14 bg-pink-50 border border-pink-200 rounded-full flex items-center justify-center mx-auto shadow-md mb-3 transition-all duration-300 group-hover/node:scale-110 group-hover/node:shadow-[0_0_15px_rgba(236,72,153,0.3)] group-hover/node:bg-pink-100 relative">
              <span className="material-symbols-outlined text-pink-600 text-[22px] transition-transform duration-300 group-hover/node:-translate-y-1">ads_click</span>
              <div className="absolute opacity-0 group-hover/node:opacity-100 bottom-1 bg-white rounded-full transition-opacity">
                <span className="material-symbols-outlined text-[12px] text-emerald-500 font-bold block">check_circle</span>
              </div>
            </div>
            <h4 className="text-xs font-semibold text-gray-900 transition-colors group-hover/node:text-pink-700">4. Clicked Link</h4>
            <p className="text-sm font-semibold text-pink-600 mt-1">{simMetrics.clicked.toLocaleString()}</p>
          </div>

          {/* Node 5: Converted */}
          <div className="text-center relative z-10 group/node cursor-default">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-md mb-3 transition-all duration-300 group-hover/node:scale-110 group-hover/node:shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover/node:bg-emerald-100 ring-4 ring-emerald-100 relative">
              <span className="material-symbols-outlined text-emerald-600 text-[22px] transition-transform duration-300 group-hover/node:-translate-y-1 group-hover/node:scale-110">local_mall</span>
              <div className="absolute w-full h-full rounded-full border-2 border-emerald-400 opacity-0 group-hover/node:animate-ping pointer-events-none"></div>
            </div>
            <h4 className="text-xs font-semibold text-gray-900 transition-colors group-hover/node:text-emerald-700">5. Converted</h4>
            <p className="text-sm font-semibold text-emerald-600 mt-1">{simMetrics.converted.toLocaleString()}</p>
          </div>

          {/* SVG Connector Lines and Flow Particles */}
          <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="25%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="75%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {/* Connecting line */}
              <path 
                d="M 80,85 L 240,85 L 400,85 L 560,85 L 720,85" 
                fill="none" 
                stroke="url(#flowGrad)" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                opacity="0.3" 
              />

              {/* Glowing animated particles along paths */}
              <circle r="4" fill="#6366f1" opacity="0.9">
                <animateMotion dur="2.4s" repeatCount="indefinite" path="M 80,85 L 240,85" />
              </circle>
              <circle r="4" fill="#3b82f6" opacity="0.9">
                <animateMotion dur="2.6s" repeatCount="indefinite" path="M 240,85 L 400,85" />
              </circle>
              <circle r="4" fill="#8b5cf6" opacity="0.9">
                <animateMotion dur="2.8s" repeatCount="indefinite" path="M 400,85 L 560,85" />
              </circle>
              <circle r="4" fill="#ec4899" opacity="0.9">
                <animateMotion dur="2.2s" repeatCount="indefinite" path="M 560,85 L 720,85" />
              </circle>
            </svg>
          </div>

        </div>
      </div>

    </div>
  );
}
