import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function CaseStudyDetail() {
    const { caseId } = useParams();
    const navigate = useNavigate();
    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCaseData = async () => {
            try {
                setLoading(true);
                // Replace this with your actual API call
                const response = await fetch(`/api/cases/${caseId}`);
                if (!response.ok) {
                    throw new Error('Case study not found');
                }
                const data = await response.json();
                setCaseData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCaseData();
    }, [caseId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-red-400 mb-4">Error</h2>
                    <p className="text-xl text-gray-300">{error}</p>
                    <button
                        onClick={() => navigate('/casestudies')}
                        className="mt-8 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-all"
                    >
                        Back to Case Studies
                    </button>
                </div>
            </section>
        );
    }

    if (!caseData) {
        return null;
    }

    return (
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 min-h-screen"
        >
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-teal-400 hover:text-teal-300 mb-8"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Cases
                </button>

                <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="relative h-96 w-full">
                        <img
                            src={caseData.image || 'https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
                            alt={caseData.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8">
                            <div className="flex items-center mb-4">
                                <span className={`text-sm px-3 py-1 rounded-full font-medium tracking-wide ${
                                    caseData.status === 'Closed'
                                        ? 'bg-green-900/50 text-green-300'
                                        : caseData.status === 'Active'
                                            ? 'bg-blue-900/50 text-blue-300'
                                            : 'bg-gray-700 text-gray-300'
                                }`}>
                                    {caseData.status || 'Active'}
                                </span>
                                <span className="ml-4 text-gray-400 text-sm">
                                    {new Date(caseData.date || Date.now()).toLocaleDateString()}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-white">{caseData.title}</h1>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="flex flex-wrap gap-3 mb-8">
                            {caseData.tags?.map((tag, i) => (
                                <span key={i} className="text-sm px-3 py-1 bg-gray-700 rounded-full text-gray-300 font-medium tracking-wide">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <p className="text-xl text-gray-300 mb-8">
                                {caseData.summary || caseData.description}
                            </p>

                            {caseData.sections?.map((section, index) => (
                                <div key={index} className="mb-12">
                                    <h2 className="text-2xl font-bold text-teal-400 mb-4">
                                        {section.title}
                                    </h2>
                                    <p className="text-gray-300 mb-6">
                                        {section.content}
                                    </p>
                                    {section.image && (
                                        <img
                                            src={section.image}
                                            alt={section.title}
                                            className="rounded-lg shadow-lg mb-6"
                                        />
                                    )}
                                </div>
                            ))}

                            {!caseData.sections && (
                                <div className="space-y-6 text-gray-300">
                                    <p>{caseData.details || caseData.description}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-6">Case Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400 mb-2">INVESTIGATION TYPE</h4>
                                    <p className="text-gray-300">{caseData.type || 'Not specified'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400 mb-2">DATE OPENED</h4>
                                    <p className="text-gray-300">
                                        {new Date(caseData.dateOpened || Date.now()).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400 mb-2">CASE NUMBER</h4>
                                    <p className="text-gray-300">{caseData.caseNumber || 'N/A'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400 mb-2">LEAD INVESTIGATOR</h4>
                                    <p className="text-gray-300">{caseData.investigator || 'Not specified'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}