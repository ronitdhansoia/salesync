"use client";

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  UserCheck, 
  FileText, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Trash2,
  Download,
  Search,
  Filter,
  TrendingUp,
  Users,
  Calendar,
  Settings,
  ExternalLink
} from 'lucide-react';

interface ComplianceStats {
  totalConsents: number;
  activeConsents: number;
  expiredConsents: number;
  withdrawnConsents: number;
  pendingRequests: number;
  completedRequests: number;
  expiringConsents: number;
  recentActivity: {
    newConsents: number;
    newRequests: number;
  };
}

interface DataRequest {
  id: string;
  requestType: 'access' | 'erasure' | 'rectification';
  requestStatus: 'pending' | 'in_progress' | 'completed' | 'rejected';
  contactName: string;
  contactEmail: string;
  dueDate: string;
  createdAt: string;
  completedAt?: string;
}

interface Consent {
  id: string;
  contactName: string;
  consentType: 'whatsapp' | 'email' | 'sms' | 'linkedin';
  consentStatus: 'granted' | 'withdrawn' | 'expired';
  purpose: string;
  consentTimestamp: string;
  expiryDate?: string;
}

export default function CompliancePage() {
  const [stats, setStats] = useState<ComplianceStats>({
    totalConsents: 0,
    activeConsents: 0,
    expiredConsents: 0,
    withdrawnConsents: 0,
    pendingRequests: 0,
    completedRequests: 0,
    expiringConsents: 0,
    recentActivity: {
      newConsents: 0,
      newRequests: 0,
    },
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'consents' | 'requests' | 'reports'>('overview');
  const [dataRequests] = useState<DataRequest[]>([
    {
      id: '1',
      requestType: 'access',
      requestStatus: 'pending',
      contactName: 'Priya Sharma',
      contactEmail: 'priya.sharma@example.com',
      dueDate: '2024-02-15',
      createdAt: '2024-01-16',
    },
    {
      id: '2',
      requestType: 'erasure',
      requestStatus: 'in_progress',
      contactName: 'Rajesh Kumar',
      contactEmail: 'rajesh.kumar@example.com',
      dueDate: '2024-02-18',
      createdAt: '2024-01-19',
    },
    {
      id: '3',
      requestType: 'access',
      requestStatus: 'completed',
      contactName: 'Anita Patel',
      contactEmail: 'anita.patel@example.com',
      dueDate: '2024-02-10',
      createdAt: '2024-01-11',
      completedAt: '2024-01-25',
    },
  ]);

  const [consents] = useState<Consent[]>([
    {
      id: '1',
      contactName: 'Priya Sharma',
      consentType: 'whatsapp',
      consentStatus: 'granted',
      purpose: 'Marketing communications',
      consentTimestamp: '2024-01-15',
      expiryDate: '2025-01-15',
    },
    {
      id: '2',
      contactName: 'Rajesh Kumar',
      consentType: 'email',
      consentStatus: 'granted',
      purpose: 'Product updates and offers',
      consentTimestamp: '2024-01-10',
      expiryDate: '2025-01-10',
    },
    {
      id: '3',
      contactName: 'Suresh Reddy',
      consentType: 'whatsapp',
      consentStatus: 'expired',
      purpose: 'Sales outreach',
      consentTimestamp: '2023-01-15',
      expiryDate: '2024-01-15',
    },
  ]);

  useEffect(() => {
    // Load compliance stats
    setStats({
      totalConsents: 1247,
      activeConsents: 1089,
      expiredConsents: 23,
      withdrawnConsents: 135,
      pendingRequests: 8,
      completedRequests: 42,
      expiringConsents: 15,
      recentActivity: {
        newConsents: 67,
        newRequests: 12,
      },
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'granted':
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-100';
      case 'expired':
      case 'withdrawn':
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case 'access':
        return Eye;
      case 'erasure':
        return Trash2;
      case 'rectification':
        return FileText;
      default:
        return FileText;
    }
  };

  const getConsentTypeIcon = (type: string) => {
    switch (type) {
      case 'whatsapp':
        return Shield;
      case 'email':
        return FileText;
      case 'sms':
        return Shield;
      case 'linkedin':
        return Users;
      default:
        return Shield;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">DPDPA 2023 Compliance</h1>
                <p className="text-gray-600">Data Protection and Privacy Act compliance dashboard</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="h-4 w-4" />
                Export Report
              </button>
              <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Settings className="h-4 w-4" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Consents</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeConsents.toLocaleString()}</p>
                <p className="text-sm text-green-600">+{stats.recentActivity.newConsents} this month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingRequests}</p>
                <p className="text-sm text-blue-600">Avg. 3 days to resolve</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-3xl font-bold text-gray-900">{stats.expiringConsents}</p>
                <p className="text-sm text-yellow-600">Next 30 days</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance Score</p>
                <p className="text-3xl font-bold text-gray-900">94.2%</p>
                <p className="text-sm text-green-600">+2.1% improvement</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: Shield },
                { id: 'consents', label: 'Consent Management', icon: UserCheck },
                { id: 'requests', label: 'Data Requests', icon: FileText },
                { id: 'reports', label: 'Compliance Reports', icon: TrendingUp },
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key DPDPA 2023 Requirements</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-700">Explicit consent collection implemented</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-700">Data principal rights portal active</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-700">30-day response time compliance</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <span className="text-sm text-gray-700">Data breach notification system (in progress)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Compliance Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">15 new consents recorded today</span>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Data access request processed</span>
                        <span className="text-xs text-gray-500">4 hours ago</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">3 consent renewal reminders sent</span>
                        <span className="text-xs text-gray-500">6 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-blue-900 mb-2">DPDPA 2023 Compliance Status</h4>
                      <p className="text-blue-800 mb-4">
                        Your platform is designed to be compliant with the Digital Personal Data Protection Act, 2023. 
                        Key features include explicit consent management, data principal rights, and automated compliance workflows.
                      </p>
                      <div className="flex items-center gap-4">
                        <a 
                          href="https://www.meity.gov.in/writereaddata/files/Digital%20Personal%20Data%20Protection%20Act%202023.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View DPDPA 2023 Text
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Consents Tab */}
            {activeTab === 'consents' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Consent Management</h3>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search consents..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Filter className="h-4 w-4" />
                      Filter
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Purpose
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Expiry
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {consents.map((consent) => {
                          const ConsentIcon = getConsentTypeIcon(consent.consentType);
                          return (
                            <tr key={consent.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="text-sm font-medium text-gray-900">{consent.contactName}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <ConsentIcon className="h-4 w-4 text-gray-600" />
                                  <span className="text-sm text-gray-900 capitalize">{consent.consentType}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">{consent.purpose}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(consent.consentStatus)}`}>
                                  {consent.consentStatus.charAt(0).toUpperCase() + consent.consentStatus.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {consent.expiryDate ? new Date(consent.expiryDate).toLocaleDateString() : 'N/A'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                  <button className="text-blue-600 hover:text-blue-900">View</button>
                                  <button className="text-gray-600 hover:text-gray-900">Renew</button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Data Requests Tab */}
            {activeTab === 'requests' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Data Subject Requests</h3>
                  <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Filter className="h-4 w-4" />
                      Filter by Status
                    </button>
                    <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <FileText className="h-4 w-4" />
                      Manual Request
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Request Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Due Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dataRequests.map((request) => {
                          const RequestIcon = getRequestTypeIcon(request.requestType);
                          const daysUntilDue = Math.ceil((new Date(request.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                          
                          return (
                            <tr key={request.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{request.contactName}</div>
                                  <div className="text-sm text-gray-500">{request.contactEmail}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <RequestIcon className="h-4 w-4 text-gray-600" />
                                  <span className="text-sm text-gray-900 capitalize">{request.requestType}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.requestStatus)}`}>
                                  {request.requestStatus.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{new Date(request.dueDate).toLocaleDateString()}</div>
                                <div className={`text-xs ${daysUntilDue <= 3 ? 'text-red-600' : daysUntilDue <= 7 ? 'text-yellow-600' : 'text-gray-500'}`}>
                                  {daysUntilDue > 0 ? `${daysUntilDue} days left` : `${Math.abs(daysUntilDue)} days overdue`}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(request.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                  <button className="text-blue-600 hover:text-blue-900">View</button>
                                  {request.requestStatus === 'pending' && (
                                    <button className="text-green-600 hover:text-green-900">Process</button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Compliance Reports</h3>
                  <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="h-4 w-4" />
                    Generate Report
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Monthly Compliance Report</h4>
                    <p className="text-gray-600 mb-4">
                      Comprehensive overview of consent management, data requests, and compliance metrics for the current month.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Last generated: Jan 31, 2024</span>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">Generate</button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Data Processing Register</h4>
                    <p className="text-gray-600 mb-4">
                      Record of all data processing activities as required under DPDPA 2023 for transparency and accountability.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Updated: Today</span>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">View</button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Consent Audit Trail</h4>
                    <p className="text-gray-600 mb-4">
                      Complete audit trail of all consent-related activities including grants, withdrawals, and renewals.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Real-time</span>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">Export</button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Data Breach Log</h4>
                    <p className="text-gray-600 mb-4">
                      Incident management and reporting for data breaches as per DPDPA 2023 notification requirements.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600">No incidents</span>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">View Log</button>
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