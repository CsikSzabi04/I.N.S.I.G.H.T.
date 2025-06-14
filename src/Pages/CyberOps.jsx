import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useThreatIntel, useCyberRiskScore } from '../hooks/apiHooks';
import {
    ShieldCheckIcon,
    LockClosedIcon,
    CpuChipIcon,
    ArchiveBoxIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function CyberOps() {
    const { data: threats, loading: threatsLoading } = useThreatIntel();
    const { score: riskScore, loading: scoreLoading } = useCyberRiskScore('insight-hq');
    const [activeSystem, setActiveSystem] = useState('firewall');
    const navigate = useNavigate();

    const systems = [
        { id: 'firewall', name: 'Network Firewall', status: 'secure', icon: LockClosedIcon },
        { id: 'ids', name: 'Intrusion Detection', status: 'monitoring', icon: ShieldCheckIcon },
        { id: 'siem', name: 'SIEM Analytics', status: 'analyzing', icon: CpuChipIcon },
        { id: 'backup', name: 'Data Integrity', status: 'verified', icon: ArchiveBoxIcon }
    ];

    const handleThreatClick = (threatId) => {
        navigate(`/threats/${threatId}`);
    };

    const handleSystemDetails = (systemId) => {
        navigate(`/systems/${systemId}`);
    };

    return (
        <section className="container py-12 ml-10">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Cyber Operations Center</h1>
                <p className="text-xl text-slate-400">
                    Real-time network defense and threat intelligence
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-slate-800 rounded-lg p-6 shadow-lg mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">Threat Intelligence Feed</h3>
                            <div className="flex items-center">
                                <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                                <span className="text-sm text-slate-400">LIVE</span>
                            </div>
                        </div>

                        {threatsLoading ? (
                            <div className="flex justify-center items-center h-40">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {Array.isArray(threats) && threats.slice(0, 5).map((threat, index) => (
                                    <motion.div
                                        key={threat.id || index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => handleThreatClick(threat.id || index)}
                                        className="p-4 bg-slate-700/50 rounded-lg border-l-2 border-red-500 cursor-pointer transition-all hover:bg-slate-700/70"
                                    >
                                        <div className="flex justify-between">
                                            <h4 className="font-medium text-white">{threat.name || 'Unknown Threat'}</h4>
                                            <span className="text-xs px-2 py-1 bg-red-900/50 rounded-full text-red-300">
                                                {threat.type || 'Malware'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-400 mt-1">
                                            {threat.description || 'New threat detected in wild'}
                                        </p>
                                        <div className="mt-2 flex justify-end">
                                            <button className="text-xs text-primary flex items-center">
                                                View details <ArrowRightIcon className="ml-1 h-3 w-3" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
                        <h3 className="text-xl font-bold text-white mb-4">System Status</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {systems.map((system) => {
                                const Icon = system.icon;
                                return (
                                    <motion.button
                                        key={system.id}
                                        onClick={() => {
                                            setActiveSystem(system.id);
                                            handleSystemDetails(system.id);
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`p-4 rounded-lg transition-all ${activeSystem === system.id
                                                ? 'bg-primary/10 border border-primary/30'
                                                : 'bg-slate-700 hover:bg-slate-700/70'
                                            }`}
                                    >
                                        <div className="flex flex-col items-center">
                                            <Icon className="h-8 w-8 mb-2 text-primary" />
                                            <span className="text-sm font-medium text-white">{system.name}</span>
                                            <span className="text-xs text-slate-400 mt-1 capitalize">{system.status}</span>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
                        <h3 className="text-xl font-bold text-white mb-4">Risk Assessment</h3>
                        {scoreLoading ? (
                            <div className="flex justify-center items-center h-40">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div className="relative w-40 h-40 mb-4">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle
                                            className="text-slate-700"
                                            strokeWidth="8"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="40"
                                            cx="50"
                                            cy="50"
                                        />
                                        <circle
                                            className="text-primary"
                                            strokeWidth="8"
                                            strokeDasharray={`${riskScore || 0} ${100 - (riskScore || 0)}`}
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="40"
                                            cx="50"
                                            cy="50"
                                        />
                                    </svg>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                        <span className="text-3xl font-bold text-white">{riskScore || '--'}</span>
                                        <span className="block text-xs text-slate-400">RISK SCORE</span>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-400 text-center">
                                    {riskScore && riskScore > 70
                                        ? 'Critical threat level detected'
                                        : riskScore && riskScore > 40
                                            ? 'Elevated threat monitoring'
                                            : 'Systems nominal'}
                                </p>
                                <button 
                                    onClick={() => navigate('/threats')}
                                    className="mt-4 text-sm text-primary hover:text-primary/80 flex items-center"
                                >
                                    View all threats <ArrowRightIcon className="ml-1 h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}