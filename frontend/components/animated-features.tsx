"use client";
import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Linkedin,
  MessageSquare,
  Mail,
  BarChart3,
  CheckCircle2
} from "lucide-react";

export function AnimatedFeatures() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const handleFeatureClick = useCallback((index: number) => {
    if (!isTransitioning && index !== activeFeature) {
      setIsTransitioning(true);
      setActiveFeature(index);
      setTimeout(() => setIsTransitioning(false), 200);
    }
  }, [activeFeature, isTransitioning]);

  const features = [
    {
      title: "LinkedIn Automation",
      description: "Connect, message, and follow up automatically",
      icon: Linkedin,
      color: "from-[#0077B5] to-[#005885]",
      image: "/linkedin-demo.png",
      points: [
        "Smart connection requests with AI personalization",
        "Multi-step drip campaigns",
        "Profile visit automation",
        "InMail sequences"
      ]
    },
    {
      title: "WhatsApp Business",
      description: "Reach Indian businesses where they respond fastest",
      icon: MessageSquare,
      color: "from-[#25D366] to-[#128C7E]",
      image: "/whatsapp-demo.png",
      points: [
        "Bulk messaging with templates",
        "Media & document sharing",
        "Auto-reply workflows",
        "Multi-language support"
      ]
    },
    {
      title: "Email Finder & Outreach",
      description: "Find verified emails and automate campaigns",
      icon: Mail,
      color: "from-[#7760F9] to-[#6651E8]",
      image: "/email-demo.png",
      points: [
        "98% accurate email finder",
        "Domain search capabilities",
        "Email verification",
        "Personalized sequences"
      ]
    },
    {
      title: "Analytics Dashboard",
      description: "Track everything and optimize performance",
      icon: BarChart3,
      color: "from-[#FD6098] to-[#ED5088]",
      image: "/analytics-demo.png",
      points: [
        "Real-time performance metrics",
        "Campaign ROI tracking",
        "A/B testing insights",
        "Custom reports"
      ]
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-[#7760F9] to-[#6651E8] bg-clip-text text-transparent"> Scale Your Sales</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            One platform, multiple channels. Automate your entire B2B sales process with AI-powered tools designed for the Indian market.
          </p>
        </motion.div>

        {/* Feature Selector */}
        <div className="grid md:grid-cols-4 gap-4 mb-12 transform-gpu">
          {features.map((feature, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
              onClick={() => handleFeatureClick(index)}
              className={`relative p-6 rounded-2xl text-left transition-all duration-200 will-change-transform ${
                activeFeature === index
                  ? "bg-white shadow-xl scale-105 z-10"
                  : "bg-gray-50 hover:bg-white hover:shadow-lg hover:scale-[1.02]"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-10`} />
              {React.createElement(feature.icon, {
                className: `h-8 w-8 mb-3 ${
                  activeFeature === index ? "text-[#7760F9]" : "text-gray-600"
                }`
              })}
              <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Feature Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden will-change-transform"
          >
            <div className="grid lg:grid-cols-2">
              {/* Left side - Details */}
              <div className="p-12">
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${features[activeFeature].color} mb-6`}>
                  {React.createElement(features[activeFeature].icon, { className: "h-8 w-8 text-white" })}
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {features[activeFeature].title}
                </h3>
                
                <p className="text-lg text-gray-600 mb-8">
                  {features[activeFeature].description}
                </p>

                <ul className="space-y-4 mb-8">
                  {features[activeFeature].points.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2, ease: "easeOut" }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5" />
                      <span className="text-gray-700">{point}</span>
                    </motion.li>
                  ))}
                </ul>

                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7760F9] to-[#6651E8] text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all">
                  Learn More
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Right side - Visual */}
              <div className={`relative bg-gradient-to-br ${features[activeFeature].color} p-12`}>
                <div className="absolute inset-0 bg-black opacity-10" />
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-200 ease-out will-change-transform">
                  {/* Demo UI based on feature */}
                  {activeFeature === 0 && <LinkedInDemo />}
                  {activeFeature === 1 && <WhatsAppDemo />}
                  {activeFeature === 2 && <EmailDemo />}
                  {activeFeature === 3 && <AnalyticsDemo />}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// Demo components for each feature
const LinkedInDemo = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-[#0077B5] rounded-full" />
      <div>
        <p className="font-semibold">John Doe</p>
        <p className="text-sm text-gray-600">CEO at TechCorp</p>
      </div>
      <button className="ml-auto bg-[#0077B5] text-white px-4 py-1 rounded-full text-sm">
        Connect
      </button>
    </div>
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-sm text-gray-700">
        Hi John, I noticed you're scaling your tech team in Mumbai. 
        We've helped similar companies reduce hiring time by 40%...
      </p>
    </div>
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <CheckCircle2 className="h-4 w-4 text-green-600" />
      <span>Message sent automatically</span>
    </div>
  </div>
);

const WhatsAppDemo = () => (
  <div className="space-y-4">
    <div className="bg-[#25D366] text-white p-3 rounded-t-lg flex items-center gap-2">
      <MessageSquare className="h-5 w-5" />
      <span className="font-medium">WhatsApp Business</span>
    </div>
    <div className="space-y-3">
      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
        <p className="text-sm">नमस्ते! We have an exclusive offer for your business...</p>
        <span className="text-xs text-gray-500">10:30 AM</span>
      </div>
      <div className="bg-[#25D366] text-white rounded-lg p-3 max-w-[80%] ml-auto">
        <p className="text-sm">Interested! Please share more details.</p>
        <span className="text-xs opacity-80">10:32 AM</span>
      </div>
    </div>
  </div>
);

const EmailDemo = () => (
  <div className="space-y-3">
    <div className="border-b pb-3">
      <p className="font-semibold text-sm">To: prospects@company.com</p>
      <p className="text-sm text-gray-600">Subject: Quick question about your sales process</p>
    </div>
    <div className="space-y-2">
      <p className="text-sm text-gray-700">Hi {`{firstName}`},</p>
      <p className="text-sm text-gray-700">
        I noticed your company is expanding in the Indian market. 
        We've helped 50+ similar businesses automate their outreach...
      </p>
    </div>
    <div className="flex items-center gap-2 text-xs text-gray-600 pt-3">
      <div className="w-2 h-2 bg-green-600 rounded-full" />
      <span>98% deliverability rate</span>
    </div>
  </div>
);

const AnalyticsDemo = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-2xl font-bold text-[#7760F9]">3,847</p>
        <p className="text-xs text-gray-600">Connections</p>
      </div>
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-2xl font-bold text-green-600">41.2%</p>
        <p className="text-xs text-gray-600">Accept Rate</p>
      </div>
    </div>
    <div className="h-32 flex items-end justify-between gap-1 transform-gpu">
      {[65, 45, 78, 52, 89, 72, 91].map((height, i) => (
        <div
          key={i}
          className="flex-1 bg-gradient-to-t from-[#7760F9] to-[#9b8afc] rounded-t"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  </div>
);