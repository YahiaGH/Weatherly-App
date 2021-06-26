import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'weatherly-app';
  
  ngOnInit(){
    // Fake data
const data = [
  {
    year: 2000,
    popularity: 50
  },
  {
    year: 2001,
    popularity: 150
  },
  {
    year: 2002,
    popularity: 200
  },
  {
    year: 2003,
    popularity: 130
  },
  {
    year: 2004,
    popularity: 240
  },
  {
    year: 2005,
    popularity: 380
  },
  {
    year: 2006,
    popularity: 420
  }
];

const heightValue = 300;
const widthValue = 600;

// Create SVG and padding for the chart
const svg = d3
  .select("#chart")
  .append("svg")
  .attr("viewBox", `0 0 ${widthValue} ${heightValue}`)
;

const strokeWidth = 1.5;
const margin = { top: 0, bottom: 20, left: 30, right: 20 };
const chart = svg.append("g").attr("transform", `translate(${margin.left},0)`);
const width = 600 - margin.left - margin.right - (strokeWidth * 2);
const height = 300 - margin.top - margin.bottom;
const grp = chart
  .append("g")
  .attr("transform", `translate(-${margin.left - strokeWidth},-${margin.top})`);

// Create scales
const yScale = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(data, (dataPoint : {popularity : any}) => dataPoint.popularity)]);
const xScale = d3
  .scaleLinear()
  .range([0, width])
  .domain(d3.extent(data, (dataPoint:any) => dataPoint.year) as Array<number | { valueOf(): number }>);

const area = d3
  .area()
  .x((dataPoint: any) => xScale(dataPoint.year))
  .y0(height)
  .y1((dataPoint: any) => yScale(dataPoint.popularity));

// Add area
grp
  .append("path")
  .attr("transform", `translate(${margin.left},0)`)
  .datum(data)
  .style("fill", "lightblue")
  .attr("stroke", "steelblue")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("stroke-width", strokeWidth)
  .attr("d");

// Add the X Axis
chart
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale).ticks(data.length));

// Add the Y Axis
chart
  .append("g")
  .attr("transform", `translate(0, 0)`)
  .call(d3.axisLeft(yScale));
  }
}
