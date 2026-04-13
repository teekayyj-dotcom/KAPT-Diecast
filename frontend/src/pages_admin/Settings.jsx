import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Users,
  Bell,
  Plug,
  CreditCard,
  FileText,
  UploadCloud,
  Check,
  Globe,
  Clock,
  Calendar,
  DollarSign,
  Monitor,
  Moon,
  Mail,
} from "lucide-react";

const TABS = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "account", label: "Account", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "users", label: "Users & Roles", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "logs", label: "Logs", icon: FileText },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  // State for toggles in General settings
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [userRegistration, setUserRegistration] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailVerification, setEmailVerification] = useState(true);

  // Custom Toggle Component
  const Toggle = ({
    checked,
    onChange,
    label,
    description,
    icon: Icon,
  }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="mt-0.5 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-black">{label}</p>
          {description && <p className="text-xs text-gray-500 mt-0.5 max-w-[280px] sm:max-w-md leading-relaxed">{description}</p>}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 ${
          checked ? "bg-red-600" : "bg-gray-200"
        }`}
        role="switch"
        aria-checked={checked}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-black">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your application configurations and platform preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar Navigation (Tabs) */}
        <aside className="lg:w-64 shrink-0">
          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 custom-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap lg:whitespace-normal ${
                  activeTab === tab.id
                    ? "bg-white text-red-600 shadow-sm border border-gray-100"
                    : "text-gray-500 hover:text-black hover:bg-gray-100 border border-transparent"
                }`}
              >
                <tab.icon size={18} className={activeTab === tab.id ? "text-red-600" : "text-gray-400"} />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          
          {activeTab === "general" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Card 1: Company / System Information */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="text-base font-semibold text-black">Company & System Information</h3>
                  <p className="text-xs text-gray-500 mt-1">Basic details about your organization and platform identity.</p>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">System Name</label>
                      <input
                        type="text"
                        defaultValue="KAPT Admin Portal"
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                      <input
                        type="text"
                        defaultValue="KAPT Diecast Ltd."
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Support Email</label>
                      <input
                        type="email"
                        defaultValue="support@kapt-diecast.com"
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Support Phone</label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Website URL</label>
                    <input
                      type="url"
                      defaultValue="https://kapt-diecast.com"
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Address</label>
                    <textarea
                      rows={2}
                      defaultValue="123 Racing Avenue, Auto District, CA 90210"
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-black resize-none"
                    />
                  </div>

                  {/* Upload Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Company Logo</label>
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                          <span className="text-xl font-bold tracking-wider">K<span className="text-red-600">.</span></span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-black text-xs font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm">
                            <UploadCloud size={14} />
                            Upload Logo
                          </button>
                          <span className="text-[11px] text-gray-400">SVG, PNG, JPG (max. 800x400px)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Favicon</label>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-red-600">K</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-black text-xs font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm">
                            <UploadCloud size={14} />
                            Upload Icon
                          </button>
                          <span className="text-[11px] text-gray-400">ICO, PNG (16x16px or 32x32px)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Card 2: Regional Settings */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="text-base font-semibold text-black">Regional Settings</h3>
                  <p className="text-xs text-gray-500 mt-1">Configure language, time, and formatting preferences.</p>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <Globe size={14} className="text-gray-400" /> System Language
                    </label>
                    <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-black appearance-none cursor-pointer">
                      <option value="en">English (United States)</option>
                      <option value="uk">English (United Kingdom)</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" /> Time Zone
                    </label>
                    <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-black appearance-none cursor-pointer">
                      <option value="UTC-8">Pacific Time (PT) - UTC-8</option>
                      <option value="UTC-5">Eastern Time (ET) - UTC-5</option>
                      <option value="UTC">Coordinated Universal Time (UTC)</option>
                      <option value="UTC+1">Central European Time (CET) - UTC+1</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" /> Date Format
                    </label>
                    <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-black appearance-none cursor-pointer">
                      <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 12/31/2026)</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 31/12/2026)</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-12-31)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <DollarSign size={14} className="text-gray-400" /> Default Currency
                    </label>
                    <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-black appearance-none cursor-pointer">
                      <option value="USD">USD ($) - US Dollar</option>
                      <option value="EUR">EUR (€) - Euro</option>
                      <option value="GBP">GBP (£) - British Pound</option>
                      <option value="JPY">JPY (¥) - Japanese Yen</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Card 3: Platform Preferences */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="text-base font-semibold text-black">Platform Preferences</h3>
                  <p className="text-xs text-gray-500 mt-1">Control global behaviors and platform access states.</p>
                </div>
                
                <div className="p-6">
                  <Toggle
                    icon={Monitor}
                    label="Maintenance Mode"
                    description="When enabled, the public-facing application will show a 'down for maintenance' page. Only admins can access the site."
                    checked={maintenanceMode}
                    onChange={setMaintenanceMode}
                  />
                  <Toggle
                    icon={Users}
                    label="Allow User Registration"
                    description="Enable or disable new users from creating accounts on the platform."
                    checked={userRegistration}
                    onChange={setUserRegistration}
                  />
                  <Toggle
                    icon={Moon}
                    label="Dark Mode Default"
                    description="Set the default appearance of the platform to Dark Mode for new users."
                    checked={darkMode}
                    onChange={setDarkMode}
                  />
                  <Toggle
                    icon={Mail}
                    label="Require Email Verification"
                    description="New accounts must verify their email address before accessing the platform features."
                    checked={emailVerification}
                    onChange={setEmailVerification}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button className="px-6 py-2.5 bg-white border border-gray-200 text-black rounded-lg text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all shadow-sm">
                  Cancel
                </button>
                <button className="px-6 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-all shadow-sm flex items-center gap-2">
                  <Check size={16} />
                  Save Changes
                </button>
              </div>

            </div>
          )}

          {/* Placeholders for other tabs */}
          {activeTab !== "general" && (
            <div className="bg-white p-12 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center min-h-[400px] animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                {TABS.find(t => t.id === activeTab)?.icon({ size: 32 })}
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                {TABS.find(t => t.id === activeTab)?.label} Settings
              </h3>
              <p className="text-sm text-gray-500 max-w-md">
                This section is currently under construction. Future updates will include configuration options for {TABS.find(t => t.id === activeTab)?.label.toLowerCase()}.
              </p>
              <button 
                onClick={() => setActiveTab("general")}
                className="mt-6 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors"
              >
                Return to General
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
