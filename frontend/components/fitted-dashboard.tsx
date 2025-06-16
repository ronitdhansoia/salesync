"use client";
import React from "react";
import { 
  Linkedin, 
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Target,
  Zap,
  Activity,
  User
} from "lucide-react";

export function FittedDashboard() {
  return (
    <div className="absolute inset-0 bg-white flex flex-col rounded-lg overflow-hidden">
      {/* Browser UI - 2.5rem height */}
      <div className="h-10 bg-gradient-to-b from-[#e8e8e8] to-[#d8d8d8] flex items-center px-4 shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-[#ff5f57] rounded-full"></div>
          <div className="w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
          <div className="w-3 h-3 bg-[#28ca42] rounded-full"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-gray-700">salesync.in</span>
        </div>
      </div>

      {/* App Header - 3.5rem height */}
      <div className="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#7760F9] rounded flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold">SaleSync</span>
        </div>
        <div className="flex items-center gap-3">
          <Activity className="h-5 w-5 text-gray-500" />
          <div className="w-8 h-8 bg-[#7760F9] rounded-full"></div>
        </div>
      </div>

      {/* Main Content - fills remaining space */}
      <div className="flex-1 p-6 overflow-hidden">
        {/* Welcome */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-600">Your campaigns are performing well</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-[#0077B5]/10 rounded flex items-center justify-center">
                <Linkedin className="h-4 w-4 text-[#0077B5]" />
              </div>
              <span className="text-xs text-green-600">+23%</span>
            </div>
            <p className="text-xl font-bold">3.8K</p>
            <p className="text-xs text-gray-600">Connections</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-xs text-green-600">+9%</span>
            </div>
            <p className="text-xl font-bold">41%</p>
            <p className="text-xs text-gray-600">Accept Rate</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-[#25D366]/10 rounded flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-[#25D366]" />
              </div>
              <span className="text-xs text-green-600">+45%</span>
            </div>
            <p className="text-xl font-bold">2.1K</p>
            <p className="text-xs text-gray-600">Messages</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-[#FD6098]/10 rounded flex items-center justify-center">
                <Target className="h-4 w-4 text-[#FD6098]" />
              </div>
              <span className="text-xs text-green-600">+37%</span>
            </div>
            <p className="text-xl font-bold">287</p>
            <p className="text-xs text-gray-600">Leads</p>
          </div>
        </div>

        {/* Chart and Campaigns */}
        <div className="grid grid-cols-3 gap-4">
          {/* Chart */}
          <div className="col-span-2 bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-sm font-semibold mb-3">Weekly Performance</h2>
            <div className="h-24 flex items-end justify-between gap-2">
              {[65, 45, 78, 52, 89, 72, 91].map((height, i) => (
                <div key={i} className="flex-1 bg-[#7760F9] rounded-t opacity-80" 
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <span key={i} className="text-xs text-gray-500 flex-1 text-center">{d}</span>
              ))}
            </div>
          </div>

          {/* Campaigns */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-sm font-semibold mb-3">Active</h2>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded p-2">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium">Tech Founders</span>
                  <span className="text-xs text-green-600">67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-[#0077B5] h-1 rounded-full w-2/3"></div>
                </div>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium">Startups</span>
                  <span className="text-xs text-green-600">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-[#25D366] h-1 rounded-full" style={{width: '45%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}