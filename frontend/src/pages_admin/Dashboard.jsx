import {
  TrendingUp,
  Users as UsersIcon,
  ShoppingCart,
  AlertTriangle,
  MoreVertical,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MOCK_DATA = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 7500 },
  { name: "Jul", revenue: 8200 },
  { name: "Aug", revenue: 9500 },
  { name: "Sep", revenue: 11000 },
  { name: "Oct", revenue: 10500 },
  { name: "Nov", revenue: 13000 },
  { name: "Dec", revenue: 15500 },
];

const RECENT_SALES = [
  {
    id: "#ORD-001",
    customer: "Michael Scott",
    product: "Porsche 911 GT3 RS 1:18",
    amount: "$299.00",
    status: "Delivered",
  },
  {
    id: "#ORD-002",
    customer: "Dwight Schrute",
    product: "Ferrari LaFerrari 1:43",
    amount: "$150.00",
    status: "Processing",
  },
  {
    id: "#ORD-003",
    customer: "Jim Halpert",
    product: "Lamborghini Aventador SVJ",
    amount: "$320.00",
    status: "Shipped",
  },
  {
    id: "#ORD-004",
    customer: "Pam Beesly",
    product: "McLaren P1 1:18",
    amount: "$280.00",
    status: "Delivered",
  },
  {
    id: "#ORD-005",
    customer: "Stanley Hudson",
    product: "Bugatti Chiron 1:64",
    amount: "$45.00",
    status: "Processing",
  },
];

export function Dashboard() {
  const statCards = [
    {
      title: "Total Revenue",
      value: "$145,231",
      change: "+12.5%",
      positive: true,
      icon: TrendingUp,
    },
    {
      title: "Active Users",
      value: "1,204",
      change: "+5.2%",
      positive: true,
      icon: UsersIcon,
    },
    {
      title: "Total Orders",
      value: "842",
      change: "+18.1%",
      positive: true,
      icon: ShoppingCart,
    },
    {
      title: "Out of Stock",
      value: "12",
      change: "-2.4%",
      positive: false,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">Dashboard Overview</h2>
        <button className="bg-white border border-gray-200 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
          Download Report
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-start justify-between"
          >
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-black mb-2">{stat.value}</h3>
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-xs font-semibold ${
                    stat.positive ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-gray-400">vs last month</span>
              </div>
            </div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                stat.title === "Out of Stock"
                  ? "bg-red-50 text-red-600"
                  : "bg-gray-50 text-black"
              }`}
            >
              <stat.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">Monthly Revenue</h3>
            <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-red-600">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart id="revenue-chart" data={MOCK_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  key="xaxis"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  key="yaxis"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  dx={-10}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  key="tooltip"
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  itemStyle={{ color: "#dc2626", fontWeight: 600 }}
                  labelStyle={{ color: "#374151", fontWeight: 500, marginBottom: "4px" }}
                />
                <Line
                  key="line"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#dc2626"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#dc2626", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6, fill: "#dc2626", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Sales Table */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">Recent Sales</h3>
            <button className="text-gray-400 hover:text-black transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-[120px]">
                    Customer
                  </th>
                  <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {RECENT_SALES.map((sale, i) => (
                  <tr
                    key={sale.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="py-3">
                      <div className="font-medium text-black text-sm">{sale.customer}</div>
                      <div className="text-xs text-gray-400 truncate max-w-[150px]">
                        {sale.product}
                      </div>
                    </td>
                    <td className="py-3 text-sm font-semibold text-black">{sale.amount}</td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          sale.status === "Delivered"
                            ? "bg-emerald-50 text-emerald-600"
                            : sale.status === "Processing"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="w-full mt-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors text-center border border-transparent hover:border-red-100 rounded-lg">
            View All Sales
          </button>
        </div>
      </div>
    </div>
  );
}
