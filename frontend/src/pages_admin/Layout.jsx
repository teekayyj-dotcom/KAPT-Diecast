import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Box,
  FileText,
  Users as UsersIcon,
  Settings as SettingsIcon,
  Bell,
  Search,
  ChevronRight,
  Car,
  Image as ImageIcon,
  BarChart2,
  ShoppingCart,
  MessageSquare,
  Plug,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Layout() {
  const location = useLocation();
  const { currentUser } = useAuth();

  const navigation = [
    { name: "Dashboard", to: "/admin", icon: LayoutDashboard, exact: true },
    { name: "Analytics", to: "/admin/analytics", icon: BarChart2 },
    { name: "Users", to: "/admin/users", icon: UsersIcon },
    { name: "Orders", to: "/admin/orders", icon: ShoppingCart },
    { name: "Products", to: "/admin/products", icon: Box },
    { name: "Posters", to: "/admin/posters", icon: ImageIcon },
    { name: "Blogs & Events", to: "/admin/blogs", icon: FileText },
    { name: "Messages", to: "/admin/messages", icon: MessageSquare },
    { name: "Integrations", to: "/admin/integrations", icon: Plug },
    { name: "Settings", to: "/admin/settings", icon: SettingsIcon },
  ];

  // Derive breadcrumbs based on pathname
  const paths = location.pathname.split("/").filter(Boolean);
  const breadcrumbs = paths.length === 0 ? ["Dashboard"] : paths.map((p) => p.charAt(0).toUpperCase() + p.slice(1));

  return (
    <div className="flex h-screen w-full bg-[#f8f9fa] font-sans text-black overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col shrink-0">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <Link to="/" className="text-2xl font-black tracking-widest text-white hover:opacity-80 transition-opacity">
            KAPT<span className="text-red-600">DIECAST</span>
          </Link>
        </div>

        {/* User Profile Area (Small) */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
            alt="Admin"
            className="w-10 h-10 rounded-full border-2 border-red-600/50 object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-white">{currentUser?.displayName || "Admin"}</p>
            <p className="text-xs text-gray-400">{currentUser?.email || "Store Manager"}</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive || (item.to !== "/" && location.pathname.startsWith(item.to))
                    ? "bg-red-600 text-white font-medium"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <item.icon size={20} className="shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm">
            <NavLink to="/admin" className="text-gray-400 hover:text-black transition-colors">
              Admin
            </NavLink>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <ChevronRight size={14} className="text-gray-300" />
                <span className={index === breadcrumbs.length - 1 ? "text-black font-medium" : "text-gray-400"}>
                  {crumb}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-9 pr-4 py-1.5 w-64 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-gray-400"
              />
            </div>
            
            {/* Notifications */}
            <button className="relative text-gray-400 hover:text-black transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full border-2 border-white translate-x-1/2 -translate-y-1/2"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#f8f9fa]">
          <Outlet />
        </main>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.5);
        }
      `}</style>
    </div>
  );
}
