import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import HeroWelcome from './HeroWelcome';
import AiInsightBanner from './AiInsightBanner';
import KeyMetrics from './KeyMetrics';
import CustomerDistribution from './CustomerDistribution';
import AiStrategistCard from './AiStrategistCard';
import RecentCampaigns from './RecentCampaigns';
import ChannelPerformance from './ChannelPerformance';
import AnalyticsSection from './AnalyticsSection';
import AiInsightsPanel from './AiInsightsPanel';

// New Subpages and central data models
import CustomersPage from './CustomersPage';
import SegmentsPage from './SegmentsPage';
import AiStrategistPage from './AiStrategistPage';
import CampaignsPage from './CampaignsPage';
import AnalyticsPage from './AnalyticsPage';
import ChannelSimulatorPage from './ChannelSimulatorPage';
import IntegrationsPage from './IntegrationsPage';
import SettingsPage from './SettingsPage';

import {
  initialCustomers,
  initialCampaigns,
  initialSegments,
  initialIntegrations,
  initialSettings
} from './mockData';

export default function DashboardMain({ onBack }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Unified Platform State
  const [customers, setCustomers] = useState(initialCustomers);
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [segments, setSegments] = useState(initialSegments);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [settings, setSettings] = useState(initialSettings);
  const [simulatorLogs, setSimulatorLogs] = useState([]);
  const [activeSegmentPrompt, setActiveSegmentPrompt] = useState('');
  const [notification, setNotification] = useState(null);

  // Background dispatch simulator: Increments running campaigns metrics
  useEffect(() => {
    const runningCampaigns = campaigns.filter(c => c.status === 'Running');
    if (runningCampaigns.length === 0) return;

    const interval = setInterval(() => {
      // Find the first running campaign index
      const runningIdx = campaigns.findIndex(c => c.status === 'Running');
      if (runningIdx === -1) return;

      const targetCamp = campaigns[runningIdx];
      const incrementSize = Math.floor(Math.random() * 80) + 20;

      setCampaigns(prev => {
        return prev.map((camp, idx) => {
          if (idx === runningIdx) {
            const nextSent = Math.min(camp.sent + incrementSize, 5000);
            const nextDelivered = Math.floor(nextSent * 0.985);
            const nextOpened = Math.floor(nextDelivered * 0.64);
            const nextClicked = Math.floor(nextOpened * 0.185);
            const nextPurchases = Math.floor(nextClicked * 0.052);
            const nextRevenue = nextPurchases * 3400;

            const isCompleted = nextSent >= 5000;
            return {
              ...camp,
              sent: nextSent,
              delivered: nextDelivered,
              opened: nextOpened,
              clicked: nextClicked,
              purchases: nextPurchases,
              revenue: nextRevenue,
              ctr: `${((nextClicked / (nextOpened || 1)) * 100).toFixed(1)}%`,
              status: isCompleted ? 'Completed' : 'Running',
              statusStyle: isCompleted ? 'bg-blue-50 text-blue-700 border-blue-200' : camp.statusStyle
            };
          }
          return camp;
        });
      });

      // Synthesize event details
      const randomCust = customers[Math.floor(Math.random() * customers.length)];
      const eventStatuses = ["SENT", "DELIVERED", "OPENED", "CLICKED", "PURCHASED"];
      const randomEventStatus = eventStatuses[Math.floor(Math.random() * eventStatuses.length)];
      
      const timestamp = new Date().toLocaleTimeString();
      const newSimLog = {
        time: timestamp,
        name: randomCust.name,
        channel: targetCamp.channel,
        status: randomEventStatus,
        latency: `${Math.floor(Math.random() * 60) + 15}ms`,
        details: randomEventStatus === 'PURCHASED' 
          ? `Checkout conversion for campaign "${targetCamp.name}". Value: ₹3,400`
          : `Dispatch worker node handshake successful for customer ${randomCust.name}.`
      };

      setSimulatorLogs(prev => [...prev.slice(-99), newSimLog]);

      // Connect back to Customer Timeline History dynamically!
      setCustomers(prevCustomers => {
        return prevCustomers.map(cust => {
          if (cust.name === randomCust.name) {
            const updatedTimeline = [
              {
                type: targetCamp.channel,
                date: new Date().toISOString().replace('T', ' ').substring(0, 16),
                message: `Auto dispatch: Campaign "${targetCamp.name}" is processing.`,
                status: randomEventStatus
              },
              ...cust.communicationTimeline
            ];
            
            // Check if campaign already in customer history, if not append it
            const hasCamp = cust.campaignHistory.some(h => h.campaignName === targetCamp.name);
            const updatedHistory = hasCamp 
              ? cust.campaignHistory 
              : [{ campaignName: targetCamp.name, channel: targetCamp.channel, date: new Date().toISOString().substring(0, 10), response: randomEventStatus === 'PURCHASED' ? 'Purchased' : randomEventStatus === 'CLICKED' ? 'Clicked' : 'Opened' }, ...cust.campaignHistory];

            return {
              ...cust,
              communicationTimeline: updatedTimeline,
              campaignHistory: updatedHistory
            };
          }
          return cust;
        });
      });

    }, 4000);

    return () => clearInterval(interval);
  }, [campaigns, customers]);

  // Launch campaign from AI strategist
  const handleLaunchCampaign = (newCamp) => {
    setCampaigns(prev => [newCamp, ...prev]);
    setNotification(`Campaign "${newCamp.name.slice(0, 25)}..." launched successfully!`);
    setTimeout(() => setNotification(null), 4000);
    setActiveTab('campaigns');
  };

  // Toggle integrations status
  const handleToggleIntegration = (id) => {
    setIntegrations(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const nextStatus = item.status === 'Connected' ? 'Disconnected' : 'Connected';
          return {
            ...item,
            status: nextStatus,
            health: nextStatus === 'Connected' ? 99.5 : 0.0,
            apiStatus: nextStatus === 'Connected' ? 'Operational' : 'Offline'
          };
        }
        return item;
      });
    });
  };

  return (
    <div className="h-screen bg-[#faf8ff] bg-grid-pattern text-gray-800 font-sans flex relative overflow-hidden">
      
      {/* Dynamic Notification Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-indigo-650 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 font-bold text-xs border border-indigo-500/50 animate-in slide-in-from-top duration-300">
          <span className="material-symbols-outlined text-[18px] animate-bounce">rocket_launch</span>
          <span>{notification}</span>
        </div>
      )}

      {/* Background organic blurred orbs matching landing page */}
      <div className="blob bg-indigo-400/20 w-[500px] h-[500px] rounded-full top-0 right-10 mix-blend-multiply pointer-events-none" />
      <div className="blob bg-pink-300/25 w-[600px] h-[600px] rounded-full bottom-10 left-64 mix-blend-multiply pointer-events-none" style={{ animationDelay: '-5s' }} />
      <div className="blob bg-purple-300/15 w-[400px] h-[400px] rounded-full top-1/2 right-1/4 mix-blend-multiply pointer-events-none" style={{ animationDelay: '-10s' }} />

      {/* Left Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onBack={onBack} />

      {/* Right Content Area */}
      <div className="flex-1 h-screen flex flex-col relative z-10 overflow-hidden">
        
        {/* Top Header */}
        <TopHeader />

        {/* Main Scrollable Workspace Container */}
        <main className="flex-1 min-h-0 p-8 overflow-y-auto custom-scrollbar">
          
          {/* Active Tab: Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
              
              {/* Daily greeting and Briefing */}
              <HeroWelcome />

              {/* Dominant AI Recommendation Banner */}
              <AiInsightBanner onCreateCampaign={() => setActiveTab('strategist')} />

              {/* Key Metrics Grid */}
              <KeyMetrics />

              {/* 12-Column Grid Layout for Widgets */}
              <div className="grid grid-cols-12 gap-8 mb-8">
                {/* Customer Distribution Donut (col-span-5) */}
                <div className="col-span-12 lg:col-span-5">
                  <CustomerDistribution />
                </div>
                {/* AI Strategist Prompt Box (col-span-7) */}
                <div className="col-span-12 lg:col-span-7">
                  <AiStrategistCard onPrompt={() => setActiveTab('strategist')} />
                </div>
              </div>

              {/* Campaigns and Channel Performance Grid */}
              <div className="grid grid-cols-12 gap-8 mb-8">
                {/* Recent Campaigns Table (col-span-7) */}
                <div className="col-span-12 lg:col-span-7">
                  <RecentCampaigns campaigns={campaigns.slice(0, 4)} />
                </div>
                {/* Horizontal Channel Performance Bars (col-span-5) */}
                <div className="col-span-12 lg:col-span-5">
                  <ChannelPerformance />
                </div>
              </div>

              {/* Analytics Funnel and AI Insights panel Grid */}
              <div className="grid grid-cols-12 gap-8">
                {/* SVG Funnel Shape & metrics (col-span-8) */}
                <div className="col-span-12 lg:col-span-8">
                  <AnalyticsSection />
                </div>
                {/* Insights Panel list (col-span-4) */}
                <div className="col-span-12 lg:col-span-4">
                  <AiInsightsPanel />
                </div>
              </div>

            </div>
          )}

          {/* Active Tab: Customers */}
          {activeTab === 'customers' && (
            <CustomersPage customers={customers} />
          )}

          {/* Active Tab: Segments */}
          {activeTab === 'segments' && (
            <SegmentsPage
              segments={segments}
              setSegments={setSegments}
              onPromptCampaign={(segName) => {
                setActiveSegmentPrompt(segName);
                setActiveTab('strategist');
              }}
            />
          )}

          {/* Active Tab: AI Strategist */}
          {activeTab === 'strategist' && (
            <AiStrategistPage
              onLaunchCampaign={handleLaunchCampaign}
              activeSegmentPrompt={activeSegmentPrompt}
            />
          )}

          {/* Active Tab: Campaigns */}
          {activeTab === 'campaigns' && (
            <CampaignsPage
              campaigns={campaigns}
              onCreateCampaignClick={() => setActiveTab('strategist')}
            />
          )}

          {/* Active Tab: Analytics */}
          {activeTab === 'analytics' && (
            <AnalyticsPage />
          )}

          {/* Active Tab: Channel Simulator */}
          {activeTab === 'simulator' && (
            <ChannelSimulatorPage
              logs={simulatorLogs}
              setLogs={setSimulatorLogs}
            />
          )}

          {/* Active Tab: Integrations */}
          {activeTab === 'integrations' && (
            <IntegrationsPage
              integrations={integrations}
              onToggleIntegration={handleToggleIntegration}
            />
          )}

          {/* Active Tab: Settings */}
          {activeTab === 'settings' && (
            <SettingsPage
              settings={settings}
              setSettings={setSettings}
            />
          )}

        </main>

      </div>

    </div>
  );
}

