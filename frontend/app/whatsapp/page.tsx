"use client";

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Phone,
  Users,
  Send,
  Bot,
  QrCode,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  FileText,
  Upload,
  Download,
  Settings,
  Play,
  Pause,
  Eye,
  Shield,
  Globe,
  Zap
} from 'lucide-react';

interface WhatsAppStats {
  totalMessages: number;
  deliveryRate: number;
  responseRate: number;
  activeCampaigns: number;
}

interface WhatsAppCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  contacts: number;
  sent: number;
  delivered: number;
  read: number;
  replied: number;
  createdAt: string;
}

interface WhatsAppTemplate {
  id: string;
  name: string;
  content: string;
  type: 'text' | 'media' | 'interactive';
  status: 'approved' | 'pending' | 'rejected';
  language: string;
}

export default function WhatsAppPage() {
  const [stats, setStats] = useState<WhatsAppStats>({
    totalMessages: 0,
    deliveryRate: 0,
    responseRate: 0,
    activeCampaigns: 0,
  });

  const [campaigns, setCampaigns] = useState<WhatsAppCampaign[]>([]);
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'templates' | 'broadcast'>('overview');
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');

  useEffect(() => {
    // Load WhatsApp data
    setStats({
      totalMessages: 4567,
      deliveryRate: 94.2,
      responseRate: 67.8,
      activeCampaigns: 6,
    });

    setCampaigns([
      {
        id: '1',
        name: 'Product Demo Follow-up',
        status: 'active',
        contacts: 245,
        sent: 237,
        delivered: 232,
        read: 198,
        replied: 87,
        createdAt: '2024-01-15',
      },
      {
        id: '2',
        name: 'Festival Greetings - Diwali',
        status: 'completed',
        contacts: 1500,
        sent: 1500,
        delivered: 1487,
        read: 1245,
        replied: 234,
        createdAt: '2024-01-10',
      },
      {
        id: '3',
        name: 'New Feature Announcement',
        status: 'active',
        contacts: 892,
        sent: 456,
        delivered: 445,
        read: 321,
        replied: 98,
        createdAt: '2024-01-12',
      },
    ]);

    setTemplates([
      {
        id: '1',
        name: 'Welcome Message (Hindi)',
        content: 'नमस्ते {name}! SaleSync India में आपका स्वागत है। हमारे sales automation tools के साथ अपने business को grow करें।',
        type: 'text',
        status: 'approved',
        language: 'Hindi',
      },
      {
        id: '2',
        name: 'Demo Booking',
        content: 'Hi {name}, Ready to see how SaleSync can 10x your sales? Book a free demo: {demo_link}',
        type: 'text',
        status: 'approved',
        language: 'English',
      },
      {
        id: '3',
        name: 'Product Brochure',
        content: 'Here\'s our complete product brochure with pricing for the Indian market.',
        type: 'media',
        status: 'pending',
        language: 'English',
      },
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'connected':
        return 'text-green-600 bg-green-100';
      case 'paused':
      case 'pending':
      case 'connecting':
        return 'text-yellow-600 bg-yellow-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      case 'draft':
      case 'rejected':
      case 'disconnected':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleConnect = () => {
    setConnectionStatus('connecting');
    // Simulate connection process
    setTimeout(() => {
      setConnectionStatus('connected');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">WhatsApp Business</h1>
                <p className="text-gray-600">Reach your customers where they are with WhatsApp automation</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleConnect}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  connectionStatus === 'connected'
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                <Smartphone className="h-4 w-4" />
                {connectionStatus === 'connected' ? 'Disconnect' : 'Connect WhatsApp'}
              </button>
              <button className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <Bot className="h-4 w-4" />
                New Campaign
              </button>
            </div>
          </div>
        </div>

        {/* India-Specific Features */}
        <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Globe className="h-6 w-6 text-green-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">WhatsApp for Indian Market</h3>
              <p className="text-green-800 mb-4">
                Leverage India's massive WhatsApp user base (500M+ users) with our India-optimized features including 
                regional language support, festival templates, and UPI payment integration.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">Hindi Templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">Festival Campaigns</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">UPI Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">DPDPA Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">WhatsApp Business API</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(connectionStatus)}`}>
                    {connectionStatus === 'connecting' ? (
                      <>
                        <Clock className="h-3 w-3 mr-1" />
                        Connecting...
                      </>
                    ) : connectionStatus === 'connected' ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Connected
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Disconnected
                      </>
                    )}
                  </span>
                  {connectionStatus === 'connected' && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">+91 98765 43210</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {connectionStatus === 'connected' && (
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{stats.totalMessages.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Messages Sent</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{stats.deliveryRate}%</p>
                  <p className="text-sm text-gray-600">Delivery Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{stats.responseRate}%</p>
                  <p className="text-sm text-gray-600">Response Rate</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalMessages.toLocaleString()}</p>
                <p className="text-sm text-green-600">+234 today</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Send className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivery Rate</p>
                <p className="text-3xl font-bold text-gray-900">{stats.deliveryRate}%</p>
                <p className="text-sm text-blue-600">Industry leading</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-3xl font-bold text-gray-900">{stats.responseRate}%</p>
                <p className="text-sm text-purple-600">Above average</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeCampaigns}</p>
                <p className="text-sm text-yellow-600">Running 24/7</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Bot className="h-6 w-6 text-yellow-600" />
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
                { id: 'templates', label: 'Templates', icon: FileText },
                { id: 'broadcast', label: 'Broadcast', icon: Send },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">WhatsApp Best Practices for India</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-700">Use regional languages for better engagement</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-700">Send messages during Indian business hours</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-700">Leverage festival seasons for campaigns</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-700">Include clear opt-out instructions</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Templates in India</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-white rounded-lg">
                        <h4 className="font-medium text-gray-900 text-sm">Festival Greetings</h4>
                        <p className="text-xs text-gray-600">Diwali, Holi, Eid celebrations</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg">
                        <h4 className="font-medium text-gray-900 text-sm">Product Demos</h4>
                        <p className="text-xs text-gray-600">Schedule calls and demos</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg">
                        <h4 className="font-medium text-gray-900 text-sm">Payment Reminders</h4>
                        <p className="text-xs text-gray-600">UPI and payment links</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Hindi Message Templates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Welcome Message</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        "नमस्ते {'{'}name{'}'}! SaleSync India में आपका स्वागत है। हमारे साथ अपने sales को बढ़ाएं।"
                      </p>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">Use Template</button>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Festival Greeting</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        "{'{'}festival{'}'} की हार्दिक शुभकामनाएं! इस शुभ अवसर पर विशेष छूट पाएं।"
                      </p>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">Use Template</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Campaigns Tab */}
            {activeTab === 'campaigns' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">WhatsApp Campaigns</h3>
                  <button className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    <Bot className="h-4 w-4" />
                    Create Campaign
                  </button>
                </div>

                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </span>
                            <span className="text-sm text-gray-500">Created {campaign.createdAt}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
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
                          <p className="text-2xl font-bold text-gray-900">{campaign.contacts}</p>
                          <p className="text-sm text-gray-600">Contacts</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{campaign.sent}</p>
                          <p className="text-sm text-gray-600">Sent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{campaign.delivered}</p>
                          <p className="text-sm text-gray-600">Delivered</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">{campaign.read}</p>
                          <p className="text-sm text-gray-600">Read</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">{campaign.replied}</p>
                          <p className="text-sm text-gray-600">Replied</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Delivery Progress</span>
                          <span>{Math.round((campaign.delivered / campaign.sent) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${Math.min((campaign.delivered / campaign.sent) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Message Templates</h3>
                  <button className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    <FileText className="h-4 w-4" />
                    Create Template
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {templates.map((template) => (
                    <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{template.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                              {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
                            </span>
                            <span className="text-sm text-gray-500">{template.language}</span>
                            <span className="text-sm text-gray-500">• {template.type}</span>
                          </div>
                        </div>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-700">{template.content}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="flex-1 text-sm text-blue-600 hover:bg-blue-50 py-2 rounded-lg transition-colors">
                          Edit
                        </button>
                        <button className="flex-1 text-sm text-green-600 hover:bg-green-50 py-2 rounded-lg transition-colors">
                          Use
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Broadcast Tab */}
            {activeTab === 'broadcast' && (
              <div className="space-y-6">
                <div className="text-center">
                  <Send className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Send Broadcast Message</h3>
                  <p className="text-gray-600 mb-6">
                    Send a message to multiple contacts at once with personalized content
                  </p>
                  
                  <div className="max-w-2xl mx-auto space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                        Select Template
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                        <option>Choose a template...</option>
                        {templates.filter(t => t.status === 'approved').map(template => (
                          <option key={template.id} value={template.id}>{template.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                        Select Contacts
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                        <option>All contacts (2,847)</option>
                        <option>Mumbai prospects (892)</option>
                        <option>Bangalore leads (543)</option>
                        <option>Recent signups (156)</option>
                      </select>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex-1 bg-white border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                        Schedule Later
                      </button>
                      <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                        Send Now
                      </button>
                    </div>
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