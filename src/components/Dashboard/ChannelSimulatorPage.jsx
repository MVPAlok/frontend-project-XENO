import React, { useState, useEffect, useRef } from 'react';

export default function ChannelSimulatorPage({ logs = [], setLogs }) {
  const [isPaused, setIsPaused] = useState(false);
  const [simSpeed, setSimSpeed] = useState(2000); // ms between logs
  const terminalEndRef = useRef(null);

  // Auto-scroll terminal to bottom when new logs print
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Live simulation background loop
  useEffect(() => {
    if (isPaused) return;

    const names = ["Aarav Sharma", "Sarah D'souza", "Kabir Mehta", "Ananya Iyer", "Rohan Verma", "Priya Nair", "Aditya Goel", "Meera Sen", "Vikram Malhotra", "Riya Kapoor"];
    const channels = ["WhatsApp", "SMS", "Email", "RCS"];
    const statuses = ["SENT", "DELIVERED", "OPENED", "CLICKED", "PURCHASED", "FAILED"];

    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomChannel = channels[Math.floor(Math.random() * channels.length)];
      
      // Weight statuses so SENT/DELIVERED/OPENED are most common, PURCHASED is rare
      const rand = Math.random();
      let status = "SENT";
      if (rand > 0.95) status = "PURCHASED";
      else if (rand > 0.8) status = "CLICKED";
      else if (rand > 0.4) status = "OPENED";
      else if (rand > 0.1) status = "DELIVERED";
      else if (rand > 0.05) status = "FAILED";

      const time = new Date().toLocaleTimeString();
      const newLog = {
        time,
        name: randomName,
        channel: randomChannel,
        status,
        latency: `${Math.floor(Math.random() * 80) + 20}ms`,
        details: status === "PURCHASED" 
          ? `Cart conversion verified. Ticket value: ₹${Math.floor(Math.random() * 8000) + 1200}`
          : status === "FAILED" 
          ? "Carrier timeout error. Attempting automatically retry in 5s." 
          : `API callback response 200 OK.`
      };

      setLogs(prev => [...prev.slice(-99), newLog]); // Keep last 100 logs
    }, simSpeed);

    return () => clearInterval(interval);
  }, [isPaused, simSpeed, setLogs]);

  // Deliverability calculations
  const totalLogs = logs.length || 1;
  const deliveryRate = ((logs.filter(l => l.status !== 'FAILED').length / totalLogs) * 100).toFixed(1);
  const clickRate = ((logs.filter(l => l.status === 'CLICKED' || l.status === 'PURCHASED').length / totalLogs) * 100).toFixed(1);
  const conversionRate = ((logs.filter(l => l.status === 'PURCHASED').length / totalLogs) * 100).toFixed(1);

  const getStatusColor = (status) => {
    switch (status) {
      case 'SENT': return 'text-gray-400';
      case 'DELIVERED': return 'text-blue-400';
      case 'OPENED': return 'text-purple-400';
      case 'CLICKED': return 'text-pink-400';
      case 'PURCHASED': return 'text-emerald-400 font-extrabold';
      case 'FAILED': return 'text-red-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 select-none">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-gray-800 tracking-tight mb-2">Channel Simulator Center</h2>
        <p className="text-gray-500 text-sm">Monitor live communication gateway calls, delivery logs, and webhook callbacks in real-time.</p>
      </div>

      {/* Simulator Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Simulator Status</span>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 animate-ping'}`} />
            <strong className="text-lg font-black text-gray-850">{isPaused ? 'PAUSED' : 'LIVE EMULATION'}</strong>
          </div>
        </div>
        <div className="bg-white border border-gray-200/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Gateway Success Rate</span>
          <strong className="text-2xl font-black text-emerald-500">{deliveryRate}%</strong>
        </div>
        <div className="bg-white border border-gray-200/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Retry Attempts</span>
          <strong className="text-2xl font-black text-gray-800">
            {logs.filter(l => l.status === 'FAILED').length} (Auto-retry)
          </strong>
        </div>
        <div className="bg-white border border-gray-200/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Simulated Conversions</span>
          <strong className="text-2xl font-black text-indigo-600">
            {logs.filter(l => l.status === 'PURCHASED').length} checkouts
          </strong>
        </div>
      </div>

      {/* Live Operations Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Scrolling logs terminal */}
        <div className="lg:col-span-8 bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between min-h-[500px]">
          
          {/* Terminal header */}
          <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-mono text-gray-500 ml-2">xeno-dispatcher-node-1</span>
            </div>
            
            {/* Controls */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="bg-gray-800 hover:bg-gray-750 text-[10px] font-mono font-bold text-gray-300 px-3 py-1.5 rounded-lg border border-gray-700 transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">{isPaused ? 'play_arrow' : 'pause'}</span>
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button
                onClick={() => setLogs([])}
                className="bg-gray-800 hover:bg-gray-750 text-[10px] font-mono font-bold text-gray-300 px-3 py-1.5 rounded-lg border border-gray-700 transition-colors"
              >
                Clear
              </button>
              <select
                value={simSpeed}
                onChange={(e) => setSimSpeed(Number(e.target.value))}
                className="bg-gray-800 border border-gray-700 text-[10px] font-mono text-gray-300 rounded-lg px-2 py-1"
              >
                <option value="1000">1.0s Speed</option>
                <option value="2000">2.0s Speed</option>
                <option value="4000">4.0s Speed</option>
              </select>
            </div>
          </div>

          {/* Scrolling Terminal Body */}
          <div className="flex-1 overflow-y-auto font-mono text-[11px] space-y-2.5 h-[350px] pr-2 scrollbar-thin scrollbar-thumb-gray-800">
            {logs.length === 0 ? (
              <div className="text-gray-600 text-center py-24 italic">
                Initializing dispatcher listeners... Waiting for first simulation event pulse.
              </div>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className="hover:bg-gray-850/45 p-1.5 rounded transition-colors flex items-start gap-2 leading-relaxed">
                  <span className="text-gray-500">[{log.time}]</span>
                  <span className="text-indigo-400">[{log.channel.toUpperCase()}]</span>
                  <span className={getStatusColor(log.status)}>[{log.status}]</span>
                  <span className="text-gray-300 font-bold">{log.name}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400 flex-1">{log.details}</span>
                  <span className="text-[10px] text-gray-600 shrink-0 font-bold font-sans bg-gray-800 px-1.5 py-0.5 rounded">{log.latency}</span>
                </div>
              ))
            )}
            <div ref={terminalEndRef} />
          </div>

        </div>

        {/* Webhook Callback Monitor */}
        <div className="lg:col-span-4 bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-bold text-gray-800 tracking-tight mb-1">Webhook Callbacks</h4>
              <p className="text-xs font-semibold text-gray-400">Dispatcher webhooks and carrier status registers</p>
            </div>

            <div className="space-y-4">
              {/* Webhook Status 1 */}
              <div className="bg-gray-50 p-3.5 border border-gray-150 rounded-2xl text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">WhatsApp Webhook URL</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <p className="text-gray-400 font-semibold text-[10px]">Endpoint: https://api.xeno.ai/v4/webhooks/whatsapp</p>
                <div className="flex justify-between pt-1 text-[10px] text-gray-500 font-bold">
                  <span>Ping: 22ms</span>
                  <span>Health: 99.8%</span>
                </div>
              </div>

              {/* Webhook Status 2 */}
              <div className="bg-gray-50 p-3.5 border border-gray-150 rounded-2xl text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">SES Event Destinations</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <p className="text-gray-400 font-semibold text-[10px]">Endpoint: aws-sns://xeno-ses-events-prod</p>
                <div className="flex justify-between pt-1 text-[10px] text-gray-500 font-bold">
                  <span>Ping: 45ms</span>
                  <span>Health: 100.0%</span>
                </div>
              </div>

              {/* Webhook Status 3 */}
              <div className="bg-gray-50 p-3.5 border border-gray-150 rounded-2xl text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">Twilio Status Callback</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <p className="text-gray-400 font-semibold text-[10px]">Endpoint: https://api.xeno.ai/v4/webhooks/twilio</p>
                <div className="flex justify-between pt-1 text-[10px] text-gray-500 font-bold">
                  <span>Ping: 88ms</span>
                  <span>Health: 99.1%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 text-[10px] font-bold text-gray-400">
            * All carrier statuses are simulated under compliance standards.
          </div>

        </div>

      </div>

    </div>
  );
}
