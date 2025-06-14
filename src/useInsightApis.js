import { useState, useEffect } from 'react';
import axios from 'axios';

const FBI_API = 'https://api.fbi.gov/@wanted';
const JOKE_API = 'https://official-joke-api.appspot.com/jokes/ten';
const THREAT_API = 'https://otx.alienvault.com/api/v1/indicators/ioctypes';
const FACE_API = '/api/expressions/analyze';
const PROFILER_API = '/api/profile/generate';
const PERSONALITY_API = '/api/ai/profiler';
const EVIDENCE_API = '/api/forensics/sample';
const ETHICAL_HACK_API = '/api/ethical-hack/run';
const SURVEILLANCE_API = '/api/ai/surveillance';
const ATTACK_SIM_API = '/api/cyber/attack-simulate';
const RISK_SCORE_API = '/api/cyber/risk-score';

export function useFbiMostWanted() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(FBI_API)
            .then(r => setData(r.data.items))
            .catch(console.error);
    }, []);
    return data;
}

export function useRandomFacts() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(JOKE_API)
            .then(r => setData(r.data.slice(0, 5)))
            .catch(console.error);
    }, []);
    return data;
}

export function useThreatIntel() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(THREAT_API)
            .then(r => setData(r.data.results))
            .catch(console.error);
    }, []);
    return data;
}

export function useMicroexpressionAnalysis(media) {
    const [result, setResult] = useState(null);
    useEffect(() => {
        if (!media) return;
        axios.post(FACE_API, { media })
            .then(r => setResult(r.data.expressions))
            .catch(console.error);
    }, [media]);
    return result;
}

export function useProfiling(crimeScene) {
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        if (!crimeScene) return;
        axios.post(PROFILER_API, { crimeSceneDetails: crimeScene })
            .then(r => setProfile(r.data.profile))
            .catch(console.error);
    }, [crimeScene]);
    return profile;
}

export function usePersonalityAnalysis(text) {
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        if (!text) return;
        axios.post(PERSONALITY_API, { text })
            .then(r => setProfile(r.data.profile))
            .catch(console.error);
    }, [text]);
    return profile;
}

export function useEvidenceSample(id) {
    const [sample, setSample] = useState(null);
    useEffect(() => {
        if (!id) return;
        axios.get(`${EVIDENCE_API}/${id}`)
            .then(r => setSample(r.data.sample))
            .catch(console.error);
    }, [id]);
    return sample;
}

export function useEthicalHack(target, type) {
    const [report, setReport] = useState(null);
    useEffect(() => {
        if (!target || !type) return;
        axios.post(ETHICAL_HACK_API, { targetIp: target, testType: type, depth: 'basic' })
            .then(r => setReport(r.data.report))
            .catch(console.error);
    }, [target, type]);
    return report;
}

export function useSurveillanceAnomaly(streamUrl) {
    const [anomalies, setAnomalies] = useState([]);
    useEffect(() => {
        if (!streamUrl) return;
        axios.post(SURVEILLANCE_API, { dataStreamUrl: streamUrl, analysisType: 'movement' })
            .then(r => setAnomalies(r.data.anomalies))
            .catch(console.error);
    }, [streamUrl]);
    return anomalies;
}

export function useCyberRiskScore(entityId) {
    const [score, setScore] = useState(null);
    useEffect(() => {
        if (!entityId) return;
        axios.get(`${RISK_SCORE_API}?entityId=${entityId}`)
            .then(r => setScore(r.data.riskScore))
            .catch(console.error);
    }, [entityId]);
    return score;
}

// Additions for upgraded usage in JSX pages
export function useSimulatedAttack(target) {
    const [result, setResult] = useState(null);
    useEffect(() => {
        if (!target) return;
        axios.post(ATTACK_SIM_API, { target })
            .then(r => setResult(r.data))
            .catch(console.error);
    }, [target]);
    return result;
}

export function useLiveDashboard() {
    const fbi = useFbiMostWanted();
    const intel = useThreatIntel();
    const jokes = useRandomFacts();
    const cyberScore = useCyberRiskScore('insight-network');

    return { fbi, intel, jokes, cyberScore };
}
