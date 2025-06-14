import { useState, useEffect } from 'react';
import axios from 'axios';

// API Endpoints
const API_ENDPOINTS = {
    FBI_WANTED: 'https://api.fbi.gov/@wanted',
    JOKES: 'https://official-joke-api.appspot.com/jokes/ten',
    THREAT_INTEL: 'https://otx.alienvault.com/api/v1/indicators/ioctypes',
    CYBER_RISK: '/api/cyber/risk-score',
    MICROEXPRESSIONS: '/api/expressions/analyze',
    PROFILER: '/api/profile/generate',
    PERSONALITY: '/api/ai/profiler',
    EVIDENCE: '/api/forensics/sample',
    ETHICAL_HACK: '/api/ethical-hack/run',
    SURVEILLANCE: '/api/ai/surveillance',
    ATTACK_SIM: '/api/cyber/attack-simulate',
    CASE_STUDIES: '/api/cases/studies',
    TEAM_MEMBERS: '/api/team/members',
    NETWORK_STATUS: '/api/network/status'
};

// Mock data generators for development
const generateMockThreat = (id) => ({
    id,
    name: `APT-${Math.floor(Math.random() * 1000)}`,
    type: ['Malware', 'Phishing', 'Zero-Day', 'DDoS', 'Insider Threat'][Math.floor(Math.random() * 5)],
    description: `New ${['sophisticated', 'emerging', 'persistent', 'advanced'][Math.floor(Math.random() * 4)]} threat detected targeting ${['financial', 'government', 'healthcare', 'energy'][Math.floor(Math.random() * 4)]} sector`,
    severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString()
});

const generateMockCaseStudy = (id) => ({
    id,
    code: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
    title: ['Silent Network', 'Digital Phantom', 'Mind Games', 'Code Red', 'Shadow Protocol'][Math.floor(Math.random() * 5)] + ' ' + ['Infiltration', 'Operation', 'Incident', 'Scenario', 'Breach'][Math.floor(Math.random() * 5)],
    status: ['Active', 'Closed', 'Pending', 'Cold'][Math.floor(Math.random() * 4)],
    progress: Math.floor(Math.random() * 100),
    description: `A ${['complex', 'sophisticated', 'unprecedented', 'challenging'][Math.floor(Math.random() * 4)]} case involving ${['cyber espionage', 'behavioral patterns', 'financial crimes', 'organized crime'][Math.floor(Math.random() * 4)]} requiring multidisciplinary approach.`
});

// API Hooks
export function useFbiMostWanted() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(API_ENDPOINTS.FBI_WANTED, {
                    params: {
                        pageSize: 10,
                        sort_on: 'modified',
                        sort_order: 'desc'
                    }
                });
                setData(response.data.items || []);
            } catch (err) {
                console.error('Error fetching FBI data:', err);
                setError(err);
                // Fallback mock data
                setData(
                    Array(5).fill(0).map((_, i) => ({
                        uid: `mock-${i}`,
                        title: `Most Wanted Subject ${i + 1}`,
                        description: `Description of criminal activities for subject ${i + 1}`,
                        status: 'Unknown',
                        images: [{ large: '/placeholder-wanted.jpg' }],
                        subjects: ['Fraud', 'Cyber Crime', 'Violent Crime'].slice(0, Math.floor(Math.random() * 3) + 1)
                    }))
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
}

export function useRandomFacts() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.JOKES);
                setData(response.data.slice(0, 5));
            } catch (err) {
                console.error('Error fetching jokes:', err);
                // Fallback mock data
                setData([
                    { id: 1, setup: "Why did the behavioral analyst cross the road?", punchline: "To profile the other side." },
                    { id: 2, setup: "How many profilers does it take to change a lightbulb?", punchline: "Just one, but they'll reconstruct the entire scene first." },
                    { id: 3, setup: "Why was the forensic computer analyst cold?", punchline: "Because they left their Windows open." }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading };
}

export function useThreatIntel() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.THREAT_INTEL);
                setData(response.data.results || []);
            } catch (err) {
                console.error('Error fetching threat intel:', err);
                // Fallback mock data
                setData(Array(8).fill(0).map((_, i) => generateMockThreat(i)));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading };
}

export function useCyberRiskScore(entityId) {
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!entityId) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINTS.CYBER_RISK}?entityId=${entityId}`);
                setScore(response.data.riskScore);
            } catch (err) {
                console.error('Error fetching risk score:', err);
                // Fallback mock data
                setScore(Math.floor(Math.random() * 100));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [entityId]);

    return { score, loading };
}

export function useMicroexpressionAnalysis(media) {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!media) return;

        const analyzeMedia = async () => {
            try {
                setLoading(true);
                const response = await axios.post(API_ENDPOINTS.MICROEXPRESSIONS, { media });
                setResult(response.data.expressions);
            } catch (err) {
                console.error('Error analyzing microexpressions:', err);
            } finally {
                setLoading(false);
            }
        };

        analyzeMedia();
    }, [media]);

    return { result, loading };
}

export function useProfiling(crimeScene) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!crimeScene) return;

        const generateProfile = async () => {
            try {
                setLoading(true);
                const response = await axios.post(API_ENDPOINTS.PROFILER, { crimeSceneDetails: crimeScene });
                setProfile(response.data.profile);
            } catch (err) {
                console.error('Error generating profile:', err);
            } finally {
                setLoading(false);
            }
        };

        generateProfile();
    }, [crimeScene]);

    return { profile, loading };
}

export function useCaseStudies() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.CASE_STUDIES);
        console.log('Fetched case studies:', response.data);

        // Adjust this based on actual API response structure
        const caseArray = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        setCases(caseArray);
      } catch (err) {
        console.error('Error fetching case studies:', err);
        setCases(Array(5).fill(0).map((_, i) => generateMockCaseStudy(i)));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cases, loading };
}


export function useTeamMembers() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.TEAM_MEMBERS);
                setMembers(response.data);
            } catch (err) {
                console.error('Error fetching team members:', err);
                // Fallback mock data
                setMembers([
                    {
                        id: 1,
                        name: 'Dr. Elena Reyes',
                        role: 'Lead Profiler',
                        specialty: 'Behavioral Analysis',
                        description: 'Former FBI BAU profiler with 15 years experience in criminal psychology.'
                    },
                    // ... other team members
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { members, loading };
}

export function useNetworkStatus() {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.NETWORK_STATUS);
                setStatus(response.data);
            } catch (err) {
                console.error('Error fetching network status:', err);
                // Fallback mock data
                setStatus({
                    status: 'operational',
                    threatsBlocked: Math.floor(Math.random() * 1000),
                    lastIncident: '24 hours ago'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { status, loading };
}

// Composite Hooks
export function useLiveDashboard() {
    const { data: fbi, loading: fbiLoading } = useFbiMostWanted();
    const { data: intel, loading: intelLoading } = useThreatIntel();
    const { data: jokes, loading: jokesLoading } = useRandomFacts();
    const { score: cyberScore, loading: cyberLoading } = useCyberRiskScore('insight-network');

    return {
        fbi,
        intel,
        jokes,
        cyberScore,
        loading: fbiLoading || intelLoading || jokesLoading || cyberLoading
    };
}

export function useCaseDetails(caseId) {
    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProfiles, setRelatedProfiles] = useState([]);

    useEffect(() => {
        if (!caseId) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const [caseResponse, profilesResponse] = await Promise.all([
                    axios.get(`/api/cases/${caseId}`),
                    axios.get(`/api/cases/${caseId}/profiles`)
                ]);

                setCaseData(caseResponse.data);
                setRelatedProfiles(profilesResponse.data);
            } catch (err) {
                console.error('Error fetching case details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [caseId]);

    return { caseData, relatedProfiles, loading };
}

// Simulation Hooks
export function useSimulatedAttack(target) {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!target) return;

        const simulateAttack = async () => {
            try {
                setLoading(true);
                const response = await axios.post(API_ENDPOINTS.ATTACK_SIM, { target });
                setResult(response.data);
            } catch (err) {
                console.error('Error simulating attack:', err);
            } finally {
                setLoading(false);
            }
        };

        simulateAttack();
    }, [target]);

    return { result, loading };
}

export function useEvidenceAnalysis(evidenceId) {
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!evidenceId) return;

        const analyzeEvidence = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_ENDPOINTS.EVIDENCE}/${evidenceId}/analyze`);
                setAnalysis(response.data);
            } catch (err) {
                console.error('Error analyzing evidence:', err);
            } finally {
                setLoading(false);
            }
        };

        analyzeEvidence();
    }, [evidenceId]);

    return { analysis, loading };
}