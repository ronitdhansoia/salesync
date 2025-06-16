"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  MessageSquare, 
  Phone,
  Upload,
  Send,
  Users,
  BarChart3,
  Settings,
  Play,
  Pause,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileImage,
  FileText,
  Video,
  Download,
  QrCode,
  Smartphone,
  Bot
} from 'lucide-react';

interface WhatsAppConnection {
  status: 'connected' | 'disconnected' | 'connecting';
  phoneNumber?: string;
  lastSeen?: string;
  qrCode?: string;
}

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  contacts: number;
  sent: number;
  delivered: number;
  failed: number;
  createdAt: string;
}

interface Template {
  id: string;
  name: string;
  content: string;
  type: 'text' | 'media';
  mediaUrl?: string;
  approved: boolean;
}

export default function WhatsAppAutomationPage() {
  const [connection, setConnection] = useState<WhatsAppConnection>({
    status: 'disconnected',
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'templates' | 'contacts'>('overview');
  const [showQrModal, setShowQrModal] = useState(false);

  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Welcome Series',
      status: 'active',
      contacts: 150,
      sent: 142,
      delivered: 138,
      failed: 4,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Product Demo Follow-up',
      status: 'active',
      contacts: 89,
      sent: 89,
      delivered: 85,
      failed: 4,
      createdAt: '2024-01-14',
    },
    {
      id: '3',
      name: 'Monthly Newsletter',
      status: 'paused',
      contacts: 500,
      sent: 245,
      delivered: 240,
      failed: 5,
      createdAt: '2024-01-10',
    },
  ]);

  const [templates] = useState<Template[]>([
    {
      id: '1',
      name: 'Welcome Message',
      content: 'Hello {name}! Welcome to SaleSync India. We\'re excited to help you automate your sales process.',
      type: 'text',
      approved: true,
    },
    {
      id: '2',
      name: 'Demo Invitation',
      content: 'Hi {name}, would you like to see a personalized demo of our platform?',
      type: 'text',
      approved: true,
    },
    {
      id: '3',
      name: 'Product Brochure',
      content: 'Here\'s our latest product brochure with all the features and pricing.',
      type: 'media',
      mediaUrl: '/brochure.pdf',
      approved: false,
    },
  ]);

  const handleConnect = () => {
    if (connection.status === 'disconnected') {
      setConnection({ status: 'connecting' });
      setShowQrModal(true);
      // Simulate connection process
      setTimeout(() => {
        setConnection({
          status: 'connected',
          phoneNumber: '+91 98765 43210',
          lastSeen: 'now',
        });
        setShowQrModal(false);
      }, 3000);
    } else {
      setConnection({ status: 'disconnected' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'connecting':
      case 'paused':
        return 'text-yellow-600 bg-yellow-100';
      case 'disconnected':
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return CheckCircle2;
      case 'connecting':
      case 'paused':
        return Clock;
      case 'disconnected':
      case 'failed':
        return AlertCircle;
      default:
        return AlertCircle;
    }
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
                <h1 className="text-3xl font-bold text-gray-900">WhatsApp Automation</h1>
                <p className="text-gray-600">Manage your WhatsApp Business automation</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleConnect}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  connection.status === 'connected'
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                <Smartphone className="h-4 w-4" />
                {connection.status === 'connected' ? 'Disconnect' : 'Connect WhatsApp'}
              </button>
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
                <h2 className="text-xl font-semibold text-gray-900">WhatsApp Business</h2>
                <div className="flex items-center gap-2 mt-1">
                  {React.createElement(getStatusIcon(connection.status), { 
                    className: `h-4 w-4 ${connection.status === 'connected' ? 'text-green-600' : connection.status === 'connecting' ? 'text-yellow-600' : 'text-red-600'}` 
                  })}
                  <span className={`text-sm font-medium ${connection.status === 'connected' ? 'text-green-600' : connection.status === 'connecting' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
                  </span>
                  {connection.phoneNumber && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{connection.phoneNumber}</span>
                    </>
                  )}
                  {connection.lastSeen && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">Last seen {connection.lastSeen}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {connection.status === 'connected' && (
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                  <p className="text-sm text-gray-600">Messages Sent</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">94.2%</p>
                  <p className="text-sm text-gray-600">Delivery Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">23</p>
                  <p className="text-sm text-gray-600">In Queue</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'campaigns', label: 'Campaigns', icon: Bot },
                { id: 'templates', label: 'Templates', icon: FileText },
                { id: 'contacts', label: 'Contacts', icon: Users },
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
                      <Play className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      {campaigns.filter(c => c.status === 'active').length}
                    </p>
                    <p className="text-sm text-gray-600">
                      {campaigns.reduce((sum, c) => sum + (c.status === 'active' ? c.contacts : 0), 0)} contacts engaged
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Success Rate</h3>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-600 mb-2">94.2%</p>
                    <p className="text-sm text-gray-600">+2.1% from last week</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Response Rate</h3>
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-600 mb-2">67.8%</p>
                    <p className="text-sm text-gray-600">Above industry average</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Campaign "Welcome Series" sent 15 messages</span>
                      <span className="text-xs text-gray-500">2 minutes ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">5 new contacts added to automation</span>
                      <span className="text-xs text-gray-500">5 minutes ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Template "Product Demo" awaiting approval</span>
                      <span className="text-xs text-gray-500">10 minutes ago</span>
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
                    <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                                {React.createElement(getStatusIcon(campaign.status), { className: "h-3 w-3" })}
                                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                              </span>
                              <span className="text-sm text-gray-500">Created {campaign.createdAt}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-900">{campaign.contacts}</p>
                            <p className="text-xs text-gray-500">Contacts</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-900">{campaign.sent}</p>
                            <p className="text-xs text-gray-500">Sent</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-green-600">{campaign.delivered}</p>
                            <p className="text-xs text-gray-500">Delivered</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-red-600">{campaign.failed}</p>
                            <p className="text-xs text-gray-500">Failed</p>
                          </div>
                          
                          <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Settings className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                              <BarChart3 className="h-4 w-4" />
                            </button>
                          </div>
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
                    <div key={template.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {template.type === 'media' ? (
                            <FileImage className="h-5 w-5 text-purple-600" />
                          ) : (
                            <FileText className="h-5 w-5 text-blue-600" />
                          )}
                          <div>
                            <h4 className="font-semibold text-gray-900">{template.name}</h4>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              template.approved ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'
                            }`}>
                              {template.approved ? 'Approved' : 'Pending Approval'}
                            </span>
                          </div>
                        </div>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-700">{template.content}</p>
                        {template.mediaUrl && (
                          <div className="mt-2 text-xs text-gray-500">
                            📎 {template.mediaUrl}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="flex-1 text-sm text-blue-600 hover:bg-blue-50 py-2 rounded-lg transition-colors">
                          Edit
                        </button>
                        <button className="flex-1 text-sm text-green-600 hover:bg-green-50 py-2 rounded-lg transition-colors">
                          Test
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">WhatsApp Contacts</h3>
                  <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Upload className="h-4 w-4" />
                      Import
                    </button>
                    <button className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      <Users className="h-4 w-4" />
                      Add Contact
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Manage Your WhatsApp Contacts</h4>
                  <p className="text-gray-600 mb-6">Import contacts, create segments, and manage your WhatsApp audience</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                      <Upload className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Import CSV</p>
                    </button>
                    <button className="p-4 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                      <Bot className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Sync from CRM</p>
                    </button>
                    <button className="p-4 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                      <Phone className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Add Manually</p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* QR Code Modal */}
        {showQrModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect WhatsApp</h3>
                <p className="text-gray-600 mb-6">Scan this QR code with your WhatsApp to connect</p>
                
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <div className="text-center">
                    <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">QR Code will appear here</p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500 mb-6">
                  <p>1. Open WhatsApp on your phone</p>
                  <p>2. Go to Settings → Linked Devices</p>
                  <p>3. Tap "Link a Device" and scan this code</p>
                </div>
                
                <button
                  onClick={() => setShowQrModal(false)}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}