import { motion } from 'framer-motion';
import { ArrowRight, Play, TrendingUp, Users, Award } from 'lucide-react';

const stats = [
  { number: '500+', label: 'Clients Served', icon: Users },
  { number: '5X', label: 'Average ROI', icon: TrendingUp },
  { number: '10+', label: 'Years Experience', icon: Award },
];

export default function HeroSection() {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="gradient-hero min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Floating Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float"
           style={{ animationDelay: '-7s' }} />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float"
           style={{ animationDelay: '-14s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20
                text-white text-sm px-4 py-2 rounded-full mb-6 backdrop-blur-sm"
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Delhi's #1 Digital Marketing Agency
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-syne text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              Grow Your Business with{' '}
              <span className="text-gradient">Smart Digital Marketing</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/85 text-lg sm:text-xl mb-8 leading-relaxed"
            >
              We help businesses in Delhi dominate their market with strategic campaigns
              across Google, Instagram, Facebook, YouTube, LinkedIn and more.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={scrollToBooking}
                className="gradient-primary text-white px-8 py-4 rounded-full font-semibold
                  text-lg flex items-center justify-center gap-2 hover:shadow-2xl
                  hover:shadow-orange-400/30 hover:-translate-y-1 transition-all"
              >
                Get Free Consultation <ArrowRight size={20} />
              </button>
              <button
                onClick={scrollToServices}
                className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-full
                  font-semibold text-lg flex items-center justify-center gap-2 backdrop-blur-sm
                  hover:bg-white/20 transition-all"
              >
                <Play size={20} fill="white" /> See Our Services
              </button>
            </motion.div>
          </div>

          {/* Right Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm
                  flex items-center gap-5 hover:bg-white/15 transition-all group"
              >
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center
                  group-hover:scale-110 transition-transform">
                  <stat.icon className="text-white" size={28} />
                </div>
                <div>
                  <div className="font-syne text-4xl font-extrabold text-accent">{stat.number}</div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}

            {/* Platforms badge */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm"
            >
              <p className="text-white/70 text-sm mb-3 font-medium">We advertise on</p>
              <div className="flex gap-3 flex-wrap">
                {['🔍 Google', '📘 Facebook', '📸 Instagram', '📺 YouTube', '💼 LinkedIn'].map(p => (
                  <span key={p} className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full">
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
