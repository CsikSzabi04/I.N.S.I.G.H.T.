import React, { useState, useEffect } from 'react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const scanTypes = [
  {
    id: 'quick',
    name: 'Quick Scan',
    description: 'Fast scan of critical system components',
    duration: '1-2 minutes',
    coverage: '60%'
  },
  {
    id: 'full',
    name: 'Full Scan',
    description: 'Comprehensive system vulnerability assessment',
    duration: '5-10 minutes',
    coverage: '95%'
  },
  {
    id: 'custom',
    name: 'Custom Scan',
    description: 'Target specific systems or vulnerabilities',
    duration: 'Varies',
    coverage: 'Custom'
  }
];

const vulnerabilities = [
  {
    id: 'vuln-1',
    name: 'Outdated Firewall Rules',
    severity: 'high',
    system: 'Network Firewall',
    description: 'Firewall rules have not been updated in 90+ days, potentially allowing new attack vectors',
    remediation: 'Review and update firewall rules according to latest threat intelligence'
  },
  {
    id: 'vuln-2',
    name: 'Weak Password Policies',
    severity: 'medium',
    system: 'Active Directory',
    description: 'Password complexity requirements do not meet current security standards',
    remediation: 'Implement stronger password policies and require multi-factor authentication'
  },
  {
    id: 'vuln-3',
    name: 'Unpatched Software',
    severity: 'critical',
    system: 'Multiple Systems',
    description: 'Critical security patches have not been applied to several systems',
    remediation: 'Apply all pending security patches immediately'
  }
];

export default function SecurityScanner() {
  const [scanning, setScanning] = useState(false);
  const [scanType, setScanType] = useState(null);
  const [scanResults, setScanResults] = useState(null);
  const [progress, setProgress] = useState(0);

  const runScan = (type) => {
    setScanning(true);
    setScanType(type);
    setScanResults(null);
    setProgress(0);
    
    // Simulate scan progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setScanResults({
              vulnerabilities: [...vulnerabilities],
              scanType: scanTypes.find(t => t.id === type).name,
              timestamp: new Date().toISOString()
            });
            setScanning(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scanTypes.map((scan) => (
          <div 
            key={scan.id}
            className={`p-4 rounded-lg border ${scanType === scan.id ? 'border-blue-500 bg-blue-900/10' : 'border-gray-700 hover:border-gray-600'} transition-colors`}
          >
            <h3 className="font-semibold mb-2">{scan.name}</h3>
            <p className="text-sm text-gray-400 mb-3">{scan.description}</p>
            <div className="flex justify-between text-xs text-gray-500 mb-4">
              <span>Duration: {scan.duration}</span>
              <span>Coverage: {scan.coverage}</span>
            </div>
            <button
              onClick={() => runScan(scan.id)}
              disabled={scanning}
              className={`w-full py-2 px-3 rounded-md text-sm font-medium ${
                scanning && scanType === scan.id 
                  ? 'bg-blue-600 cursor-wait' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors flex items-center justify-center gap-2`}
            >
              {scanning && scanType === scan.id ? (
                <>
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                  Scanning ({Math.round(progress)}%)
                </>
              ) : (
                'Run Scan'
              )}
            </button>
          </div>
        ))}
      </div>

      {scanning && (
        <div className="bg-gray-800/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">
              Scanning: {scanTypes.find(t => t.id === scanType)?.name}
            </h3>
            <span className="text-sm text-gray-400">{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 text-sm text-gray-400">
            {progress < 30 && 'Initializing scan...'}
            {progress >= 30 && progress < 60 && 'Scanning network systems...'}
            {progress >= 60 && progress < 90 && 'Analyzing vulnerabilities...'}
            {progress >= 90 && 'Finalizing results...'}
          </div>
        </div>
      )}

      {scanResults && (
        <div className="bg-gray-800/30 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
              Scan Results
            </h3>
            <div className="text-sm text-gray-400">
              Completed: {new Date(scanResults.timestamp).toLocaleString()}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h4 className="text-sm text-gray-400 mb-2">Scan Type</h4>
              <p className="text-lg font-medium">{scanResults.scanType}</p>
            </div>
            
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h4 className="text-sm text-gray-400 mb-2">Vulnerabilities Found</h4>
              <p className="text-lg font-medium">{scanResults.vulnerabilities.length}</p>
            </div>
            
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h4 className="text-sm text-gray-400 mb-2">Security Rating</h4>
              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: '65%' }}
                  />
                </div>
                <span className="text-sm font-medium">65/100</span>
              </div>
            </div>
          </div>
          
          <h4 className="font-semibold mb-4">Identified Vulnerabilities</h4>
          <div className="space-y-4">
            {scanResults.vulnerabilities.map((vuln, i) => (
              <div key={vuln.id} className="border border-gray-700 rounded-lg overflow-hidden">
                <div className={`p-3 flex items-center justify-between ${
                  vuln.severity === 'critical' ? 'bg-red-900/30' :
                  vuln.severity === 'high' ? 'bg-orange-900/30' :
                  'bg-yellow-900/30'
                }`}>
                  <div className="flex items-center gap-3">
                    {vuln.severity === 'critical' ? (
                      <XCircleIcon className="h-5 w-5 text-red-500" />
                    ) : vuln.severity === 'high' ? (
                      <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />
                    ) : (
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                    )}
                    <h5 className="font-medium">{vuln.name}</h5>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${
                    vuln.severity === 'critical' ? 'bg-red-900/50 text-red-300' :
                    vuln.severity === 'high' ? 'bg-orange-900/50 text-orange-300' :
                    'bg-yellow-900/50 text-yellow-300'
                  }`}>
                    {vuln.severity}
                  </span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h6 className="text-xs text-gray-400 mb-1">Affected System</h6>
                      <p className="text-sm">{vuln.system}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h6 className="text-xs text-gray-400 mb-1">Description</h6>
                      <p className="text-sm">{vuln.description}</p>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-xs text-gray-400 mb-1">Recommended Action</h6>
                    <p className="text-sm">{vuln.remediation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}