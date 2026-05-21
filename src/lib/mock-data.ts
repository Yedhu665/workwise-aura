export const employees = [
  { id: "1", name: "Aria Chen", role: "Frontend Lead", dept: "Engineering", email: "aria@trackora.io", avatar: "AC", status: "online", productivity: 92 },
  { id: "2", name: "Marcus Patel", role: "Backend Engineer", dept: "Engineering", email: "marcus@trackora.io", avatar: "MP", status: "online", productivity: 88 },
  { id: "3", name: "Sofia Reyes", role: "Product Designer", dept: "Design", email: "sofia@trackora.io", avatar: "SR", status: "away", productivity: 81 },
  { id: "4", name: "Liam O'Connor", role: "QA Engineer", dept: "Quality", email: "liam@trackora.io", avatar: "LO", status: "offline", productivity: 76 },
  { id: "5", name: "Yuki Tanaka", role: "DevOps", dept: "Engineering", email: "yuki@trackora.io", avatar: "YT", status: "online", productivity: 95 },
  { id: "6", name: "Noah Becker", role: "PM", dept: "Product", email: "noah@trackora.io", avatar: "NB", status: "online", productivity: 84 },
  { id: "7", name: "Priya Shah", role: "Data Analyst", dept: "Analytics", email: "priya@trackora.io", avatar: "PS", status: "away", productivity: 89 },
  { id: "8", name: "Diego Alvarez", role: "Mobile Dev", dept: "Engineering", email: "diego@trackora.io", avatar: "DA", status: "online", productivity: 78 },
];

export const bugs = [
  { id: "TRK-241", title: "Checkout button unresponsive on Safari iOS", priority: "Critical", status: "Open", assignee: "Aria Chen", project: "Web App", created: "2h ago" },
  { id: "TRK-240", title: "Race condition in invoice export", priority: "High", status: "In Progress", assignee: "Marcus Patel", project: "API", created: "5h ago" },
  { id: "TRK-238", title: "Dark mode chart legend low contrast", priority: "Medium", status: "In Review", assignee: "Sofia Reyes", project: "Dashboard", created: "1d ago" },
  { id: "TRK-237", title: "Notification badge stuck after read", priority: "Low", status: "Open", assignee: "Liam O'Connor", project: "Web App", created: "1d ago" },
  { id: "TRK-235", title: "Kubernetes pod restart loop", priority: "Critical", status: "Resolved", assignee: "Yuki Tanaka", project: "Infra", created: "2d ago" },
  { id: "TRK-233", title: "Pagination breaks on filter change", priority: "Medium", status: "Open", assignee: "Diego Alvarez", project: "Mobile", created: "3d ago" },
];

export const tasks = [
  { id: "T-101", title: "Design onboarding flow v3", assignee: "Sofia Reyes", due: "Today", status: "In Progress" },
  { id: "T-102", title: "Migrate auth to OAuth 2.1", assignee: "Marcus Patel", due: "Tomorrow", status: "Todo" },
  { id: "T-103", title: "Quarterly analytics report", assignee: "Priya Shah", due: "Fri", status: "In Review" },
  { id: "T-104", title: "Optimize bundle size", assignee: "Aria Chen", due: "Next week", status: "Todo" },
];

export const productivityWeek = [
  { day: "Mon", tasks: 32, hours: 7.5 },
  { day: "Tue", tasks: 41, hours: 8.1 },
  { day: "Wed", tasks: 38, hours: 7.9 },
  { day: "Thu", tasks: 47, hours: 8.4 },
  { day: "Fri", tasks: 44, hours: 7.7 },
  { day: "Sat", tasks: 12, hours: 2.1 },
  { day: "Sun", tasks: 6, hours: 1.2 },
];

export const bugTrend = [
  { week: "W1", opened: 22, resolved: 18 },
  { week: "W2", opened: 28, resolved: 24 },
  { week: "W3", opened: 19, resolved: 25 },
  { week: "W4", opened: 34, resolved: 30 },
  { week: "W5", opened: 26, resolved: 31 },
  { week: "W6", opened: 21, resolved: 28 },
];

export const attendanceMonth = Array.from({ length: 30 }).map((_, i) => ({
  day: i + 1,
  present: Math.floor(40 + Math.random() * 8),
  late: Math.floor(Math.random() * 6),
  absent: Math.floor(Math.random() * 4),
}));

export const departmentSplit = [
  { name: "Engineering", value: 42 },
  { name: "Design", value: 14 },
  { name: "Product", value: 9 },
  { name: "Quality", value: 12 },
  { name: "Analytics", value: 8 },
];

export const activities = [
  { who: "Aria Chen", what: "merged PR #482 in Web App", when: "2m ago", type: "code" },
  { who: "Sofia Reyes", what: "uploaded 6 design assets to #design-system", when: "12m ago", type: "file" },
  { who: "Yuki Tanaka", what: "resolved bug TRK-235", when: "1h ago", type: "bug" },
  { who: "Noah Becker", what: "approved leave request from Liam O'Connor", when: "2h ago", type: "leave" },
  { who: "Priya Shah", what: "shared Q3 analytics report", when: "3h ago", type: "report" },
  { who: "Marcus Patel", what: "clocked in at 09:02", when: "5h ago", type: "attendance" },
];

export const leaves = [
  { id: "L-21", employee: "Liam O'Connor", type: "Sick", from: "May 22", to: "May 23", days: 2, status: "Approved", reason: "Flu recovery" },
  { id: "L-22", employee: "Diego Alvarez", type: "Vacation", from: "Jun 02", to: "Jun 09", days: 7, status: "Pending", reason: "Family trip" },
  { id: "L-23", employee: "Sofia Reyes", type: "Personal", from: "May 28", to: "May 28", days: 1, status: "Pending", reason: "Appointment" },
  { id: "L-24", employee: "Priya Shah", type: "Vacation", from: "Jul 15", to: "Jul 22", days: 7, status: "Approved", reason: "Annual leave" },
  { id: "L-25", employee: "Marcus Patel", type: "Sick", from: "May 19", to: "May 19", days: 1, status: "Rejected", reason: "Migraine" },
];

export const channels = [
  { id: "c1", name: "general", unread: 0, members: 48 },
  { id: "c2", name: "engineering", unread: 3, members: 22 },
  { id: "c3", name: "design-system", unread: 7, members: 14 },
  { id: "c4", name: "incidents", unread: 1, members: 18 },
  { id: "c5", name: "watercooler", unread: 0, members: 41 },
];

export const dms = [
  { id: "d1", name: "Aria Chen", avatar: "AC", status: "online", last: "Pushed the fix — can you re-test?", unread: 2 },
  { id: "d2", name: "Sofia Reyes", avatar: "SR", status: "away", last: "Sent over the v3 mocks 🎨", unread: 0 },
  { id: "d3", name: "Yuki Tanaka", avatar: "YT", status: "online", last: "Cluster is back to green", unread: 0 },
  { id: "d4", name: "Noah Becker", avatar: "NB", status: "online", last: "Standup in 5", unread: 1 },
];

export const sampleMessages = [
  { id: "m1", from: "Aria Chen", avatar: "AC", text: "Morning team! Pushing the auth refactor today.", time: "09:12", me: false },
  { id: "m2", from: "Sofia Reyes", avatar: "SR", text: "🔥 finally. I'll update the empty states to match.", time: "09:14", me: false },
  { id: "m3", from: "You", avatar: "ME", text: "Heads up — I'll be 10 min late to standup, dentist running over.", time: "09:18", me: true },
  { id: "m4", from: "Noah Becker", avatar: "NB", text: "No worries. We'll cover your updates.", time: "09:19", me: false },
  { id: "m5", from: "Yuki Tanaka", avatar: "YT", text: "Just deployed v2.41 to staging. Smoke tests passing ✅", time: "09:34", me: false },
];