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
  Clock,
  BarChart3,
  Zap,
  Activity,
  Target,
  Calendar,
  Filter,
  Download,
  MoreVertical,
  Search,
  ArrowUp,
  ArrowDown
} from "lucide-react";

export function DashboardScreenshot() {
  return (
    <div className="w-full h-full bg-gray-50 overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-[#7760F9] to-[#6651E8] p-1 rounded-lg">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">SaleSync</span>
            </div>
            <nav className="flex items-center space-x-6">
              <a className="text-sm font-medium text-[#7760F9]">Dashboard</a>
              <a className="text-sm text-gray-600 hover:text-gray-900">Campaigns</a>
              <a className="text-sm text-gray-600 hover:text-gray-900">Leads</a>
              <a className="text-sm text-gray-600 hover:text-gray-900">Analytics</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              <Activity className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#7760F9] to-[#6651E8] rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Rajesh Kumar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, Rajesh!</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your campaigns today</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
              <Calendar className="h-4 w-4" />
              <span>Last 30 days</span>
              <ArrowDown className="h-3 w-3" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#7760F9] text-white rounded-lg text-sm font-medium">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="p-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-[#0077B5] bg-opacity-10 p-2 rounded-lg">
                <Linkedin className="h-5 w-5 text-[#0077B5]" />
              </div>
              <span className="text-xs font-medium text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                23%
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">3,847</p>
            <p className="text-sm text-gray-600 mt-1">LinkedIn Connections</p>
            <div className="mt-3 flex items-center text-xs text-gray-500">
              <span className="text-green-600 font-medium">+847</span>
              <span className="ml-1">this week</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-xs font-medium text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                9%
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">41.2%</p>
            <p className="text-sm text-gray-600 mt-1">Acceptance Rate</p>
            <div className="mt-3 text-xs text-gray-500">
              Industry avg: <span className="font-medium">28%</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-[#25D366] bg-opacity-10 p-2 rounded-lg">
                <MessageSquare className="h-5 w-5 text-[#25D366]" />
              </div>
              <span className="text-xs font-medium text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                45%
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">2,156</p>
            <p className="text-sm text-gray-600 mt-1">WhatsApp Messages</p>
            <div className="mt-3 text-xs text-gray-500">
              <span className="text-blue-600 font-medium">312 replies</span> received
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-[#FD6098] bg-opacity-10 p-2 rounded-lg">
                <Target className="h-5 w-5 text-[#FD6098]" />
              </div>
              <span className="text-xs font-medium text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                37%
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">287</p>
            <p className="text-sm text-gray-600 mt-1">Qualified Leads</p>
            <div className="mt-3 text-xs text-gray-500">
              <span className="text-green-600 font-medium">42 hot leads</span> this month
            </div>
          </div>
        </div>

        {/* Charts and Campaign Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Performance Chart */}
          <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Campaign Performance</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
            
            {/* Chart Placeholder */}
            <div className="relative h-32 bg-gray-50 rounded-lg p-2">
              <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
                {[65, 45, 78, 52, 89, 72, 91].map((height, i) => (
                  <div key={i} className="w-1/8 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-[#7760F9] to-[#6651E8] rounded-t-md"
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Connections</p>
                <p className="text-xl font-semibold text-gray-900">1,284</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Messages</p>
                <p className="text-xl font-semibold text-gray-900">856</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Responses</p>
                <p className="text-xl font-semibold text-gray-900">213</p>
              </div>
            </div>
          </div>

          {/* Active Campaigns */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Active Campaigns</h2>
              <span className="text-xs font-medium text-[#7760F9] bg-[#7760F9] bg-opacity-10 px-2 py-1 rounded-full">
                5 Active
              </span>
            </div>

            <div className="space-y-4">
              <div className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <Linkedin className="h-4 w-4 text-[#0077B5]" />
                    <span className="text-sm font-medium text-gray-900">Tech Founders</span>
                  </div>
                  <span className="text-xs text-green-600">Running</span>
                </div>
                <div className="text-xs text-gray-600 mb-2">Mumbai • Bangalore • Delhi</div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-[#0077B5] h-1.5 rounded-full" style={{ width: '67%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>670/1000</span>
                  <span>67%</span>
                </div>
              </div>

              <div className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-[#25D366]" />
                    <span className="text-sm font-medium text-gray-900">Startup CEOs</span>
                  </div>
                  <span className="text-xs text-green-600">Running</span>
                </div>
                <div className="text-xs text-gray-600 mb-2">WhatsApp Campaign</div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-[#25D366] h-1.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>450/1000</span>
                  <span>45%</span>
                </div>
              </div>

              <div className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-[#7760F9]" />
                    <span className="text-sm font-medium text-gray-900">SaaS Leaders</span>
                  </div>
                  <span className="text-xs text-yellow-600">Scheduled</span>
                </div>
                <div className="text-xs text-gray-600 mb-2">Starts tomorrow</div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-gray-300 h-1.5 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>0/500</span>
                  <span>0%</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 text-sm font-medium text-[#7760F9] hover:text-[#6651E8]">
              View all campaigns →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}