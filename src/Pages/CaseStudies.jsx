import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCaseStudies } from '../hooks/apiHooks';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function CaseStudies() {
    const { cases, loading } = useCaseStudies();
    const navigate = useNavigate();

    const handleCaseClick = (caseId) => {
        navigate(`/casestudies/${caseId}`);
    };

    return (
        <section className="max-w-6xl mx-auto p-8 space-y-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl text-teal-300 font-bold">Case Studies</h1>
                <p className="text-xl text-gray-400 mt-4">
                    Detailed analysis of our most complex investigations
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                </div>
            ) : (
                <div className="space-y-6">
                    {cases.map((c, i) => (
                        <motion.article
                            key={c.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleCaseClick(c.id)}
                            className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer transition-all hover:bg-gray-700/80"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl text-teal-200 font-semibold">{c.title}</h2>
                                    <p className="text-gray-300 mt-2">{c.description || c.short}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {c.tags?.map((tag, idx) => (
                                            <span key={idx} className="text-xs px-3 py-1 bg-gray-700 rounded-full text-gray-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <button className="text-teal-400 hover:text-teal-300 flex items-center">
                                    View case <ArrowRightIcon className="ml-1 h-4 w-4" />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>
            )}

            <div className="mt-12 text-center">
                <button 
                    onClick={() => navigate('/services')}
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-all flex items-center mx-auto"
                >
                    Our Investigation Services <ArrowRightIcon className="ml-2 h-5 w-5" />
                </button>
            </div>
        </section>
    );
}