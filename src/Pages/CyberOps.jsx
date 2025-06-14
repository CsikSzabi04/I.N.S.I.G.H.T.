import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    useThreatIntel,
    useCyberRiskScore,
    useNetworkStatus,
    useLiveDashboard,
    useSimulatedAttack
} from '../hooks/apiHooks';
import {
    ShieldCheckIcon,
    LockClosedIcon,
    CpuChipIcon,
    ArchiveBoxIcon,
    ArrowRightIcon,
    XMarkIcon,
    ArrowLeftIcon,
    ExclamationTriangleIcon,
    ChartBarIcon,
    WifiIcon,
    ServerIcon,
    FingerPrintIcon,
    CodeBracketIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    CommandLineIcon,
    BugAntIcon,
    PuzzlePieceIcon
} from '@heroicons/react/24/outline';
import ThreatTimeline from './ThreatTimeline';
import AttackSimulator from './AttackSimulator';
import NetworkMap from './NetworkMap';
import ThreatHeatmap from './ThreatHeatmap';
import SecurityScanner from './SecurityScanner';

// Constants
const STATUS_COLORS = {
    secure: 'green',
    monitoring: 'blue',
    analyzing: 'purple',
    warning: 'yellow',
    critical: 'red',
    offline: 'gray'
};

const THREAT_SEVERITY = {
    low: 'green',
    medium: 'yellow',
    high: 'orange',
    critical: 'red'
};

// Enhanced Spinner Component
const Spinner = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: 'h-8 w-8 border-2',
        md: 'h-12 w-12 border-t-2 border-b-2',
        lg: 'h-16 w-16 border-t-4 border-b-4'
    };

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <div
                className={`animate-spin rounded-full border-primary ${sizes[size]}`}
                role="status"
                aria-label="Loading"
            />
        </div>
    );
};

// Threat Card Component with more details
const ThreatCard = React.memo(({ threat, onClick, isSelected }) => {
    const severity = threat.severity?.toLowerCase() || 'medium';
    const borderColor = THREAT_SEVERITY[severity] || 'yellow';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => onClick(threat.id)}
            className={`p-5 rounded-lg border-l-4 bg-gradient-to-r from-gray-800 to-gray-900 cursor-pointer shadow-lg 
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        border-${borderColor}-500 hover:from-gray-700 hover:to-gray-800`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick(threat.id)}
            aria-label={`View details for threat ${threat.name}`}
            style={{
                overflow: 'hidden',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none' // IE 10+
            }}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg text-white truncate">
                        {threat.name || 'Unknown threat'}
                        {threat.isNew && (
                            <span className="ml-2 px-2 py-0.5 bg-red-500 text-xs rounded-full animate-pulse">
                                NEW
                            </span>
                        )}
                    </h4>
                    <div className="flex items-center mt-1 space-x-2">
                        <span className={`text-xs px-2 py-1 bg-${borderColor}-900/70 rounded-full text-${borderColor}-300 font-semibold uppercase`}>
                            {threat.type || 'malware'}
                        </span>
                        <span className="text-xs text-gray-400">
                            {new Date(threat.timestamp).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                <ExclamationTriangleIcon className={`h-5 w-5 text-${borderColor}-500`} />
            </div>

            <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {threat.description || 'New threat detected in the wild'}
            </p>

            <div className="mt-3 flex justify-between items-center" >
                <div className="flex space-x-2 p-5" style={{
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none' // IE 10+
                }}>
                    {threat.tags?.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-gray-700 rounded-full text-gray-300">
                            {tag}
                        </span>
                    ))}
                </div>
                <button className="text-xs text-blue-400 font-semibold flex items-center gap-1 hover:text-blue-300">
                    Details <ArrowRightIcon className="h-3 w-3" />
                </button>
            </div>
        </motion.div>
    );
});

// System Status Card
const SystemCard = ({ system, onClick, isActive }) => {
    const Icon = system.icon;
    const statusColor = STATUS_COLORS[system.status] || 'gray';

    return (
        <motion.button
            type="button"
            onClick={() => onClick(system.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-start gap-3 p-4 rounded-lg transition-all
        ${isActive ? 'bg-blue-900/20 border-blue-500' : 'bg-gray-800 hover:bg-gray-700 border-gray-700'}
        border shadow-md`}
            aria-pressed={isActive}
        >
            <div className={`p-2 rounded-lg bg-${statusColor}-900/30 text-${statusColor}-500`}>
                <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-left text-white">{system.name}</h3>
                <div className="flex items-center mt-1">
                    <span className={`h-2 w-2 rounded-full bg-${statusColor}-500 mr-2`} />
                    <span className="text-xs capitalize text-gray-400">{system.status}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-left line-clamp-2">
                    {system.description}
                </p>
            </div>
        </motion.button>
    );
};

// Main Component
const CyberOps = () => {
    // State management
    const [view, setView] = useState('dashboard');
    const [selectedThreat, setSelectedThreat] = useState(null);
    const [selectedSystem, setSelectedSystem] = useState(null);
    const [activeTab, setActiveTab] = useState('threats');
    const [searchQuery, setSearchQuery] = useState('');
    const [timeRange, setTimeRange] = useState('24h');
    const [autoRefresh, setAutoRefresh] = useState(true);

    // API hooks
    const { data: threats, loading: threatsLoading, error: threatsError } = useThreatIntel();
    const { score: riskScore, loading: riskLoading } = useCyberRiskScore('insight-hq');
    const { status: networkStatus } = useNetworkStatus();
    const { fbi, intel, jokes, cyberScore } = useLiveDashboard();
    const [simulationResult, setSimulationResult] = useState(null);

    // Filtered threats
    const filteredThreats = useMemo(() => {
        if (!threats) return [];
        return threats
            .filter(threat =>
                threat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                threat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                threat.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLower()))
            )
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }, [threats, searchQuery]);

    // Enhanced systems data
    const systems = useMemo(() => [
        {
            id: 'firewall',
            name: 'Network Firewall',
            status: networkStatus?.firewall || 'secure',
            icon: LockClosedIcon,
            description: 'Perimeter defense system filtering all inbound/outbound traffic',
            stats: {
                blocked: networkStatus?.firewallBlocked || 1242,
                alerts: networkStatus?.firewallAlerts || 18
            }
        },
        {
            id: 'ids',
            name: 'Intrusion Detection',
            status: networkStatus?.ids || 'monitoring',
            icon: ShieldCheckIcon,
            description: 'Real-time monitoring for suspicious activities and patterns',
            stats: {
                incidents: networkStatus?.idsIncidents || 42,
                severity: networkStatus?.idsSeverity || 'medium'
            }
        },
        {
            id: 'siem',
            name: 'SIEM Analytics',
            status: networkStatus?.siem || 'analyzing',
            icon: CpuChipIcon,
            description: 'Security information and event management correlation engine',
            stats: {
                events: networkStatus?.siemEvents || '1.2M',
                correlations: networkStatus?.siemCorrelations || 256
            }
        },
        {
            id: 'backup',
            name: 'Data Integrity',
            status: networkStatus?.backup || 'verified',
            icon: ArchiveBoxIcon,
            description: 'Automated backup verification and restoration systems',
            stats: {
                lastBackup: networkStatus?.lastBackup || '2 hours ago',
                integrity: networkStatus?.backupIntegrity || '99.98%'
            }
        },
        {
            id: 'endpoint',
            name: 'Endpoint Protection',
            status: networkStatus?.endpoint || 'secure',
            icon: FingerPrintIcon,
            description: 'Advanced protection for all connected devices and workstations',
            stats: {
                protected: networkStatus?.endpointsProtected || '98%',
                threats: networkStatus?.endpointThreats || 7
            }
        },
        {
            id: 'network',
            name: 'Network Health',
            status: networkStatus?.health || 'monitoring',
            icon: WifiIcon,
            description: 'Overall network performance and connectivity monitoring',
            stats: {
                uptime: networkStatus?.uptime || '99.99%',
                latency: networkStatus?.latency || '23ms'
            }
        }
    ], [networkStatus]);

    // Handlers
    const handleThreatSelect = useCallback((id) => {
        const threat = threats.find(t => t.id === id);
        setSelectedThreat(threat);
        setView('threatDetail');
    }, [threats]);

    const handleSystemSelect = useCallback((id) => {
        const system = systems.find(s => s.id === id);
        setSelectedSystem(system);
        setView('systemDetail');
    }, [systems]);

    const runSimulation = useCallback(async (type) => {
        setView('simulation');
        const result = await useSimulatedAttack('insight-network', type);
        setSimulationResult(result);
    }, []);

    // Auto-refresh effect
    useEffect(() => {
        if (!autoRefresh) return;

        const interval = setInterval(() => {
            // In a real app, we would trigger data refetch here
            console.log('Auto-refreshing data...');
        }, 30000); // 30 seconds

        return () => clearInterval(interval);
    }, [autoRefresh]);

    // View components
    const renderDashboard = () => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main threat feed */}
            <div className="lg:col-span-2 space-y-6" style={{
                overflow: 'hidden',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none' // IE 10+
            }}>
                <div className="bg-gray-800 rounded-xl shadow-xl p-6" style={{
                    overflow: 'hidden',
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none' // IE 10+
                }}>
                    <div className="flex justify-between items-center mb-6" style={{
                        overflow: 'hidden',
                        scrollbarWidth: 'none', // Firefox
                        msOverflowStyle: 'none' // IE 10+
                    }}>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
                            Active Threats
                        </h2>
                        <div className="flex items-center gap-4">
                            <select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                className="bg-gray-700 text-sm rounded-md px-3 py-1"
                            >
                                <option value="1h">Last hour</option>
                                <option value="24h">Last 24h</option>
                                <option value="7d">Last 7 days</option>
                                <option value="30d">Last 30 days</option>
                            </select>
                            <button
                                onClick={() => setAutoRefresh(!autoRefresh)}
                                className={`text-xs px-3 py-1 rounded-md ${autoRefresh ? 'bg-blue-900' : 'bg-gray-700'}`}
                            >
                                {autoRefresh ? 'Auto: ON' : 'Auto: OFF'}
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search threats..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {threatsLoading ? (
                        <div className="mt-8">
                            <Spinner />
                        </div>
                    ) : threatsError ? (
                        <div className="mt-8 p-4 bg-red-900/30 rounded-md text-red-400">
                            Failed to load threat data. Please try again later.
                        </div>
                    ) : (
                        <div className="mt-6 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar p-5" style={{

                            scrollbarWidth: 'none', // Firefox
                            msOverflowStyle: 'none' // IE 10+
                        }}>
                            {filteredThreats.length > 0 ? (
                                filteredThreats.map(threat => (
                                    <ThreatCard
                                        key={threat.id}
                                        threat={threat}
                                        onClick={handleThreatSelect}
                                        isSelected={selectedThreat?.id === threat.id}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No threats match your search criteria.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="bg-gray-800 rounded-xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <ChartBarIcon className="h-6 w-6 text-blue-500" />
                        Threat Analytics
                    </h2>
                    <ThreatTimeline threats={filteredThreats} timeRange={timeRange} />
                    <ThreatHeatmap threats={filteredThreats} />
                </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                {/* Risk assessment */}
                <div className="bg-gray-800 rounded-xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <CommandLineIcon className="h-6 w-6 text-purple-500" />
                        Risk Assessment
                    </h2>

                    {riskLoading ? (
                        <Spinner size="sm" className="my-8" />
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="relative w-40 h-40 mb-4">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle
                                        className="text-gray-700"
                                        strokeWidth="8"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="40"
                                        cx="50"
                                        cy="50"
                                    />
                                    <circle
                                        className="text-blue-500"
                                        strokeWidth="8"
                                        strokeDasharray="251.2"
                                        strokeDashoffset={251.2 - (251.2 * (riskScore / 100))}
                                        strokeLinecap="round"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="40"
                                        cx="50"
                                        cy="50"
                                        transform="rotate(-90 50 50)"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold">{riskScore}</span>
                                    <span className="text-xs text-gray-400 uppercase tracking-widest">Risk Score</span>
                                </div>
                            </div>

                            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                                <div
                                    className={`h-2.5 rounded-full ${riskScore > 75 ? 'bg-red-500' :
                                        riskScore > 50 ? 'bg-orange-500' :
                                            riskScore > 25 ? 'bg-yellow-500' : 'bg-green-500'
                                        }`}
                                    style={{ width: `${riskScore}%` }}
                                />
                            </div>

                            <p className="text-center text-sm text-gray-400 mb-4">
                                {riskScore > 75 ? 'Critical risk level' :
                                    riskScore > 50 ? 'High risk detected' :
                                        riskScore > 25 ? 'Moderate risk' : 'Low risk environment'}
                            </p>

                            <button
                                onClick={() => runSimulation('full')}
                                className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors"
                            >
                                Run Security Audit
                            </button>
                        </div>
                    )}
                </div>

                {/* Systems status */}
                <div className="bg-gray-800 rounded-xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <ServerIcon className="h-6 w-6 text-green-500" />
                        System Status
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                        {systems.map(system => (
                            <SystemCard
                                key={system.id}
                                system={system}
                                onClick={handleSystemSelect}
                                isActive={selectedSystem?.id === system.id}
                            />
                        ))}
                    </div>
                </div>

                {/* Quick actions */}
                <div className="bg-gray-800 rounded-xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <PuzzlePieceIcon className="h-6 w-6 text-yellow-500" />
                        Quick Actions
                    </h2>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => runSimulation('phishing')}
                            className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex flex-col items-center text-sm"
                        >
                            <BugAntIcon className="h-5 w-5 mb-1 text-red-500" />
                            Phishing Test
                        </button>
                        <button
                            onClick={() => runSimulation('ddos')}
                            className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex flex-col items-center text-sm"
                        >
                            <CommandLineIcon className="h-5 w-5 mb-1 text-orange-500" />
                            DDoS Drill
                        </button>
                        <button
                            onClick={() => setView('scanner')}
                            className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex flex-col items-center text-sm"
                        >
                            <MagnifyingGlassIcon className="h-5 w-5 mb-1 text-blue-500" />
                            Vulnerability Scan
                        </button>
                        <button
                            onClick={() => setView('networkMap')}
                            className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex flex-col items-center text-sm"
                        >
                            <WifiIcon className="h-5 w-5 mb-1 text-green-500" />
                            Network Map
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderThreatDetail = () => (
        <div className="bg-gray-800 rounded-xl shadow-xl p-6">
            <button
                onClick={() => setView('dashboard')}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
            >
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Dashboard
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold">{selectedThreat.name}</h1>
                            <div className="flex items-center mt-2 gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase bg-${THREAT_SEVERITY[selectedThreat.severity?.toLowerCase() || 'medium']}-900/50 text-${THREAT_SEVERITY[selectedThreat.severity?.toLowerCase() || 'medium']}-300`}>
                                    {selectedThreat.severity || 'MEDIUM'}
                                </span>
                                <span className="text-gray-400 text-sm">
                                    Detected: {new Date(selectedThreat.timestamp).toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase bg-gray-700 text-gray-300`}>
                            {selectedThreat.type || 'THREAT'}
                        </span>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg text-gray-300 mb-6">
                            {selectedThreat.description}
                        </p>

                        <h3 className="text-xl font-semibold text-white mb-3">Technical Details</h3>
                        <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                            <pre className="text-sm text-gray-300 overflow-x-auto">
                                {JSON.stringify(selectedThreat.technicalDetails || 'No technical details available', null, 2)}
                            </pre>
                        </div>

                        <h3 className="text-xl font-semibold text-white mb-3">Indicators of Compromise (IOCs)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {selectedThreat.iocs?.map((ioc, index) => (
                                <div key={index} className="bg-gray-700/30 rounded-lg p-3">
                                    <div className="text-sm font-mono text-blue-400 break-all">{ioc.value}</div>
                                    <div className="text-xs text-gray-400 mt-1">{ioc.type}</div>
                                </div>
                            )) || (
                                    <div className="text-gray-500">No IOCs available for this threat</div>
                                )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-700/30 rounded-xl p-5">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                            Recommended Actions
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {(selectedThreat.remediation || ['Isolate affected systems', 'Update security signatures', 'Monitor network traffic']).map((action, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-blue-500">•</span>
                                    <span>{action}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gray-700/30 rounded-xl p-5">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <ChartBarIcon className="h-5 w-5 text-blue-500" />
                            Threat Metrics
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-400">Confidence</span>
                                    <span className="font-medium">{selectedThreat.confidence || '85'}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1.5">
                                    <div
                                        className="bg-green-500 h-1.5 rounded-full"
                                        style={{ width: `${selectedThreat.confidence || 85}%` }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-400">Impact</span>
                                    <span className="font-medium">{selectedThreat.impact || 'High'}</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1.5">
                                    <div
                                        className="bg-red-500 h-1.5 rounded-full"
                                        style={{ width: `${selectedThreat.impact === 'High' ? 90 : selectedThreat.impact === 'Medium' ? 60 : 30}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-700/30 rounded-xl p-5">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <ClockIcon className="h-5 w-5 text-yellow-500" />
                            Timeline
                        </h3>
                        <div className="space-y-4">
                            {(selectedThreat.timeline || [
                                { time: '2023-06-15T10:30:00', event: 'First detection' },
                                { time: '2023-06-15T11:15:00', event: 'Analysis started' },
                                { time: '2023-06-15T14:20:00', event: 'Remediation deployed' }
                            ]).map((item, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-500' : 'bg-blue-500'}`} />
                                        {i < selectedThreat.timeline?.length - 1 && (
                                            <div className="w-px h-6 bg-gray-600" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400">
                                            {new Date(item.time).toLocaleString()}
                                        </div>
                                        <div className="text-sm">{item.event}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSystemDetail = () => (
        <div className="bg-gray-800 rounded-xl shadow-xl p-6">
            <button
                onClick={() => setView('dashboard')}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
            >
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Dashboard
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="flex items-start gap-4 mb-6">
                        <div className={`p-3 rounded-lg bg-${STATUS_COLORS[selectedSystem.status]}-900/20 text-${STATUS_COLORS[selectedSystem.status]}-500`}>
                            <selectedSystem.icon className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{selectedSystem.name}</h1>
                            <div className="flex items-center mt-2 gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase bg-${STATUS_COLORS[selectedSystem.status]}-900/50 text-${STATUS_COLORS[selectedSystem.status]}-300`}>
                                    {selectedSystem.status.toUpperCase()}
                                </span>
                                <span className="text-gray-400 text-sm">
                                    Last updated: {new Date().toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg text-gray-300 mb-6">
                            {selectedSystem.description}
                        </p>

                        <h3 className="text-xl font-semibold text-white mb-3">System Overview</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {Object.entries(selectedSystem.stats || {}).map(([key, value]) => (
                                <div key={key} className="bg-gray-700/30 rounded-lg p-4">
                                    <div className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                                    <div className="text-xl font-semibold">{value}</div>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-xl font-semibold text-white mb-3">Recent Activity</h3>
                        <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
                            <div className="space-y-4">
                                {[
                                    { time: '10:42 AM', event: 'Completed routine security scan', status: 'success' },
                                    { time: '09:15 AM', event: 'Blocked 3 intrusion attempts', status: 'warning' },
                                    { time: '07:30 AM', event: 'Applied latest security patches', status: 'success' },
                                    { time: 'Yesterday', event: 'Detected unusual traffic pattern', status: 'critical' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-2 h-2 rounded-full ${item.status === 'success' ? 'bg-green-500' :
                                                item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                                                }`} />
                                            {i < 3 && <div className="w-px h-6 bg-gray-600" />}
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400">{item.time}</div>
                                            <div className="text-sm">{item.event}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-700/30 rounded-xl p-5">
                        <h3 className="font-bold text-lg mb-3">System Controls</h3>
                        <div className="space-y-3">
                            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors">
                                Run Diagnostics
                            </button>
                            <button className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors">
                                View Logs
                            </button>
                            <button className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors">
                                Configuration
                            </button>
                            {selectedSystem.status !== 'secure' && (
                                <button className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors">
                                    Initiate Recovery
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-700/30 rounded-xl p-5">
                        <h3 className="font-bold text-lg mb-3">Resource Usage</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-400">CPU</span>
                                    <span className="font-medium">62%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1.5">
                                    <div
                                        className="bg-purple-500 h-1.5 rounded-full"
                                        style={{ width: '62%' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-400">Memory</span>
                                    <span className="font-medium">45%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1.5">
                                    <div
                                        className="bg-blue-500 h-1.5 rounded-full"
                                        style={{ width: '45%' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-400">Storage</span>
                                    <span className="font-medium">78%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1.5">
                                    <div
                                        className="bg-green-500 h-1.5 rounded-full"
                                        style={{ width: '78%' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-700/30 rounded-xl p-5">
                        <h3 className="font-bold text-lg mb-3">Connected Systems</h3>
                        <div className="space-y-3">
                            {systems
                                .filter(s => s.id !== selectedSystem.id)
                                .slice(0, 3)
                                .map(system => (
                                    <div key={system.id} className="flex items-center gap-3 p-2 hover:bg-gray-600/30 rounded-md cursor-pointer">
                                        <div className={`p-2 rounded-md bg-${STATUS_COLORS[system.status]}-900/20 text-${STATUS_COLORS[system.status]}-500`}>
                                            <system.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium">{system.name}</div>
                                            <div className="text-xs text-gray-400 capitalize">{system.status}</div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSimulation = () => (
        <div className="bg-gray-800 rounded-xl shadow-xl p-6">
            <button
                onClick={() => setView('dashboard')}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
            >
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Dashboard
            </button>

            <AttackSimulator
                result={simulationResult}
                onRunSimulation={runSimulation}
            />
        </div>
    );

    const renderNetworkMap = () => (
        <div className="bg-gray-800 rounded-xl shadow-xl p-6">
            <button
                onClick={() => setView('dashboard')}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
            >
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Dashboard
            </button>

            <NetworkMap systems={systems} />
        </div>
    );

    const renderScanner = () => (
        <div className="bg-gray-800 rounded-xl shadow-xl p-6">
            <button
                onClick={() => setView('dashboard')}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
            >
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Dashboard
            </button>

            <SecurityScanner />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="max-w-9xl mx-auto mb-8">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                    Cyber Operations Center
                </h1>
                <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
                    Real-time network defense and threat intelligence dashboard
                </p>
            </header>

            {/* Main content */}
            <div className="max-w-9xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={view}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {view === 'dashboard' && renderDashboard()}
                        {view === 'threatDetail' && renderThreatDetail()}
                        {view === 'systemDetail' && renderSystemDetail()}
                        {view === 'simulation' && renderSimulation()}
                        {view === 'networkMap' && renderNetworkMap()}
                        {view === 'scanner' && renderScanner()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CyberOps;