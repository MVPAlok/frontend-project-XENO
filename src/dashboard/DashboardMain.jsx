import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import DashboardOverview from './DashboardOverview';
import CustomersPage from './CustomersPage';
import SegmentsPage from './SegmentsPage';
import AiCopilotPage from './AiCopilotPage';
import CampaignsPage from './CampaignsPage';
import AnalyticsPage from './AnalyticsPage';
import CampaignActivityCenter from './ChannelSimulator';
import SettingsPage from './SettingsPage';
import OnboardingWizard from './OnboardingWizard';
import AiInsightsHub from './AiInsightsHub';

// Import initial data generators
import { 
  generateCustomers, 
  dashboardKPIs, 
  mockSegments, 
  initialCampaigns 
} from './mockData';

export default function DashboardMain({ user, onBack }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentView = location.pathname.split('/')[2] || 'dashboard';

  const [copilotPrompt, setCopilotPrompt] = useState('');

  // Floating Copilot Handlers
  const [isFloatingCopilotOpen, setIsFloatingCopilotOpen] = useState(false);
  const [floatingChatLogs, setFloatingChatLogs] = useState([
    { 
      sender: 'ai', 
      text: "Hello! I am your AI Marketing assistant. How can I help optimize your campaigns today?", 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  const [floatingInput, setFloatingInput] = useState('');
  const [isFloatingAiTyping, setIsFloatingAiTyping] = useState(false);

  // Role State
  const [role, setRole] = useState(() => {
    return localStorage.getItem('xeno_role') || 'Admin';
  });

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    localStorage.setItem('xeno_role', newRole);
    addNotification(`User role simulated as "${newRole}"`, 'info');
  };

  // Central Workspaces States
  const [workspaces, setWorkspaces] = useState(() => {
    const saved = localStorage.getItem('xeno_workspaces');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeWorkspaceId, setActiveWorkspaceId] = useState(() => {
    return localStorage.getItem('xeno_active_workspace_id') || '';
  });

  const [isCreatingNewWorkspace, setIsCreatingNewWorkspace] = useState(false);
  const [reanalysisWorkspaceId, setReanalysisWorkspaceId] = useState(null);
  const [importWorkspaceId, setImportWorkspaceId] = useState(null);

  // Active Workspace Data States
  const [customers, setCustomers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [kpis, setKpis] = useState(dashboardKPIs);
  const [notifications, setNotifications] = useState([]);
  const [workspaceTimestamps, setWorkspaceTimestamps] = useState({
    lastAnalysis: 'Just Now',
    lastUpload: 'Just Now',
    lastRefresh: 'Just Now'
  });

  // Simulator State
  const [simMetrics, setSimMetrics] = useState({
    sent: 1089,
    delivered: 1046,
    failed: 43,
    read: 892,
    clicked: 182,
    converted: 88
  });
  const [simLogs, setSimLogs] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [simSpeed, setSimSpeed] = useState(4); // seconds per event

  const [activeCampaignId, setActiveCampaignId] = useState(null);
  const [activeCustomerId, setActiveCustomerId] = useState(null);

  const lastLoadedWorkspaceIdRef = useRef('');

  // Switch Workspace effect (Loads data from pool on switch)
  useEffect(() => {
    if (workspaces.length === 0) {
      setActiveWorkspaceId('');
      localStorage.removeItem('xeno_active_workspace_id');
      return;
    }

    const targetId = activeWorkspaceId || workspaces[0].id;
    if (activeWorkspaceId !== targetId) {
      setActiveWorkspaceId(targetId);
      localStorage.setItem('xeno_active_workspace_id', targetId);
      return;
    }

    const ws = workspaces.find(w => w.id === targetId);
    if (ws) {
      lastLoadedWorkspaceIdRef.current = targetId;
      setCustomers(ws.customers || []);
      setCampaigns(ws.campaigns || []);
      setKpis(ws.kpis || dashboardKPIs);
      setSimMetrics(ws.simMetrics || { sent: 1089, delivered: 1046, failed: 43, read: 892, clicked: 182, converted: 88 });
      setSimLogs(ws.simLogs || []);
      setNotifications(ws.notifications || []);
      setWorkspaceTimestamps({
        lastAnalysis: ws.lastAnalysis || 'Just Now',
        lastUpload: ws.lastUpload || 'Just Now',
        lastRefresh: ws.lastRefresh || 'Just Now'
      });
    }
  }, [activeWorkspaceId, workspaces]);

  // Save local state changes back to workspaces pool
  useEffect(() => {
    if (!activeWorkspaceId || workspaces.length === 0) return;
    if (lastLoadedWorkspaceIdRef.current !== activeWorkspaceId) return;

    setWorkspaces(prev => {
      let changed = false;
      const next = prev.map(w => {
        if (w.id === activeWorkspaceId) {
          const updated = {
            ...w,
            customers,
            campaigns,
            kpis,
            simMetrics,
            simLogs,
            notifications,
            lastAnalysis: workspaceTimestamps.lastAnalysis,
            lastUpload: workspaceTimestamps.lastUpload,
            lastRefresh: workspaceTimestamps.lastRefresh
          };
          
          if (JSON.stringify(w.simMetrics) !== JSON.stringify(simMetrics) || 
              w.campaigns.length !== campaigns.length ||
              w.customers.length !== customers.length ||
              w.notifications.length !== notifications.length ||
              w.lastAnalysis !== workspaceTimestamps.lastAnalysis ||
              w.lastUpload !== workspaceTimestamps.lastUpload ||
              w.lastRefresh !== workspaceTimestamps.lastRefresh) {
            changed = true;
            return updated;
          }
          return w;
        }
        return w;
      });

      if (changed) {
        localStorage.setItem('xeno_workspaces', JSON.stringify(next));
        return next;
      }
      return prev;
    });
  }, [activeWorkspaceId, customers, campaigns, kpis, simMetrics, simLogs, notifications, workspaceTimestamps]);

  // Notification helper
  const addNotification = (text, type = 'info') => {
    const newNotif = {
      id: `nt-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' today',
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  // Workspace Actions
  const handleSelectWorkspace = (id) => {
    setActiveWorkspaceId(id);
    localStorage.setItem('xeno_active_workspace_id', id);
  };

  const handleCreateWorkspace = () => {
    if (role === 'Viewer') {
      alert("Permission Denied: Viewers cannot create workspaces.");
      return;
    }
    setIsCreatingNewWorkspace(true);
  };

  const handleOnboardingComplete = (workspaceDetails) => {
    const workspaceId = `ws-${Date.now()}`;
    const newWs = {
      id: workspaceId,
      brandName: workspaceDetails.brandName,
      industry: workspaceDetails.industry,
      businessType: workspaceDetails.businessType,
      primaryChannel: workspaceDetails.primaryChannel,
      monthlyCustomers: workspaceDetails.monthlyCustomers,
      isArchived: false,
      lastAnalysis: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
      lastUpload: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
      lastRefresh: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
      customers: generateCustomers(),
      segments: JSON.parse(JSON.stringify(mockSegments)),
      campaigns: initialCampaigns.map(camp => ({
        ...camp,
        createdBy: camp.createdBy || 'Sarah Jenkins',
        originSegment: camp.segment,
        recommendedChannel: camp.channel,
        predictedRoi: camp.id === 'CAMP-001' ? '5.2x' : camp.id === 'CAMP-002' ? '4.8x' : camp.id === 'CAMP-003' ? '5.6x' : '3.5x',
        expectedRevenue: camp.id === 'CAMP-001' ? 84000 : camp.id === 'CAMP-002' ? 54000 : camp.id === 'CAMP-003' ? 72000 : 0
      })),
      kpis: JSON.parse(JSON.stringify(dashboardKPIs)),
      simMetrics: { sent: 1089, delivered: 1046, failed: 43, read: 892, clicked: 182, converted: 88 },
      simLogs: [
        {
          id: 'init-1',
          time: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'Delivered',
          channel: workspaceDetails.primaryChannel,
          message: `Delivered "Welcome Campaign" dispatch to Vihaan Nair (+91 94833 28312)`,
          campaign: 'Welcome Campaign'
        }
      ],
      notifications: [
        { id: `nt-${Date.now()}-1`, text: `Workspace "${workspaceDetails.brandName}" created successfully.`, time: 'Just now', read: false, type: 'success' },
        { id: `nt-${Date.now()}-2`, text: 'AI analyzed profiles and discovered 6 custom customer segments.', time: 'Just now', read: false, type: 'info' }
      ]
    };

    const nextWorkspaces = [...workspaces, newWs];
    setWorkspaces(nextWorkspaces);
    localStorage.setItem('xeno_workspaces', JSON.stringify(nextWorkspaces));
    setActiveWorkspaceId(workspaceId);
    localStorage.setItem('xeno_active_workspace_id', workspaceId);
    
    setIsCreatingNewWorkspace(false);
  };

  const handleRenameWorkspace = (id, newName) => {
    setWorkspaces(prev => {
      const next = prev.map(w => w.id === id ? { ...w, brandName: newName } : w);
      localStorage.setItem('xeno_workspaces', JSON.stringify(next));
      return next;
    });
    addNotification(`Workspace renamed to "${newName}"`, 'success');
  };

  const handleDuplicateWorkspace = (id) => {
    const source = workspaces.find(w => w.id === id);
    if (!source) return;
    const cloneId = `ws-${Date.now()}`;
    const clone = {
      ...JSON.parse(JSON.stringify(source)),
      id: cloneId,
      brandName: `${source.brandName} - Copy`,
      notifications: [
        { id: `nt-${Date.now()}`, text: `Workspace duplicated from "${source.brandName}"`, time: 'Just now', read: false, type: 'success' }
      ]
    };
    const next = [...workspaces, clone];
    setWorkspaces(next);
    localStorage.setItem('xeno_workspaces', JSON.stringify(next));
    setActiveWorkspaceId(cloneId);
    localStorage.setItem('xeno_active_workspace_id', cloneId);
    addNotification(`Workspace duplicated as "${source.brandName} - Copy"`, 'success');
  };

  const handleArchiveWorkspace = (id) => {
    let stateStr = '';
    setWorkspaces(prev => {
      const next = prev.map(w => {
        if (w.id === id) {
          stateStr = w.isArchived ? 'unarchived' : 'archived';
          return { ...w, isArchived: !w.isArchived };
        }
        return w;
      });
      localStorage.setItem('xeno_workspaces', JSON.stringify(next));
      return next;
    });
    addNotification(`Workspace is now ${stateStr}`, 'info');
  };

  const handleDeleteWorkspace = (id) => {
    const next = workspaces.filter(w => w.id !== id);
    setWorkspaces(next);
    localStorage.setItem('xeno_workspaces', JSON.stringify(next));
    addNotification('Workspace deleted.', 'risk');
    if (activeWorkspaceId === id) {
      if (next.length > 0) {
        handleSelectWorkspace(next[0].id);
      } else {
        setActiveWorkspaceId('');
        localStorage.removeItem('xeno_active_workspace_id');
      }
    }
  };

  const handleRerunAnalysis = (id) => {
    if (role === 'Viewer') {
      alert("Permission Denied: Viewers cannot trigger data re-analysis.");
      return;
    }
    setReanalysisWorkspaceId(id);
  };

  const handleImportDataset = (id) => {
    if (role === 'Viewer') {
      alert("Permission Denied: Viewers cannot import datasets.");
      return;
    }
    setImportWorkspaceId(id);
  };

  const handleResetWorkspace = () => {
    localStorage.removeItem('xeno_workspaces');
    localStorage.removeItem('xeno_active_workspace_id');
    setWorkspaces([]);
    setActiveWorkspaceId('');
    navigate('/dashboard');
  };

  // Floating Copilot AI engine
  const simulateAiResponse = (userText) => {
    setIsFloatingAiTyping(true);
    setTimeout(() => {
      setIsFloatingAiTyping(false);
      let replyText = "Analyzing your marketing records... I suggest optimizing communication channels. WhatsApp read rates are averaging 72% compared to 22% on Email for active segments.";
      let actionObj = null;

      const normText = userText.toLowerCase();
      if (normText.includes('target')) {
        replyText = "Based on current purchase intervals, I recommend targeting the 324 inactive customers cohort. They represent ₹1,20,000 in potential recoverable revenue. I've drafted a win-back campaign offer targeting WhatsApp.";
        actionObj = { label: "Configure Win-Back Campaign", prompt: "Bring back 324 inactive customers who haven't purchased in over 90 days with a win-back offer." };
      } else if (normText.includes('campaign') || normText.includes('launch')) {
        replyText = "A VIP Early Access clearance is highly recommended. 150 VIP customers spent over ₹10,000 last month. Promoting an exclusive pre-sale WhatsApp message has an expected conversion rate of 28.6%.";
        actionObj = { label: "Draft VIP Early Access", prompt: "Draft an early access campaign for 150 VIP customers who spent more than ₹10,050 last month." };
      } else if (normText.includes('churn') || normText.includes('risk')) {
        replyText = "We detected 185 at-risk customers whose purchasing frequency decreased by 45%. We suggest running an Email re-engagement campaign with an exclusive discount code.";
        actionObj = { label: "Draft Re-engagement Campaign", prompt: "Draft a high-converting retention campaign for 185 at-risk customers." };
      }

      setFloatingChatLogs(prev => [
        ...prev,
        {
          sender: 'ai',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: actionObj
        }
      ]);
    }, 1200);
  };

  const handleSendChip = (chipText) => {
    const userMsg = {
      sender: 'user',
      text: chipText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setFloatingChatLogs(prev => [...prev, userMsg]);
    simulateAiResponse(chipText);
  };

  const handleFloatingSubmit = (e) => {
    e.preventDefault();
    if (!floatingInput.trim()) return;

    const userMsg = {
      sender: 'user',
      text: floatingInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setFloatingChatLogs(prev => [...prev, userMsg]);
    const input = floatingInput;
    setFloatingInput('');
    simulateAiResponse(input);
  };

  // Background Simulator Engine
  useEffect(() => {
    if (isPaused || workspaces.length === 0 || !activeWorkspaceId) return;

    const interval = setInterval(() => {
      const runningCamps = campaigns.filter(c => c.status === 'Running');
      if (runningCamps.length === 0) return;

      const selectedCamp = runningCamps[Math.floor(Math.random() * runningCamps.length)];
      if (customers.length === 0) return;
      const randomCust = customers[Math.floor(Math.random() * customers.length)];
      
      const rand = Math.random();
      let eventType = 'Delivered';
      let logMsg = '';

      if (rand < 0.1) {
        eventType = 'Failed';
        logMsg = `Outbound dispatch failed to ${randomCust.name} (${randomCust.phone}) due to Carrier Timeout.`;
      } else if (rand >= 0.1 && rand < 0.45) {
        eventType = 'Read';
        logMsg = `${randomCust.name} read "${selectedCamp.name}" template message via ${selectedCamp.channel}.`;
      } else if (rand >= 0.45 && rand < 0.75) {
        eventType = 'Clicked';
        logMsg = `${randomCust.name} clicked link in "${selectedCamp.name}" dispatch.`;
      } else if (rand >= 0.75) {
        eventType = 'Converted';
        const orderValue = Math.floor(Math.random() * (3500 - 800 + 1)) + 800;
        logMsg = `${randomCust.name} converted! Order confirmed: ₹${orderValue.toLocaleString()} generated via ${selectedCamp.channel}.`;
        
        // Update client customer object details & timeline
        setCustomers(prev => prev.map(cust => {
          if (cust.id === randomCust.id) {
            const nowIso = new Date().toISOString();
            const newTimelineBlock = {
              id: `live-timeline-${Date.now()}`,
              campaignName: selectedCamp.name,
              channel: selectedCamp.channel,
              events: [
                { type: 'Converted Order', timestamp: nowIso, status: 'completed', value: `₹${orderValue}` },
                { type: 'Clicked Link', timestamp: new Date(Date.now() - 60000).toISOString(), status: 'completed' },
                { type: 'Opened/Read', timestamp: new Date(Date.now() - 120000).toISOString(), status: 'completed' },
                { type: 'Delivered', timestamp: new Date(Date.now() - 180000).toISOString(), status: 'completed' },
                { type: 'Message Sent', timestamp: new Date(Date.now() - 182000).toISOString(), status: 'completed' }
              ]
            };
            return {
              ...cust,
              totalOrders: cust.totalOrders + 1,
              totalSpend: cust.totalSpend + orderValue,
              clv: Math.floor((cust.totalSpend + orderValue) * 1.3),
              lastPurchaseDate: nowIso.split('T')[0],
              timeline: [newTimelineBlock, ...cust.timeline]
            };
          }
          return cust;
        }));

        // Update overall Global KPIs
        setKpis(prev => {
          const revVal = parseInt(prev.totalRevenue.value.replace(/[^0-9]/g, '')) + orderValue;
          const campRevVal = parseInt(prev.campaignRevenue.value.replace(/[^0-9]/g, '')) + orderValue;
          
          return {
            ...prev,
            totalRevenue: { ...prev.totalRevenue, value: `₹${revVal.toLocaleString()}` },
            campaignRevenue: { ...prev.campaignRevenue, value: `₹${campRevVal.toLocaleString()}` }
          };
        });

        // Trigger conversion anomaly notification occasionally
        if (Math.random() > 0.7) {
          addNotification(`Conversion spike detected: ${randomCust.name} purchased ₹${orderValue.toLocaleString()}`, 'success');
        }
      } else {
        logMsg = `Delivered "${selectedCamp.name}" dispatch to ${randomCust.name}.`;
      }

      // 1. Update Sim Metrics
      setSimMetrics(prev => {
        const next = { ...prev };
        if (eventType === 'Failed') next.failed += 1;
        else {
          next.sent += 1;
          next.delivered += 1;
          if (eventType === 'Read') next.read += 1;
          if (eventType === 'Clicked') next.clicked += 1;
          if (eventType === 'Converted') {
            next.read += 1;
            next.clicked += 1;
            next.converted += 1;
          }
        }
        return next;
      });

      // 2. Append Live Simulation Log
      setSimLogs(prev => [
        {
          id: `log-${Date.now()}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          type: eventType,
          channel: selectedCamp.channel,
          message: logMsg,
          campaign: selectedCamp.name.substring(0, 18),
          campaignId: selectedCamp.id,
          customerId: randomCust.id,
          customerName: randomCust.name,
          campaignName: selectedCamp.name,
          timestamp: new Date().toISOString()
        },
        ...prev.slice(0, 49)
      ]);

      // 3. Update campaign metrics dynamically inside the active list
      setCampaigns(prev => prev.map(camp => {
        if (camp.id === selectedCamp.id) {
          const nextMetrics = { ...camp.metrics };
          if (eventType !== 'Failed') {
            nextMetrics.sent += 1;
            nextMetrics.delivered += 1;
            if (eventType === 'Read') nextMetrics.read += 1;
            if (eventType === 'Clicked') nextMetrics.clicked += 1;
            if (eventType === 'Converted') {
              nextMetrics.read += 1;
              nextMetrics.clicked += 1;
              nextMetrics.converted += 1;
              const revenueAdd = Math.floor(Math.random() * (1800 - 900)) + 900;
              nextMetrics.revenue += revenueAdd;
            }
          }
          return { ...camp, metrics: nextMetrics };
        }
        return camp;
      }));

    }, simSpeed * 1000);

    return () => clearInterval(interval);
  }, [campaigns, customers, isPaused, simSpeed, workspaces, activeWorkspaceId]);

  // View Navigation Helpers
  const handleNavigateView = (viewId) => {
    if (viewId === 'dashboard') {
      navigate('/dashboard');
    } else {
      navigate(`/dashboard/${viewId}`);
    }
  };

  const handleLaunchNewCampaign = (newCamp) => {
    if (role === 'Viewer') {
      alert("Permission Denied: Viewers cannot launch campaigns.");
      return;
    }
    if (role === 'Analyst') {
      alert("Permission Denied: Analysts are restricted to data modeling. Campaign creation is disabled.");
      return;
    }

    const freshCampaign = {
      id: newCamp.id || `CAMP-${100 + campaigns.length + 1}`,
      name: newCamp.name,
      segment: newCamp.segment,
      channel: newCamp.channel,
      status: newCamp.status || 'Running',
      createdBy: newCamp.createdBy || (user?.firstName ? `${user.firstName} ${user.lastName}` : 'Admin'),
      createdDate: new Date().toISOString().split('T')[0],
      message: newCamp.message,
      metrics: newCamp.metrics || { sent: 0, delivered: 0, read: 0, clicked: 0, converted: 0, revenue: 0 },
      originSegment: newCamp.segment,
      recommendedChannel: newCamp.channel,
      predictedRoi: newCamp.predictedRoi || '4.8x',
      expectedRevenue: newCamp.expectedRevenue || 120000
    };

    setCampaigns(prev => [freshCampaign, ...prev]);
    setCopilotPrompt('');
    addNotification(`Campaign "${newCamp.name}" launched successfully!`, 'success');
    navigate('/dashboard/campaigns');
  };

  // If no workspaces exist, render the onboarding flow inline
  if (workspaces.length === 0) {
    return (
      <OnboardingWizard 
        onComplete={handleOnboardingComplete}
      />
    );
  }

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-[#faf8ff] bg-dot-pattern bg-grid-subtle text-gray-800 font-sans">
      
      {/* Ambient Empty Space Particles */}
      <div className="ambient-particles-container">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i} 
            className="ambient-dot" 
            style={{ 
              width: `${Math.random() * 4 + 2}px`, 
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 15}s`
            }} 
          />
        ))}
      </div>

      {/* 1. Sidebar Left */}
      <Sidebar 
        currentView={currentView}
        onViewChange={handleNavigateView}
        onLogout={onBack}
        user={user}
        workspace={activeWorkspace}
        onResetWorkspace={handleResetWorkspace}
        unreadNotificationCount={notifications.filter(n => !n.read).length}
      />

      {/* Right Column Container */}
      <div className="flex-1 min-w-0 h-full flex flex-col relative overflow-hidden">
        
        {/* 2. Top Header Navbar */}
        <TopHeader 
          user={user}
          onSearch={(val) => console.log('Searching for:', val)}
          onOpenCopilot={() => navigate('/dashboard/copilot')}
          workspace={activeWorkspace}
          workspaces={workspaces}
          onSelectWorkspace={handleSelectWorkspace}
          onCreateWorkspace={handleCreateWorkspace}
          onRenameWorkspace={handleRenameWorkspace}
          onDeleteWorkspace={handleDeleteWorkspace}
          onDuplicateWorkspace={handleDuplicateWorkspace}
          onArchiveWorkspace={handleArchiveWorkspace}
          onRerunAnalysis={handleRerunAnalysis}
          onImportDataset={handleImportDataset}
          role={role}
          onChangeRole={handleRoleChange}
          notifications={notifications}
          onDismissNotification={handleDismissNotification}
          onClearAllNotifications={handleClearAllNotifications}
        />

        {/* 3. Main Workspace Area */}
        <main className="flex-1 min-h-0 p-8 overflow-y-auto custom-scrollbar relative z-10">
          <Routes>
            <Route 
              path="/" 
              element={
                <DashboardOverview 
                  onNavigateToView={handleNavigateView}
                  onGenerateCampaign={(text) => {
                    setCopilotPrompt(text);
                    navigate('/dashboard/copilot');
                  }}
                  kpis={kpis}
                  simMetrics={simMetrics}
                  workspace={activeWorkspace}
                  timestamps={workspaceTimestamps}
                  logs={simLogs}
                  campaigns={campaigns}
                  role={role}
                />
              } 
            />

            <Route 
              path="insights"
              element={
                <AiInsightsHub 
                  onNavigateToView={handleNavigateView}
                  onGenerateCampaign={(text) => {
                    setCopilotPrompt(text);
                    navigate('/dashboard/copilot');
                  }}
                  role={role}
                />
              }
            />

            <Route 
              path="customers" 
              element={
                <CustomersPage 
                  customers={customers}
                  activeCustomerId={activeCustomerId}
                  clearActiveCustomerId={() => setActiveCustomerId(null)}
                />
              } 
            />

            <Route 
              path="segments" 
              element={
                <SegmentsPage 
                  onNavigateToView={handleNavigateView}
                  onGenerateCampaign={(text) => {
                    setCopilotPrompt(text);
                    navigate('/dashboard/copilot');
                  }}
                  customers={customers}
                />
              } 
            />

            <Route 
              path="copilot" 
              element={
                <AiCopilotPage 
                  initialPrompt={copilotPrompt}
                  onLaunchCampaign={handleLaunchNewCampaign}
                  role={role}
                />
              } 
            />

            <Route 
              path="campaigns" 
              element={
                <CampaignsPage 
                  campaigns={campaigns}
                  activeCampaignId={activeCampaignId}
                  clearActiveCampaignId={() => setActiveCampaignId(null)}
                />
              } 
            />

            <Route 
              path="analytics" 
              element={<AnalyticsPage campaigns={campaigns} />} 
            />

            <Route 
              path="simulator" 
              element={
                <CampaignActivityCenter 
                  metrics={simMetrics}
                  logs={simLogs}
                  onClearLogs={() => setSimLogs([])}
                  isPaused={isPaused}
                  onTogglePause={() => setIsPaused(!isPaused)}
                  speed={simSpeed}
                  onToggleSpeed={() => setSimSpeed(prev => prev === 2 ? 4 : prev === 4 ? 6 : 2)}
                  onOpenCampaign={(campId) => {
                    setActiveCampaignId(campId);
                    navigate('/dashboard/campaigns');
                  }}
                  onOpenCustomer={(custId) => {
                    setActiveCustomerId(custId);
                    navigate('/dashboard/customers');
                  }}
                />
              } 
            />

            <Route 
              path="settings" 
              element={
                <SettingsPage 
                  onResetWorkspace={handleResetWorkspace}
                  workspace={activeWorkspace}
                  timestamps={workspaceTimestamps}
                  onImport={() => handleImportDataset(activeWorkspaceId)}
                  onAnalyze={() => handleRerunAnalysis(activeWorkspaceId)}
                  role={role}
                  onRenameWorkspace={handleRenameWorkspace}
                  onDeleteWorkspace={handleDeleteWorkspace}
                  onDuplicateWorkspace={handleDuplicateWorkspace}
                  onArchiveWorkspace={handleArchiveWorkspace}
                />
              } 
            />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>

      {/* Background Ambient Glow Nodes */}
      <div className="glow-node bg-indigo-500/10 w-[500px] h-[500px] -top-40 -left-40 pointer-events-none" />
      <div className="glow-node bg-purple-500/10 w-[600px] h-[600px] bottom-10 right-20 pointer-events-none" />
      <div className="glow-node bg-cyan-400/5 w-[400px] h-[400px] top-1/2 left-1/3 pointer-events-none" />

      {/* Onboarding Wizard Modal Backdrop (For creating workspace from top bar) */}
      {isCreatingNewWorkspace && (
        <div className="fixed inset-0 z-50 bg-gray-950/40 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <OnboardingWizard 
            onComplete={handleOnboardingComplete}
            onCancel={() => setIsCreatingNewWorkspace(false)}
          />
        </div>
      )}

      {/* Re-analysis Simulation Wizard Modal */}
      {reanalysisWorkspaceId && (
        <div className="fixed inset-0 z-50 bg-gray-950/40 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <OnboardingWizard 
            initialStep={3}
            onComplete={() => {
              setWorkspaceTimestamps(prev => ({
                ...prev,
                lastAnalysis: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
                lastRefresh: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today'
              }));
              addNotification('AI behavioral models successfully re-compiled.', 'success');
              setReanalysisWorkspaceId(null);
            }}
            onCancel={() => setReanalysisWorkspaceId(null)}
          />
        </div>
      )}

      {/* Dataset Import Simulation Wizard Modal */}
      {importWorkspaceId && (
        <div className="fixed inset-0 z-50 bg-gray-950/40 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <OnboardingWizard 
            initialStep={2}
            onComplete={() => {
              setWorkspaceTimestamps(prev => ({
                ...prev,
                lastUpload: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
                lastAnalysis: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
                lastRefresh: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today'
              }));
              addNotification('New dataset successfully imported and merged.', 'success');
              setImportWorkspaceId(null);
            }}
            onCancel={() => setImportWorkspaceId(null)}
          />
        </div>
      )}

      {/* Globally Docked Floating AI Copilot */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end group">
        {/* Floating Chat Box */}
        {isFloatingCopilotOpen && (
          <div className="glass-panel w-80 md:w-96 h-[450px] mb-4 rounded-[2rem] border border-indigo-100 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
            {/* Header */}
            <div className="bg-indigo-950 text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-cyan-400 animate-pulse">smart_toy</span>
                <span className="text-xs font-black tracking-wider uppercase">Xeno AI Assistant</span>
              </div>
              <button 
                onClick={() => setIsFloatingCopilotOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50/25">
              {floatingChatLogs.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white border border-gray-150 text-gray-800 rounded-tl-none'
                  }`}>
                    {msg.text}
                    {msg.action && (
                      <button
                        onClick={() => {
                          setCopilotPrompt(msg.action.prompt);
                          navigate('/dashboard/copilot');
                          setIsFloatingCopilotOpen(false);
                        }}
                        className="mt-3 w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-705 font-black text-[10px] rounded-lg transition-colors flex items-center justify-center gap-1 border border-indigo-100"
                      >
                        <span className="material-symbols-outlined text-[12px]">rocket_launch</span>
                        {msg.action.label}
                      </button>
                    )}
                  </div>
                  <span className="text-[9px] text-gray-400 font-bold mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
              {isFloatingAiTyping && (
                <div className="flex items-center gap-1 bg-white border border-gray-150 p-3 rounded-2xl rounded-tl-none w-20 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              )}
            </div>

            {/* Suggestion chips */}
            {floatingChatLogs.length <= 1 && !isFloatingAiTyping && (
              <div className="px-4 py-2 border-t border-gray-100 bg-white/50 flex flex-wrap gap-1.5">
                <button 
                  onClick={() => handleSendChip("Who should I target this week?")}
                  className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg px-2.5 py-1.5 hover:bg-indigo-100 transition-colors"
                >
                  Who to target?
                </button>
                <button 
                  onClick={() => handleSendChip("What campaign should I launch?")}
                  className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg px-2.5 py-1.5 hover:bg-indigo-100 transition-colors"
                >
                  What to launch?
                </button>
                <button 
                  onClick={() => handleSendChip("Show customers likely to churn.")}
                  className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg px-2.5 py-1.5 hover:bg-indigo-100 transition-colors"
                >
                  Show churn risk
                </button>
              </div>
            )}

            {/* Input Bar */}
            <form onSubmit={handleFloatingSubmit} className="p-3 border-t border-gray-150 bg-white flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask AI Copilot..."
                value={floatingInput}
                onChange={(e) => setFloatingInput(e.target.value)}
                className="flex-1 px-3.5 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
              <button
                type="submit"
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-indigo-650 hover:bg-indigo-800 text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              </button>
            </form>
          </div>
        )}

        {/* Floating Action Button */}
        <div className="relative">
          <button
            onClick={() => setIsFloatingCopilotOpen(!isFloatingCopilotOpen)}
            className={`premium-hover-lift w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_12px_24px_rgba(79,70,229,0.3)] transition-transform border-none relative overflow-hidden group/fab floating-1 ${
              isFloatingCopilotOpen ? 'bg-indigo-950' : 'bg-gradient-to-tr from-indigo-600 via-indigo-755 to-purple-600'
            }`}
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover/fab:opacity-100 transition-opacity rounded-full"></span>
            
            {isFloatingCopilotOpen ? (
              <span className="material-symbols-outlined text-[24px] relative z-10">close</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[24px] animate-pulse relative z-10">smart_toy</span>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 border-2 border-white rounded-full z-10 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
              </>
            )}
          </button>
          
          {/* Tooltip */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
            {isFloatingCopilotOpen ? 'Close AI Assistant' : 'Ask AI Copilot'}
            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-gray-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
