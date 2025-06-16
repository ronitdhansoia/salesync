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
  BarChart3
} from "lucide-react";

export function SalesyncDashboardPreview() {
  return (
    <div className="w-full h-full bg-gray-50 overflow-hidden">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Campaign Dashboard</h1>
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All Systems Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Connections Sent</span>
              <Linkedin className="h-4 w-4 text-[#0077B5]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">2,847</p>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +23% this week
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Acceptance Rate</span>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">37.2%</p>
            <p className="text-xs text-gray-600 flex items-center mt-1">
              Industry avg: 28%
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Messages Sent</span>
              <Send className="h-4 w-4 text-[#7760F9]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">1,056</p>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              89 replies received
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Leads Generated</span>
              <Users className="h-4 w-4 text-[#FD6098]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">142</p>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +45 this month
            </p>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Active Campaigns</h2>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-[#0077B5] bg-opacity-10 p-2 rounded-lg">
                  <Linkedin className="h-5 w-5 text-[#0077B5]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Tech Founders Outreach</p>
                  <p className="text-sm text-gray-600">LinkedIn • 3-step sequence</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">487 / 1000</p>
                <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-[#0077B5] h-2 rounded-full" style={{ width: '48.7%' }}></div>
                </div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-[#25D366] bg-opacity-10 p-2 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-[#25D366]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Mumbai Startups</p>
                  <p className="text-sm text-gray-600">WhatsApp • Follow-up campaign</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">234 / 500</p>
                <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-[#25D366] h-2 rounded-full" style={{ width: '46.8%' }}></div>
                </div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-[#7760F9] bg-opacity-10 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-[#7760F9]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email Drip Campaign</p>
                  <p className="text-sm text-gray-600">Email • 5-email sequence</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">789 / 2000</p>
                <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-[#7760F9] h-2 rounded-full" style={{ width: '39.45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}