import { Component, OnInit, Input } from '@angular/core';
import { TemperatureService } from '../../services/temperature.service';
import { DatePipe } from '@angular/common';
import { UiService } from '../../services/ui.service';
import * as moment from 'moment';

interface iconsMap {
    [name: string]: string
};

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  

  weatherIconsMap: iconsMap = {
    "113" : "113",
    "116" : "116",
    "119" : "119",
    "122" : "122",
    "143" : "143",
    "248" : "143",
    "176" : "176", 
    "179" : "179",
    "182" : "182",
    "185" : "179",
    "200" : "200",
    "227" : "227",
    "230" : "227",
    "260" : "260",
    "263" : "176",
    "266" : "176",
    "281" : "179",
    "284" : "284",
    "293" : "176",
    "296" : "176",
    "299" : "299",
    "302" : "299",
    "305" : "305",
    "308" : "305",
    "311" : "179"
  };
  @Input() errorMessage!: string;
  @Input() isError: boolean = false;
  location: any = {};
  temperature: any = {};
  isCelsius: boolean = true;
  isErrorTemp: boolean = false;
  isDayTime: boolean = false;
  tempSym: string = '°C';

  DayColor: string = 'linear-gradient(180deg, rgba(3, 116, 150, 0.89) 10.15%, #11FBED 100%';
  NightColor: string = 'linear-gradient(to top, #283E88, #000000)';
  weatherIconCode!: string;

   constructor(private uiService: UiService, private datePipe: DatePipe, private temperatureService: TemperatureService) {
    this.uiService
      .onToggle()
      .subscribe((value) => {
        this.isCelsius = value;
        
        if (this.isCelsius){
          this.tempSym = '°C';
          this.temperature.currentTemp.FeelsLike = this.temperature.currentTemp.FeelsLikeC;
          this.temperature.currentTemp.temp = String(this.temperature.currentTemp.temp_C) + this.tempSym;
          this.temperature.currentTemp.dew = this.temperature.currentTemp.hourly.DewPointC;
        }else{
          this.tempSym = '°F';
          this.temperature.currentTemp.FeelsLike = this.temperature.currentTemp.FeelsLikeF;
          this.temperature.currentTemp.temp = String(this.temperature.currentTemp.temp_F) + this.tempSym;
          this.temperature.currentTemp.dew = this.temperature.currentTemp.hourly.DewPointF;
        }
      });

      this.uiService.onCityChange().subscribe((value: Array<any>) => {
        const location = value[0].split(',');
        this.location.city = decodeURI(location[0]);
        this.location.country = location[1];

        this.temperatureService.getTemperature(decodeURI(value[0])).subscribe((temperature) => {
          this.location.city = temperature.data.request[0].query.split(',')[0];
          this.processTemp(temperature);
          value[1].requestEnded();
          }, (error) => {
          value[1].requestEnded().resetSpinner();
          this.isErrorTemp = true;
        });
      });
   }

  processTemp(temperature: any): void{

      this.temperature.currentTemp = temperature.data.current_condition[0];
      this.temperature.currentTemp.FeelsLike = this.isCelsius? this.temperature.currentTemp.FeelsLikeC : this.temperature.currentTemp.FeelsLikeF;
      this.temperature.currentTemp.temp = (this.isCelsius? this.temperature.currentTemp.temp_C : this.temperature.currentTemp.temp_F) + this.tempSym;
      this.temperature.currentTemp.hourly = temperature.data.weather[0].hourly[0];
      this.temperature.currentTemp.dew = this.isCelsius? this.temperature.currentTemp.hourly.DewPointC : this.temperature.currentTemp.hourly.DewPointF;

      this.temperature.timeZone = temperature.data.time_zone[0];
      this.temperature.timeZone.localtime = this.datePipe.transform(this.temperature.timeZone.localtime, 'shortTime');

      const sunrise = moment(temperature.data.weather[0].astronomy[0].sunrise, "HH:mm a");
      const sunset = moment(temperature.data.weather[0].astronomy[0].sunset, "HH:mm a");
      const currentTime = moment(this.temperature.timeZone.localtime , "HH:mm a");

      this.isDayTime = currentTime.isBetween(sunrise,sunset) ? true : false; 
     
      const weatherIconCode = this.weatherIconsMap[this.temperature.currentTemp.weatherCode];
      this.weatherIconCode = this.isDayTime ? ('D' + weatherIconCode) : ('N' + weatherIconCode);
  }

  ngOnInit(): void {

  }
}
