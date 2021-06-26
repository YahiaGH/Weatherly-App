import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-location',
  templateUrl: './weather-location.component.html',
  styleUrls: ['./weather-location.component.css']
})
export class WeatherLocationComponent implements OnInit {
  @Input() text!:string
  @Input() icon!:string
  @Input() desc!:string

  constructor() { }

  ngOnInit(): void {
  }

}
