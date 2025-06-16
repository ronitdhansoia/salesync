"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  Download,
  Upload,
  MoreVertical,
  Phone,
  Mail,
  MessageSquare,
  Star,
  StarOff,
  Edit,
  Trash2,
  Eye,
  Target,
  Building,
  MapPin,
  Calendar,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Globe,
  Shield
} from 'lucide-react';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  position: string;
  location: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  score: number;
  tags: string[];
  notes: string;
  lastContact: string;
  createdAt: string;
  starred: boolean;
}

interface LeadStats {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats>({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    conversionRate: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    // Load leads data
    setStats({
      totalLeads: 1247,
      newLeads: 89,
      qualifiedLeads: 156,
      conversionRate: 23.7,
    });

    setLeads([
      {
        id: '1',
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya.sharma@techcorp.in',
        phone: '+91 98765 43210',
        company: 'TechCorp India',
        position: 'CTO',
        location: 'Mumbai, Maharashtra',
        source: 'LinkedIn',
        status: 'qualified',
        score: 85,
        tags: ['hot', 'enterprise', 'tech'],
        notes: 'Interested in enterprise automation solutions',
        lastContact: '2024-01-16',
        createdAt: '2024-01-10',
        starred: true,
      },
      {
        id: '2',
        firstName: 'Rajesh',
        lastName: 'Kumar',
        email: 'r.kumar@startup.co.in',
        phone: '+91 87654 32109',
        company: 'Mumbai Startup Hub',
        position: 'Founder',
        location: 'Mumbai, Maharashtra',
        source: 'Website',
        status: 'new',
        score: 72,
        tags: ['startup', 'saas'],
        notes: 'Founder of growing SaaS startup',
        lastContact: '',
        createdAt: '2024-01-15',
        starred: false,
      },
      {
        id: '3',
        firstName: 'Anita',
        lastName: 'Patel',
        email: 'anita@enterprise.com',
        phone: '+91 76543 21098',
        company: 'Enterprise Solutions',
        position: 'VP Sales',
        location: 'Bangalore, Karnataka',
        source: 'Email Campaign',
        status: 'contacted',
        score: 91,
        tags: ['enterprise', 'warm'],
        notes: 'Evaluating automation tools for Q2',
        lastContact: '2024-01-14',
        createdAt: '2024-01-12',
        starred: true,
      },
      {
        id: '4',
        firstName: 'Vikram',
        lastName: 'Singh',
        email: 'vikram@fintech.in',
        phone: '+91 65432 10987',
        company: 'FinTech Innovations',
        position: 'Head of Operations',
        location: 'Delhi, NCR',
        source: 'WhatsApp',
        status: 'proposal',
        score: 88,
        tags: ['fintech', 'hot'],
        notes: 'Requested custom proposal for 100+ users',
        lastContact: '2024-01-13',
        createdAt: '2024-01-08',
        starred: false,
      },
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'text-blue-600 bg-blue-100';
      case 'contacted':
        return 'text-yellow-600 bg-yellow-100';
      case 'qualified':
        return 'text-purple-600 bg-purple-100';
      case 'proposal':
        return 'text-orange-600 bg-orange-100';
      case 'negotiation':
        return 'text-indigo-600 bg-indigo-100';
      case 'won':
        return 'text-green-600 bg-green-100';
      case 'lost':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const toggleStar = (leadId: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, starred: !lead.starred } : lead
    ));
  };

  const handleStatusChange = (leadId: string, newStatus: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus as Lead['status'] } : lead
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
                <p className="text-gray-600">Manage and track your sales prospects</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="h-4 w-4" />
                Export
              </button>
              <button className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Upload className="h-4 w-4" />
                Import
              </button>
              <button 
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                Add Lead
              </button>
            </div>
          </div>
        </div>

        {/* India-Specific Features */}
        <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Globe className="h-6 w-6 text-green-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">Lead Management for Indian Market</h3>
              <p className="text-green-800 mb-4">
                Our lead management system is tailored for Indian businesses with local phone number validation, 
                regional lead scoring, and integration with popular Indian CRMs and business directories.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">Indian Phone Validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">Regional Lead Scoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">CRM Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">DPDPA Compliant</span>
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
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalLeads.toLocaleString()}</p>
                <p className="text-sm text-blue-600">+{stats.newLeads} this week</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Leads</p>
                <p className="text-3xl font-bold text-gray-900">{stats.newLeads}</p>
                <p className="text-sm text-green-600">+12% vs last week</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Qualified Leads</p>
                <p className="text-3xl font-bold text-gray-900">{stats.qualifiedLeads}</p>
                <p className="text-sm text-purple-600">Ready for outreach</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-3xl font-bold text-gray-900">{stats.conversionRate}%</p>
                <p className="text-sm text-green-600">Above target</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 bg-white border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleStar(lead.id)}
                          className="mr-3 text-gray-400 hover:text-yellow-500"
                        >
                          {lead.starred ? (
                            <Star className="h-4 w-4 fill-current text-yellow-500" />
                          ) : (
                            <StarOff className="h-4 w-4" />
                          )}
                        </button>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {lead.firstName} {lead.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{lead.email}</div>
                          {lead.phone && (
                            <div className="text-sm text-gray-500">{lead.phone}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lead.company}</div>
                          <div className="text-sm text-gray-500">{lead.position}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {lead.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(lead.status)}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="proposal">Proposal</option>
                        <option value="negotiation">Negotiation</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
                          {lead.score}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">/100</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{lead.source}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {lead.lastContact || 'Never'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowDetailsModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900"
                          title="Call"
                        >
                          <Phone className="h-4 w-4" />
                        </button>
                        <button
                          className="text-purple-600 hover:text-purple-900"
                          title="Email"
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                        <button
                          className="text-orange-600 hover:text-orange-900"
                          title="WhatsApp"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          title="More Actions"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>

        {/* Add Lead Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Lead</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" placeholder="+91" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" placeholder="City, State" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>LinkedIn</option>
                    <option>Website</option>
                    <option>Email Campaign</option>
                    <option>WhatsApp</option>
                    <option>Referral</option>
                    <option>Trade Show</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Add Lead
                </button>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lead Details Modal */}
        {showDetailsModal && selectedLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedLead.firstName} {selectedLead.lastName}
                </h3>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{selectedLead.email}</span>
                      </div>
                      {selectedLead.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{selectedLead.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{selectedLead.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Company Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span>{selectedLead.company}</span>
                      </div>
                      <div className="text-gray-600">{selectedLead.position}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Lead Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedLead.status)}`}>
                          {selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Score:</span>
                        <span className={`font-medium ${getScoreColor(selectedLead.score)}`}>
                          {selectedLead.score}/100
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Source:</span>
                        <span>{selectedLead.source}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span>{selectedLead.createdAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Contact:</span>
                        <span>{selectedLead.lastContact || 'Never'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLead.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                <p className="text-sm text-gray-600">{selectedLead.notes}</p>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Contact Lead
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Mark as Qualified
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}