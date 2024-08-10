'use client';
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  date: any;
  value: number;
}

interface BookingTrendsChartProps {
  data: DataPoint[];
}

const BookingTrendsChart: React.FC<BookingTrendsChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;

      const margin = { top: 20, right: 30, bottom: 50, left: 50 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // Convert date strings to Date objects
      const parsedData = data.map(d => ({
        date: new Date(d.date),
        value: d.value
      }));

      const xScale = d3.scaleTime()
        .domain(d3.extent(parsedData, d => d.date) as [Date, Date])
        .range([0, innerWidth]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(parsedData, d => d.value) ?? 0])
        .nice()
        .range([innerHeight, 0]);

      const line = d3.line<DataPoint>()
        .x(d => xScale(d.date))
        .y(d => yScale(d.value));

      svg.selectAll('*').remove(); // Clear previous content

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      g.append('path')
        .datum(parsedData)
        .attr('fill', 'none')
        .attr('stroke', '#3da58a')
        .attr('stroke-width', 1.5)
        .attr('d', line);

      // x-axis with custom tick format and unique ticks
      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale)
          .tickFormat(d => d3.timeFormat('%b %d')(d as Date)) // Format the date labels
          .tickValues(parsedData.map(d => d.date))) // Ensure ticks match data points

      // y-axis
      g.append('g')
        .call(d3.axisLeft(yScale))

    }
  }, [data]);

  return (
    <svg
      ref={svgRef}
      style={{ width: '100%', height: '100%' }} // Ensure SVG scales with container
    />
  );
};

export default BookingTrendsChart;
