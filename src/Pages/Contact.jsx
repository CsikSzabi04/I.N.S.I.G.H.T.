import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon,
} from '@heroicons/react/24/outline';


export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    caseType: 'consultation',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
    alert('Message received. Our team will contact you shortly.');
    setFormData({
      name: '',
      email: '',
      caseType: 'consultation',
      message: ''
    });
  };

  return (
    <section className="container py-12 ml-10">
      <h1 className="section-title">Contact Our Team</h1>
      <p className="section-subtitle">
        Confidential inquiries handled with discretion
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-800 rounded-lg p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Send a Secure Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="caseType" className="block text-sm font-medium text-slate-400 mb-1">
                Inquiry Type
              </label>
              <select
                id="caseType"
                name="caseType"
                value={formData.caseType}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="consultation">Consultation Request</option>
                <option value="case">Case Submission</option>
                <option value="media">Media Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary hover:bg-primary-dark rounded-md text-white font-medium transition-colors"
            >
              Send Secure Message
            </button>
          </form>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="bg-slate-800 rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-slate-700">
                  <EnvelopeIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Email</h4>
                  <p className="text-slate-400">secure@insight-network.org</p>
                  <p className="text-sm text-slate-500 mt-1">Encrypted communication preferred</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-slate-700">
                  <PhoneIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Phone</h4>
                  <p className="text-slate-400">+1 (555) 238-9476</p>
                  <p className="text-sm text-slate-500 mt-1">24/7 emergency response available</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-slate-700">
                  <MapPinIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Headquarters</h4>
                  <p className="text-slate-400">1250 Security Square, Suite 900</p>
                  <p className="text-slate-400">Quantico, VA 22134</p>
                  <p className="text-sm text-slate-500 mt-1">By appointment only</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-slate-700">
                  <ClockIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Operational Hours</h4>
                  <p className="text-slate-400">Monday-Friday: 8:00 AM - 6:00 PM</p>
                  <p className="text-slate-400">Emergency: 24/7</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6">Secure Drop</h3>
            <p className="text-slate-400 mb-4">
              For highly sensitive information, use our encrypted file upload system.
            </p>
            <button className="w-full py-3 px-4 border border-primary text-primary hover:bg-primary/10 rounded-md font-medium transition-colors">
              Initiate Secure Transfer
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}