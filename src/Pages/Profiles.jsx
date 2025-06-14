import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFbiMostWanted } from '../hooks/apiHooks';

export default function Profiles() {
  const [activeTab, setActiveTab] = useState('current');
  const wantedList = useFbiMostWanted();

  return (
    <section className="container py-12 ml-10">
      <h1 className="section-title">Criminal Profile Database</h1>
      <p className="section-subtitle">
        Comprehensive behavioral and forensic profiles of known offenders
      </p>
      
      <div className="mb-8 border-b border-slate-700">
        <div className="flex space-x-4">
          {['current', 'solved', 'cold cases'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium relative ${
                activeTab === tab ? 'text-primary' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div
                  layoutId="profileTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {Array.isArray(wantedList) && wantedList.slice(0, 6).map((profile, index) => (
          <motion.div
            key={profile.uid}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800 rounded-lg overflow-hidden shadow-lg"
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={profile.images[0]?.large || '/placeholder-profile.jpg'}
                  alt={profile.title}
                  className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">{profile.title}</h3>
                  <p className="text-slate-400 text-sm mb-2">{profile.subjects?.join(', ') || 'Unknown affiliations'}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {profile.caution && (
                      <span className="px-2 py-1 text-xs font-semibold bg-red-900/50 rounded-full text-red-300">
                        {profile.caution.split('.')[0]}
                      </span>
                    )}
                    <span className="px-2 py-1 text-xs font-semibold bg-slate-700 rounded-full text-slate-300">
                      {profile.status || 'At large'}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-slate-300 line-clamp-2">
                {profile.description || 'No additional information available.'}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}