import React, { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('brand');
  const [brandName, setBrandName] = useState('Acme Retail Inc.');
  const [currency, setCurrency] = useState('INR (₹)');
  const [defaultDiscount, setDefaultDiscount] = useState('WELCOME20');
  
  // Channels enable/disable toggles
  const [channels, setChannels] = useState({
    whatsapp: true,
    email: true,
    sms: true,
    rcs: false,
  });

  // AI Temperature/creativity sliders
  const [aiSettings, setAiSettings] = useState({
    model: 'gpt-4-turbo',
    temperature: 0.7,
    maxTokens: 500,
  });

  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSavedMessage('Settings successfully saved and synced to Xeno Marketing engine!');
      setTimeout(() => setSavedMessage(null), 3000);
    }, 1000);
  };

  const handleChannelToggle = (key) => {
    setChannels({ ...channels, [key]: !channels[key] });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Save Toast notification */}
      {savedMessage && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 shadow-xl flex items-center gap-2.5 font-bold text-xs animate-in slide-in-from-top duration-300">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-950">Console Settings</h2>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Configure API payloads, AI copywriters, channels, and general brand defaults.</p>
        </div>
        
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white rounded-xl font-bold text-xs shadow-md transition-all hover:scale-[1.01] flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
          ) : (
            <span className="material-symbols-outlined text-[16px]">save</span>
          )}
          <span>Save Configuration</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 gap-6">
        <button
          onClick={() => setActiveTab('brand')}
          className={`pb-3 font-bold text-xs transition-colors relative ${
            activeTab === 'brand' ? 'text-indigo-650' : 'text-gray-450 hover:text-gray-700'
          }`}
        >
          Brand Information
          {activeTab === 'brand' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
        </button>
        <button
          onClick={() => setActiveTab('channels')}
          className={`pb-3 font-bold text-xs transition-colors relative ${
            activeTab === 'channels' ? 'text-indigo-650' : 'text-gray-450 hover:text-gray-700'
          }`}
        >
          Outbound Channels
          {activeTab === 'channels' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`pb-3 font-bold text-xs transition-colors relative ${
            activeTab === 'ai' ? 'text-indigo-650' : 'text-gray-450 hover:text-gray-700'
          }`}
        >
          API & AI Setup
          {activeTab === 'ai' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
        </button>
      </div>

      {/* Settings Panel Body */}
      <div className="bg-white/80 border border-gray-200/60 rounded-[2rem] p-8 shadow-sm">
        
        {/* Tab 1: Brand Info */}
        {activeTab === 'brand' && (
          <form className="space-y-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Brand Profile Defaults</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Registered Brand Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-4 py-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Target Store Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold text-gray-600"
                >
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Campaign Def. Coupon Code</label>
                <input
                  type="text"
                  value={defaultDiscount}
                  onChange={(e) => setDefaultDiscount(e.target.value)}
                  className="w-full px-4 py-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Support Contact Info</label>
                <input
                  type="text"
                  placeholder="support@brand.com"
                  className="w-full px-4 py-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold"
                />
              </div>
            </div>
          </form>
        )}

        {/* Tab 2: Outbound Channels */}
        {activeTab === 'channels' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4 font-sans">Active Communication Channels</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-500 text-[24px]">chat</span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">WhatsApp Marketing Business API</h4>
                    <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">Required for transactional & conversational winbacks. 85% avg read rate.</p>
                  </div>
                </div>
                <button
                  onClick={() => handleChannelToggle('whatsapp')}
                  className={`w-12 h-6.5 rounded-full p-1 transition-colors ${
                    channels.whatsapp ? 'bg-indigo-600 flex justify-end' : 'bg-gray-200 flex justify-start'
                  }`}
                >
                  <div className="w-4.5 h-4.5 rounded-full bg-white shadow-md" />
                </button>
              </div>

              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-indigo-500 text-[24px]">mail</span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Email SMTP Relays (Amazon SES / SendGrid)</h4>
                    <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">Outbound HTML newsletters and seasonal clearance catalogs. 22% avg open rate.</p>
                  </div>
                </div>
                <button
                  onClick={() => handleChannelToggle('email')}
                  className={`w-12 h-6.5 rounded-full p-1 transition-colors ${
                    channels.email ? 'bg-indigo-600 flex justify-end' : 'bg-gray-200 flex justify-start'
                  }`}
                >
                  <div className="w-4.5 h-4.5 rounded-full bg-white shadow-md" />
                </button>
              </div>

              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-500 text-[24px]">sms</span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">SMS Outbound Gateway (Twilio / Plivo)</h4>
                    <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">Fallback transactional dispatch. Fast delivery rates, limited copy constraints.</p>
                  </div>
                </div>
                <button
                  onClick={() => handleChannelToggle('sms')}
                  className={`w-12 h-6.5 rounded-full p-1 transition-colors ${
                    channels.sms ? 'bg-indigo-600 flex justify-end' : 'bg-gray-200 flex justify-start'
                  }`}
                >
                  <div className="w-4.5 h-4.5 rounded-full bg-white shadow-md" />
                </button>
              </div>

              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-2xl bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-pink-500 text-[24px]">forum</span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">RCS Rich Messaging (Google Jibe API)</h4>
                    <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">Dynamic rich carousels and verified sender branding directly on Android devices.</p>
                  </div>
                </div>
                <button
                  onClick={() => handleChannelToggle('rcs')}
                  className={`w-12 h-6.5 rounded-full p-1 transition-colors ${
                    channels.rcs ? 'bg-indigo-600 flex justify-end' : 'bg-gray-200 flex justify-start'
                  }`}
                >
                  <div className="w-4.5 h-4.5 rounded-full bg-white shadow-md" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: API & AI Setup */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">AI Copilot Engine Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-450 uppercase tracking-wider mb-2">Select Core LLM Model</label>
                <select
                  value={aiSettings.model}
                  onChange={(e) => setAiSettings({ ...aiSettings, model: e.target.value })}
                  className="w-full px-4 py-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold text-gray-600"
                >
                  <option value="gpt-4-turbo">GPT-4 Turbo (Optimal for copywrite and reasoning)</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Fast dispatches)</option>
                  <option value="claude-3-opus">Claude 3 Opus (Creative long-form templates)</option>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro (Massive prompt context windows)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-500 mb-2">
                  <span>Creativity Scale (Temperature)</span>
                  <span className="text-indigo-650 font-bold">{aiSettings.temperature}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.2"
                  step="0.1"
                  value={aiSettings.temperature}
                  onChange={(e) => setAiSettings({ ...aiSettings, temperature: parseFloat(e.target.value) })}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <span className="text-[10px] text-gray-400 font-semibold leading-none mt-1.5 block">
                  Higher scale yields more emotional and diverse copy templates. Low values yield uniform, standard corporate messages.
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
