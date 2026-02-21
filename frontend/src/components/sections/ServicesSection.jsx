import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { servicesApi } from '../../services/api';

// Fallback data if API unavailable
const fallbackServices = [
  { id: 1, name: 'Paid Advertising', icon: '🎯', shortDescription: 'Maximize ROI with precision-targeted ad campaigns',
    features: ['Google Ads (Search, Display, Shopping)', 'Facebook & Instagram Ads', 'LinkedIn Advertising', 'YouTube Video Ads', 'Remarketing Campaigns'],
    priceStartingFrom: 15000 },
  { id: 2, name: 'Social Media Marketing', icon: '📱', shortDescription: 'Grow your brand across all social platforms',
    features: ['Content Strategy & Planning', 'Social Media Management', 'Community Engagement', 'Influencer Partnerships', 'Analytics & Reporting'],
    priceStartingFrom: 12000 },
  { id: 3, name: 'Search Engine Optimization', icon: '🔍', shortDescription: 'Dominate search results in Delhi & beyond',
    features: ['Technical SEO Audit', 'On-Page Optimization', 'Link Building Strategy', 'Local SEO - Delhi Focus', 'Content Optimization'],
    priceStartingFrom: 18000 },
  { id: 4, name: 'Content Marketing', icon: '✍️', shortDescription: 'Tell your brand story with impactful content',
    features: ['Blog Writing & Publishing', 'Video Content Production', 'Infographic Design', 'Email Newsletter Creation', 'Content Distribution'],
    priceStartingFrom: 10000 },
  { id: 5, name: 'Analytics & Reporting', icon: '📊', shortDescription: 'Data-driven decisions for maximum growth',
    features: ['Google Analytics Setup', 'Conversion Tracking', 'Custom Dashboard Creation', 'Monthly Performance Reports', 'ROI Analysis'],
    priceStartingFrom: 8000 },
  { id: 6, name: 'Website Development', icon: '🌐', shortDescription: 'Stunning websites that convert visitors to leads',
    features: ['Responsive Web Design', 'Landing Page Creation', 'E-commerce Solutions', 'Website Speed Optimization', 'CMS Integration'],
    priceStartingFrom: 25000 },
];

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300
        group border border-gray-100 hover:-translate-y-2 relative overflow-hidden"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 w-0 h-1 gradient-primary group-hover:w-full transition-all duration-500" />

      {/* Icon */}
      <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center
        text-3xl mb-6 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
        {service.icon}
      </div>

      <h3 className="font-syne text-xl font-bold text-dark mb-3">{service.name}</h3>
      <p className="text-gray-500 text-sm mb-5 leading-relaxed">{service.shortDescription}</p>

      <ul className="space-y-2 mb-6">
        {(service.features || []).slice(0, 5).map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle size={15} className="text-primary flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <span className="text-xs text-gray-400">Starting from</span>
          <div className="font-syne font-bold text-dark">
            ₹{service.priceStartingFrom?.toLocaleString('en-IN')}/mo
          </div>
        </div>
        <button
          onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-1 text-primary text-sm font-semibold
            hover:gap-2 transition-all group-hover:text-primary"
        >
          Get Started <ArrowRight size={15} />
        </button>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    servicesApi.getAll()
      .then(res => { if (res?.data?.length) setServices(res.data); })
      .catch(() => {}); // Use fallback silently
  }, []);

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            What We Offer
          </span>
          <h2 className="font-syne text-4xl font-bold text-dark mt-3 mb-4">
            Comprehensive Digital Marketing Services
          </h2>
          <p className="text-gray-500 text-lg">
            From strategy to execution, we handle every aspect of your digital presence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
