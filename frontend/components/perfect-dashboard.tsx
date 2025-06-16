"use client";
import React from "react";
import { 
  Linkedin, 
  MessageSquare, 
  TrendingUp, 
  Users,
  CheckCircle2,
  Target,
  Zap,
  Activity
} from "lucide-react";

export function PerfectDashboard() {
  return (
    <div className="w-full h-full bg-[#1d1d1f] relative">
      {/* Safari-style browser chrome */}
      <div className="h-full w-full bg-white rounded-lg overflow-hidden flex flex-col">
        {/* Browser toolbar */}
        <div className="h-12 bg-[#f6f6f6] border-b border-[#d1d1d1] flex items-center px-6 shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-3.5 h-3.5 bg-[#ff5f57] rounded-full"></div>
            <div className="w-3.5 h-3.5 bg-[#ffbd2e] rounded-full"></div>
            <div className="w-3.5 h-3.5 bg-[#28ca42] rounded-full"></div>
          </div>
          <div className="flex-1 mx-16">
            <div className="bg-white rounded-md px-6 py-1.5 text-sm text-gray-600 text-center border border-[#d1d1d1]">
              app.salesync.in/dashboard
            </div>
          </div>
        </div>

        {/* App header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="bg-[#7760F9] p-2 rounded-lg">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold">SaleSync</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Activity className="h-6 w-6 text-gray-500" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
            </div>
            <div className="w-10 h-10 bg-[#7760F9] rounded-full"></div>
          </div>
        </div>

        {/* Main dashboard content */}
        <div className="flex-1 bg-[#fafbfc] p-10 overflow-hidden">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-base text-gray-600">Last updated 2 minutes ago</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="w-12 h-12 bg-[#0077B5]/10 rounded-xl flex items-center justify-center">
                  <Linkedin className="h-6 w-6 text-[#0077B5]" />
                </div>
                <span className="text-sm text-green-600 font-medium">↑23%</span>
              </div>
              <p className="text-3xl font-bold">3.8K</p>
              <p className="text-base text-gray-600">Connections</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">↑9%</span>
              </div>
              <p className="text-3xl font-bold">41%</p>
              <p className="text-base text-gray-600">Accept Rate</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-[#25D366]" />
                </div>
                <span className="text-sm text-green-600 font-medium">↑45%</span>
              </div>
              <p className="text-3xl font-bold">2.1K</p>
              <p className="text-base text-gray-600">Messages</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="w-12 h-12 bg-[#FD6098]/10 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-[#FD6098]" />
                </div>
                <span className="text-sm text-green-600 font-medium">↑37%</span>
              </div>
              <p className="text-3xl font-bold">287</p>
              <p className="text-base text-gray-600">Leads</p>
            </div>
          </div>

          {/* Chart and campaigns */}
          <div className="grid grid-cols-3 gap-6">
            {/* Chart */}
            <div className="col-span-2 bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Weekly Performance</h2>
              <div className="h-48 flex items-end justify-between space-x-3">
                {[40, 65, 45, 78, 52, 89, 72].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-[#7760F9] to-[#9b8afc] rounded-t opacity-90 transition-all hover:opacity-100" 
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <span key={i} className="text-base text-gray-500 flex-1 text-center">{d}</span>
                ))}
              </div>
            </div>

            {/* Campaigns */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Active Campaigns</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-medium">Tech Founders</span>
                    <span className="text-sm text-green-600 font-medium">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-[#0077B5] h-1.5 rounded-full w-2/3"></div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-medium">Mumbai Startups</span>
                    <span className="text-sm text-green-600 font-medium">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-[#25D366] h-1.5 rounded-full w-[45%]"></div>
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