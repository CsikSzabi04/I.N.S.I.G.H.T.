import React from 'react';
import { motion } from 'framer-motion';
import { useCaseStudies } from '../hooks/apiHooks';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function CaseStudies({ showAll = false }) {
    const { cases, loading } = useCaseStudies();
    const navigate = useNavigate();

    const handleCaseStudyClick = (caseId) => {
        navigate(`/casestudies/${caseId}`);
    };

    const handleViewAllCases = () => {
        if (showAll) {
            navigate('/casestudies'); // Go back to main case studies page
        } else {
            navigate('/casestudies/all'); // View all cases
        }
    };

    // Determine which cases to display based on showAll prop
    const displayedCases = showAll ? cases : cases.slice(0, 3);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold mb-4 tracking-tight text-white">
                        {showAll ? 'All ' : 'Recent '}
                        <span className="text-teal-400">Case</span> Studies
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        {showAll 
                            ? 'Complete archive of our investigations and security operations.' 
                            : 'Detailed analysis of our most complex investigations'
                        }
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {displayedCases.map((caseItem, index) => (
                                <motion.div
                                    key={caseItem.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
                                >
                                    <div className="h-64 relative overflow-hidden">
                                        <img
                                            src={caseItem.image || 'https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
                                            alt={caseItem.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent"></div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-semibold text-white">{caseItem.title}</h3>
                                            <span className={`text-xs px-3 py-1 rounded-full font-medium tracking-wide ${
                                                caseItem.status === 'Closed'
                                                    ? 'bg-green-900/50 text-green-300'
                                                    : caseItem.status === 'Active'
                                                        ? 'bg-blue-900/50 text-blue-300'
                                                        : 'bg-gray-700 text-gray-300'
                                            }`}>
                                                {caseItem.status || 'Active'}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 mb-6 line-clamp-3">
                                            {caseItem.description || 'No description available for this case study.'}
                                        </p>
                                        <div className="flex flex-wrap gap-3 mb-6">
                                            {caseItem.tags?.slice(0, 3).map((tag, i) => (
                                                <span key={i} className="text-xs px-3 py-1 bg-gray-700 rounded-full text-gray-300 font-medium tracking-wide">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => handleCaseStudyClick(caseItem.id)}
                                            className="text-teal-400 hover:text-teal-300 font-medium inline-flex items-center"
                                        >
                                            Read Case Study
                                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {!showAll && cases.length > 3 && (
                            <div className="mt-16 text-center">
                                <button
                                    onClick={handleViewAllCases}
                                    className="px-8 py-3 border-2 border-gray-700 text-white hover:bg-gray-800/50 rounded-lg font-semibold transition-all duration-300 inline-flex items-center"
                                >
                                    View All Case Studies
                                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                                </button>
                            </div>
                        )}

                        {showAll && (
                            <div className="mt-16 text-center">
                                <button
                                    onClick={handleViewAllCases}
                                    className="px-8 py-3 border-2 border-gray-700 text-white hover:bg-gray-800/50 rounded-lg font-semibold transition-all duration-300 inline-flex items-center"
                                >
                                    Back to Featured Cases
                                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}