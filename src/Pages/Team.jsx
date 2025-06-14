import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  FingerPrintIcon, 
  CodeBracketIcon, 
  ScaleIcon, 
  EyeIcon, 
  LightBulbIcon 
} from '@heroicons/react/24/outline';

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Alexander Sz. Csík',
    role: 'Lead Profiler',
    specialty: 'Behavioral Analysis',
    icon: FingerPrintIcon,
    description: 'Top student in Ethical Hacking and Software Development at Neuman; background in criminal psychology and expertise in micro-expressions'
  },
  {
    id: 2,
    name: 'Lillien Kis',
    role: 'Forensic Scientist',
    specialty: 'Biology | Criminal Pshychology',
    icon: EyeIcon,
    description: 'Lilien Kis, a forensic specialist from Tiszakécske and graduate of Móricz Zsigmond Gimnázium, focuses on biology and criminal psychology'
  },
  {
    id: 3,
    name: 'Kai Chen',
    role: 'IT Specialist',
    specialty: 'Cyber Forensics',
    icon: CodeBracketIcon,
    description: 'White hat hacker specializing in digital footprint analysis.'
  },
  {
    id: 4,
    name: 'Sarah Dawson',
    role: 'Legal Consultant',
    specialty: 'Criminal Law',
    icon: ScaleIcon,
    description: 'Former prosecutor with expertise in evidentiary procedure.'
  },
  {
    id: 5,
    name: 'Jason Gideon',
    role: 'Senior Profiler',
    specialty: 'Threat Assessment',
    icon: UserIcon,
    description: 'Legendary profiler with unmatched case resolution rate.'
  },
  {
    id: 6,
    name: 'Nina Sharpe',
    role: 'Consultant',
    specialty: 'Criminal Networks',
    icon: LightBulbIcon,
    description: 'Strategist with deep knowledge of organized crime structures.'
  }
];

export default function Team() {
  return (
    <section className="container py-12 ml-10">
      <h1 className="section-title">Our Elite Profiling Team</h1>
      <p className="section-subtitle">
        Multidisciplinary experts working in unison to solve the most complex cases
      </p> <br />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => {
          const Icon = member.icon;
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-slate-700 mr-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-slate-400">{member.role}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-slate-700 rounded-full text-primary">
                    {member.specialty}
                  </span>
                </div>
                <p className="text-slate-300">{member.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}