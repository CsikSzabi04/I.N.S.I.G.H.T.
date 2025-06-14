// InfoDisplay.jsx
import React from 'react';

export default function InfoDisplay() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Hooks Overview</h1>

      <p><strong>useFbiMostWanted:</strong> Fetches a list of the FBI's Most Wanted individuals using the official FBI API.</p>

      <p><strong>useRandomFacts:</strong> Retrieves random jokes from a public joke API. If the API fails, it uses built-in fallback jokes.</p>

      <p><strong>useThreatIntel:</strong> Gets threat intelligence data from the AlienVault Open Threat Exchange (OTX). If the API fails, mock threats are generated.</p>

      <p><strong>useCyberRiskScore:</strong> Gets a cyber risk score for a given entity ID. If the backend fails, it returns a random score.</p>

      <p><strong>useMicroexpressionAnalysis:</strong> Sends media (image/video) to an analysis endpoint that detects microexpressions. Used for emotional behavior insights.</p>

      <p><strong>useProfiling:</strong> Generates a psychological or behavioral profile based on crime scene details.</p>

      <p><strong>useCaseStudies:</strong> Loads case studies from a backend. If unavailable, it generates example case studies as fallback.</p>

      <p><strong>useTeamMembers:</strong> Retrieves a list of team members (e.g., profilers, analysts). Shows mock data if the API fails.</p>

      <p><strong>useNetworkStatus:</strong> Checks the operational status of a simulated network and recent incident info.</p>

      <p><strong>useLiveDashboard:</strong> Combines FBI data, threat intel, jokes, and cyber risk score into one unified dashboard state.</p>

      <p><strong>useCaseDetails:</strong> Fetches detailed information and associated profiles for a specific case ID.</p>

      <p><strong>useSimulatedAttack:</strong> Triggers a simulated cyberattack on a target entity using internal tools.</p>

      <p><strong>useEvidenceAnalysis:</strong> Analyzes forensic evidence identified by ID and returns results from the backend.</p>
    </div>
  );
}
