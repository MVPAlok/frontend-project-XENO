import React, { useState } from 'react';

export default function CustomersPage({ customers = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedSpend, setSelectedSpend] = useState('All');
  const [selectedPurchaseDate, setSelectedPurchaseDate] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Filter lists options
  const segmentsList = ['All', 'High Value', 'At Risk', 'New Customer', 'Inactive'];
  const stagesList = ['All', 'Active', 'Idle', 'Churned'];
  const citiesList = ['All', 'Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Pune', 'Kolkata', 'Hyderabad'];
  const spendList = [
    { label: 'All', value: 'All' },
    { label: 'Under ₹5,000', value: '0-5000' },
    { label: '₹5,000 - ₹20,000', value: '5000-20000' },
    { label: '₹20,000 - ₹50,000', value: '20000-50000' },
    { label: 'Above ₹50,000', value: '50000-inf' }
  ];
  const purchaseDateList = [
    { label: 'All Time', value: 'All' },
    { label: 'Last 7 Days', value: '7' },
    { label: 'Last 30 Days', value: '30' },
    { label: 'Last 90 Days', value: '90' },
    { label: 'Over 90 Days Ago', value: '90-inf' }
  ];

  // Perform search & filters
  const filteredCustomers = customers.filter(cust => {
    // Search filter
    const matchesSearch = cust.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cust.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cust.phone.includes(searchTerm);
    if (!matchesSearch) return false;

    // Segment filter
    if (selectedSegment !== 'All' && cust.segment !== selectedSegment) return false;

    // Stage filter
    if (selectedStage !== 'All' && cust.status !== selectedStage) return false;

    // City filter
    if (selectedCity !== 'All' && cust.city !== selectedCity) return false;

    // Spend filter
    if (selectedSpend !== 'All') {
      const [min, max] = selectedSpend.split('-');
      const ltv = cust.ltv;
      if (max === 'inf') {
        if (ltv < parseFloat(min)) return false;
      } else {
        if (ltv < parseFloat(min) || ltv > parseFloat(max)) return false;
      }
    }

    // Purchase date filter
    if (selectedPurchaseDate !== 'All') {
      const diffTime = Math.abs(new Date() - new Date(cust.lastPurchaseDate));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (selectedPurchaseDate === '7' && diffDays > 7) return false;
      if (selectedPurchaseDate === '30' && diffDays > 30) return false;
      if (selectedPurchaseDate === '90' && diffDays > 90) return false;
      if (selectedPurchaseDate === '90-inf' && diffDays <= 90) return false;
    }

    return true;
  });

  // KPI Calculations
  const totalCustomersCount = customers.length;
  const activeCount = customers.filter(c => c.status === 'Active').length;
  const atRiskCount = customers.filter(c => c.segment === 'At Risk').length;
  const highValueCount = customers.filter(c => c.segment === 'High Value').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-gray-800 tracking-tight mb-2">Customer Intelligence Center</h2>
        <p className="text-gray-500 text-sm">Monitor user profile health, drill into behavior attributes, and trigger targeted flows.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Customers */}
        <div className="bg-white border border-gray-200/60 rounded-3xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <span className="material-symbols-outlined text-[24px]">group</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Total Customers</span>
            <span className="text-2xl font-black text-gray-800">{totalCustomersCount * 123}</span>
            <span className="text-[10px] font-bold text-emerald-500 ml-1.5">+12.4% vs last mo</span>
          </div>
        </div>

        {/* Active Customers */}
        <div className="bg-white border border-gray-200/60 rounded-3xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <span className="material-symbols-outlined text-[24px]">check_circle</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Active Customers</span>
            <span className="text-2xl font-black text-gray-800">{activeCount * 110}</span>
            <span className="text-[10px] font-bold text-emerald-500 ml-1.5">+8.6% vs last mo</span>
          </div>
        </div>

        {/* At Risk Customers */}
        <div className="bg-white border border-gray-200/60 rounded-3xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600">
            <span className="material-symbols-outlined text-[24px]">warning</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">At-Risk Customers</span>
            <span className="text-2xl font-black text-gray-800">{atRiskCount * 45}</span>
            <span className="text-[10px] font-bold text-pink-500 ml-1.5">+2.4% vs last mo</span>
          </div>
        </div>

        {/* High Value Customers */}
        <div className="bg-white border border-gray-200/60 rounded-3xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">High Value Customers</span>
            <span className="text-2xl font-black text-gray-800">{highValueCount * 85}</span>
            <span className="text-[10px] font-bold text-emerald-500 ml-1.5">+14.2% vs last mo</span>
          </div>
        </div>
      </div>

      {/* Search and Filters Panel */}
      <div className="bg-white border border-gray-200/60 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold text-gray-700 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          
          <div className="text-xs font-bold text-gray-400">
            Showing {filteredCustomers.length} of {customers.length} records
          </div>
        </div>

        {/* Filters grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {/* Filter Segment */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Segment Tag</label>
            <select
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none"
            >
              {segmentsList.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          {/* Filter Lifecycle */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Lifecycle Stage</label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none"
            >
              {stagesList.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          {/* Filter City */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none"
            >
              {citiesList.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          {/* Filter Spend */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Total Spend</label>
            <select
              value={selectedSpend}
              onChange={(e) => setSelectedSpend(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none"
            >
              {spendList.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>

          {/* Filter Purchase Date */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Last Purchase</label>
            <select
              value={selectedPurchaseDate}
              onChange={(e) => setSelectedPurchaseDate(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none"
            >
              {purchaseDateList.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-gray-200/60 rounded-3xl shadow-sm overflow-hidden">
        {filteredCustomers.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-[48px] text-gray-300 mb-3">group_off</span>
            <h4 className="text-base font-bold text-gray-700">No Customers Found</h4>
            <p className="text-xs text-gray-400 max-w-xs leading-relaxed mt-1">
              Adjust your filter criteria or try searching for another name or telephone number.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 font-bold text-gray-400 uppercase tracking-widest">
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Email / Phone</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Segment Tag</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Last Purchase</th>
                  <th className="py-4 px-6 text-right pr-8">Total Spend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-semibold text-gray-600">
                {filteredCustomers.map(cust => {
                  let badgeColor = "bg-indigo-50 text-indigo-600 border-indigo-100";
                  if (cust.segment === "At Risk") badgeColor = "bg-pink-50 text-pink-600 border-pink-100";
                  if (cust.segment === "New Customer") badgeColor = "bg-emerald-50 text-emerald-600 border-emerald-100";
                  if (cust.segment === "Inactive") badgeColor = "bg-amber-50 text-amber-600 border-amber-100";

                  return (
                    <tr
                      key={cust.id}
                      onClick={() => setSelectedCustomer(cust)}
                      className="hover:bg-gray-50/50 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100">
                            {cust.name.split(' ').map(n=>n[0]).join('')}
                          </div>
                          <div>
                            <span className="font-extrabold text-gray-850 block">{cust.name}</span>
                            <span className="text-[10px] text-gray-400 block font-medium">{cust.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <span className="font-medium text-gray-700 block">{cust.email}</span>
                          <span className="text-[10px] text-gray-400 block font-medium">{cust.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-500">
                        {cust.city}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${badgeColor}`}>
                          {cust.segment}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`font-bold ${cust.status === 'Active' ? 'text-emerald-500' : cust.status === 'Idle' ? 'text-amber-500' : 'text-gray-400'}`}>
                          {cust.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-medium text-gray-500">
                        {cust.lastPurchaseDate}
                      </td>
                      <td className="py-4 px-6 text-right font-black text-gray-800 pr-8">
                        ₹{cust.ltv.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Customer Detail Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/35 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedCustomer(null)}
          />
          
          {/* Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-350">
              
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-gray-150 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100">
                    {selectedCustomer.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-800 text-base">{selectedCustomer.name}</h3>
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Customer Intelligence Profile</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="w-8 h-8 rounded-full hover:bg-gray-200/50 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Contact Information */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-2">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-150 pb-1 mb-2">Contact Details</h4>
                  <div className="grid grid-cols-2 gap-y-3 text-xs">
                    <div>
                      <span className="text-gray-400 block font-semibold">Email</span>
                      <a href={`mailto:${selectedCustomer.email}`} className="text-indigo-600 font-bold hover:underline">{selectedCustomer.email}</a>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-semibold">Phone</span>
                      <span className="text-gray-700 font-bold">{selectedCustomer.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-semibold">City</span>
                      <span className="text-gray-700 font-bold">{selectedCustomer.city}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-semibold">Client ID</span>
                      <span className="text-gray-700 font-mono text-[10px] font-bold">{selectedCustomer.id}</span>
                    </div>
                  </div>
                </div>

                {/* Financial KPIs */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Lifetime Value</span>
                    <strong className="text-base font-black text-gray-800">₹{selectedCustomer.ltv.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Total Orders</span>
                    <strong className="text-base font-black text-gray-800">{selectedCustomer.totalOrders}</strong>
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Average Order Value</span>
                    <strong className="text-base font-black text-gray-800">₹{selectedCustomer.averageOrderValue.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Purchase Frequency</span>
                    <strong className="text-base font-black text-gray-800">{selectedCustomer.purchaseFrequency || 'Monthly'}</strong>
                  </div>
                </div>

                {/* AI generated Summary */}
                <div className="bg-indigo-50/30 border border-indigo-100/50 rounded-2xl p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-100/40 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-[16px] text-indigo-500 animate-spin-slow">auto_awesome</span>
                    <h4 className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">AI Strategist summary</h4>
                  </div>
                  <p className="text-xs font-semibold text-gray-700 leading-relaxed font-sans">
                    {selectedCustomer.aiSummary}
                  </p>
                </div>

                {/* Communication logs */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-150 pb-1">Communication Engagement</h4>
                  {selectedCustomer.communicationTimeline && selectedCustomer.communicationTimeline.length > 0 ? (
                    <div className="space-y-2.5">
                      {selectedCustomer.communicationTimeline.map((item, idx) => {
                        let icon = "chat";
                        let color = "text-emerald-500 bg-emerald-50 border-emerald-100";
                        if (item.type === "Email") {
                          icon = "mail";
                          color = "text-indigo-500 bg-indigo-50 border-indigo-100";
                        } else if (item.type === "SMS") {
                          icon = "sms";
                          color = "text-blue-500 bg-blue-50 border-blue-100";
                        } else if (item.type === "RCS") {
                          icon = "cell_tower";
                          color = "text-pink-500 bg-pink-50 border-pink-100";
                        }

                        return (
                          <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-3 flex gap-3 text-xs">
                            <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border ${color}`}>
                              <span className="material-symbols-outlined text-[16px]">{icon}</span>
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-800">{item.type} Message</span>
                                <span className="text-[9px] font-semibold text-gray-400">{item.date}</span>
                              </div>
                              <p className="text-gray-500 font-medium leading-normal">{item.message}</p>
                              <div className="flex items-center gap-1.5 pt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Status: {item.status}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs font-semibold text-gray-400 italic">No communication logs recorded.</p>
                  )}
                </div>

                {/* Campaign participation history */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-150 pb-1">Campaign Participation</h4>
                  {selectedCustomer.campaignHistory && selectedCustomer.campaignHistory.length > 0 ? (
                    <div className="border border-gray-150 rounded-2xl overflow-hidden text-xs">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-100 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                            <th className="py-2 px-3">Campaign</th>
                            <th className="py-2 px-3">Channel</th>
                            <th className="py-2 px-3 text-right">Response</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 font-semibold text-gray-600">
                          {selectedCustomer.campaignHistory.map((h, i) => (
                            <tr key={i}>
                              <td className="py-2 px-3 text-gray-800">{h.campaignName}</td>
                              <td className="py-2 px-3 text-gray-450">{h.channel}</td>
                              <td className="py-2 px-3 text-right">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                  h.response === 'Purchased' ? 'bg-emerald-50 text-emerald-600' :
                                  h.response === 'Clicked' ? 'bg-blue-50 text-blue-600' :
                                  h.response === 'Opened' ? 'bg-indigo-50 text-indigo-600' :
                                  'bg-gray-50 text-gray-500'
                                }`}>
                                  {h.response}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-xs font-semibold text-gray-400 italic">No campaign history recorded.</p>
                  )}
                </div>

              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
