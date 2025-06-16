"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  MessageSquare, 
  Mail, 
  Linkedin, 
  BarChart3,
  Play,
  Pause,
  Settings,
  TrendingUp,
  Users,
  Clock,
  AlertCircle,
  CheckCircle2,
  Zap,
  Activity
} from 'lucide-react';

interface BotStats {
  name: string;
  status: 'active' | 'paused' | 'error';
  messagesProcessed: number;
  successRate: number;
  lastActivity: string;
  queueSize: number;
}

interface QueueStats {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  total: number;
}

export default function AutomationPage() {
  const [bots, setBots] = useState<BotStats[]>([
    {
      name: 'WhatsApp Bot',
      status: 'active',
      messagesProcessed: 1247,
      successRate: 94.2,
      lastActivity: '2 minutes ago',
      queueSize: 23,
    },
    {
      name: 'Email Bot',
      status: 'active',
      messagesProcessed: 3421,
      successRate: 89.7,
      lastActivity: '5 minutes ago',
      queueSize: 156,
    },
    {
      name: 'LinkedIn Bot',
      status: 'paused',
      messagesProcessed: 892,
      successRate: 76.3,
      lastActivity: '1 hour ago',
      queueSize: 0,
    },
    {
      name: 'SMS Bot',
      status: 'error',
      messagesProcessed: 234,
      successRate: 45.2,
      lastActivity: '3 hours ago',
      queueSize: 8,
    },
  ]);

  const [queueStats, setQueueStats] = useState<Record<string, QueueStats>>({
    whatsapp: { waiting: 23, active: 5, completed: 1247, failed: 12, total: 1287 },
    email: { waiting: 156, active: 8, completed: 3421, failed: 89, total: 3674 },
    linkedin: { waiting: 0, active: 0, completed: 892, failed: 67, total: 959 },
    sms: { waiting: 8, active: 0, completed: 234, failed: 45, total: 287 },
  });

  const [selectedBot, setSelectedBot] = useState('whatsapp');

  // Calculate overall stats
  const totalMessages = bots.reduce((sum, bot) => sum + bot.messagesProcessed, 0);
  const averageSuccessRate = bots.reduce((sum, bot) => sum + bot.successRate, 0) / bots.length;
  const activeBots = bots.filter(bot => bot.status === 'active').length;
  const totalQueueSize = bots.reduce((sum, bot) => sum + bot.queueSize, 0);

  const handleBotAction = (botName: string, action: 'pause' | 'resume' | 'restart') => {
    setBots(prev => prev.map(bot => {
      if (bot.name === botName) {
        switch (action) {
          case 'pause':
            return { ...bot, status: 'paused' as const };
          case 'resume':
            return { ...bot, status: 'active' as const };
          case 'restart':
            return { ...bot, status: 'active' as const, queueSize: 0 };
          default:
            return bot;
        }
      }
      return bot;
    }));
  };

  const getBotIcon = (botName: string) => {
    switch (botName.toLowerCase()) {
      case 'whatsapp bot':
        return MessageSquare;
      case 'email bot':
        return Mail;
      case 'linkedin bot':
        return Linkedin;
      case 'sms bot':
        return Bot;
      default:
        return Bot;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'paused':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle2;
      case 'paused':
        return Pause;
      case 'error':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Automation Dashboard</h1>
              <p className="text-gray-600">Monitor and manage your automation bots</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/automation/workflows"
                className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Settings className="h-4 w-4" />
                Workflows
              </Link>
              <Link
                href="/automation/settings"
                className="inline-flex items-center gap-2 bg-[#7760F9] text-white px-4 py-2 rounded-lg hover:bg-[#6651E8] transition-colors"
              >
                <Bot className="h-4 w-4" />
                Bot Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Bots</p>
                <p className="text-3xl font-bold text-gray-900">{activeBots}</p>
                <p className="text-sm text-green-600">of {bots.length} total</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages Processed</p>
                <p className="text-3xl font-bold text-gray-900">{totalMessages.toLocaleString()}</p>
                <p className="text-sm text-blue-600">+12% from yesterday</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">{averageSuccessRate.toFixed(1)}%</p>
                <p className="text-sm text-green-600">+2.3% improvement</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Queue Size</p>
                <p className="text-3xl font-bold text-gray-900">{totalQueueSize}</p>
                <p className="text-sm text-gray-600">messages pending</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bot Status Cards */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Automation Bots</h2>
                <p className="text-gray-600">Monitor the status and performance of your bots</p>
              </div>
              <div className="p-6">
                <div className="grid gap-4">
                  {bots.map((bot, index) => {
                    const BotIcon = getBotIcon(bot.name);
                    const StatusIcon = getStatusIcon(bot.status);
                    
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                            <BotIcon className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{bot.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bot.status)}`}>
                                <StatusIcon className="h-3 w-3" />
                                {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
                              </span>
                              <span className="text-sm text-gray-500">• {bot.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{bot.messagesProcessed.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">messages</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{bot.successRate}%</p>
                            <p className="text-xs text-gray-500">success</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{bot.queueSize}</p>
                            <p className="text-xs text-gray-500">queued</p>
                          </div>
                          
                          <div className="flex gap-2">
                            {bot.status === 'active' ? (
                              <button
                                onClick={() => handleBotAction(bot.name, 'pause')}
                                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                title="Pause Bot"
                              >
                                <Pause className="h-4 w-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleBotAction(bot.name, 'resume')}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Resume Bot"
                              >
                                <Play className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleBotAction(bot.name, 'restart')}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Restart Bot"
                            >
                              <Settings className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Queue Statistics */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Queue Status</h2>
                <p className="text-gray-600">Real-time queue monitoring</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {Object.entries(queueStats).map(([queue, stats]) => (
                    <div key={queue} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 capitalize">{queue}</span>
                        <span className="text-sm text-gray-500">{stats.total} total</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>✓ {stats.completed}</span>
                        <span>⚡ {stats.active}</span>
                        <span>⏳ {stats.waiting}</span>
                        <span>✗ {stats.failed}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <Link
                  href="/automation/whatsapp"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <span className="font-medium">WhatsApp Automation</span>
                </Link>
                <Link
                  href="/automation/email"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Email Automation</span>
                </Link>
                <Link
                  href="/automation/linkedin"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-indigo-600" />
                  <span className="font-medium">LinkedIn Automation</span>
                </Link>
                <Link
                  href="/automation/analytics"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Analytics & Reports</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}