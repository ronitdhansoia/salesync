"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  MessageSquare,
  Mail,
  Phone,
  Target,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Activity,
  Globe,
  Shield,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    totalLeads: number;
    totalCampaigns: number;
    totalMessages: number;
    conversionRate: number;
    revenue: number;
    averageDealSize: number;
  };
  trends: {
    leadsGrowth: number;
    campaignsGrowth: number;
    messagesGrowth: number;
    conversionGrowth: number;
  };
  channels: {
    linkedin: { leads: number; conversion: number; cost: number };
    whatsapp: { leads: number; conversion: number; cost: number };
    email: { leads: number; conversion: number; cost: number };
    website: { leads: number; conversion: number; cost: number };
  };
  regional: {
    mumbai: { leads: number; conversion: number; revenue: number };
    bangalore: { leads: number; conversion: number; revenue: number };
    delhi: { leads: number; conversion: number; revenue: number };
    pune: { leads: number; conversion: number; revenue: number };
    hyderabad: { leads: number; conversion: number; revenue: number };
  };
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAnalyticsData({
        overview: {
          totalLeads: 1247,
          totalCampaigns: 23,
          totalMessages: 8934,
          conversionRate: 23.7,
          revenue: 2850000, // In INR
          averageDealSize: 125000, // In INR
        },
        trends: {
          leadsGrowth: 12.5,
          campaignsGrowth: 8.3,
          messagesGrowth: 15.7,
          conversionGrowth: 4.2,
        },
        channels: {
          linkedin: { leads: 456, conversion: 28.3, cost: 2500 },
          whatsapp: { leads: 342, conversion: 31.7, cost: 1200 },
          email: { leads: 289, conversion: 19.8, cost: 800 },
          website: { leads: 160, conversion: 35.2, cost: 1500 },
        },
        regional: {
          mumbai: { leads: 387, conversion: 26.4, revenue: 890000 },
          bangalore: { leads: 298, conversion: 24.1, revenue: 720000 },
          delhi: { leads: 245, conversion: 22.8, revenue: 650000 },
          pune: { leads: 167, conversion: 28.9, revenue: 380000 },
          hyderabad: { leads: 150, conversion: 21.3, revenue: 210000 },
        },
      });
      setLoading(false);
    }, 1500);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  if (loading || !analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-3 text-lg text-gray-600">Loading analytics...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-600">Track your sales performance and optimization opportunities</p>
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="h-4 w-4" />
                Export Report
              </button>
              <button 
                onClick={loadAnalyticsData}
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* India-Specific Analytics Notice */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Globe className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">India-Focused Analytics</h3>
              <p className="text-blue-800 mb-4">
                Our analytics dashboard provides insights specific to the Indian market including regional performance, 
                festival impact analysis, and ROI calculations in Indian Rupees with local business patterns.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-blue-800">Regional Breakdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-blue-800">INR Revenue Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-blue-800">Festival Impact</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-blue-800">Local Compliance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.overview.revenue)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">{formatPercentage(analyticsData.trends.conversionGrowth)} vs last period</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalLeads.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="text-sm text-blue-600">{formatPercentage(analyticsData.trends.leadsGrowth)} vs last period</span>
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
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.conversionRate}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-purple-600 mr-1" />
                  <span className="text-sm text-purple-600">{formatPercentage(analyticsData.trends.conversionGrowth)} vs last period</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalCampaigns}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-orange-600 mr-1" />
                  <span className="text-sm text-orange-600">{formatPercentage(analyticsData.trends.campaignsGrowth)} vs last period</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages Sent</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalMessages.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-cyan-600 mr-1" />
                  <span className="text-sm text-cyan-600">{formatPercentage(analyticsData.trends.messagesGrowth)} vs last period</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-cyan-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.overview.averageDealSize)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-emerald-600 mr-1" />
                  <span className="text-sm text-emerald-600">+8.3% vs last period</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Channel Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Channel Performance</h3>
            <div className="space-y-4">
              {Object.entries(analyticsData.channels).map(([channel, data]) => (
                <div key={channel} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      channel === 'linkedin' ? 'bg-blue-100' :
                      channel === 'whatsapp' ? 'bg-green-100' :
                      channel === 'email' ? 'bg-purple-100' : 'bg-gray-100'
                    }`}>
                      {channel === 'linkedin' && <Users className="h-5 w-5 text-blue-600" />}
                      {channel === 'whatsapp' && <MessageSquare className="h-5 w-5 text-green-600" />}
                      {channel === 'email' && <Mail className="h-5 w-5 text-purple-600" />}
                      {channel === 'website' && <Globe className="h-5 w-5 text-gray-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 capitalize">{channel}</p>
                      <p className="text-sm text-gray-600">{data.leads} leads</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{data.conversion}%</p>
                    <p className="text-sm text-gray-600">{formatCurrency(data.cost)} cost</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Performance</h3>
            <div className="space-y-4">
              {Object.entries(analyticsData.regional).map(([region, data]) => (
                <div key={region} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Globe className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 capitalize">{region}</p>
                      <p className="text-sm text-gray-600">{data.leads} leads</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{data.conversion}%</p>
                    <p className="text-sm text-gray-600">{formatCurrency(data.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Lead Generation Trends</h3>
              <select className="text-sm border border-gray-300 rounded px-3 py-1">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Lead Generation Chart</p>
                <p className="text-sm text-gray-500">Interactive chart would be displayed here</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Conversion Funnel</h3>
              <select className="text-sm border border-gray-300 rounded px-3 py-1">
                <option>All Channels</option>
                <option>LinkedIn</option>
                <option>WhatsApp</option>
                <option>Email</option>
              </select>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Visitors</span>
                <span className="text-sm font-medium">12,847</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Leads</span>
                <span className="text-sm font-medium">1,247</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Qualified</span>
                <span className="text-sm font-medium">456</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Customers</span>
                <span className="text-sm font-medium">98</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Top Performing Channel</span>
              </div>
              <p className="text-sm text-green-800">
                Website leads have the highest conversion rate at 35.2%. Consider allocating more budget to website optimization.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Growth Opportunity</span>
              </div>
              <p className="text-sm text-blue-800">
                Mumbai market shows strong potential with 26.4% conversion. Expand campaigns in this region.
              </p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-900">Optimization Needed</span>
              </div>
              <p className="text-sm text-yellow-800">
                Email campaigns need attention. Consider A/B testing subject lines to improve open rates.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New lead from Mumbai WhatsApp campaign</p>
                <p className="text-xs text-gray-600">2 minutes ago</p>
              </div>
              <span className="text-sm text-gray-500">+₹1,25,000 potential</span>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">LinkedIn campaign "Tech CEOs" reached 1000 prospects</p>
                <p className="text-xs text-gray-600">15 minutes ago</p>
              </div>
              <span className="text-sm text-gray-500">67% open rate</span>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Deal closed with TechCorp India</p>
                <p className="text-xs text-gray-600">1 hour ago</p>
              </div>
              <span className="text-sm text-green-600">+₹2,50,000</span>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Email template "Festival Offer" approved</p>
                <p className="text-xs text-gray-600">2 hours ago</p>
              </div>
              <span className="text-sm text-gray-500">Ready to use</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}