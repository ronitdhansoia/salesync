"use client";

import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  Users, 
  MessageSquare,
  Mail,
  Linkedin,
  BarChart3,
  Settings,
  Play,
  Pause,
  Stop,
  Eye,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Target,
  Plus,
  Filter,
  Download,
  Zap
} from 'lucide-react';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    // Load mock data for now
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      // Mock data - replace with actual API call
      setCampaigns([
        {
          id: '1',
          name: 'Mumbai Tech Leads',
          description: 'Targeting tech companies in Mumbai',
          type: 'linkedin',
          status: 'active'
        },
        {
          id: '2', 
          name: 'WhatsApp Festival Campaign',
          description: 'Diwali greetings and offers',
          type: 'whatsapp',
          status: 'paused'
        }
      ]);
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      // Mock create campaign - replace with actual API call
      const newCampaign = {
        id: Date.now().toString(),
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        type: formData.get("type") as string,
        status: 'draft'
      };
      
      setCampaigns([...campaigns, newCampaign]);
      setShowCreateModal(false);
      e.currentTarget.reset();
    } catch (error) {
      console.error("Failed to create campaign:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "whatsapp":
        return "💬";
      case "email":
        return "📧";
      case "sms":
        return "📱";
      default:
        return "📢";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Campaigns</h2>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage your outreach campaigns
          </p>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="flex space-x-4">
            <button className="text-sm text-gray-600 hover:text-gray-900">
              All Campaigns
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-900">
              Active
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-900">
              Draft
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-900">
              Completed
            </button>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {campaigns.length === 0 ? (
              <div className="col-span-2 text-center py-12 bg-white rounded-lg shadow">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No campaigns yet
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating your first campaign
                </p>
              </div>
            ) : (
              campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">
                          {getTypeIcon(campaign.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {campaign.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {campaign.description}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          campaign.status
                        )}`}
                      >
                        {campaign.status}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Contacts</p>
                        <p className="font-medium">0</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Sent</p>
                        <p className="font-medium">0</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Replies</p>
                        <p className="font-medium">0</p>
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      {campaign.status === "draft" ? (
                        <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                          <Play className="h-4 w-4 mr-2" />
                          Start Campaign
                        </button>
                      ) : campaign.status === "active" ? (
                        <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700">
                          <Pause className="h-4 w-4 mr-2" />
                          Pause Campaign
                        </button>
                      ) : null}
                      <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Create New Campaign
              </h3>
              <form onSubmit={handleCreateCampaign}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Campaign Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="e.g., Q1 Sales Outreach"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Describe your campaign objectives..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Channel
                    </label>
                    <select
                      name="type"
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                      <option value="linkedin">LinkedIn</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Message Template
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Hi {firstName}, I wanted to reach out about..."
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Use {"{firstName}"}, {"{lastName}"}, {"{companyName}"} for personalization
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create Campaign
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}