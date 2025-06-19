"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Sales Director",
      company: "TechCorp India",
      image: "RK",
      content: "SaleSync transformed our B2B outreach. We've seen a 3x increase in qualified leads and our sales team saves 20+ hours per week on manual tasks.",
      rating: 5,
      logo: "🏢"
    },
    {
      name: "Priya Sharma",
      role: "CEO",
      company: "StartupHub Mumbai",
      image: "PS",
      content: "The WhatsApp integration is a game-changer for the Indian market. Our response rates increased by 85% compared to traditional email outreach.",
      rating: 5,
      logo: "🚀"
    },
    {
      name: "Amit Patel",
      role: "Head of Growth",
      company: "SaaS Solutions",
      image: "AP",
      content: "LinkedIn automation with SaleSync is incredibly safe and effective. We've grown our network by 500% without any account restrictions.",
      rating: 5,
      logo: "💼"
    }
  ];

  const companies = [
    { name: "Reliance", logo: "🏭" },
    { name: "Tata Consultancy", logo: "🏢" },
    { name: "Infosys", logo: "💻" },
    { name: "Wipro", logo: "🌐" },
    { name: "HCL Tech", logo: "⚡" },
    { name: "Tech Mahindra", logo: "🔧" }
  ];

  return (
    <section className="py-20 px-6 bg-white dark:bg-black transition-all duration-500 ease-in-out">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Loved by <span className="bg-gradient-to-r from-[#7760F9] to-[#6651E8] bg-clip-text text-transparent">100,000+</span> Sales Teams
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Join thousands of Indian businesses that trust SaleSync to automate their B2B sales process
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#7760F9] to-[#6651E8] rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
              <div className="relative bg-white dark:bg-black rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-900 hover:border-gray-200 dark:hover:border-gray-800 transition-all duration-300 ease-in-out h-full">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-[#7760F9] opacity-20 absolute top-8 right-8" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 relative z-10">"{testimonial.content}"</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#7760F9] to-[#6651E8] rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.image}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role} at {testimonial.company}</p>
                  </div>
                  <div className="text-2xl">{testimonial.logo}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-8">Trusted by leading Indian companies</p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {companies.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
              >
                <span className="text-3xl">{company.logo}</span>
                <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">{company.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">Ready to join them?</p>
          <button className="bg-gradient-to-r from-[#7760F9] to-[#6651E8] text-white px-8 py-4 rounded-xl font-medium text-lg hover:shadow-xl transition-all transform hover:scale-105">
            Start Your Free Trial Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}