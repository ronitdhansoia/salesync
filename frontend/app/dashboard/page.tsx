"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  Mail, 
  TrendingUp, 
  Activity,
  Target,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Bot,
  Linkedin,
  Phone,
  Eye,
  MousePointer,
  Zap,
  Globe,
  Shield
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalContacts: number;
  activeConnections: number;
  campaignsRunning: number;
  responseRate: number;
  monthlyGrowth: number;
  weeklyActivity: number;
}

interface CampaignData {
  id: string;
  name: string;
  type: 'linkedin' | 'whatsapp' | 'email';
  status: 'active' | 'paused' | 'completed';
  sent: number;
  responses: number;
  conversion: number;
}

interface RecentActivity {
  id: string;
  type: 'connection' | 'message' | 'response' | 'lead';
  description: string;
  timestamp: string;
  channel: 'linkedin' | 'whatsapp' | 'email';
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    activeConnections: 0,
    campaignsRunning: 0,
    responseRate: 0,
    monthlyGrowth: 0,
    weeklyActivity: 0,
  });

  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  useEffect(() => {
    // Load dashboard data
    setStats({
      totalContacts: 2847,
      activeConnections: 156,
      campaignsRunning: 8,
      responseRate: 23.4,
      monthlyGrowth: 12.8,
      weeklyActivity: 342,
    });

    setCampaigns([
      {
        id: '1',
        name: 'CEO Outreach - SaaS',
        type: 'linkedin',
        status: 'active',
        sent: 245,
        responses: 34,
        conversion: 13.9,
      },
      {
        id: '2',
        name: 'Product Demo Follow-up',
        type: 'whatsapp',
        status: 'active',
        sent: 89,
        responses: 67,
        conversion: 75.3,
      },
      {
        id: '3',
        name: 'Newsletter Subscribers',
        type: 'email',
        status: 'active',
        sent: 1247,
        responses: 156,
        conversion: 12.5,
      },
      {
        id: '4',
        name: 'Mumbai Tech Meetup',
        type: 'linkedin',
        status: 'completed',
        sent: 167,
        responses: 23,
        conversion: 13.8,
      },
    ]);

    setRecentActivity([
      {
        id: '1',
        type: 'connection',
        description: 'New LinkedIn connection accepted - Priya Sharma (CTO at TechCorp)',
        timestamp: '2 minutes ago',
        channel: 'linkedin',
      },
      {
        id: '2',
        type: 'response',
        description: 'Positive response to WhatsApp campaign - "Interested in demo"',
        timestamp: '5 minutes ago',
        channel: 'whatsapp',
      },
      {
        id: '3',
        type: 'lead',
        description: 'New qualified lead from email campaign - Enterprise prospect',
        timestamp: '8 minutes ago',
        channel: 'email',
      },
      {
        id: '4',
        type: 'message',
        description: 'Automated follow-up sent to 15 LinkedIn prospects',
        timestamp: '12 minutes ago',
        channel: 'linkedin',
      },
      {
        id: '5',
        type: 'connection',
        description: 'WhatsApp Business account connected successfully',
        timestamp: '1 hour ago',
        channel: 'whatsapp',
      },
    ]);
  }, []);

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'linkedin':
        return Linkedin;
      case 'whatsapp':
        return MessageSquare;
      case 'email':
        return Mail;
      default:
        return Activity;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'linkedin':
        return 'text-blue-600 bg-blue-100';
      case 'whatsapp':
        return 'text-green-600 bg-green-100';
      case 'email':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'paused':
        return 'text-yellow-600 bg-yellow-100';
      case 'completed':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'connection':
        return Users;
      case 'message':
        return MessageSquare;
      case 'response':
        return CheckCircle2;
      case 'lead':
        return Target;
      default:
        return Activity;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your sales automation.</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <Link
                href="/campaigns/new"
                className="inline-flex items-center gap-2 bg-[#7760F9] text-white px-4 py-2 rounded-lg hover:bg-[#6651E8] transition-colors"
              >
                <Bot className="h-4 w-4" />
                New Campaign
              </Link>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalContacts.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+{stats.monthlyGrowth}%</span>
                  <span className="text-sm text-gray-500 ml-1">this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Connections</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeConnections}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+23</span>
                  <span className="text-sm text-gray-500 ml-1">this week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-3xl font-bold text-gray-900">{stats.responseRate}%</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+2.1%</span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Campaigns Running</p>
                <p className="text-3xl font-bold text-gray-900">{stats.campaignsRunning}</p>
                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">24/7</span>
                  <span className="text-sm text-gray-500 ml-1">automated</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Bot className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                href="/linkedin"
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Linkedin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">LinkedIn Outreach</p>
                  <p className="text-sm text-gray-600">Connect with prospects</p>
                </div>
              </Link>

              <Link
                href="/whatsapp"
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">WhatsApp Messages</p>
                  <p className="text-sm text-gray-600">Send bulk messages</p>
                </div>
              </Link>

              <Link
                href="/email-finder"
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Mail className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Find Emails</p>
                  <p className="text-sm text-gray-600">Discover contact info</p>
                </div>
              </Link>

              <Link
                href="/automation"
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                  <Zap className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Automation</p>
                  <p className="text-sm text-gray-600">Manage workflows</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Channel Performance</h2>
              <Link href="/analytics" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                View Analytics →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Linkedin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">67%</p>
                <p className="text-sm text-gray-600">LinkedIn Success</p>
                <p className="text-xs text-green-600 mt-1">+5% vs last month</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">84%</p>
                <p className="text-sm text-gray-600">WhatsApp Open Rate</p>
                <p className="text-xs text-green-600 mt-1">+12% vs last month</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Mail className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">43%</p>
                <p className="text-sm text-gray-600">Email Response</p>
                <p className="text-xs text-red-600 mt-1">-2% vs last month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Campaigns */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Active Campaigns</h2>
                <Link href="/campaigns" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View All →
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {campaigns.slice(0, 4).map((campaign) => {
                  const ChannelIcon = getChannelIcon(campaign.type);
                  return (
                    <div key={campaign.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getChannelColor(campaign.type)}`}>
                          <ChannelIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{campaign.name}</p>
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </span>
                            <span className="text-sm text-gray-500">
                              {campaign.sent} sent • {campaign.responses} responses
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{campaign.conversion}%</p>
                        <p className="text-sm text-gray-600">conversion</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const ActivityIcon = getActivityIcon(activity.type);
                  const ChannelIcon = getChannelIcon(activity.channel);
                  
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <ActivityIcon className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <ChannelIcon className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{activity.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Alert */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">DPDPA 2023 Compliance</h3>
              <p className="text-blue-800 mb-4">
                Your platform is compliant with India's Digital Personal Data Protection Act, 2023. 
                All consent management and data processing activities are being tracked automatically.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-blue-800">1,089 Active Consents</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-blue-800">15 Expiring Soon</span>
                </div>
                <Link 
                  href="/compliance" 
                  className="text-blue-700 hover:text-blue-800 font-medium text-sm"
                >
                  Manage Compliance →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}