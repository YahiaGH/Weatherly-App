import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemperatureService } from 'src/app/services/temperature.service';
import { UiService } from 'src/app/services/ui.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-weather-history',
  templateUrl: './weather-history.component.html',
  styleUrls: ['./weather-history.component.css']
})

export class WeatherHistoryComponent implements OnInit {

  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  location: any = {};
  temperature: any = {};
  isError: boolean = false;
  errorMessage: string = "An Error has Occurred ☹ Please try again later ...";

  chartWidth: number = 500;
  chartHeight: number = 355;
  isCelsius!: boolean;
  tempSym: string = '°C';
  tempHistory: {} = {};
  tempStat: {} = {};

  constructor(private uiService: UiService, private tempService: TemperatureService, private router: Router) { }

  processBarData(temperature : []): any{
    temperature.forEach((data : any) => {
      data.avgMinTemp = Math.round(+data.avgMinTemp);
      data.avgMinTemp_F = Math.round(+data.avgMinTemp_F);
      data.absMaxTemp = Math.round(+data.absMaxTemp);
      data.absMaxTemp_F = Math.round(+data.absMaxTemp_F);
      data.avgDailyRainfall = data.avgDailyRainfall;
    });

    return temperature;
  }

  renderBarChart(data: any, width: number, height: number, chartSelector: string, isCelsius: boolean, tempSym: string, isMax: boolean): void{
    
    const xValue = (val:any) => val.name;
    const yValue = (val:any) => isMax ? (isCelsius ? val.absMaxTemp : val.absMaxTemp_F) : (isCelsius ? val.avgMinTemp : val.avgMinTemp_F);
    const margin = {top: 40, right: 40, bottom: 100, left: 50};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const xAxisTextXOffset = innerWidth/(2 * 12);
    const xAxisTextYOffset = 15;
    const xAxisTextRotateAngle = 90;
    
    const svg = d3.select(chartSelector);

    svg.attr('width', width)
      .attr('height', height)
      .attr("viewBox", `0 0 ${width} ${height}`)

    const xScale = d3.scaleBand()
      .domain(data.map(xValue))
      .range([0, innerWidth])
      .padding(0.4);

    const yScale = d3.scaleLinear()
      .domain([0,Number(d3.max(data, yValue))])
      .range([innerHeight,0]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    const yAxis = g.append('g').call(d3.axisLeft(yScale).tickSize(-innerWidth));
    const xAxis = g.append('g').call(d3.axisBottom(xScale));

    yAxis.selectAll('.domain')
      .remove();

    yAxis.append('text')
      .text(`Temperature (${tempSym})`)
      .attr('y', '40')
      .attr('x',`${innerHeight/2}`)
      .style('font-size','1.6em')
      .style('fill','rgb(126, 126, 126)')
      .attr('transform', `rotate(${xAxisTextRotateAngle})`);
      
    yAxis.attr('text-anchor','middle')
      .selectAll('.tick text')
      .attr('x', '-10');

    xAxis.select('.domain, .tick line')
      .remove();

    xAxis.attr('transform', `translate(0, ${innerHeight})`)
      .attr('text-anchor', 'right')
      .selectAll('text')
      .data(data)
      .attr('transform', (d) => `translate(${xAxisTextXOffset}, ${xAxisTextYOffset}) rotate(${xAxisTextRotateAngle})`)
    
    g.selectAll('rect').data(data).enter().append('rect')
      .attr('x', (d: any) => xScale(xValue(d))!)
      .attr('y', (d: any) => yScale(yValue(d))!)
      .attr('width', xScale.bandwidth())
      .attr('height', (d: any) => yScale(0) - yScale(yValue(d))!)
      .attr("fill","rgb(70, 130, 180)");

    g.selectAll('text')
      .attr("font-size", '1.5em')
      .attr("font-family", 'Fredoka one');
    
    const barsText = g.append('g');

    barsText.selectAll('text').data(data)
      .enter()
        .append('text')
        .attr('x', (d) => xScale(xValue(d))! + xScale.bandwidth()/2)
        .attr('y', (d) => yScale(yValue(d))! + 20)
        .text((d) => yValue(d))
        .attr('text-anchor', 'middle')
        .style('font-size','0.7em')
        .style('fill','rgb(255, 255, 255)')

    g.append('text')
      .attr('y', -10)
      .text(`${isMax ? 'Maximum': 'Minimum'} Temperature Monthly Average`)
      .style('fill', 'rgb(126, 126, 126)')
      .style('font-size', '1.3em');

    g.selectAll('rect')
      .on("mouseover",function() { 
        d3.select(this)
          .style('fill', 'rgb(86, 0, 161)');
      })
      .on("mouseout",function() { 
        d3.select(this)
          .style('fill', 'rgb(70, 130, 180)');
      }); 
  }


  ngOnInit(): void {

    this.uiService.onCityChange().subscribe((value: Array<any>) => {
      
      this.location.city = value[0].split(',')[0];
      this.location.country = value[0].split(',')[1];
      this.isCelsius = value[2]; 
      this.tempSym = this.isCelsius ? '°C' : '°F';

      console.log(this.isCelsius);
      this.tempService.getWeatherHistory(this.location.city + ',' + this.location.country).subscribe((tempHistory: any) => {
        
        this.tempHistory = this.processBarData(tempHistory.data.ClimateAverages[0].month);
        this.removeChart('#chart1 g');
        this.removeChart('#chart2 g');

        this.renderBarChart(this.tempHistory , this.chartWidth, this.chartHeight, '#chart1', this.isCelsius, this.tempSym, true);
        this.renderBarChart(this.tempHistory , this.chartWidth, this.chartHeight, '#chart2', this.isCelsius, this.tempSym, false);

      }, (error) => {
        this.isError = true;
      });

      this.tempService.getWeatherStats(this.location.city + ',' + this.location.country).subscribe((tempStat: any) => {
        
        this.tempStat = this.processPieData(tempStat.data.weather);
        this.removeChart('#chart3 g');

        this.renderPieChart(this.tempStat , this.chartWidth, this.chartHeight, '#chart3', this.isCelsius, this.tempSym);

      }, (error) => {
        this.isError = true;
      });

      this.uiService.onToggle().subscribe((value) => {
        this.isCelsius = value;
        
        if (this.isCelsius){
          this.tempSym = '°C';
        }else{
          this.tempSym = '°F';
        }

        this.removeChart('#chart1 g');
        this.removeChart('#chart2 g');

        this.renderBarChart(this.tempHistory , this.chartWidth, this.chartHeight, '#chart1', this.isCelsius, this.tempSym, true);
        this.renderBarChart(this.tempHistory , this.chartWidth, this.chartHeight, '#chart2', this.isCelsius, this.tempSym, false);

      });
    }, (error) => {
        this.isError = true;
    });
  }

  processPieData(data: any): any {
    const result  = data.reduce((acc: any, item: any) => {
      acc[item.hourly[0].weatherDesc[0].value] ??= {name: item.hourly[0].weatherDesc[0].value, value: 0};
      acc[item.hourly[0].weatherDesc[0].value].value++;

      return acc;
    }, []);

    return Object.values(result);
  }

  renderPieChart(data: any, width: number, height: number, chartSelector: string, isCelsius: boolean, tempSym: string) {
    
  
    const margin = {top: 90, right: 70, bottom: -10, left: 3};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const color = d3.scaleOrdinal()
    .domain(data.map((d: any) => d.name))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());
    
    const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(Math.min(innerWidth, innerHeight) / 2 - 1);

    const radius = Math.min(innerWidth, innerHeight) / 2 * 0.8;
    const arcLabel = d3.arc().innerRadius(radius).outerRadius(radius);

    const pie = d3.pie()
    .sort(null)
    .value((d: any)=> d.value);

    const arcs = pie(data);
    
    const svg = d3.select(chartSelector);

    svg.attr('width', width)
      .attr('height', height)
      .attr("viewBox", `${-width/2 + margin.right} ${-height/2} ${width} ${height}`);

    svg.append("g")
      .attr("stroke", "white")
    .selectAll("path")
    .data(arcs)
    .join("path")
      .attr("fill", (d: any) => String(color(d.data.name)))
      .attr("d", <any>arc)
    .append("title")
      .text((d: any) => `${d.data.name}: ${d.data.value.toLocaleString()}`);

  svg.append("g")
      .attr("font-family", "Fredoka one")
      .attr("font-size", '0.7em')
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
      .attr("transform", (d: any) => `translate(${arcLabel.centroid(d)})`)
      .call(text => text.append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .style("fill", "rgb(70,70,70)")
          .text((d: any) => Math.round(d.data.value.toLocaleString() * 100 / new Date(new Date().getFullYear() - 1, new Date().getMonth() + 1,0).getDate()) + '%'));

    var legendG = svg.selectAll(".legend")
      .data(arcs)
      .enter().append("g")
      .attr("transform", function(d,i){
        return "translate(" + (innerWidth - 240) + "," + (i * 15 + -120) + ")";
      })
      .attr("class", "legend");   

    legendG.append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", (d: any) => String(color(d.data.name)));

    legendG.append("text") 
      .text(function(d: any){
        return d.data.name;
      })
      .style("font-size", "1em")
      .attr("y", 10)
      .attr("x", 11)
      .style("fill", "rgb(126,126,126)");

    svg.append('text')
      .attr('y', -150)
      .attr('x', -150)
      .text(`Last Year's (${(new Date()).getFullYear() - 1}) ${this.months[(new Date()).getMonth()]} Weather Condition`)
      .style('fill', 'rgb(126, 126, 126)')
      .style('font-size', '1.3em');

    svg.selectAll('path')
      .on("mouseover",function() { 
        d3.select(this)
          .style('opacity', '0.7');
      })
      .on("mouseout",function() { 
        d3.select(this)
          .style('opacity', '1');
      }); 

  }
  removeChart(chart: string) {
    d3.selectAll(chart).remove();
  }
}

