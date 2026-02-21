import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { CheckCircle, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { bookingApi } from '../../services/api';

const serviceTypes = [
  { value: 'paid-advertising', label: '🎯 Paid Advertising' },
  { value: 'social-media-marketing', label: '📱 Social Media Marketing' },
  { value: 'seo', label: '🔍 SEO Services' },
  { value: 'content-marketing', label: '✍️ Content Marketing' },
  { value: 'analytics-reporting', label: '📊 Analytics & Reporting' },
  { value: 'website-development', label: '🌐 Website Development' },
  { value: 'full-service', label: '🚀 Full-Service Marketing' },
];

const budgetRanges = [
  { value: 'under-50k', label: 'Under ₹50,000/month' },
  { value: '50k-1L', label: '₹50,000 - ₹1,00,000/month' },
  { value: '1L-2L', label: '₹1,00,000 - ₹2,00,000/month' },
  { value: '2L-5L', label: '₹2,00,000 - ₹5,00,000/month' },
  { value: 'above-5L', label: 'Above ₹5,00,000/month' },
];

const benefits = [
  'Free 30-minute strategy session',
  'Custom marketing plan overview',
  'Competitor analysis insights',
  'Platform-specific ROI projections',
  'No obligation - pure value',
];

export default function BookingSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await bookingApi.create(data);
      setSubmitted(true);
      reset();
      toast.success('Booking confirmed! We\'ll call you within 24 hours.');
    } catch (err) {
      const msg = err?.message || 'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 gradient-hero relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">
              Book a Call
            </span>
            <h2 className="font-syne text-4xl sm:text-5xl font-bold text-white mt-3 mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Book a free consultation call with our digital marketing experts. We'll discuss your
              goals, analyze your current situation, and show you exactly how we can help your
              business dominate Delhi's digital landscape.
            </p>

            <ul className="space-y-4 mb-10">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-white">
                  <div className="w-7 h-7 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <span className="text-white/90">{b}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: Phone, text: '+91 98765 43210', label: 'Call us directly' },
                { icon: Mail, text: 'hello@digigrow.agency', label: 'Email us anytime' },
                { icon: MapPin, text: 'Connaught Place, New Delhi', label: 'Visit our office' },
                { icon: Calendar, text: 'Mon–Sat, 9 AM – 6 PM', label: 'Office hours' },
              ].map(({ icon: Icon, text, label }) => (
                <div key={text} className="flex items-center gap-4 bg-white/10 border border-white/20
                  rounded-xl px-5 py-3 backdrop-blur-sm">
                  <Icon className="text-accent flex-shrink-0" size={20} />
                  <div>
                    <div className="text-xs text-white/60">{label}</div>
                    <div className="text-white font-medium">{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl p-12 text-center shadow-2xl"
              >
                <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center
                  mx-auto mb-6 shadow-lg shadow-orange-200">
                  <CheckCircle size={48} className="text-white" />
                </div>
                <h3 className="font-syne text-2xl font-bold text-dark mb-3">
                  Booking Confirmed! 🎉
                </h3>
                <p className="text-gray-500 mb-6">
                  Thank you! Our expert will reach out to you within 24 hours to schedule your
                  free strategy call.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="gradient-primary text-white px-8 py-3 rounded-full font-semibold
                    hover:shadow-lg hover:shadow-orange-200 transition-all"
                >
                  Book Another Call
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-2xl p-8 shadow-2xl shadow-black/20 space-y-5"
              >
                <h3 className="font-syne text-2xl font-bold text-dark">Book Your Free Call</h3>

                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      {...register('fullName', { required: 'Name is required' })}
                      placeholder="Rahul Sharma"
                      className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-colors
                        ${errors.fullName ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      {...register('phone', {
                        required: 'Phone is required',
                        pattern: { value: /^[+]?[0-9]{10,15}$/, message: 'Invalid phone' }
                      })}
                      placeholder="+91 9876543210"
                      className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-colors
                        ${errors.phone ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
                    })}
                    type="email"
                    placeholder="rahul@company.com"
                    className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-colors
                      ${errors.email ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Business Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Business Name
                  </label>
                  <input
                    {...register('businessName')}
                    placeholder="Your Business Pvt. Ltd."
                    className="w-full border-2 border-gray-200 focus:border-primary rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  />
                </div>

                {/* Service & Budget Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Service Needed *
                    </label>
                    <select
                      {...register('serviceType', { required: 'Please select a service' })}
                      className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-white
                        ${errors.serviceType ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                    >
                      <option value="">Select service...</option>
                      {serviceTypes.map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                    {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Monthly Budget
                    </label>
                    <select
                      {...register('monthlyBudget')}
                      className="w-full border-2 border-gray-200 focus:border-primary rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-white"
                    >
                      <option value="">Select budget...</option>
                      {budgetRanges.map(b => (
                        <option key={b.value} value={b.value}>{b.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">City</label>
                  <input
                    {...register('city')}
                    placeholder="Delhi"
                    defaultValue="Delhi"
                    className="w-full border-2 border-gray-200 focus:border-primary rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Tell us about your goals
                  </label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="What are you looking to achieve? More leads, brand awareness, sales..."
                    className="w-full border-2 border-gray-200 focus:border-primary rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-primary text-white py-4 rounded-xl font-semibold text-base
                    hover:shadow-xl hover:shadow-orange-200 hover:-translate-y-0.5 transition-all
                    disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Scheduling...' : '📅 Schedule Free Consultation'}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting, you agree to be contacted by our team. No spam, ever.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
