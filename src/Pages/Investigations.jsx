import React from 'react';
import { motion } from 'framer-motion';
import { ChartBarIcon, ClockIcon, MapIcon, DocumentMagnifyingGlassIcon  } from '@heroicons/react/24/outline';

const activeCases = [
  {
    id: 1,
    code: 'ECHO-117',
    title: 'Silent Network Infiltration',
    status: 'Active Surveillance',
    progress: 65,
    icon: ChartBarIcon,
    location: 'Multiple jurisdictions'
  },
  {
    id: 2,
    code: 'MIRROR-42',
    title: 'Behavioral Pattern Analysis',
    status: 'Profile Development',
    progress: 40,
    icon: DocumentMagnifyingGlassIcon ,
    location: 'Northeast Corridor'
  },
  {
    id: 3,
    code: 'GRID-9',
    title: 'Critical Infrastructure Threat',
    status: 'Digital Forensics',
    progress: 80,
    icon: MapIcon,
    location: 'Classified'
  }
];

export default function Investigations() {
  return (
    <section className="container py-12 ml-10">
      <h1 className="section-title">Active Investigations</h1>
      <p className="section-subtitle">
        Current operations requiring multidisciplinary approach
      </p>
      
      <div className="space-y-6">
        {activeCases.map((caseItem, index) => {
          const Icon = caseItem.icon;
          return (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 rounded-lg p-6 shadow-lg border-l-4 border-primary"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-start space-x-4 mb-4 md:mb-0">
                  <div className="p-3 rounded-lg bg-slate-700">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{caseItem.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs font-medium px-2 py-1 bg-slate-700 rounded-full text-slate-300">
                        {caseItem.code}
                      </span>
                      <span className="text-xs font-medium px-2 py-1 bg-blue-900/50 rounded-full text-blue-300 flex items-center">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        {caseItem.status}
                      </span>
                      <span className="text-xs font-medium px-2 py-1 bg-purple-900/50 rounded-full text-purple-300 flex items-center">
                        <MapIcon className="h-3 w-3 mr-1" />
                        {caseItem.location}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-48">
                  <div className="flex justify-between text-sm text-slate-400 mb-1">
                    <span>Progress</span>
                    <span>{caseItem.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${caseItem.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}