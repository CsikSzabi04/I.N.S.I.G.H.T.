import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function NetworkMap({ systems }) {
  const svgRef = useRef();
  const width = 800;
  const height = 500;

  useEffect(() => {
    if (!systems || systems.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create simulation
    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    // Create links (simplified full mesh)
    const links = [];
    for (let i = 0; i < systems.length; i++) {
      for (let j = i + 1; j < systems.length; j++) {
        if (Math.random() > 0.6) { // Random connections
          links.push({ source: systems[i].id, target: systems[j].id });
        }
      }
    }

    // Draw links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', '#4B5563')
      .attr('stroke-width', 1.5);

    // Create node groups
    const node = svg.append('g')
      .selectAll('g')
      .data(systems)
      .enter().append('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles
    node.append('circle')
      .attr('r', 20)
      .attr('fill', d => {
        const status = d.status.toLowerCase();
        return status === 'secure' ? '#10B981' :
               status === 'warning' ? '#F59E0B' :
               status === 'critical' ? '#EF4444' :
               '#3B82F6';
      })
      .attr('stroke', '#1F2937')
      .attr('stroke-width', 2);

    // Add system icons
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 4)
      .attr('fill', 'white')
      .style('font-size', '10px')
      .text(d => {
        const iconMap = {
          firewall: '🔒',
          ids: '🛡️',
          siem: '📊',
          backup: '💾',
          endpoint: '💻',
          network: '🌐'
        };
        return iconMap[d.id] || '⚙️';
      });

    // Add system names
    node.append('text')
      .attr('dy', 30)
      .attr('text-anchor', 'middle')
      .attr('fill', '#D1D5DB')
      .style('font-size', '10px')
      .text(d => d.name.split(' ')[0]);

    // Update simulation
    simulation
      .nodes(systems)
      .on('tick', ticked);

    simulation.force('link')
      .links(links);

    function ticked() {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    }

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [systems]);

  return (
    <div className="bg-gray-800 rounded-lg p-4 overflow-auto">
      <svg 
        ref={svgRef} 
        width="100%" 
        height="500" 
        viewBox={`0 0 ${width} ${height}`}
        className="border border-gray-700 rounded-md"
      />
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {systems.map(system => {
          const statusColor = system.status === 'secure' ? 'bg-green-500' :
                            system.status === 'warning' ? 'bg-yellow-500' :
                            system.status === 'critical' ? 'bg-red-500' : 'bg-blue-500';
          return (
            <div key={system.id} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${statusColor}`} />
              <span className="text-sm text-gray-300">{system.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}