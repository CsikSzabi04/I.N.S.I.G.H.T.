import React from 'react';
import { Chart } from 'react-google-charts';

export default function ThreatHeatmap({ threats }) {
  // Process threat data for heatmap
  const processHeatmapData = () => {
    const threatTypes = {};
    const threatSources = {};
    
    threats.forEach(threat => {
      // Count by type
      const type = threat.type || 'Unknown';
      threatTypes[type] = (threatTypes[type] || 0) + 1;
      
      // Count by source (simplified)
      const source = threat.source || 'External';
      threatSources[source] = (threatSources[source] || 0) + 1;
    });
    
    // Prepare data for type heatmap
    const typeData = [
      ['Threat Type', 'Count', { role: 'style' }]
    ];
    
    Object.entries(threatTypes).forEach(([type, count]) => {
      const color = count > 10 ? '#EF4444' : 
                   count > 5 ? '#F59E0B' : 
                   count > 2 ? '#3B82F6' : '#10B981';
      typeData.push([type, count, color]);
    });
    
    // Prepare data for source heatmap
    const sourceData = [
      ['Threat Source', 'Count', { role: 'style' }]
    ];
    
    Object.entries(threatSources).forEach(([source, count]) => {
      const color = count > 10 ? '#EF4444' : 
                   count > 5 ? '#F59E0B' : 
                   count > 2 ? '#3B82F6' : '#10B981';
      sourceData.push([source, count, color]);
    });
    
    return { typeData, sourceData };
  };

  const { typeData, sourceData } = processHeatmapData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h4 className="font-semibold mb-4 text-center">Threats by Type</h4>
        <div className="h-64">
          <Chart
            chartType="BarChart"
            loader={<div>Loading chart...</div>}
            data={typeData}
            options={{
              backgroundColor: 'transparent',
              legend: 'none',
              hAxis: {
                title: 'Number of Threats',
                textStyle: { color: '#9CA3AF' },
                titleTextStyle: { color: '#9CA3AF' }
              },
              vAxis: {
                textStyle: { color: '#9CA3AF' }
              },
              chartArea: { width: '80%', height: '80%' },
              animation: {
                startup: true,
                duration: 1000,
                easing: 'out'
              }
            }}
          />
        </div>
      </div>
      
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h4 className="font-semibold mb-4 text-center">Threats by Source</h4>
        <div className="h-64">
          <Chart
            chartType="PieChart"
            loader={<div>Loading chart...</div>}
            data={sourceData}
            options={{
              backgroundColor: 'transparent',
              pieHole: 0.4,
              legend: {
                position: 'right',
                textStyle: { color: '#9CA3AF' }
              },
              chartArea: { width: '90%', height: '90%' },
              slices: sourceData.slice(1).map((row, i) => ({
                color: row[2] // Use the color from the data
              })),
              animation: {
                startup: true,
                duration: 1000,
                easing: 'out'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}