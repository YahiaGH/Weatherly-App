import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-summary',
  templateUrl: './weather-summary.component.html',
  styleUrls: ['./weather-summary.component.css']
})
export class WeatherSummaryComponent implements OnInit {

  @Input()
  degree!: string;
  @Input()
  desc!: string;
  @Input() 
  weatherIconCode!: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
