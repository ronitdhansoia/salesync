"use client";

import React, { useState, useEffect } from 'react';
import { 
  Linkedin, 
  Users, 
  MessageSquare, 
  UserPlus,
  Settings,
  Play,
  Pause,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Bot,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Send,
  Target,
  Globe,
  Shield,
  Zap
} from 'lucide-react';

interface LinkedInStats {
  totalConnections: number;
  pendingRequests: number;
  weeklyConnections: number;
  acceptanceRate: number;
  profileViews: number;
  messagesPerWeek: number;
}

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  connectionsTarget: number;
  connectionsSent: number;
  connectionsAccepted: number;
  messagesSent: number;
  responses: number;
  createdAt: string;
  lastActivity: string;
}

interface LinkedInAccount {
  id: string;
  name: string;
  profileUrl: string;
  connectionCount: number;
  status: 'connected' | 'disconnected' | 'limited';
  lastSync: string;
  weeklyLimit: number;
  dailyUsage: number;
}

export default function LinkedInPage() {
  const [stats, setStats] = useState<LinkedInStats>({
    totalConnections: 0,
    pendingRequests: 0,
    weeklyConnections: 0,
    acceptanceRate: 0,
    profileViews: 0,
    messagesPerWeek: 0,
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [accounts, setAccounts] = useState<LinkedInAccount[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'accounts' | 'prospects'>('overview');

  useEffect(() => {
    // Load LinkedIn data
    setStats({
      totalConnections: 3247,
      pendingRequests: 45,
      weeklyConnections: 28,
      acceptanceRate: 67.3,
      profileViews: 156,
      messagesPerWeek: 34,
    });

    setCampaigns([
      {
        id: '1',
        name: 'SaaS CEOs - Mumbai',
        status: 'active',
        connectionsTarget: 500,
        connectionsSent: 245,
        connectionsAccepted: 156,
        messagesSent: 89,
        responses: 23,
        createdAt: '2024-01-15',
        lastActivity: '2 hours ago',
      },
      {
        id: '2',
        name: 'Tech Startup Founders',
        status: 'active',
        connectionsTarget: 300,
        connectionsSent: 187,
        connectionsAccepted: 134,
        messagesSent: 67,
        responses: 18,
        createdAt: '2024-01-10',
        lastActivity: '5 hours ago',
      },
      {
        id: '3',
        name: 'Enterprise Sales Directors',
        status: 'paused',
        connectionsTarget: 200,
        connectionsSent: 89,
        connectionsAccepted: 45,
        messagesSent: 23,
        responses: 8,
        createdAt: '2024-01-08',
        lastActivity: '2 days ago',
      },
      {
        id: '4',
        name: 'HR Heads - Bangalore',
        status: 'completed',
        connectionsTarget: 150,
        connectionsSent: 150,
        connectionsAccepted: 102,
        messagesSent: 78,
        responses: 34,
        createdAt: '2024-01-01',
        lastActivity: '1 week ago',
      },
    ]);

    setAccounts([
      {
        id: '1',
        name: 'Rohan Kumar (Primary)',
        profileUrl: 'linkedin.com/in/rohan-kumar-salesync',
        connectionCount: 2847,
        status: 'connected',
        lastSync: '5 minutes ago',
        weeklyLimit: 100,
        dailyUsage: 12,
      },
      {
        id: '2',
        name: 'SaleSync India (Company)',
        profileUrl: 'linkedin.com/company/salesync-india',
        connectionCount: 1234,
        status: 'connected',
        lastSync: '1 hour ago',
        weeklyLimit: 200,
        dailyUsage: 8,
      },
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'connected':
        return 'text-green-600 bg-green-100';
      case 'paused':
      case 'limited':
        return 'text-yellow-600 bg-yellow-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      case 'draft':
      case 'disconnected':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleCampaignAction = (campaignId: string, action: 'pause' | 'resume' | 'stop') => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        switch (action) {
          case 'pause':
            return { ...campaign, status: 'paused' as const };
          case 'resume':
            return { ...campaign, status: 'active' as const };
          case 'stop':
            return { ...campaign, status: 'completed' as const };
          default:
            return campaign;
        }
      }
      return campaign;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Linkedin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">LinkedIn Automation</h1>
                <p className="text-gray-600">Automate your LinkedIn outreach and connection building</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="h-4 w-4" />
                Account Settings
              </button>
              <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Bot className="h-4 w-4" />
                New Campaign
              </button>
            </div>
          </div>
        </div>

        {/* LinkedIn Safety Notice */}
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-amber-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Enhanced Account Safety for India</h3>
              <p className="text-amber-800 mb-4">
                Our LinkedIn automation is designed specifically for the Indian market with dedicated IP addresses, 
                human-like behavior patterns, and DPDPA 2023 compliance to keep your accounts safe.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-amber-800">Indian IP Addresses</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-amber-800">Human-like Delays</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-amber-800">DPDPA Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Connections</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalConnections.toLocaleString()}</p>
                <p className="text-sm text-green-600">+{stats.weeklyConnections} this week</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Acceptance Rate</p>
                <p className="text-3xl font-bold text-gray-900">{stats.acceptanceRate}%</p>
                <p className="text-sm text-blue-600">Above average</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Profile Views</p>
                <p className="text-3xl font-bold text-gray-900">{stats.profileViews}</p>
                <p className="text-sm text-purple-600">+23% vs last week</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages/Week</p>
                <p className="text-3xl font-bold text-gray-900">{stats.messagesPerWeek}</p>
                <p className="text-sm text-gray-600">Automated follow-ups</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'campaigns', label: 'Campaigns', icon: Bot },
                { id: 'accounts', label: 'Accounts', icon: Users },
                { id: 'prospects', label: 'Prospects', icon: Target },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">LinkedIn Best Practices for India</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-700">Personalize connection requests in local languages</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-700">Respect Indian business hours (9 AM - 6 PM IST)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-700">Build relationships before direct sales pitches</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-700">Reference mutual connections and common interests</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Performance</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Connection Requests</span>
                        <span className="font-semibold">78/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Messages Sent</span>
                        <span className="font-semibold">34/50</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Profile Views</span>
                        <span className="font-semibold">156</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">AI-Powered Message Templates for India</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Hindi Connection Request</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        "नमस्ते {'{'}firstName{'}'}! आपकी {'{'}industry{'}'} में expertise impressive है। 
                        क्या हम connect हो सकते हैं?"
                      </p>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Use Template</button>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Regional Business Approach</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        "Hi {'{'}firstName{'}'}, I noticed you're based in {'{'}city{'}'}. I'm working with several 
                        {'{'}industry{'}'} companies in your region..."
                      </p>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Use Template</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Campaigns Tab */}
            {activeTab === 'campaigns' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">LinkedIn Campaigns</h3>
                  <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Download className="h-4 w-4" />
                      Export
                    </button>
                    <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Bot className="h-4 w-4" />
                      New Campaign
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                              </span>
                              <span className="text-sm text-gray-500">Created {campaign.createdAt}</span>
                              <span className="text-sm text-gray-500">• Last activity {campaign.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {campaign.status === 'active' ? (
                            <button
                              onClick={() => handleCampaignAction(campaign.id, 'pause')}
                              className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                              title="Pause Campaign"
                            >
                              <Pause className="h-4 w-4" />
                            </button>
                          ) : campaign.status === 'paused' ? (
                            <button
                              onClick={() => handleCampaignAction(campaign.id, 'resume')}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Resume Campaign"
                            >
                              <Play className="h-4 w-4" />
                            </button>
                          ) : null}
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Settings className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{campaign.connectionsTarget}</p>
                          <p className="text-sm text-gray-600">Target</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{campaign.connectionsSent}</p>
                          <p className="text-sm text-gray-600">Sent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{campaign.connectionsAccepted}</p>
                          <p className="text-sm text-gray-600">Accepted</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">{campaign.messagesSent}</p>
                          <p className="text-sm text-gray-600">Messages</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">{campaign.responses}</p>
                          <p className="text-sm text-gray-600">Responses</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{Math.round((campaign.connectionsSent / campaign.connectionsTarget) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${Math.min((campaign.connectionsSent / campaign.connectionsTarget) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accounts Tab */}
            {activeTab === 'accounts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">LinkedIn Accounts</h3>
                  <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <UserPlus className="h-4 w-4" />
                    Add Account
                  </button>
                </div>

                <div className="space-y-4">
                  {accounts.map((account) => (
                    <div key={account.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Linkedin className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{account.name}</h4>
                            <p className="text-sm text-gray-600">{account.profileUrl}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                                {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                              </span>
                              <span className="text-sm text-gray-500">Last sync: {account.lastSync}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-lg font-bold text-gray-900">{account.connectionCount.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">Connections</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-blue-600">{account.dailyUsage}</p>
                              <p className="text-sm text-gray-600">Today</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-green-600">{account.weeklyLimit}</p>
                              <p className="text-sm text-gray-600">Weekly Limit</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Weekly Usage</span>
                          <span>{account.dailyUsage * 7}/{account.weeklyLimit}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${Math.min(((account.dailyUsage * 7) / account.weeklyLimit) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prospects Tab */}
            {activeTab === 'prospects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">LinkedIn Prospects</h3>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search prospects..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Filter className="h-4 w-4" />
                      Filter
                    </button>
                    <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Upload className="h-4 w-4" />
                      Import Prospects
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Find Your Ideal Prospects</h4>
                  <p className="text-gray-600 mb-6">
                    Use our advanced LinkedIn search to find prospects by industry, location, company size, and more.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <button className="p-4 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                      <Search className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Advanced Search</p>
                    </button>
                    <button className="p-4 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                      <Upload className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Import CSV</p>
                    </button>
                    <button className="p-4 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                      <Globe className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Sales Navigator</p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}