import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonialApi } from '../../services/api';

// ===================== PLATFORMS SECTION =====================
const platforms = [
  { icon: '🔍', name: 'Google Ads', desc: 'Search, Display & Shopping campaigns', color: 'from-blue-50 to-blue-100', border: 'border-blue-100' },
  { icon: '📘', name: 'Facebook Ads', desc: 'Targeted social advertising', color: 'from-indigo-50 to-indigo-100', border: 'border-indigo-100' },
  { icon: '📸', name: 'Instagram', desc: 'Visual storytelling & engagement', color: 'from-pink-50 to-pink-100', border: 'border-pink-100' },
  { icon: '📺', name: 'YouTube', desc: 'Video marketing campaigns', color: 'from-red-50 to-red-100', border: 'border-red-100' },
  { icon: '💼', name: 'LinkedIn', desc: 'B2B lead generation', color: 'from-sky-50 to-sky-100', border: 'border-sky-100' },
  { icon: '✖️', name: 'Twitter / X', desc: 'Real-time engagement', color: 'from-gray-50 to-gray-100', border: 'border-gray-100' },
];

export function PlatformsSection() {
  return (
    <section id="platforms" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            Where We Advertise
          </span>
          <h2 className="font-syne text-4xl font-bold text-dark mt-3 mb-4">
            Multi-Platform Marketing Expertise
          </h2>
          <p className="text-gray-500 text-lg">
            We manage your campaigns across all major digital platforms to maximize reach
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`bg-gradient-to-br ${p.color} border ${p.border} rounded-2xl p-6 text-center
                hover:shadow-lg hover:-translate-y-2 transition-all cursor-pointer`}
            >
              <div className="text-4xl mb-3">{p.icon}</div>
              <h3 className="font-syne font-bold text-dark text-sm mb-1">{p.name}</h3>
              <p className="text-gray-500 text-xs leading-tight">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Delhi Focus Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 gradient-hero rounded-2xl p-8 text-center"
        >
          <div className="text-4xl mb-3">🏙️</div>
          <h3 className="font-syne text-2xl font-bold text-white mb-2">
            Specialized in Delhi Market
          </h3>
          <p className="text-white/80 max-w-2xl mx-auto">
            Deep understanding of Delhi's consumer behavior, local trends, and competitive landscape.
            We target the right audience in the right locality — from Connaught Place to Dwarka.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ===================== PROCESS SECTION =====================
const steps = [
  { num: '01', title: 'Discovery & Analysis', desc: 'We deep-dive into your business, competitors, and target audience. Through comprehensive market research, we identify opportunities and gaps.' },
  { num: '02', title: 'Strategy Development', desc: 'A detailed marketing blueprint covering channels, budgets, content, and KPIs — all reviewed and approved by you before we begin.' },
  { num: '03', title: 'Campaign Setup', desc: 'All accounts, creatives, tracking pixels, and landing pages configured and rigorously tested before launch day.' },
  { num: '04', title: 'Launch & Optimize', desc: 'Campaigns go live with continuous A/B testing and data-driven optimizations to maximize your ROI every single week.' },
  { num: '05', title: 'Report & Scale', desc: 'Monthly transparent reports with every metric that matters. We scale winners and cut losers — relentlessly pursuing growth.' },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            How We Work
          </span>
          <h2 className="font-syne text-4xl font-bold text-dark mt-3 mb-4">
            Our Proven 5-Step Process
          </h2>
          <p className="text-gray-500 text-lg">
            A systematic approach that consistently delivers outstanding results
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`lg:grid lg:grid-cols-2 lg:gap-12 items-center ${i % 2 === 1 ? '' : ''}`}
              >
                {/* Content */}
                <div className={`bg-white border border-gray-100 rounded-2xl p-8 shadow-sm
                  hover:shadow-xl transition-all ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="text-4xl font-syne font-extrabold text-gray-100 mb-2">
                    {step.num}
                  </div>
                  <h3 className="font-syne text-xl font-bold text-dark mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </div>

                {/* Step indicator (center on desktop) */}
                <div className={`hidden lg:flex items-center ${i % 2 === 1 ? 'justify-start lg:order-1' : 'justify-end'}`}>
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center
                    text-white font-syne font-bold text-lg shadow-xl shadow-orange-200 z-10">
                    {i + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===================== TESTIMONIALS SECTION =====================
const fallbackTestimonials = [
  { id: 1, authorName: 'Rajesh Kumar', authorRole: 'CEO', companyName: 'TechSolutions Delhi', rating: 5, avatarInitials: 'RK',
    content: 'DigiGrow transformed our online presence. Within 3 months, we saw a 300% increase in qualified leads through Google Ads.' },
  { id: 2, authorName: 'Priya Sharma', authorRole: 'Founder', companyName: 'FashionHub', rating: 5, avatarInitials: 'PS',
    content: 'Our Instagram following grew from 2K to 50K in 6 months, and sales from social media increased by 400%!' },
  { id: 3, authorName: 'Amit Malhotra', authorRole: 'Director', companyName: 'HomeServe India', rating: 5, avatarInitials: 'AM',
    content: 'Their SEO expertise helped us rank #1 for our most important keywords in Delhi. Organic traffic up by 250%.' },
];

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    testimonialApi.getAll(true)
      .then(res => { if (res?.data?.length) setTestimonials(res.data); })
      .catch(() => {});
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-slate-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            Client Success Stories
          </span>
          <h2 className="font-syne text-4xl font-bold text-dark mt-3 mb-4">
            Real Results from Real Businesses
          </h2>
          <p className="text-gray-500 text-lg">
            Don't take our word for it — here's what our Delhi clients say
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all relative"
            >
              {/* Quote mark */}
              <div className="text-7xl font-syne text-primary/10 absolute top-4 left-6 leading-none">"</div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating || 5)].map((_, j) => (
                  <Star key={j} size={16} className="text-accent fill-accent" />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed mb-6 relative z-10">{t.content}</p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center
                  text-white font-bold text-lg font-syne">
                  {t.avatarInitials || t.authorName?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-syne font-bold text-dark">{t.authorName}</div>
                  <div className="text-gray-500 text-sm">
                    {t.authorRole}, {t.companyName}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== FOOTER =====================
export function Footer() {
  const [email, setEmail] = useState('');
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert('Subscribed!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-syne text-2xl font-extrabold text-gradient mb-4">DigiGrow</div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Delhi's trusted digital marketing agency. We help businesses grow through
              strategic, data-driven online marketing.
            </p>
            <div className="flex gap-3">
              {['📘', '📸', '💼', '✖️'].map((icon, i) => (
                <button key={i} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center
                  hover:bg-primary transition-colors text-lg">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-syne font-bold text-accent mb-5">Services</h4>
            <ul className="space-y-2.5">
              {['Paid Advertising', 'Social Media Marketing', 'SEO Services', 'Content Marketing', 'Web Development'].map(s => (
                <li key={s}>
                  <a href="#services" className="text-white/70 hover:text-primary transition-colors text-sm">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-syne font-bold text-accent mb-5">Company</h4>
            <ul className="space-y-2.5">
              {['About Us', 'Our Process', 'Case Studies', 'Blog', 'Careers'].map(s => (
                <li key={s}>
                  <a href="#" className="text-white/70 hover:text-primary transition-colors text-sm">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-syne font-bold text-accent mb-5">Stay Updated</h4>
            <p className="text-white/70 text-sm mb-4">
              Get marketing tips and insights for your Delhi business.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2
                  text-sm text-white placeholder-white/40 outline-none focus:border-primary"
              />
              <button type="submit" className="gradient-primary px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90">
                Join
              </button>
            </form>
            <div className="mt-6 space-y-2">
              <p className="text-white/70 text-sm">📍 Connaught Place, New Delhi</p>
              <p className="text-white/70 text-sm">📞 +91 98765 43210</p>
              <p className="text-white/70 text-sm">✉️ hello@digigrow.agency</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © 2026 DigiGrow Digital Marketing Agency. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(link => (
              <a key={link} href="#" className="text-white/50 hover:text-primary transition-colors text-sm">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
