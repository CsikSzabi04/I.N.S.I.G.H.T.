import React from 'react';
import { motion } from 'framer-motion';
import {
  CogIcon,
  FingerPrintIcon,
  Squares2X2Icon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  SignalIcon,
} from '@heroicons/react/24/outline';

const services = [
  {
    title: 'Behavioral Profiling',
    desc: 'Gain deep insights into criminal minds with AI-powered psychological profiling and threat behavior analysis.',
    icon: FingerPrintIcon,
  },
  {
    title: 'Forensic Analysis',
    desc: 'Empower your investigations with advanced lab analytics, digital trace recovery, and evidence reconstruction.',
    icon: CogIcon,
  },
  {
    title: 'Cyber Intelligence',
    desc: 'Monitor, intercept, and disrupt digital threats through real-time network surveillance and grid forensics.',
    icon: Squares2X2Icon,
  },
  {
    title: 'Threat Detection',
    desc: 'Stay ahead of cybercriminals with proactive threat hunting, anomaly detection, and alert systems.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Investigative Search',
    desc: 'Track digital footprints and uncover hidden patterns using data correlation and search intelligence tools.',
    icon: MagnifyingGlassIcon,
  },
  {
    title: 'Signal Intelligence',
    desc: 'Leverage cutting-edge SIGINT tools to decode communication patterns and identify covert transmissions.',
    icon: SignalIcon,
  },
];

export default function Services() {
  return (
    <section className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-gray-100">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-400 mb-4">
          Comprehensive Threat Intelligence Services
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          We combine behavioral science, cybersecurity expertise, and AI-driven insights to help you stay ahead of evolving threats.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <service.icon className="w-8 h-8 text-teal-700" />
              <h3 className="ml-3 text-xl font-semibold text-gray-300">{service.title}</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
