import React, { useState } from 'react';

export default function SettingsPage({ settings = {}, setSettings }) {
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
  const [showApiKeyIdx, setShowApiKeyIdx] = useState(null);

  const subTabs = [
    { id: 'profile', label: 'Profile Settings', icon: 'person' },
    { id: 'workspace', label: 'Workspace details', icon: 'business_center' },
    { id: 'team', label: 'Team Members', icon: 'group' },
    { id: 'keys', label: 'API Credentials', icon: 'key' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'billing', label: 'Billing & Plans', icon: 'payments' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 select-none">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-gray-800 tracking-tight mb-2">Workspace Settings</h2>
        <p className="text-gray-500 text-sm">Manage profile credentials, team access scopes, and billing accounts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Sub-navigation Tabs */}
        <div className="lg:col-span-3 bg-white border border-gray-200/60 rounded-3xl p-4 shadow-sm flex flex-col gap-1 h-fit">
          {subTabs.map(tab => {
            const isTabActive = activeSettingsTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSettingsTab(tab.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  isTabActive 
                    ? 'bg-indigo-50/70 text-indigo-600 border border-indigo-100/40' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right Settings panel details */}
        <div className="lg:col-span-9 bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm min-h-[400px]">
          
          {/* TAB: Profile */}
          {activeSettingsTab === 'profile' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-2">Profile Information</h3>
                <p className="text-xs text-gray-400 mt-1">Configure your personal credentials and time-zone preferences.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-semibold text-gray-700">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    defaultValue={settings.profile.name}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    defaultValue={settings.profile.email}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Role Scope</label>
                  <input
                    type="text"
                    defaultValue={settings.profile.role}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                    disabled
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Timezone</label>
                  <select
                    defaultValue={settings.profile.tz}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-650"
                  >
                    <option>{settings.profile.tz}</option>
                    <option>GMT (UTC+0)</option>
                    <option>US Eastern Time (EST)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button className="bg-indigo-650 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-sm">
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {/* TAB: Workspace */}
          {activeSettingsTab === 'workspace' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-2">Workspace Configurations</h3>
                <p className="text-xs text-gray-400 mt-1">Configure company domains, currencies, and workspace flags.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-semibold text-gray-700">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Workspace Name</label>
                  <input
                    type="text"
                    defaultValue={settings.workspace.name}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Workspace Domain</label>
                  <input
                    type="text"
                    defaultValue={settings.workspace.domain}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Default Currency</label>
                  <input
                    type="text"
                    defaultValue={settings.workspace.currency}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">System Locale</label>
                  <input
                    type="text"
                    defaultValue={settings.workspace.locale}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button className="bg-indigo-650 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-sm">
                  Save Configurations
                </button>
              </div>
            </div>
          )}

          {/* TAB: Team */}
          {activeSettingsTab === 'team' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-800">Team Access Control</h3>
                  <p className="text-xs text-gray-400 mt-1">Manage colleague access permissions, roles, and invite statuses.</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-md">
                  Invite Member
                </button>
              </div>

              <div className="overflow-x-auto border border-gray-150 rounded-2xl text-xs font-semibold">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email Address</th>
                      <th className="py-3 px-4">Role Assigned</th>
                      <th className="py-3 px-4 text-right pr-4">Access Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-650">
                    {settings.team.map((mem, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="py-3 px-4 font-bold text-gray-800">{mem.name}</td>
                        <td className="py-3 px-4 text-gray-500">{mem.email}</td>
                        <td className="py-3 px-4 text-gray-500">{mem.role}</td>
                        <td className="py-3 px-4 text-right pr-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            mem.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                          }`}>
                            {mem.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: Keys */}
          {activeSettingsTab === 'keys' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-800">API Credentials</h3>
                  <p className="text-xs text-gray-400 mt-1">Authenticate webhook endpoints and external dispatch nodes.</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-md">
                  Create Key
                </button>
              </div>

              <div className="space-y-3">
                {settings.apiKeys.map((keyObj, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 border border-gray-150 rounded-2xl text-xs space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-gray-800">{keyObj.name}</span>
                      <span className="text-[10px] text-gray-400 font-semibold">Created {keyObj.created}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Masked Key */}
                      <code className="bg-gray-900 text-indigo-400 p-2.5 rounded-xl font-mono text-[10px] flex-1 block overflow-x-auto select-all">
                        {showApiKeyIdx === idx ? "xn_live_948fha092hf842hfac0d81nf02hfh" : keyObj.key}
                      </code>
                      
                      <button
                        onClick={() => setShowApiKeyIdx(showApiKeyIdx === idx ? null : idx)}
                        className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-650 p-2 rounded-xl"
                      >
                        <span className="material-symbols-outlined text-[16px] block">
                          {showApiKeyIdx === idx ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Notifications */}
          {activeSettingsTab === 'notifications' && (
            <div className="space-y-6 max-w-xl text-xs font-semibold text-gray-700">
              <div>
                <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-2">Notification Preferences</h3>
                <p className="text-xs text-gray-400 mt-1">Select what platform webhook triggers send alerts to your terminal.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-2xl">
                  <div>
                    <span className="text-gray-800 font-bold block">Campaign Completion Alerts</span>
                    <span className="text-[10px] text-gray-400 block font-semibold">Notify when dispatch logs finish or carriers timeout.</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-indigo-650" />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-2xl">
                  <div>
                    <span className="text-gray-800 font-bold block">AI Growth Strategist Tips</span>
                    <span className="text-[10px] text-gray-400 block font-semibold">Receive weekly AI-generated suggestions.</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-indigo-650" />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-2xl">
                  <div>
                    <span className="text-gray-800 font-bold block">Billing Alerts</span>
                    <span className="text-[10px] text-gray-400 block font-semibold">Notify me before quota billing renewals.</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-indigo-650" />
                </div>
              </div>
            </div>
          )}

          {/* TAB: Billing */}
          {activeSettingsTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-2">Billing & Plan</h3>
                <p className="text-xs text-gray-400 mt-1">Check workspace subscription parameters and download invoices.</p>
              </div>

              {/* Active Plan details */}
              <div className="bg-gradient-to-r from-indigo-500 to-pink-500 rounded-3xl p-5 text-white flex justify-between items-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-1 relative z-10">
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest">Active subscription</span>
                  <h4 className="text-lg font-black tracking-tight">AI Strategist Enterprise Pro</h4>
                  <p className="text-[10px] text-indigo-100 font-semibold">Renewing automatically on July 14, 2026</p>
                </div>
                <div className="text-right relative z-10">
                  <strong className="text-2xl font-black block">₹24,500<span className="text-xs font-normal">/mo</span></strong>
                  <button className="bg-white text-indigo-600 font-bold px-3 py-1.5 rounded-xl text-[10px] mt-2 shadow transition-transform hover:scale-105">Change Plan</button>
                </div>
              </div>

              {/* Invoices list */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-150 pb-1">Historical Invoices</h4>
                <div className="border border-gray-150 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        <th className="py-2.5 px-4">Invoice ID</th>
                        <th className="py-2.5 px-4">Billing Period</th>
                        <th className="py-2.5 px-4">Amount</th>
                        <th className="py-2.5 px-4 text-right pr-4">Invoice PDF</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-gray-650 font-semibold">
                      <tr className="hover:bg-gray-50/50">
                        <td className="py-2.5 px-4 font-bold text-gray-800">INV-2026-005</td>
                        <td className="py-2.5 px-4 text-gray-450">May 14 - Jun 14, 2026</td>
                        <td className="py-2.5 px-4 text-gray-800">₹24,500</td>
                        <td className="py-2.5 px-4 text-right pr-4 text-indigo-600 hover:underline cursor-pointer">Download</td>
                      </tr>
                      <tr className="hover:bg-gray-50/50">
                        <td className="py-2.5 px-4 font-bold text-gray-800">INV-2026-004</td>
                        <td className="py-2.5 px-4 text-gray-450">Apr 14 - May 14, 2026</td>
                        <td className="py-2.5 px-4 text-gray-800">₹24,500</td>
                        <td className="py-2.5 px-4 text-right pr-4 text-indigo-600 hover:underline cursor-pointer">Download</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
