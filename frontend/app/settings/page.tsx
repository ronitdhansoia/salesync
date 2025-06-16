"use client";

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  User, 
  Bell,
  Shield,
  CreditCard,
  Globe,
  Smartphone,
  Mail,
  Key,
  Database,
  Users,
  MessageSquare,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Info,
  Download,
  Upload,
  Trash2,
  Plus,
  Edit,
  Lock,
  Unlock,
  Flag
} from 'lucide-react';

interface UserSettings {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    position: string;
    timeZone: string;
    language: string;
  };
  notifications: {
    email: boolean;
    whatsapp: boolean;
    sms: boolean;
    desktop: boolean;
    campaignUpdates: boolean;
    leadAlerts: boolean;
    systemUpdates: boolean;
    weeklyReports: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    loginSessions: Array<{
      id: string;
      device: string;
      location: string;
      lastActive: string;
      current: boolean;
    }>;
  };
  billing: {
    currentPlan: string;
    billingCycle: string;
    nextBillingDate: string;
    paymentMethod: string;
    usage: {
      leads: number;
      messages: number;
      campaigns: number;
    };
    limits: {
      leads: number;
      messages: number;
      campaigns: number;
    };
  };
  integrations: {
    linkedin: { connected: boolean; account: string };
    whatsapp: { connected: boolean; number: string };
    email: { connected: boolean; provider: string };
    crm: { connected: boolean; system: string };
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load user settings
    setSettings({
      profile: {
        firstName: 'Rohan',
        lastName: 'Kumar',
        email: 'rohan@salesyncindia.com',
        phone: '+91 98765 43210',
        company: 'SaleSync India',
        position: 'Sales Director',
        timeZone: 'Asia/Kolkata',
        language: 'English',
      },
      notifications: {
        email: true,
        whatsapp: true,
        sms: false,
        desktop: true,
        campaignUpdates: true,
        leadAlerts: true,
        systemUpdates: false,
        weeklyReports: true,
      },
      security: {
        twoFactorEnabled: true,
        lastPasswordChange: '2024-01-10',
        loginSessions: [
          { id: '1', device: 'Chrome on MacBook Pro', location: 'Mumbai, Maharashtra', lastActive: '5 minutes ago', current: true },
          { id: '2', device: 'Safari on iPhone', location: 'Mumbai, Maharashtra', lastActive: '2 hours ago', current: false },
          { id: '3', device: 'Chrome on Windows', location: 'Bangalore, Karnataka', lastActive: '1 day ago', current: false },
        ],
      },
      billing: {
        currentPlan: 'Professional',
        billingCycle: 'Monthly',
        nextBillingDate: '2024-02-15',
        paymentMethod: 'UPI - rohan@paytm',
        usage: {
          leads: 847,
          messages: 5234,
          campaigns: 12,
        },
        limits: {
          leads: 2000,
          messages: 10000,
          campaigns: 25,
        },
      },
      integrations: {
        linkedin: { connected: true, account: 'Rohan Kumar' },
        whatsapp: { connected: true, number: '+91 98765 43210' },
        email: { connected: true, provider: 'Gmail' },
        crm: { connected: false, system: '' },
      },
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const updateSettings = (section: keyof UserSettings, key: string, value: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [key]: value,
      },
    });
  };

  if (!settings) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-3 text-lg text-gray-600">Loading settings...</span>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'localization', label: 'Localization', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Settings className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600">Manage your account and application preferences</p>
              </div>
            </div>
            <div className="flex gap-3">
              {saved && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">Settings saved</span>
                </div>
              )}
              <button 
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
              >
                {saving ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* India-Specific Settings Notice */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Flag className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">India-Specific Configuration</h3>
              <p className="text-blue-800 mb-4">
                Configure your account for optimal performance in the Indian market including timezone settings, 
                regional compliance, local payment methods, and Hindi language support.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-blue-800">IST Timezone</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-blue-800">UPI Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-blue-800">DPDPA Compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-blue-800">Regional Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={settings.profile.firstName}
                        onChange={(e) => updateSettings('profile', 'firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={settings.profile.lastName}
                        onChange={(e) => updateSettings('profile', 'lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => updateSettings('profile', 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={settings.profile.phone}
                        onChange={(e) => updateSettings('profile', 'phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input
                        type="text"
                        value={settings.profile.company}
                        onChange={(e) => updateSettings('profile', 'company', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                      <input
                        type="text"
                        value={settings.profile.position}
                        onChange={(e) => updateSettings('profile', 'position', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                      <select
                        value={settings.profile.timeZone}
                        onChange={(e) => updateSettings('profile', 'timeZone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Asia/Kolkata">India Standard Time (IST)</option>
                        <option value="Asia/Dubai">Dubai Time</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        value={settings.profile.language}
                        onChange={(e) => updateSettings('profile', 'language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">हिंदी (Hindi)</option>
                        <option value="Marathi">मराठी (Marathi)</option>
                        <option value="Tamil">தமிழ் (Tamil)</option>
                        <option value="Telugu">తెలుగు (Telugu)</option>
                        <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Channels</h3>
                      <div className="space-y-4">
                        {Object.entries(settings.notifications).slice(0, 4).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {key === 'email' && <Mail className="h-5 w-5 text-blue-600" />}
                              {key === 'whatsapp' && <MessageSquare className="h-5 w-5 text-green-600" />}
                              {key === 'sms' && <Smartphone className="h-5 w-5 text-purple-600" />}
                              {key === 'desktop' && <Bell className="h-5 w-5 text-orange-600" />}
                              <div>
                                <p className="font-medium text-gray-900 capitalize">{key}</p>
                                <p className="text-sm text-gray-600">
                                  {key === 'email' && 'Receive notifications via email'}
                                  {key === 'whatsapp' && 'Get updates on WhatsApp'}
                                  {key === 'sms' && 'SMS notifications to your phone'}
                                  {key === 'desktop' && 'Browser push notifications'}
                                </p>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value}
                                onChange={(e) => updateSettings('notifications', key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Content Types</h3>
                      <div className="space-y-4">
                        {Object.entries(settings.notifications).slice(4).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </p>
                              <p className="text-sm text-gray-600">
                                {key === 'campaignUpdates' && 'Get notified about campaign status changes'}
                                {key === 'leadAlerts' && 'New lead notifications and scoring updates'}
                                {key === 'systemUpdates' && 'Platform updates and maintenance notices'}
                                {key === 'weeklyReports' && 'Weekly performance and analytics reports'}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value}
                                onChange={(e) => updateSettings('notifications', key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Security & Privacy</h2>
                  <div className="space-y-6">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">Two-Factor Authentication</span>
                        <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Enabled</span>
                      </div>
                      <p className="text-sm text-green-800 mb-3">
                        Your account is protected with 2FA. We recommend keeping this enabled for security.
                      </p>
                      <button className="text-sm text-green-700 hover:text-green-800 font-medium">
                        Manage 2FA Settings
                      </button>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-2">
                            Last changed: {settings.security.lastPasswordChange}
                          </p>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Change Password
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Active Sessions</h3>
                      <div className="space-y-3">
                        {settings.security.loginSessions.map((session) => (
                          <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Smartphone className="h-5 w-5 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{session.device}</p>
                                <p className="text-sm text-gray-600">{session.location}</p>
                                <p className="text-xs text-gray-500">Last active: {session.lastActive}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {session.current && (
                                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Current</span>
                              )}
                              {!session.current && (
                                <button className="text-sm text-red-600 hover:text-red-700">
                                  End Session
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Settings */}
              {activeTab === 'billing' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing & Usage</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-medium text-blue-900 mb-2">Current Plan</h3>
                        <p className="text-2xl font-bold text-blue-900">{settings.billing.currentPlan}</p>
                        <p className="text-sm text-blue-700">{settings.billing.billingCycle} billing</p>
                        <p className="text-sm text-blue-700">Next billing: {settings.billing.nextBillingDate}</p>
                      </div>
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                        <p className="text-gray-900">{settings.billing.paymentMethod}</p>
                        <button className="text-sm text-blue-600 hover:text-blue-700 mt-2">
                          Update Payment Method
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Usage This Month</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Leads</span>
                            <span>{settings.billing.usage.leads}/{settings.billing.limits.leads}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(settings.billing.usage.leads / settings.billing.limits.leads) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Messages</span>
                            <span>{settings.billing.usage.messages}/{settings.billing.limits.messages}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(settings.billing.usage.messages / settings.billing.limits.messages) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Campaigns</span>
                            <span>{settings.billing.usage.campaigns}/{settings.billing.limits.campaigns}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full"
                              style={{ width: `${(settings.billing.usage.campaigns / settings.billing.limits.campaigns) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Upgrade Plan
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        View Billing History
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Integrations Settings */}
              {activeTab === 'integrations' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Integrations</h2>
                  <div className="space-y-4">
                    {Object.entries(settings.integrations).map(([platform, config]) => (
                      <div key={platform} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            platform === 'linkedin' ? 'bg-blue-100' :
                            platform === 'whatsapp' ? 'bg-green-100' :
                            platform === 'email' ? 'bg-purple-100' : 'bg-gray-100'
                          }`}>
                            {platform === 'linkedin' && <Users className="h-5 w-5 text-blue-600" />}
                            {platform === 'whatsapp' && <MessageSquare className="h-5 w-5 text-green-600" />}
                            {platform === 'email' && <Mail className="h-5 w-5 text-purple-600" />}
                            {platform === 'crm' && <Database className="h-5 w-5 text-gray-600" />}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 capitalize">{platform}</p>
                            {config.connected ? (
                              <p className="text-sm text-gray-600">
                                Connected: {config.account || config.number || config.provider || config.system}
                              </p>
                            ) : (
                              <p className="text-sm text-gray-600">Not connected</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {config.connected ? (
                            <>
                              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Connected</span>
                              <button className="text-sm text-gray-600 hover:text-gray-700">
                                Disconnect
                              </button>
                            </>
                          ) : (
                            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                              Connect
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-5 w-5 text-amber-600" />
                      <span className="font-medium text-amber-900">Available Indian CRM Integrations</span>
                    </div>
                    <p className="text-sm text-amber-800 mb-3">
                      Connect with popular Indian CRM systems like Zoho CRM, Freshworks, Kapture CX, and more.
                    </p>
                    <button className="text-sm text-amber-700 hover:text-amber-800 font-medium">
                      Browse Available Integrations
                    </button>
                  </div>
                </div>
              )}

              {/* Localization Settings */}
              {activeTab === 'localization' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Localization & Regional Settings</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>India</option>
                          <option>UAE</option>
                          <option>Singapore</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>INR (₹)</option>
                          <option>USD ($)</option>
                          <option>AED (د.إ)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>DD/MM/YYYY</option>
                          <option>MM/DD/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Number Format</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>Indian (1,00,000)</option>
                          <option>International (100,000)</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h3 className="font-medium text-green-900 mb-2">Regional Features Enabled</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-800">Festival calendar integration</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-800">Indian business hours optimization</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-800">Local phone number validation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-800">DPDPA 2023 compliance features</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}