"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Mail, 
  Globe, 
  Building,
  User,
  CheckCircle2,
  AlertCircle,
  Copy,
  Download,
  Upload,
  Filter,
  TrendingUp,
  Target,
  Zap,
  Shield,
  Eye,
  RefreshCw
} from 'lucide-react';

interface EmailFinderStats {
  totalSearches: number;
  emailsFound: number;
  verifiedEmails: number;
  successRate: number;
}

interface EmailResult {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  position: string;
  confidence: number;
  verified: boolean;
  source: string;
  foundAt: string;
}

interface BulkSearch {
  id: string;
  fileName: string;
  totalRows: number;
  processed: number;
  found: number;
  status: 'processing' | 'completed' | 'failed';
  createdAt: string;
}

export default function EmailFinderPage() {
  const [stats, setStats] = useState<EmailFinderStats>({
    totalSearches: 0,
    emailsFound: 0,
    verifiedEmails: 0,
    successRate: 0,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [companyDomain, setCompanyDomain] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'bulk' | 'results' | 'verified'>('search');
  const [emailResults, setEmailResults] = useState<EmailResult[]>([]);
  const [bulkSearches, setBulkSearches] = useState<BulkSearch[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Load email finder data
    setStats({
      totalSearches: 1247,
      emailsFound: 892,
      verifiedEmails: 756,
      successRate: 71.5,
    });

    setEmailResults([
      {
        id: '1',
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya.sharma@techcorp.in',
        company: 'TechCorp India',
        position: 'CTO',
        confidence: 95,
        verified: true,
        source: 'LinkedIn + Domain',
        foundAt: '2024-01-16 10:30 AM',
      },
      {
        id: '2',
        firstName: 'Rajesh',
        lastName: 'Kumar',
        email: 'r.kumar@innovate.co.in',
        company: 'Innovate Solutions',
        position: 'Head of Sales',
        confidence: 87,
        verified: true,
        source: 'Company Website',
        foundAt: '2024-01-16 10:25 AM',
      },
      {
        id: '3',
        firstName: 'Anita',
        lastName: 'Patel',
        email: 'anita@startup.in',
        company: 'Mumbai Startup',
        position: 'Founder',
        confidence: 92,
        verified: false,
        source: 'Social Media',
        foundAt: '2024-01-16 10:20 AM',
      },
      {
        id: '4',
        firstName: 'Vikram',
        lastName: 'Singh',
        email: 'vikram.singh@enterprise.com',
        company: 'Enterprise Corp',
        position: 'VP Engineering',
        confidence: 88,
        verified: true,
        source: 'GitHub + Domain',
        foundAt: '2024-01-16 10:15 AM',
      },
    ]);

    setBulkSearches([
      {
        id: '1',
        fileName: 'mumbai_tech_companies.csv',
        totalRows: 500,
        processed: 500,
        found: 347,
        status: 'completed',
        createdAt: '2024-01-15',
      },
      {
        id: '2',
        fileName: 'bangalore_startups.csv',
        totalRows: 250,
        processed: 180,
        found: 128,
        status: 'processing',
        createdAt: '2024-01-16',
      },
    ]);
  }, []);

  const handleSingleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      const newResult: EmailResult = {
        id: Date.now().toString(),
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@example.com',
        company: 'Demo Company',
        position: 'Demo Position',
        confidence: 85,
        verified: false,
        source: 'Demo Search',
        foundAt: new Date().toLocaleString(),
      };
      setEmailResults(prev => [newResult, ...prev]);
      setIsSearching(false);
      setSearchQuery('');
    }, 2000);
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    // You could add a toast notification here
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Search className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Email Finder</h1>
                <p className="text-gray-600">Find and verify email addresses for your prospects</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="h-4 w-4" />
                Export Results
              </button>
              <button className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                <Upload className="h-4 w-4" />
                Bulk Upload
              </button>
            </div>
          </div>
        </div>

        {/* India-Specific Notice */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Enhanced for Indian Market</h3>
              <p className="text-blue-800 mb-4">
                Our email finder is optimized for Indian domains (.in, .co.in), local business directories, 
                and social platforms popular in India. All searches are DPDPA 2023 compliant.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-blue-800">Indian Domain Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-blue-800">Local Directory Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-blue-800">DPDPA Compliant</span>
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
                <p className="text-sm font-medium text-gray-600">Total Searches</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalSearches.toLocaleString()}</p>
                <p className="text-sm text-blue-600">+45 today</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emails Found</p>
                <p className="text-3xl font-bold text-gray-900">{stats.emailsFound}</p>
                <p className="text-sm text-green-600">+32 today</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified Emails</p>
                <p className="text-3xl font-bold text-gray-900">{stats.verifiedEmails}</p>
                <p className="text-sm text-purple-600">+28 today</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">{stats.successRate}%</p>
                <p className="text-sm text-green-600">Above average</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'search', label: 'Single Search', icon: Search },
                { id: 'bulk', label: 'Bulk Search', icon: Upload },
                { id: 'results', label: 'All Results', icon: Target },
                { id: 'verified', label: 'Verified Only', icon: CheckCircle2 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
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
            {/* Single Search Tab */}
            {activeTab === 'search' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Email by Name & Company</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name or LinkedIn Profile
                        </label>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="e.g., Priya Sharma or linkedin.com/in/priya-sharma"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Domain (Optional)
                        </label>
                        <input
                          type="text"
                          value={companyDomain}
                          onChange={(e) => setCompanyDomain(e.target.value)}
                          placeholder="e.g., techcorp.in or example.co.in"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <button
                        onClick={handleSingleSearch}
                        disabled={isSearching || !searchQuery.trim()}
                        className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                      >
                        {isSearching ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <Search className="h-4 w-4" />
                            Find Email
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-semibold text-purple-600">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Multi-Source Search</p>
                          <p className="text-sm text-gray-600">
                            We search across LinkedIn, company websites, social media, and Indian business directories
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-semibold text-purple-600">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Pattern Matching</p>
                          <p className="text-sm text-gray-600">
                            AI-powered algorithms identify email patterns specific to Indian companies
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-semibold text-purple-600">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Real-Time Verification</p>
                          <p className="text-sm text-gray-600">
                            Each email is verified for deliverability and bounce protection
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bulk Search Tab */}
            {activeTab === 'bulk' && (
              <div className="space-y-6">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Bulk Email Search</h3>
                  <p className="text-gray-600 mb-6">
                    Upload a CSV file with names and companies to find emails in bulk
                  </p>
                  <div className="max-w-md mx-auto">
                    <input
                      type="file"
                      accept=".csv"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    />
                    <button className="w-full mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                      Start Bulk Search
                    </button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Bulk Searches</h4>
                  <div className="space-y-4">
                    {bulkSearches.map((search) => (
                      <div key={search.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-gray-900">{search.fileName}</h5>
                            <div className="flex items-center gap-4 mt-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(search.status)}`}>
                                {search.status.charAt(0).toUpperCase() + search.status.slice(1)}
                              </span>
                              <span className="text-sm text-gray-500">Created {search.createdAt}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <p className="text-lg font-bold text-gray-900">{search.totalRows}</p>
                                <p className="text-sm text-gray-600">Total</p>
                              </div>
                              <div>
                                <p className="text-lg font-bold text-blue-600">{search.processed}</p>
                                <p className="text-sm text-gray-600">Processed</p>
                              </div>
                              <div>
                                <p className="text-lg font-bold text-green-600">{search.found}</p>
                                <p className="text-sm text-gray-600">Found</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {search.status === 'processing' && (
                          <div className="mt-3">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{Math.round((search.processed / search.totalRows) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${(search.processed / search.totalRows) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results Tab */}
            {(activeTab === 'results' || activeTab === 'verified') && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {activeTab === 'verified' ? 'Verified Emails' : 'All Email Results'}
                  </h3>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search results..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Company
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Confidence
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Verified
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {emailResults
                          .filter(result => activeTab === 'verified' ? result.verified : true)
                          .map((result) => (
                            <tr key={result.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                    <User className="h-5 w-5 text-gray-600" />
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">
                                      {result.firstName} {result.lastName}
                                    </div>
                                    <div className="text-sm text-gray-500">{result.position}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-900">{result.email}</span>
                                  <button
                                    onClick={() => copyEmail(result.email)}
                                    className="p-1 text-gray-400 hover:text-gray-600"
                                    title="Copy email"
                                  >
                                    <Copy className="h-3 w-3" />
                                  </button>
                                </div>
                                <div className="text-sm text-gray-500">{result.source}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Building className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-sm text-gray-900">{result.company}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConfidenceColor(result.confidence)}`}>
                                  {result.confidence}%
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {result.verified ? (
                                  <span className="inline-flex items-center gap-1 text-green-600">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <span className="text-sm font-medium">Verified</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-gray-500">
                                    <AlertCircle className="h-4 w-4" />
                                    <span className="text-sm">Unverified</span>
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                  <button className="text-purple-600 hover:text-purple-900">Verify</button>
                                  <button className="text-blue-600 hover:text-blue-900">View</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
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