'use client';
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  time: string; // E.g., "10:00 AM"
  count: number; // Number of bookings
}

interface PeakBookingTimesChartProps {
  data: DataPoint[];
}

const PeakBookingTimesChart: React.FC<PeakBookingTimesChartProps> = ({ data }) => {
  const peakbookingtimessvgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (peakbookingtimessvgRef.current) {
      const svg = d3.select(peakbookingtimessvgRef.current);
      const width = peakbookingtimessvgRef.current.clientWidth;
      const height = peakbookingtimessvgRef.current.clientHeight;

      const margin = { top: 20, right: 20, bottom: 50, left: 50 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const xScale = d3.scaleBand()
        .domain(data.map(d => d.time))
        .range([0, innerWidth])
        .padding(0.3); // Adjust padding to fit better

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count) ?? 0])
        .nice()
        .range([innerHeight, 0]);

      svg.selectAll('*').remove(); // Clear previous content

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.time) ?? 0)
        .attr('y', d => yScale(d.count))
        .attr('width', xScale.bandwidth()) // Adjust bar width
        .attr('height', d => innerHeight - yScale(d.count))
        .attr('fill', '#6870fa');

      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end')
        .style('font-size', '10px'); // Adjust font size if needed

      g.append('g')
        .call(d3.axisLeft(yScale))
        .style('font-size', '12px');
    }
  }, [data]);

  return (
    <svg
      ref={peakbookingtimessvgRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default PeakBookingTimesChart;
