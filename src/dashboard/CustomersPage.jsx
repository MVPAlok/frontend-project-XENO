import React, { useState, useMemo } from 'react';

export default function CustomersPage({ customers, onSelectCustomer }) {
  // Local state for filters
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState('');
  const [spendFilter, setSpendFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [channelFilter, setChannelFilter] = useState('');
  
  // Selected customer for the timeline drawer
  const [selectedCust, setSelectedCust] = useState(null);

  // Available unique cities for dropdown
  const citiesList = useMemo(() => {
    return Array.from(new Set(customers.map(c => c.city))).sort();
  }, [customers]);

  // Handle filtering
  const filteredCustomers = useMemo(() => {
    return customers.filter(cust => {
      // 1. Search Query
      if (search && !cust.name.toLowerCase().includes(search.toLowerCase()) && 
          !cust.email.toLowerCase().includes(search.toLowerCase()) && 
          !cust.id.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      // 2. City
      if (cityFilter && cust.city !== cityFilter) return false;
      
      // 3. Channel
      if (channelFilter && cust.preferredChannel !== channelFilter) return false;

      // 4. Purchase Frequency (Total Orders)
      if (frequencyFilter) {
        if (frequencyFilter === 'low' && cust.totalOrders > 5) return false;
        if (frequencyFilter === 'medium' && (cust.totalOrders <= 5 || cust.totalOrders > 15)) return false;
        if (frequencyFilter === 'high' && cust.totalOrders <= 15) return false;
      }

      // 5. Total Spend
      if (spendFilter) {
        if (spendFilter === 'low' && cust.totalSpend > 5000) return false;
        if (spendFilter === 'medium' && (cust.totalSpend <= 5000 || cust.totalSpend > 20000)) return false;
        if (spendFilter === 'high' && cust.totalSpend <= 20000) return false;
      }

      // 6. Last Purchase Date Range (in days ago)
      if (dateFilter) {
        const lastPurchaseDate = new Date(cust.lastPurchaseDate);
        const daysAgo = (new Date() - lastPurchaseDate) / (1000 * 60 * 60 * 24);
        if (dateFilter === '30' && daysAgo > 30) return false;
        if (dateFilter === '60' && daysAgo > 60) return false;
        if (dateFilter === '90' && daysAgo > 90) return false;
        if (dateFilter === 'over90' && daysAgo <= 90) return false;
      }

      return true;
    });
  }, [customers, search, cityFilter, frequencyFilter, spendFilter, dateFilter, channelFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-950">Customer Intelligence Center</h2>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Filter, search, and view complete communication timelines for your shoppers.</p>
        </div>
        <span className="text-xs text-indigo-650 font-bold bg-indigo-50 border border-indigo-100/60 px-3 py-1 rounded-full">
          Showing {filteredCustomers.length} of {customers.length} Customers
        </span>
      </div>

      {/* Dynamic Filters Section */}
      <div className="bg-white/80 border border-gray-200/60 rounded-[2rem] p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Search Input */}
          <div className="relative flex items-center col-span-1 md:col-span-2 lg:col-span-2">
            <span className="material-symbols-outlined absolute left-3 text-[18px] text-gray-400">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, ID..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold"
            />
          </div>

          {/* City Filter */}
          <div>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold text-gray-650"
            >
              <option value="">All Cities</option>
              {citiesList.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Frequency Filter */}
          <div>
            <select
              value={frequencyFilter}
              onChange={(e) => setFrequencyFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold text-gray-650"
            >
              <option value="">Order Frequency</option>
              <option value="low">Low (≤ 5 orders)</option>
              <option value="medium">Medium (6 - 15 orders)</option>
              <option value="high">High (&gt; 15 orders)</option>
            </select>
          </div>

          {/* Spend Filter */}
          <div>
            <select
              value={spendFilter}
              onChange={(e) => setSpendFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold text-gray-650"
            >
              <option value="">Total Spend</option>
              <option value="low">Budget (&lt; ₹5,000)</option>
              <option value="medium">Average (₹5,000 - ₹20,000)</option>
              <option value="high">VIP VIP (&gt; ₹20,000)</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold text-gray-650"
            >
              <option value="">Last Purchase</option>
              <option value="30">Within 30 Days</option>
              <option value="60">Within 60 Days</option>
              <option value="90">Within 90 Days</option>
              <option value="over90">Over 90 Days (Inactive)</option>
            </select>
          </div>

          {/* Channel Preference */}
          <div>
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-semibold text-gray-650"
            >
              <option value="">Preferred Channel</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">Email</option>
              <option value="SMS">SMS</option>
              <option value="RCS">RCS</option>
            </select>
          </div>

          {/* Clear Filters button */}
          {(search || cityFilter || frequencyFilter || spendFilter || dateFilter || channelFilter) && (
            <div className="col-span-1 md:col-span-3 lg:col-span-6 flex justify-end">
              <button
                onClick={() => {
                  setSearch('');
                  setCityFilter('');
                  setFrequencyFilter('');
                  setSpendFilter('');
                  setDateFilter('');
                  setChannelFilter('');
                }}
                className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[15px]">filter_alt_off</span>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Customers Data Table */}
      <div className="bg-white border border-gray-200/60 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200/50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Customer ID & Name</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4 text-center">Orders</th>
                <th className="px-6 py-4">Total Spend</th>
                <th className="px-6 py-4">CLV</th>
                <th className="px-6 py-4">Last Purchase</th>
                <th className="px-6 py-4">Preferred Channel</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-750">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((cust) => {
                  let statusBadge = 'bg-blue-50 text-blue-700 border-blue-100';
                  if (cust.status === 'VIP') statusBadge = 'bg-purple-50 text-purple-700 border-purple-100';
                  if (cust.status === 'INACTIVE') statusBadge = 'bg-amber-50 text-amber-700 border-amber-100';
                  if (cust.status === 'AT_RISK') statusBadge = 'bg-rose-50 text-rose-700 border-rose-100';

                  let channelIcon = 'chat';
                  let channelColor = 'text-emerald-500';
                  if (cust.preferredChannel === 'Email') { channelIcon = 'mail'; channelColor = 'text-indigo-500'; }
                  else if (cust.preferredChannel === 'SMS') { channelIcon = 'sms'; channelColor = 'text-amber-500'; }
                  else if (cust.preferredChannel === 'RCS') { channelIcon = 'forum'; channelColor = 'text-pink-500'; }

                  return (
                    <tr key={cust.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            alt={cust.name}
                            className="w-8 h-8 rounded-full bg-indigo-50 border border-gray-150 object-cover"
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${cust.name}`}
                          />
                          <div>
                            <p className="font-bold text-gray-900">{cust.name}</p>
                            <span className="text-[10px] text-gray-400 font-bold uppercase">{cust.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p>{cust.email}</p>
                        <p className="text-[10px] text-gray-400 font-bold">{cust.phone}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{cust.city}</td>
                      <td className="px-6 py-4 text-center font-bold text-gray-900">{cust.totalOrders}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">₹{cust.totalSpend.toLocaleString()}</td>
                      <td className="px-6 py-4 text-gray-550">₹{cust.clv.toLocaleString()}</td>
                      <td className="px-6 py-4 text-gray-500">{cust.lastPurchaseDate}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 font-bold">
                          <span className={`material-symbols-outlined text-[16px] ${channelColor}`}>{channelIcon}</span>
                          <span>{cust.preferredChannel}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 border text-[10px] font-bold rounded-full ${statusBadge}`}>
                          {cust.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedCust(cust)}
                          className="px-3 py-1.5 border border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/30 text-indigo-650 rounded-xl transition-all font-bold text-[10px]"
                        >
                          View Timeline
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-gray-400 font-semibold">
                    No customers found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Drawer: Communication Timeline */}
      {selectedCust && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/35 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-300"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-start border-b border-gray-100 pb-5 mb-5">
              <div className="flex items-center gap-3">
                <img
                  alt={selectedCust.name}
                  className="w-12 h-12 rounded-full border border-gray-150"
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedCust.name}`}
                />
                <div>
                  <h3 className="text-base font-bold text-gray-900">{selectedCust.name}</h3>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{selectedCust.id} • {selectedCust.city}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCust(null)}
                className="p-1.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-gray-700 transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Profile Overview */}
            <div className="grid grid-cols-3 gap-4 bg-gray-50/50 border border-gray-100 rounded-2xl p-4 mb-6">
              <div>
                <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Total Orders</span>
                <span className="text-sm font-extrabold text-gray-900">{selectedCust.totalOrders}</span>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Total Spend</span>
                <span className="text-sm font-extrabold text-gray-900">₹{selectedCust.totalSpend.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Customer Status</span>
                <span className="inline-block px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-[9px] rounded-full mt-0.5">
                  {selectedCust.status}
                </span>
              </div>
            </div>

            {/* Communication Timeline list */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-indigo-500 text-[18px]">history</span>
                Communication History
              </h4>

              {selectedCust.timeline && selectedCust.timeline.length > 0 ? (
                <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-150">
                  {selectedCust.timeline.map((campaignBlock, bIdx) => {
                    let channelIcon = 'chat';
                    let channelBg = 'bg-emerald-500 text-white';
                    if (campaignBlock.channel === 'Email') { channelIcon = 'mail'; channelBg = 'bg-indigo-500 text-white'; }
                    else if (campaignBlock.channel === 'SMS') { channelIcon = 'sms'; channelBg = 'bg-amber-500 text-white'; }
                    else if (campaignBlock.channel === 'RCS') { channelIcon = 'forum'; channelBg = 'bg-pink-500 text-white'; }

                    return (
                      <div key={campaignBlock.id} className="relative pl-8">
                        {/* Bullet Icon */}
                        <div className={`absolute left-0.5 top-0.5 w-6 h-6 rounded-full flex items-center justify-center shadow-sm ${channelBg}`}>
                          <span className="material-symbols-outlined text-[14px]">{channelIcon}</span>
                        </div>

                        {/* Event Content */}
                        <div className="bg-white border border-gray-150 rounded-2xl p-4 space-y-3 shadow-xs hover:border-gray-250 transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-xs font-bold text-gray-900">{campaignBlock.campaignName}</p>
                              <span className="text-[10px] text-gray-400 font-semibold">{campaignBlock.channel} Channel</span>
                            </div>
                            <span className="text-[9px] text-gray-450 font-bold">
                              {new Date(campaignBlock.events[0].timestamp).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Event Timeline Steps */}
                          <div className="space-y-2 border-t border-gray-50 pt-2.5">
                            {campaignBlock.events.map((evt, eIdx) => {
                              let statusColor = 'text-indigo-650';
                              if (evt.type.includes('Sent')) statusColor = 'text-gray-500';
                              if (evt.type.includes('Delivered')) statusColor = 'text-blue-500';
                              if (evt.type.includes('Opened') || evt.type.includes('Read')) statusColor = 'text-amber-500';
                              if (evt.type.includes('Clicked')) statusColor = 'text-pink-500';
                              if (evt.type.includes('Converted')) statusColor = 'text-emerald-600';

                              return (
                                <div key={eIdx} className="flex justify-between items-center text-[10px]">
                                  <span className="flex items-center gap-1.5 font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                    <span className={statusColor}>{evt.type}</span>
                                    {evt.value && (
                                      <span className="bg-emerald-50 text-emerald-700 px-1 py-0.2 rounded font-extrabold border border-emerald-100">
                                        {evt.value}
                                      </span>
                                    )}
                                  </span>
                                  <span className="text-gray-400 font-medium">
                                    {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-gray-400 text-center py-6">No historical communications found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
