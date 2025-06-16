"use client";
import React from "react";
import { 
  Linkedin, 
  MessageSquare, 
  Mail,
  TrendingUp, 
  Users,
  Send,
  CheckCircle2,
  Target,
  Zap,
  Activity,
  User,
  BarChart3
} from "lucide-react";

export function MacbookDashboard() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#1a1a1a]">
      {/* macOS Window */}
      <div className="absolute inset-0 bg-white flex flex-col">
        {/* Safari Title Bar */}
        <div className="h-11 bg-gradient-to-b from-[#e8e8e8] to-[#d6d6d6] flex items-center px-5 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white/80 rounded px-20 py-0.5 text-xs text-gray-700">
              app.salesync.in
            </div>
          </div>
        </div>

        {/* App Navigation */}
        <div className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#7760F9] to-[#6651E8] rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SaleSync</span>
            </div>
            <nav className="flex items-center gap-6">
              <a className="text-sm font-medium text-[#7760F9]">Dashboard</a>
              <a className="text-sm text-gray-600 hover:text-gray-900">Campaigns</a>
              <a className="text-sm text-gray-600 hover:text-gray-900">Leads</a>
              <a className="text-sm text-gray-600 hover:text-gray-900">Analytics</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Activity className="h-5 w-5 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-[#7760F9] to-[#6651E8] rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Rajesh Kumar</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 bg-[#f8f9fa] overflow-hidden">
          <div className="h-full max-w-[1400px] mx-auto p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Rajesh!</h1>
              <p className="text-base text-gray-600">Here's what's happening with your campaigns today</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#0077B5]/10 rounded-lg flex items-center justify-center">
                    <Linkedin className="h-6 w-6 text-[#0077B5]" />
                  </div>
                  <span className="text-sm font-medium text-green-600">+23%</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">3,847</p>
                <p className="text-sm text-gray-600">LinkedIn Connections</p>
                <p className="text-xs text-gray-500 mt-2">+847 this week</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-green-600">+9%</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">41.2%</p>
                <p className="text-sm text-gray-600">Acceptance Rate</p>
                <p className="text-xs text-gray-500 mt-2">Industry avg: 28%</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#25D366]/10 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <span className="text-sm font-medium text-green-600">+45%</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">2,156</p>
                <p className="text-sm text-gray-600">WhatsApp Messages</p>
                <p className="text-xs text-gray-500 mt-2">312 replies received</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#FD6098]/10 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-[#FD6098]" />
                  </div>
                  <span className="text-sm font-medium text-green-600">+37%</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">287</p>
                <p className="text-sm text-gray-600">Qualified Leads</p>
                <p className="text-xs text-gray-500 mt-2">42 hot leads this month</p>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-3 gap-6">
              {/* Performance Chart */}
              <div className="col-span-2 bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Campaign Performance</h2>
                  <BarChart3 className="h-5 w-5 text-gray-400" />
                </div>
                
                <div className="h-48 relative">
                  <div className="absolute inset-0 flex items-end justify-between gap-3 px-2">
                    {[65, 45, 78, 52, 89, 72, 91].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-gradient-to-t from-[#7760F9] to-[#9b8afc] rounded-t-md transition-all hover:opacity-90"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-xs text-gray-500">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Connections Sent</p>
                    <p className="text-xl font-semibold text-gray-900">1,284</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Messages Sent</p>
                    <p className="text-xl font-semibold text-gray-900">856</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Total Responses</p>
                    <p className="text-xl font-semibold text-gray-900">213</p>
                  </div>
                </div>
              </div>

              {/* Active Campaigns */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Active Campaigns</h2>
                  <span className="text-xs font-medium text-[#7760F9] bg-[#7760F9]/10 px-2 py-1 rounded-full">
                    5 Active
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-[#0077B5]" />
                        <span className="text-sm font-medium text-gray-900">Tech Founders</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Running</span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">Mumbai • Bangalore • Delhi</div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-[#0077B5] h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>670/1000</span>
                      <span>67%</span>
                    </div>
                  </div>

                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-[#25D366]" />
                        <span className="text-sm font-medium text-gray-900">Startup CEOs</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Running</span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">WhatsApp Campaign</div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-[#25D366] h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>450/1000</span>
                      <span>45%</span>
                    </div>
                  </div>

                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-[#7760F9]" />
                        <span className="text-sm font-medium text-gray-900">SaaS Leaders</span>
                      </div>
                      <span className="text-xs text-yellow-600 font-medium">Scheduled</span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">Starts tomorrow at 9 AM</div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-gray-300 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>0/500</span>
                      <span>Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}