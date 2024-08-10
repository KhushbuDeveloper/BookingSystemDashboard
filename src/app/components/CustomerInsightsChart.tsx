import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  segment: string; // Customer segment, e.g., "New Customers"
  count: number; // Number of customers in the segment
  color:string
}

interface CustomerInsightsChartProps {
  data: DataPoint[];
}

const CustomerInsightsChart: React.FC<CustomerInsightsChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;
      const radius = Math.min(width, height) / 2;

      const pie = d3.pie<DataPoint>()
        .value(d => d.count)
        .sort(null);

      const arc = d3.arc<d3.PieArcDatum<DataPoint>>()
        .innerRadius(0)
        .outerRadius(radius - 10);

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      svg.selectAll('*').remove(); // Clear previous content

      svg.attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');

      const g = svg.append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const pieData = pie(data);

      g.selectAll('path')
        .data(pieData)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => d.data.color);

      g.selectAll('text')
        .data(pieData)
        .enter()
        .append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .text(d => d.data.segment)
        .style('fill', '#fff');
    }
  }, [data]);

  return (
    <svg
      ref={svgRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default CustomerInsightsChart;
