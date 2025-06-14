import React from 'react';
import { Chart } from 'react-google-charts';

export default function ThreatTimeline({ threats, timeRange }) {
  // Process threat data for timeline
  const processTimelineData = () => {
    const now = new Date();
    let cutoffDate = new Date();
    
    // Set cutoff based on timeRange
    if (timeRange === '1h') {
      cutoffDate.setHours(cutoffDate.getHours() - 1);
    } else if (timeRange === '24h') {
      cutoffDate.setDate(cutoffDate.getDate() - 1);
    } else if (timeRange === '7d') {
      cutoffDate.setDate(cutoffDate.getDate() - 7);
    } else {
      cutoffDate.setDate(cutoffDate.getDate() - 30);
    }

    // Filter and group threats by hour/day
    const filteredThreats = threats.filter(t => new Date(t.timestamp) > cutoffDate);
    
    // Create time buckets based on range
    const timeBuckets = {};
    const timeFormat = timeRange === '1h' ? 'HH:mm' : timeRange === '24h' ? 'DD HH:00' : 'MMM DD';
    
    filteredThreats.forEach(threat => {
      const date = new Date(threat.timestamp);
      const timeKey = date.toLocaleString('en-US', {
        hour: timeRange === '1h' ? '2-digit' : undefined,
        day: 'numeric',
        month: timeRange !== '24h' ? 'short' : undefined,
        hour12: false
      }).replace(',', '');
      
      if (!timeBuckets[timeKey]) {
        timeBuckets[timeKey] = {
          count: 0,
          severity: 0,
          types: {}
        };
      }
      
      timeBuckets[timeKey].count++;
      timeBuckets[timeKey].severity += 
        threat.severity === 'critical' ? 4 :
        threat.severity === 'high' ? 3 :
        threat.severity === 'medium' ? 2 : 1;
      
      const type = threat.type || 'unknown';
      timeBuckets[timeKey].types[type] = (timeBuckets[timeKey].types[type] || 0) + 1;
    });

    // Convert to chart data
    const chartData = [
      ['Time', 'Threat Count', 'Average Severity', { role: 'tooltip', type: 'string', p: { html: true } }]
    ];

    Object.entries(timeBuckets).forEach(([time, data]) => {
      const avgSeverity = data.severity / data.count;
      const tooltip = `
        <div class="p-2 bg-gray-800 border border-gray-700 rounded-md">
          <strong>${time}</strong><br>
          Total Threats: ${data.count}<br>
          <div class="mt-1">
            ${Object.entries(data.types).map(([type, count]) => `
              <div class="flex justify-between">
                <span>${type}:</span>
                <span>${count}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      
      chartData.push([time, data.count, avgSeverity, tooltip]);
    });

    return chartData;
  };

  const data = processTimelineData();

  return (
    <div className="h-64">
      <Chart
        chartType="ColumnChart"
        loader={<div className="text-center py-8">Loading threat timeline...</div>}
        data={data}
        options={{
          backgroundColor: 'transparent',
          colors: ['#3b82f6', '#ef4444'],
          legend: { position: 'top', textStyle: { color: '#9CA3AF' } },
          hAxis: {
            textStyle: { color: '#9CA3AF' },
            titleTextStyle: { color: '#9CA3AF' }
          },
          vAxis: {
            textStyle: { color: '#9CA3AF' },
            titleTextStyle: { color: '#9CA3AF' },
            minValue: 0
          },
          chartArea: { width: '85%', height: '70%' },
          tooltip: { isHtml: true },
          bar: { groupWidth: '75%' },
          animation: {
            startup: true,
            duration: 1000,
            easing: 'out'
          }
        }}
      />
    </div>
  );
}