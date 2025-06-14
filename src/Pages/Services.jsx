import React from 'react';
import { motion } from 'framer-motion';
import { CogIcon, FingerPrintIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

const services = [
  { title: 'Behavioral Profiling', desc: 'In-depth threat analysis and psychological profiling.', icon: FingerPrintIcon },
  { title: 'Forensic Analysis', desc: 'Cutting-edge crime scene & lab analytics.', icon: CogIcon },
  { title: 'Cyber Intelligence', desc: 'Grid hacking, network surveillance, and digital forensics.', icon: Squares2X2Icon },
  // add more if needed
];

export default function Services() {
  return (
    <section className="max-w-5xl mx-auto py-8 space-y-8 px-4">
      <h1 className="text-4xl text-teal-300 font-bold text-center">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg shadow-md"
          >
            <s.icon className="w-8 h-8 text-teal-400" />
            <div>
              <h3 className="text-xl text-teal-200 font-semibold">{s.title}</h3>
              <p className="text-gray-300">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
