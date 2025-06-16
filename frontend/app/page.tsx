"use client";

import React, { useState, lazy, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { 
  MessageSquare, 
  Users, 
  Zap, 
  BarChart3, 
  Globe, 
  Shield, 
  Check,
  ArrowRight,
  Star,
  Play,
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Send,
  UserCheck,
  Clock,
  Target,
  Sparkles,
  TrendingUp,
  Award,
  Headphones,
  Linkedin,
  Bot,
  Search,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Lock
} from "lucide-react";

// Lazy load heavy components
const AnimatedHero = dynamic(() => import("@/components/animated-hero").then(mod => ({ default: mod.AnimatedHero })), {
  loading: () => <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50" />,
  ssr: false
});

const AnimatedFeatures = dynamic(() => import("@/components/animated-features").then(mod => ({ default: mod.AnimatedFeatures })), {
  loading: () => <div className="h-96" />,
  ssr: false
});

const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <div className="h-96" />,
  ssr: false
});

const MacbookScrollDemo = dynamic(() => import("@/components/macbook-scroll-demo").then(mod => ({ default: mod.MacbookScrollDemo })), {
  loading: () => <div className="h-96" />,
  ssr: false
});

// Loading component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7760F9]"></div>
  </div>
);

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("linkedin");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = {
    linkedin: {
      title: "LinkedIn Automation",
      description: "Automate your entire LinkedIn outreach with AI-powered sequences",
      items: [
        "Smart connection requests with personalization",
        "Automated follow-up messages",
        "Profile visits and endorsements",
        "InMail automation with templates",
        "Connection acceptance tracking",
        "Smart scheduling to mimic human behavior"
      ],
      icon: Linkedin,
      gradient: "from-[#0077B5] to-[#005885]"
    },
    whatsapp: {
      title: "WhatsApp Business",
      description: "Unique to Indian market - reach prospects where they respond fastest",
      items: [
        "Bulk WhatsApp messaging",
        "Business API integration",
        "Template management",
        "Media message support",
        "Response automation",
        "Multi-language support"
      ],
      icon: MessageSquare,
      gradient: "from-[#25D366] to-[#128C7E]"
    },
    email: {
      title: "Email Finder & Outreach",
      description: "Find verified emails and automate your email campaigns",
      items: [
        "Email finder with 98% accuracy",
        "Email verification",
        "Drip email campaigns",
        "Personalization variables",
        "Open & click tracking",
        "A/B testing"
      ],
      icon: Mail,
      gradient: "from-[#7760F9] to-[#6651E8]"
    },
    analytics: {
      title: "Advanced Analytics",
      description: "Track every interaction and optimize your campaigns",
      items: [
        "Real-time campaign dashboard",
        "Conversion tracking",
        "ROI calculator",
        "Team performance metrics",
        "Export reports",
        "Custom analytics"
      ],
      icon: BarChart3,
      gradient: "from-[#FD6098] to-[#ED5088]"
    }
  };

  const faqs = [
    {
      question: "Is SaleSync safe for LinkedIn?",
      answer: "Yes! SaleSync uses cloud-based automation that mimics human behavior, staying within LinkedIn's limits. We've never had an account restricted in 5+ years."
    },
    {
      question: "Can I use WhatsApp Business for B2B?",
      answer: "Absolutely! In India, WhatsApp is the preferred business communication channel. Our platform is fully compliant with WhatsApp Business API."
    },
    {
      question: "How accurate is the email finder?",
      answer: "Our email finder has a 98% accuracy rate. We verify every email before adding it to your campaign to ensure high deliverability."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes! Start with our 14-day free trial. No credit card required. Cancel anytime."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 chat support, phone support during business hours, and dedicated account managers for enterprise plans."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "CEO at TechStartup Mumbai",
      content: "SaleSync helped us scale from 10 to 100 enterprise clients in just 6 months. The WhatsApp integration is a game-changer for the Indian market.",
      rating: 5,
      image: "/testimonial-1.jpg"
    },
    {
      name: "Priya Sharma",
      role: "Sales Head at FinTech Solutions",
      content: "The LinkedIn automation saved our team 30 hours per week. We're now closing 3x more deals with the same team size.",
      rating: 5,
      image: "/testimonial-2.jpg"
    },
    {
      name: "Amit Patel",
      role: "Founder at B2B SaaS",
      content: "Finally, a tool built for Indian B2B sales! The multi-channel approach and local payment options make it perfect for us.",
      rating: 5,
      image: "/testimonial-3.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#7760F9] to-[#6651E8] rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">SaleSync</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
                Testimonials
              </Link>
              <Link href="#resources" className="text-gray-600 hover:text-gray-900 transition-colors">
                Resources
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-[#7760F9] to-[#6651E8] text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
            <div className="container mx-auto px-6 py-4 space-y-4">
              <Link href="#features" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
              <Link href="#testimonials" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Testimonials
              </Link>
              <Link href="#resources" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Resources
              </Link>
              <Link href="/login" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Login
              </Link>
              <Link 
                href="/register" 
                className="block bg-gradient-to-r from-[#7760F9] to-[#6651E8] text-white px-6 py-2.5 rounded-lg text-center"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <Suspense fallback={<SectionLoader />}>
        <AnimatedHero />
      </Suspense>

      {/* Features Overview */}
      <Suspense fallback={<SectionLoader />}>
        <AnimatedFeatures />
      </Suspense>

      {/* Detailed Features Tabs */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built for Indian B2B Sales Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multi-channel outreach, local payment options, and features designed specifically for the Indian market
            </p>
          </div>

          {/* Feature Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(features).map(([key, feature]) => {
              const Icon = feature.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === key
                      ? "bg-white text-gray-900 shadow-lg"
                      : "bg-white/50 text-gray-600 hover:bg-white hover:shadow-md"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {feature.title}
                </button>
              );
            })}
          </div>

          {/* Feature Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${features[activeTab as keyof typeof features].gradient} mb-6`}>
                {React.createElement(features[activeTab as keyof typeof features].icon, { className: "h-8 w-8 text-white" })}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {features[activeTab as keyof typeof features].title}
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                {features[activeTab as keyof typeof features].description}
              </p>
              <ul className="space-y-4">
                {features[activeTab as keyof typeof features].items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-green-600 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${features[activeTab as keyof typeof features].gradient} rounded-3xl blur-3xl opacity-20`} />
              <img 
                src={`/${activeTab}-demo.png`}
                alt={`${features[activeTab as keyof typeof features].title} Demo`}
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <Suspense fallback={<SectionLoader />}>
        <MacbookScrollDemo />
      </Suspense>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Start Automating in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get up and running in minutes, not days
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-[#7760F9] font-bold">
                1
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <UserCheck className="h-12 w-12 text-[#7760F9] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Connect Your Accounts</h3>
                <p className="text-gray-600">
                  Securely connect your LinkedIn, WhatsApp Business, and email accounts in one click
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 -top-4 w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-[#7760F9] font-bold">
                2
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <Target className="h-12 w-12 text-[#7760F9] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Find Your Prospects</h3>
                <p className="text-gray-600">
                  Use our advanced search to find decision makers in your target companies
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 -top-4 w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-[#7760F9] font-bold">
                3
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <Sparkles className="h-12 w-12 text-[#7760F9] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Launch Campaigns</h3>
                <p className="text-gray-600">
                  Create multi-channel campaigns with AI personalization and watch the leads flow
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
      </Suspense>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free, scale as you grow. All plans include multi-channel automation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <p className="text-gray-600 mb-6">For individual sales reps</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">₹2,999</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">500 LinkedIn connections/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">1,000 WhatsApp messages</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Unlimited email finder</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Basic analytics</span>
                </li>
              </ul>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 rounded-lg transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Growth Plan */}
            <div className="relative bg-gradient-to-br from-[#7760F9] to-[#6651E8] rounded-2xl p-8 shadow-xl text-white">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Growth</h3>
              <p className="text-white/80 mb-6">For growing sales teams</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹7,999</span>
                <span className="text-white/80">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-white" />
                  <span>2,000 LinkedIn connections/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-white" />
                  <span>5,000 WhatsApp messages</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-white" />
                  <span>Team collaboration (5 seats)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-white" />
                  <span>Advanced analytics & reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-white" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button className="w-full bg-white hover:bg-gray-100 text-[#7760F9] font-medium py-3 rounded-lg transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-6">For large sales teams</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Unlimited everything</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Unlimited team seats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Custom integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Dedicated account manager</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">SLA & priority support</span>
                </li>
              </ul>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 rounded-lg transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about SaleSync
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${
                    activeFaq === index ? "rotate-180" : ""
                  }`} />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#7760F9] to-[#6651E8]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to 10x Your Sales?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join 100,000+ sales professionals who are already automating their outreach with SaleSync
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-[#7760F9] bg-white rounded-xl hover:shadow-lg transition-all"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all">
              <Play className="h-5 w-5 mr-2" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#7760F9] to-[#6651E8] rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">SaleSync</span>
              </div>
              <p className="text-gray-400 mb-4">
                The only B2B sales automation platform built for the Indian market.
              </p>
              <div className="flex gap-4">
                <Linkedin className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                <MessageSquare className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                <Mail className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@salesync.in</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Mumbai, India</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 SaleSync. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}