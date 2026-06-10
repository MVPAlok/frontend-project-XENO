export const initialCustomers = [
  {
    id: "CUST-001",
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    phone: "+91 98765 43210",
    segment: "High Value",
    status: "Active",
    city: "Mumbai",
    ltv: 45200,
    totalOrders: 18,
    averageOrderValue: 2511,
    lastPurchaseDate: "2026-06-08",
    purchaseFrequency: "Monthly",
    campaignHistory: [
      { campaignName: "Summer Flash Sale", channel: "WhatsApp", date: "2026-06-05", response: "Purchased" },
      { campaignName: "Weekend Win Back", channel: "SMS", date: "2026-05-20", response: "Clicked" },
      { campaignName: "Welcome Series Journey", channel: "Email", date: "2026-04-10", response: "Opened" }
    ],
    communicationTimeline: [
      { type: "WhatsApp", date: "2026-06-05 14:30", message: "Hi Aarav, Summer Flash Sale is live! Get 25% off.", status: "Read" },
      { type: "SMS", date: "2026-05-20 11:15", message: "Weekend special just for you. Click here to check the collection.", status: "Clicked" },
      { type: "Email", date: "2026-04-10 09:00", message: "Welcome to Xeno Retail! Here is your onboarding guide.", status: "Opened" }
    ],
    aiSummary: "Aarav is a highly active brand advocate who responds exceptionally well to premium product updates and exclusive WhatsApp discount offers. Prefers weekend buying cycles."
  },
  {
    id: "CUST-002",
    name: "Sarah D'souza",
    email: "sarah.dsouza@outlook.com",
    phone: "+91 98123 45678",
    segment: "At Risk",
    status: "Idle",
    city: "Bengaluru",
    ltv: 24800,
    totalOrders: 6,
    averageOrderValue: 4133,
    lastPurchaseDate: "2026-04-12",
    purchaseFrequency: "Bi-monthly",
    campaignHistory: [
      { campaignName: "Summer Flash Sale", channel: "WhatsApp", date: "2026-06-05", response: "No Response" },
      { campaignName: "Weekend Win Back", channel: "SMS", date: "2026-05-20", response: "Opened" }
    ],
    communicationTimeline: [
      { type: "WhatsApp", date: "2026-06-05 14:35", message: "Hi Sarah, Summer Flash Sale is live! Get 25% off.", status: "Delivered" },
      { type: "SMS", date: "2026-05-20 11:20", message: "Weekend special just for you. Click here to check the collection.", status: "Opened" }
    ],
    aiSummary: "Sarah was previously high-value but has exhibited churn characteristics over the last 60 days. WhatsApp copy needs high personalization (e.g. reminding of past purchases) to trigger conversion."
  },
  {
    id: "CUST-003",
    name: "Kabir Mehta",
    email: "kabir.mehta@yahoo.com",
    phone: "+91 97654 32109",
    segment: "New Customer",
    status: "Active",
    city: "Delhi",
    ltv: 12400,
    totalOrders: 2,
    averageOrderValue: 6200,
    lastPurchaseDate: "2026-05-28",
    purchaseFrequency: "Occasional",
    campaignHistory: [
      { campaignName: "Welcome Series Journey", channel: "RCS", date: "2026-05-28", response: "Purchased" }
    ],
    communicationTimeline: [
      { type: "RCS", date: "2026-05-28 16:40", message: "Welcome to Xeno! Tap to view your special welcome offer.", status: "Purchased" }
    ],
    aiSummary: "Recently acquired user with high AOV. Highly responsive to interactive rich communication formats (RCS). Recommended next step: cross-sell email campaign."
  },
  {
    id: "CUST-004",
    name: "Ananya Iyer",
    email: "ananya.iyer@gmail.com",
    phone: "+91 99887 76655",
    segment: "High Value",
    status: "Active",
    city: "Chennai",
    ltv: 78500,
    totalOrders: 32,
    averageOrderValue: 2453,
    lastPurchaseDate: "2026-06-09",
    purchaseFrequency: "Weekly",
    campaignHistory: [
      { campaignName: "Summer Flash Sale", channel: "WhatsApp", date: "2026-06-05", response: "Purchased" },
      { campaignName: "VIP Early Access", channel: "Email", date: "2026-05-15", response: "Purchased" }
    ],
    communicationTimeline: [
      { type: "WhatsApp", date: "2026-06-05 14:30", message: "Hi Ananya, Summer Flash Sale is live!", status: "Purchased" },
      { type: "Email", date: "2026-05-15 10:00", message: "Exclusive Early Access: Designer Wear inside.", status: "Purchased" }
    ],
    aiSummary: "Top tier customer. Highly active and loyal, reacts positively to premium rewards. Prefers immediate delivery channels like WhatsApp."
  },
  {
    id: "CUST-005",
    name: "Rohan Verma",
    email: "rohan.v@rediffmail.com",
    phone: "+91 91234 56789",
    segment: "Inactive",
    status: "Churned",
    city: "Pune",
    ltv: 3500,
    totalOrders: 1,
    averageOrderValue: 3500,
    lastPurchaseDate: "2025-11-20",
    purchaseFrequency: "Occasional",
    campaignHistory: [
      { campaignName: "Weekend Win Back", channel: "SMS", date: "2026-05-20", response: "No Response" }
    ],
    communicationTimeline: [
      { type: "SMS", date: "2026-05-20 11:15", message: "We miss you Rohan! Get ₹500 off. Code: MISSYOU", status: "Delivered" }
    ],
    aiSummary: "Dormant for over 200 days. Showed low interest in SMS discounts. Recommend trying rich email flows or WhatsApp surveys to re-engage."
  },
  {
    id: "CUST-006",
    name: "Priya Nair",
    email: "priya.nair@live.com",
    phone: "+91 95432 10987",
    segment: "At Risk",
    status: "Idle",
    city: "Mumbai",
    ltv: 18200,
    totalOrders: 5,
    averageOrderValue: 3640,
    lastPurchaseDate: "2026-03-30",
    purchaseFrequency: "Bi-monthly",
    campaignHistory: [
      { campaignName: "VIP Early Access", channel: "Email", date: "2026-05-15", response: "Opened" }
    ],
    communicationTimeline: [
      { type: "Email", date: "2026-05-15 10:15", message: "Exclusive Early Access: VIP Perks inside.", status: "Opened" }
    ],
    aiSummary: "Engages with email content but hasn't finalized a cart checkout in over 70 days. Might respond well to SMS/RCS notifications containing discount triggers."
  },
  {
    id: "CUST-007",
    name: "Aditya Goel",
    email: "aditya.goel@gmail.com",
    phone: "+91 90011 22334",
    segment: "High Value",
    status: "Active",
    city: "Delhi",
    ltv: 51000,
    totalOrders: 15,
    averageOrderValue: 3400,
    lastPurchaseDate: "2026-06-07",
    purchaseFrequency: "Monthly",
    campaignHistory: [
      { campaignName: "Summer Flash Sale", channel: "WhatsApp", date: "2026-06-05", response: "Purchased" }
    ],
    communicationTimeline: [
      { type: "WhatsApp", date: "2026-06-05 14:32", message: "Hi Aditya, Summer Flash Sale is live!", status: "Purchased" }
    ],
    aiSummary: "Consistent spender in Delhi. High engagement with apparel and electronics product notifications on WhatsApp."
  },
  {
    id: "CUST-008",
    name: "Meera Sen",
    email: "meera.sen@gmail.com",
    phone: "+91 98888 99999",
    segment: "New Customer",
    status: "Active",
    city: "Kolkata",
    ltv: 8900,
    totalOrders: 1,
    averageOrderValue: 8900,
    lastPurchaseDate: "2026-06-02",
    purchaseFrequency: "Occasional",
    campaignHistory: [
      { campaignName: "Welcome Series Journey", channel: "RCS", date: "2026-06-02", response: "Purchased" }
    ],
    communicationTimeline: [
      { type: "RCS", date: "2026-06-02 10:00", message: "Welcome to Xeno, Meera!", status: "Purchased" }
    ],
    aiSummary: "Brand new user with a large first cart purchase. Likely to respond to educational content or rewards catalog."
  },
  {
    id: "CUST-009",
    name: "Vikram Malhotra",
    email: "vikram.malhotra@gmail.com",
    phone: "+91 97777 88888",
    segment: "Inactive",
    status: "Churned",
    city: "Hyderabad",
    ltv: 6200,
    totalOrders: 2,
    averageOrderValue: 3100,
    lastPurchaseDate: "2026-01-15",
    purchaseFrequency: "Occasional",
    campaignHistory: [],
    communicationTimeline: [],
    aiSummary: "Dormant customer from Hyderabad. Very low communication footprint. Recommended to run high-value WhatsApp win-back strategy."
  },
  {
    id: "CUST-010",
    name: "Riya Kapoor",
    email: "riya.k@gmail.com",
    phone: "+91 96666 77777",
    segment: "High Value",
    status: "Active",
    city: "Mumbai",
    ltv: 39500,
    totalOrders: 11,
    averageOrderValue: 3590,
    lastPurchaseDate: "2026-06-05",
    campaignHistory: [
      { campaignName: "Summer Flash Sale", channel: "WhatsApp", date: "2026-06-05", response: "Purchased" }
    ],
    communicationTimeline: [
      { type: "WhatsApp", date: "2026-06-05 14:31", message: "Hi Riya, Summer Flash Sale is live!", status: "Purchased" }
    ],
    aiSummary: "Reacts positively to instant notification templates. Demonstrates a strong affiliation with summer sales and fashion categories."
  }
];

export const initialCampaigns = [
  {
    id: "CAMP-001",
    name: "Summer Flash Sale",
    audience: "24,500 VIPs",
    channel: "WhatsApp",
    channelIcon: "chat",
    channelColor: "text-emerald-500 bg-emerald-50 border-emerald-100",
    status: "Running",
    statusStyle: "bg-green-50 text-green-700 border-green-200",
    sent: 24500,
    delivered: 23800,
    opened: 19600,
    clicked: 5488,
    purchases: 890,
    revenue: 480000,
    conversionRate: "3.6%",
    ctr: "22.4%",
    timeline: [
      { label: "Campaign created by AI", time: "2026-06-05 10:00" },
      { label: "Audience segment verified", time: "2026-06-05 11:30" },
      { label: "Dispatch started via WhatsApp Gateway", time: "2026-06-05 14:30" },
      { label: "Delivery status updated to 97.1%", time: "2026-06-05 16:00" }
    ]
  },
  {
    id: "CAMP-002",
    name: "Weekend Win Back",
    audience: "1,240 Customers",
    channel: "SMS",
    channelIcon: "sms",
    channelColor: "text-blue-500 bg-blue-50 border-blue-100",
    status: "Running",
    statusStyle: "bg-green-50 text-green-700 border-green-200",
    sent: 1240,
    delivered: 1210,
    opened: 860,
    clicked: 225,
    purchases: 42,
    revenue: 210000,
    conversionRate: "3.3%",
    ctr: "18.6%",
    timeline: [
      { label: "Segment criteria matching", time: "2026-05-20 09:00" },
      { label: "Draft copy approved", time: "2026-05-20 10:30" },
      { label: "SMS dispatch triggered", time: "2026-05-20 11:15" }
    ]
  },
  {
    id: "CAMP-003",
    name: "VIP Early Access",
    audience: "5,000 Customers",
    channel: "Email",
    channelIcon: "mail",
    channelColor: "text-indigo-500 bg-indigo-50 border-indigo-100",
    status: "Scheduled",
    statusStyle: "bg-purple-50 text-purple-700 border-purple-200",
    sent: 5000,
    delivered: 0,
    opened: 0,
    clicked: 0,
    purchases: 0,
    revenue: 0,
    conversionRate: "0.0%",
    ctr: "--",
    timeline: [
      { label: "Audience size locked (5,000)", time: "2026-06-08 17:00" },
      { label: "Email design template loaded", time: "2026-06-09 11:00" },
      { label: "Scheduled for June 12, 10:00 AM", time: "2026-06-09 12:00" }
    ]
  },
  {
    id: "CAMP-004",
    name: "Welcome Series Journey",
    audience: "3,450 New Users",
    channel: "RCS",
    channelIcon: "cell_tower",
    channelColor: "text-pink-500 bg-pink-50 border-pink-100",
    status: "Completed",
    statusStyle: "bg-blue-50 text-blue-700 border-blue-200",
    sent: 3450,
    delivered: 3410,
    opened: 2950,
    clicked: 970,
    purchases: 185,
    revenue: 390000,
    conversionRate: "5.3%",
    ctr: "28.1%",
    timeline: [
      { label: "User trigger registered (Order #1)", time: "2026-05-27 08:00" },
      { label: "RCS interactive layout validated", time: "2026-05-28 09:30" },
      { label: "Trigger dispatch executed", time: "2026-05-28 10:00" },
      { label: "Completed with 5.3% conversion rate", time: "2026-06-04 18:00" }
    ]
  }
];

export const initialSegments = [
  {
    id: "SEG-001",
    name: "High-LTV Dormant",
    type: "Smart Segment",
    users: "4,360 Users",
    description: "LTV > ₹25k and no purchase event registered in last 45 days.",
    conversionLift: "+18.2%",
    revenueAttributed: "₹8.4L"
  },
  {
    id: "SEG-002",
    name: "First-Time Buyers",
    type: "Smart Segment",
    users: "3,737 Users",
    description: "Completed exactly 1 order in the last 14 days; did not buy again.",
    conversionLift: "+12.4%",
    revenueAttributed: "₹4.2L"
  },
  {
    id: "SEG-003",
    name: "Churn Risk List",
    type: "Smart Segment",
    users: "1,245 Users",
    description: "Opened > 3 marketing emails in last month but zero clicks or orders.",
    conversionLift: "+32.1%",
    revenueAttributed: "₹2.1L"
  }
];

export const initialIntegrations = [
  {
    id: "INT-001",
    name: "WhatsApp Business",
    provider: "Meta Cloud API",
    status: "Connected",
    health: 99.8,
    lastSync: "2 mins ago",
    apiStatus: "Operational",
    ping: "45ms",
    icon: "chat",
    color: "text-emerald-500 bg-emerald-50"
  },
  {
    id: "INT-002",
    name: "Email Gateway",
    provider: "Amazon SES",
    status: "Connected",
    health: 99.9,
    lastSync: "5 mins ago",
    apiStatus: "Operational",
    ping: "82ms",
    icon: "mail",
    color: "text-indigo-500 bg-indigo-50"
  },
  {
    id: "INT-003",
    name: "SMS Provider",
    provider: "Twilio Gateway",
    status: "Connected",
    health: 98.4,
    lastSync: "1 hour ago",
    apiStatus: "Operational",
    ping: "115ms",
    icon: "sms",
    color: "text-blue-500 bg-blue-50"
  },
  {
    id: "INT-004",
    name: "RCS Gateway",
    provider: "Google Jibe Network",
    status: "Connected",
    health: 99.2,
    lastSync: "12 mins ago",
    apiStatus: "Operational",
    ping: "90ms",
    icon: "cell_tower",
    color: "text-pink-500 bg-pink-50"
  },
  {
    id: "INT-005",
    name: "AI Service",
    provider: "Xeno AI Strategist Engine (v4)",
    status: "Connected",
    health: 100.0,
    lastSync: "Just now",
    apiStatus: "Active",
    ping: "14ms",
    icon: "auto_awesome",
    color: "text-purple-500 bg-purple-50"
  }
];

export const initialSettings = {
  profile: {
    name: "Sarah Jenkins",
    email: "sarah.jenkins@xeno.ai",
    role: "Growth Director",
    avatarUrl: "",
    tz: "Asia/Kolkata (IST)"
  },
  workspace: {
    name: "Main Workspace",
    domain: "xeno.ai/workspace/main",
    locale: "en-IN",
    currency: "INR (₹)"
  },
  team: [
    { name: "Sarah Jenkins", email: "sarah.jenkins@xeno.ai", role: "Growth Director", status: "Active" },
    { name: "Alok Gupta", email: "alok@xeno.ai", role: "Product Manager", status: "Active" },
    { name: "Nisha Patel", email: "nisha@xeno.ai", role: "Campaign Analyst", status: "Active" },
    { name: "Pranav Shah", email: "pranav.s@xeno.ai", role: "Developer Integrations", status: "Pending Invite" }
  ],
  apiKeys: [
    { name: "Production Gateway API Key", key: "xn_live_948fha0...482hf", created: "2026-02-14", active: true },
    { name: "AI Webhook Key", key: "xn_test_a0d81nf...02hfh", created: "2026-05-01", active: true }
  ]
};
