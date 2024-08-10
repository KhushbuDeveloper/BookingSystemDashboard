import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface DataPoint {
    date: string; // Format: "YYYY-MM-DD"
    revenue: number;
}

interface RevenueAnalysisChartProps {
    data: DataPoint[];
}

const RevenueAnalysisChart: React.FC<RevenueAnalysisChartProps> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);
            const width = svgRef.current.clientWidth;
            const height = svgRef.current.clientHeight;

            const margin = { top: 20, right: 20, bottom: 50, left: 50 };
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            const xScale = d3.scaleBand()
                .domain(data.map(d => d.date))
                .range([0, innerWidth])
                .padding(0.3);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.revenue) ?? 0])
                .nice()
                .range([innerHeight, 0]);

            svg.selectAll('*').remove(); // Clear previous content
           
            const g = svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            g.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('x', d => xScale(d.date) ?? 0)
                .attr('y', d => yScale(d.revenue))
                .attr('width', xScale.bandwidth()) // Adjust bar width
                .attr('height', d => innerHeight - yScale(d.revenue))
                .attr('fill', '#3da58a');

                g.append('g')
                .attr('transform', `translate(0,${innerHeight})`)
                .call(d3.axisBottom(xScale))
                .selectAll('text')
                .attr('transform', 'rotate(-45)')
                .style('text-anchor', 'end')
                .style('font-size', '10px');

                g.append('g')
                .call(d3.axisLeft(yScale))
                .style('font-size', '12px');
        }
    }, [data]);

    return (
        <svg
            ref={svgRef}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default RevenueAnalysisChart;
