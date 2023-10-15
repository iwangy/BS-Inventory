import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './App.css';

const CalendarHeatmap = ({ data }) => {

  const Legend = () => {
    const legendWidth = 300;
    const legendHeight = 30;
    const legendColors = ['#2C323A', '#0D2A1E', '#063D21', '#1E5D32', '#3CD152'];
    const legendLabels = ['0', '1', '2', '3', '4+'];

    const rectWidth = legendWidth / legendColors.length;

    return (
      <div className="legend-container">
        <svg width={legendWidth} height={legendHeight}>
          {legendColors.map((color, index) => (
            <g key={index}>
              <rect x={index * rectWidth} y={0} width={rectWidth} height={legendHeight} fill={color} />
              <text x={index * rectWidth + rectWidth / 2} y={legendHeight - 10} textAnchor="middle" fill="#FFF">
                {legendLabels[index]}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  };

  const svgRef = useRef(null);

  useEffect(() => {
    const margin = { top: 40, right: 50, bottom: 40, left: 50 };
    const numRows = 2;
    const numCols = 6;

    const updateHeatmap = () => {

      const gridSize = Math.min(
        (window.innerWidth - margin.left - margin.right) / numCols,
        (window.innerHeight - margin.top - margin.bottom) / numRows
      );

      const width = numCols * gridSize + margin.left + margin.right;
      const height = numRows * gridSize + margin.top + margin.bottom;

      const xScale = d3.scaleBand().domain([...Array(numCols).keys()]).range([0, numCols * gridSize]).padding(0.1);
      const yScale = d3.scaleBand().domain([...Array(numRows).keys()]).range([0, numRows * gridSize]).padding(0.1);

      const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

      const colorScale = d3
        .scaleQuantize()
        .domain([0, 4])
        .range(['#2C323A', '#0D2A1E', '#063D21', '#1E5D32', '#3CD152']);

      const tooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);

      const allDates = Array.from(new Set([...Object.keys(data), ...Object.keys(data)]));

      console.log(allDates)

      svg.selectAll('.day')
        .data(allDates)
        .join('rect')
        .attr('class', 'day')
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth())
        .attr('x', (d, i) => xScale(i % numCols) + (width - numCols * gridSize) / 2)
        .attr('y', (d, i) => yScale(Math.floor(i / numCols)) + (height - numRows * gridSize) / 2)
        .attr('fill', d => {
          return data[d] && (data[d].createdNotes.length > 0 || data[d].encounteredNotes.length > 0) ? colorScale((data[d].createdNotes.length) + data[d].encounteredNotes.length) : '#2C323A';
        })
        .attr('rx', 10)
        .attr('ry', 10)
        .on('mouseover', function (event, d) {
          const tooltip = d3.select('.tooltip');
          tooltip.transition().duration(200).style('opacity', 1);

          const createdBullshit = data[d].createdNotes.length ? data[d].createdNotes.join(', ') : 'No entries';
          const encounteredBullshit = data[d].encounteredNotes.length ? data[d].encounteredNotes.join(', ') : 'No entries';

          const tooltipContent = `
            <b>Date:</b> ${d}<br/>
            <b>Created Bullshit:</b> ${createdBullshit}<br/>
            <b>Encountered Bullshit:</b> ${encounteredBullshit}
          `;

          tooltip.html(tooltipContent);

          const maxWidth = 300;
          tooltip.style('max-width', `${maxWidth}px`);

          const tooltipNode = tooltip.node();
          const tooltipRect = tooltipNode.getBoundingClientRect();

          const left = event.clientX + window.pageXOffset - tooltipRect.width / 2;
          const top = event.clientY + window.pageYOffset - tooltipRect.height - 20;

          tooltip.style('left', `${left}px`).style('top', `${top}px`);
        })
        .on('mouseout', function () {
          d3.select('.tooltip').transition().duration(500).style('opacity', 0);
        });



    };

    updateHeatmap();

    window.addEventListener('resize', updateHeatmap);

    return () => {
      window.removeEventListener('resize', updateHeatmap);
    };
  }, [data]);

  return (
    <div className="heatmap-container">
      <div className="legend-container">
        <Legend />
      </div>
      <div className="instructions"># of BS <br/><h3>Hover over the grids to view entry details</h3></div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default CalendarHeatmap;
