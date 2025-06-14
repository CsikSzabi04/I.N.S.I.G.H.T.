import React from 'react';
import { motion } from 'framer-motion';
import { useLiveDashboard } from '../hooks/apiHooks';
import { useNavigate, Link } from 'react-router-dom';
import {
    ArrowRightIcon,
    ChartBarIcon,
    ShieldExclamationIcon,
    UserGroupIcon,
    FingerPrintIcon,
    CodeBracketIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function Home() {
    const { fbi, intel, jokes, cyberScore } = useLiveDashboard();
    const navigate = useNavigate();

    // Button click handlers
    const handleConsultationClick = () => {

    };

    const handleCapabilitiesClick = () => {
        navigate('/services');
    };

    const handleMethodologyClick = () => {
        // This would trigger a download in a real app
        console.log('Downloading methodology whitepaper');
        // For demo purposes, we'll navigate to a page
        navigate('/techlab');
    };

    const handleCaseStudyClick = (caseId) => {
        navigate(`/casestudies/${caseId}`);
    };

    const handleViewAllCases = () => {
        navigate('/casestudies');
    };

    const handleLearnMore = (service) => {
        navigate('/services', { state: { focus: service.toLowerCase().replace(' ', '-') } });
    };

    const handleScheduleConsultation = () => {
        navigate('/contact', { state: { formType: 'scheduled' } });
    };

    const handleEmergencyContact = () => {
        navigate('/contact', { state: { formType: 'emergency' } });
    };

    const stats = [
        { name: 'Cases Solved', value: '2', icon: ChartBarIcon, description: 'Successful investigations completed' },
        { name: 'Active Threats', value: intel.length, icon: ShieldExclamationIcon, description: 'Currently monitored threats' },
        { name: 'Profiled Subjects', value: '2', icon: UserGroupIcon, description: 'Individuals in our database' },
        { name: 'Patents Held', value: '1', icon: FingerPrintIcon, description: 'Proprietary technologies developed' }
    ];

    const services = [
        {
            title: "Behavioral Analysis",
            icon: <MagnifyingGlassIcon className="h-8 w-8 text-blue-500" />,
            description: "Advanced psychological profiling to predict and prevent criminal behavior before it occurs."
        },
        {
            title: "Digital Forensics",
            icon: <CodeBracketIcon className="h-8 w-8 text-purple-500" />,
            description: "Comprehensive examination of digital devices and networks to uncover critical evidence."
        },
        {
            title: "Threat Intelligence",
            icon: <ShieldExclamationIcon className="h-8 w-8 text-red-500" />,
            description: "Real-time monitoring and analysis of emerging security threats worldwide."
        }
    ];

    return (
        <div className="bg-gray-900 text-white w-full overflow-x-hidden ">
            {/* Hero Section */}
            <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.stockcake.com/public/d/2/1/d2100fa9-77af-42ff-91ba-4a67ff69de27_large/magnifying-fingerprints-investigation-stockcake.jpg')] bg-cover bg-center opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-900/90"></div>
                </div>

                <div className="relative z-10 px-4 sm:px-6 lg:px-8 text-center max-w-7xl w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 border border-gray-700 mb-6">
                            <span className="h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                            <span className="text-sm font-medium">SECURE CHANNEL ACTIVE</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r  from-slate-400 to-gray-600">
                                I.N.S.I.G.H.T.
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-4xl mx-auto">
                            Integrated Network for Surveillance, Investigation, Grid Hacking & Thought‑mapping               </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-5">
                            <Link to="https://moonlit-sable-2990e8.netlify.app/" target='_blank'>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleConsultationClick}
                                    className="px-8 py-4  bg-gradient-to-r  from-slate-600 to-gray-700 hover:from-gray-700 hover:to-slate-800 rounded-lg font-semibold shadow-lg transition-all duration-300 flex items-center"
                                >
                                    Open Your Folders
                                    <ArrowRightIcon className="ml-3 h-5 w-5" />
                                </motion.button></Link>


                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleCapabilitiesClick}
                                className="px-8 py-4 border-2 border-gray-600 text-white hover:bg-gray-800/50 rounded-lg font-semibold transition-all duration-300"
                            >
                                Explore Our Capabilities
                            </motion.button>
                        </div>

                    </motion.div>
                </div>
            </section>

            {/* Trust Badges */}
            <div className="relative z-20 -mt-20 mb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
                        <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={stat.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.15 }}
                                        className="text-center"
                                    >
                                        <div className="flex justify-center mb-4">
                                            <div className="p-3 bg-gray-700 rounded-full">
                                                <Icon className="h-8 w-8 text-blue-400" />
                                            </div>
                                        </div>
                                        <p className="text-4xl font-extrabold mb-2">{stat.value}</p>
                                        <p className="text-lg font-medium text-gray-300">{stat.name}</p>
                                        <p className="mt-2 text-sm text-gray-400">{stat.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Services */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
                            Our <span className="text-blue-400">Core</span> Services
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Comprehensive security solutions tailored to your organization's specific needs and threat profile.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 shadow-lg"
                            >
                                <div className="mb-6">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-gray-400 mb-6">{service.description}</p>
                                <button
                                    onClick={() => handleLearnMore(service.title)}
                                    className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center"
                                >
                                    Learn more
                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Methodology Section */}
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                {/* Rotated & Faded Background Image */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div
                        className="absolute right-0 top-0 w-2/3 h-full transform rotate-2 opacity-20"
                        style={{
                            backgroundImage: `url('https://images.stockcake.com/public/6/6/d/66d312c7-167e-4a8b-8deb-dabb9c6f8933_large/visual-data-processing-stockcake.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                </div>

                {/* Section Content */}
                <div className="relative max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Methodology Overview */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl font-bold mb-6 tracking-tight text-white">
                                Our <span className="text-blue-400">Methodology</span>
                            </h2>
                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                The I.N.S.I.G.H.T. framework combines multiple disciplines to create a comprehensive security approach:
                            </p>

                            <div className="space-y-6">
                                {[
                                    {
                                        title: "Behavioral Pattern Recognition",
                                        description: "Advanced algorithms identify subtle behavioral cues that indicate potential threats"
                                    },
                                    {
                                        title: "Digital Footprint Analysis",
                                        description: "Comprehensive mapping of online activities across surface, deep and dark web"
                                    },
                                    {
                                        title: "Network Infiltration Techniques",
                                        description: "Controlled penetration of systems to identify vulnerabilities before attackers do"
                                    },
                                    {
                                        title: "Legal Strategy Integration",
                                        description: "All investigations are conducted with admissible evidence collection in mind"
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="mt-1 flex-shrink-0">
                                            <div className="h-3 w-3 bg-blue-500 rounded-full shadow"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                                            <p className="text-gray-400">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleMethodologyClick}
                                className="mt-10 inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-600 to-gray-700 hover:from-gray-700 hover:to-slate-800 text-white rounded-lg font-semibold transition shadow-lg"
                            >
                                Download Methodology Whitepaper
                                <ArrowRightIcon className="ml-3 h-5 w-5" />
                            </button>
                        </motion.div>

                        {/* Threat Brief Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-white">Current Threat Brief</h3>
                            <div className="space-y-4">
                                {intel.slice(0, 3).map((threat, index) => (
                                    <div key={index} className="p-5 bg-gray-700/50 rounded-xl border border-gray-600 shadow-inner hover:border-blue-500 transition">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-semibold text-lg text-white">{threat.name || 'Unknown Threat'}</h4>
                                            <span
                                                className={`text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide ${threat.severity === 'critical'
                                                    ? 'bg-red-900/70 text-red-300'
                                                    : threat.severity === 'high'
                                                        ? 'bg-orange-900/70 text-orange-300'
                                                        : 'bg-yellow-900/70 text-yellow-300'
                                                    }`}
                                            >
                                                {threat.type || 'Malware'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-300 mt-3">{threat.description || 'New threat detected in wild'}</p>
                                        <div className="mt-3 flex justify-between items-center text-xs text-gray-400">
                                            <span>First detected: {threat.date || 'Unknown'}</span>
                                            <span>Confidence: {threat.confidence || '--'}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Global Threat Level */}
                            <div className="mt-8 p-6 bg-gray-700 rounded-xl border border-gray-600 shadow-inner">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-lg text-white">Global Threat Level</h4>
                                        <p className="text-sm text-gray-300 mt-1">
                                            {cyberScore && cyberScore > 70
                                                ? 'Elevated threat level - increased monitoring recommended'
                                                : cyberScore && cyberScore > 40
                                                    ? 'Moderate risk - standard protocols in effect'
                                                    : 'All systems secure - routine monitoring active'}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="relative w-20 h-20">
                                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                                <path
                                                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="#1E293B"
                                                    strokeWidth="3"
                                                    strokeDasharray={`${cyberScore || 0}, 100`}
                                                />
                                            </svg>
                                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                                <p className="text-2xl font-extrabold text-white">{cyberScore || '--'}</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-400 tracking-widest mt-1">GLOBAL RISK INDEX</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* Case Studies */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
                            Recent <span className="text-blue-400">Case</span> Studies
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Examples of our integrated approach to complex investigations and security challenges.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {fbi.slice(0, 3).map((caseItem, index) => (
                            <motion.div
                                key={caseItem.uid}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
                            >
                                <div className="h-64 relative overflow-hidden">
                                    <img
                                        src={caseItem.images[0]?.large || 'https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
                                        alt={caseItem.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent"></div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-semibold">{caseItem.title}</h3>
                                        <span className={`text-xs px-3 py-1 rounded-full font-medium tracking-wide ${caseItem.status === 'Closed'
                                            ? 'bg-green-900/50 text-green-300'
                                            : caseItem.status === 'Active'
                                                ? 'bg-blue-900/50 text-blue-300'
                                                : 'bg-gray-700 text-gray-300'
                                            }`}>
                                            {caseItem.status || 'Active'}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 mb-6 line-clamp-3">
                                        {caseItem.description || 'No description available for this case study. Please contact our team for more information.'}
                                    </p>
                                    <div className="flex flex-wrap gap-3 mb-6">
                                        {caseItem.subjects?.slice(0, 3).map((subject, i) => (
                                            <span key={i} className="text-xs px-3 py-1 bg-gray-700 rounded-full text-gray-300 font-medium tracking-wide">
                                                {subject}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => handleCaseStudyClick(caseItem.uid)}
                                        className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center"
                                    >
                                        Read Case Study
                                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <button
                            onClick={handleViewAllCases}
                            className="px-8 py-3 border-2 border-gray-700 text-white hover:bg-gray-800/50 rounded-lg font-semibold transition-all duration-300 inline-flex items-center"
                        >
                            View All Case Studies
                            <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </div>
            </section>


            {/* Testimonials */}
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-800 overflow-hidden">
                {/* Rotated Background Image */}
                <div className="absolute inset-0 w-full h-full" aria-hidden="true">
                    <div
                        className="absolute top-0 right-0 w-2/3 h-full transform rotate-1 opacity-20"
                        style={{
                            backgroundImage: `url('https://images.stockcake.com/public/8/5/8/8581e994-8d4e-4bab-8d82-07f40f947147_large/flow-of-relationships-stockcake.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                </div>

                {/* Content */}
                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                            Client <span className="text-blue-400">Testimonials</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            What our government and corporate partners say about our services.
                        </p>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                quote:
                                    "I.N.S.I.G.H.T.'s behavioral analysis helped us prevent a major security breach before it happened. Their predictive models are unmatched.",
                                author: "Sarah Johnson",
                                position: "Chief Security Officer, Fortune 500 Company",
                                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                                stars: 4,
                            },
                            {
                                quote:
                                    "The digital forensics team uncovered evidence that was critical to our investigation. Their attention to detail is exceptional.",
                                author: "Michael Chen",
                                position: "Federal Investigator",
                                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                                stars: 5,
                            },
                            {
                                quote:
                                    "Working with I.N.S.I.G.H.T. has transformed our approach to threat intelligence. Their insights have become invaluable to our operations.",
                                author: "David Rodriguez",
                                position: "Director of National Security",
                                avatar: "https://randomuser.me/api/portraits/men/75.jpg",
                                stars: 4,
                            },
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-gray-900/80 rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition"
                            >
                                <div className="mb-4 flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-6 h-6 ${i < testimonial.stars ? 'text-yellow-400' : 'text-gray-600'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <blockquote className="text-lg text-gray-300 mb-8">
                                    "{testimonial.quote}"
                                </blockquote>
                                <div className="flex items-center">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.author}
                                        className="w-12 h-12 rounded-full mr-4 object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-white">{testimonial.author}</p>
                                        <p className="text-sm text-gray-400">{testimonial.position}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}