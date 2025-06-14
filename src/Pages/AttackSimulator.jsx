import React, { useState } from 'react';
import { 
  ArrowPathIcon,
  BoltIcon,
  ShieldExclamationIcon,
  CloudArrowUpIcon,
  ServerStackIcon
} from '@heroicons/react/24/outline';

const simulationTypes = [
  {
    id: 'phishing',
    name: 'Phishing Campaign',
    icon: ShieldExclamationIcon,
    description: 'Simulate email phishing attempts to test user awareness',
    duration: '2-5 minutes',
    impact: 'Low'
  },
  {
    id: 'ddos',
    name: 'DDoS Attack',
    icon: BoltIcon,
    description: 'Test network resilience against volumetric attacks',
    duration: '3-7 minutes',
    impact: 'Medium'
  },
  {
    id: 'ransomware',
    name: 'Ransomware',
    icon: CloudArrowUpIcon,
    description: 'Simulate file encryption and exfiltration',
    duration: '5-10 minutes',
    impact: 'High'
  },
  {
    id: 'insider',
    name: 'Insider Threat',
    icon: ServerStackIcon,
    description: 'Test detection of unauthorized internal access',
    duration: '10-15 minutes',
    impact: 'High'
  }
];

export default function AttackSimulator({ result, onRunSimulation }) {
  const [running, setRunning] = useState(false);
  const [selectedSimulation, setSelectedSimulation] = useState(null);

  const handleRunSimulation = async (type) => {
    setRunning(true);
    setSelectedSimulation(type);
    await onRunSimulation(type);
    setRunning(false);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {simulationTypes.map((sim) => (
          <div 
            key={sim.id}
            className={`p-4 rounded-lg border ${selectedSimulation === sim.id ? 'border-blue-500 bg-blue-900/10' : 'border-gray-700 hover:border-gray-600'} transition-colors`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-md ${selectedSimulation === sim.id ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}>
                <sim.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{sim.name}</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">{sim.description}</p>
            <div className="flex justify-between text-xs text-gray-500 mb-3">
              <span>Duration: {sim.duration}</span>
              <span>Impact: {sim.impact}</span>
            </div>
            <button
              onClick={() => handleRunSimulation(sim.id)}
              disabled={running}
              className={`w-full py-2 px-3 rounded-md text-sm font-medium flex items-center justify-center gap-2 ${
                running && selectedSimulation === sim.id 
                  ? 'bg-blue-600 cursor-wait' 
                  : selectedSimulation === sim.id 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-700 hover:bg-gray-600'
              } transition-colors`}
            >
              {running && selectedSimulation === sim.id ? (
                <>
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                'Run Simulation'
              )}
            </button>
          </div>
        ))}
      </div>

      {result && (
        <div className="bg-gray-700/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ShieldExclamationIcon className="h-5 w-5 text-yellow-500" />
            Simulation Results: {simulationTypes.find(s => s.id === selectedSimulation)?.name}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-sm text-gray-400 mb-2">Vulnerabilities Found</h4>
              <p className="text-2xl font-bold">{result.vulnerabilities || 3}</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-sm text-gray-400 mb-2">Detection Time</h4>
              <p className="text-2xl font-bold">{result.detectionTime || '2m 45s'}</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-sm text-gray-400 mb-2">Security Score</h4>
              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${result.securityScore || 72}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{result.securityScore || 72}/100</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Recommendations</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {(result.recommendations || [
                'Update firewall rules to block detected attack patterns',
                'Implement additional email filtering for phishing attempts',
                'Conduct employee security awareness training'
              ]).map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}