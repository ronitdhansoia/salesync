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
  ArrowDown,
  User
} from "lucide-react";

export function DashboardMacbook() {
  return (
    <div className="absolute inset-0 bg-[#fafbfc] flex flex-col overflow-hidden">
      {/* Top Bar - macOS style */}
      <div className="bg-gradient-to-b from-[#e3e3e3] to-[#d8d8d8] h-5 flex items-center px-2">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 bg-[#ff5f57] rounded-full shadow-sm"></div>
          <div className="w-2.5 h-2.5 bg-[#ffbd2e] rounded-full shadow-sm"></div>
          <div className="w-2.5 h-2.5 bg-[#28ca42] rounded-full shadow-sm"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-[11px] text-gray-700 font-medium">SaleSync Dashboard</span>
        </div>
      </div>

      {/* Browser Navigation */}
      <div className="bg-[#f5f5f5] px-2 py-1 flex items-center space-x-2 shadow-sm">
        <div className="flex-1 bg-white rounded px-3 py-1 flex items-center shadow-inner">
          <Search className="h-3 w-3 text-gray-400 mr-2" />
          <span className="text-[11px] text-gray-600">app.salesync.in/dashboard</span>
        </div>
      </div>

      {/* App Navigation */}
      <div className="bg-white px-3 py-1.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <div className="bg-gradient-to-br from-[#7760F9] to-[#6651E8] p-1 rounded">
              <Zap className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">SaleSync</span>
          </div>
          <nav className="flex items-center space-x-4">
            <a className="text-xs font-medium text-[#7760F9]">Dashboard</a>
            <a className="text-xs text-gray-600">Campaigns</a>
            <a className="text-xs text-gray-600">Leads</a>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-gray-600" />
          <div className="flex items-center space-x-1">
            <div className="w-6 h-6 bg-gradient-to-br from-[#7760F9] to-[#6651E8] rounded-full flex items-center justify-center">
              <User className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs text-gray-700">Rajesh</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden p-3 bg-[#fafbfc]">
        {/* Welcome Header */}
        <div className="mb-3">
          <h1 className="text-base font-bold text-gray-900">Welcome back, Rajesh!</h1>
          <p className="text-xs text-gray-600">Your campaigns are performing 23% better this week</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="bg-white rounded-md shadow-sm p-2.5">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1 bg-[#0077B5]/10 rounded">
                <Linkedin className="h-3 w-3 text-[#0077B5]" />
              </div>
              <span className="text-[10px] font-medium text-green-600">+23%</span>
            </div>
            <p className="text-base font-bold text-gray-900">3,847</p>
            <p className="text-[10px] text-gray-600">Connections</p>
          </div>
          
          <div className="bg-white rounded-md shadow-sm p-2.5">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1 bg-green-100 rounded">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
              </div>
              <span className="text-[10px] font-medium text-green-600">+9%</span>
            </div>
            <p className="text-base font-bold text-gray-900">41.2%</p>
            <p className="text-[10px] text-gray-600">Accept Rate</p>
          </div>

          <div className="bg-white rounded-md shadow-sm p-2.5">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1 bg-[#25D366]/10 rounded">
                <MessageSquare className="h-3 w-3 text-[#25D366]" />
              </div>
              <span className="text-[10px] font-medium text-green-600">+45%</span>
            </div>
            <p className="text-base font-bold text-gray-900">2,156</p>
            <p className="text-[10px] text-gray-600">WhatsApp</p>
          </div>

          <div className="bg-white rounded-md shadow-sm p-2.5">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1 bg-[#FD6098]/10 rounded">
                <Target className="h-3 w-3 text-[#FD6098]" />
              </div>
              <span className="text-[10px] font-medium text-green-600">+37%</span>
            </div>
            <p className="text-base font-bold text-gray-900">287</p>
            <p className="text-[10px] text-gray-600">Leads</p>
          </div>
        </div>

        {/* Charts and Campaigns */}
        <div className="grid grid-cols-3 gap-2">
          {/* Chart */}
          <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-3">
            <h2 className="text-xs font-semibold text-gray-900 mb-2">Weekly Performance</h2>
            <div className="h-20 bg-gradient-to-b from-gray-50 to-gray-100 rounded flex items-end justify-around p-1">
              {[65, 45, 78, 52, 89, 72, 91].map((height, i) => (
                <div key={i} className="flex-1 mx-0.5 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-[#7760F9] to-[#9b8afc] rounded-t transition-all hover:opacity-90"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-[9px] text-gray-500 mt-1">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Campaigns */}
          <div className="bg-white rounded-md shadow-sm p-2.5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-semibold text-gray-900">Campaigns</h2>
              <span className="text-[9px] text-[#7760F9] bg-[#7760F9]/10 px-1.5 py-0.5 rounded">5 Active</span>
            </div>
            
            <div className="space-y-1.5">
              <div className="bg-gray-50 rounded p-1.5">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1">
                    <Linkedin className="h-3 w-3 text-[#0077B5]" />
                    <span className="text-[10px] font-medium">Tech Founders</span>
                  </div>
                  <span className="text-[9px] text-green-600">Active</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1">
                  <div className="bg-[#0077B5] h-1 rounded-full" style={{ width: '67%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-[9px] text-gray-500">
                  <span>670/1000</span>
                  <span>67%</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded p-1.5">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-3 w-3 text-[#25D366]" />
                    <span className="text-[10px] font-medium">Mumbai Startups</span>
                  </div>
                  <span className="text-[9px] text-green-600">Active</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1">
                  <div className="bg-[#25D366] h-1 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-[9px] text-gray-500">
                  <span>450/1000</span>
                  <span>45%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}