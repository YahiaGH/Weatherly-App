import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TemperatureService {

  private apiURL = 'http://api.worldweatheronline.com/premium/v1/weather.ashx?key=8c9dce1cc0de429882e154918211706&format=json&showlocaltime=yes&q=';
  private apiSatsURL = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=8c9dce1cc0de429882e154918211706&format=json&showlocaltime=yes&q=';

  constructor(private http : HttpClient) { }

  getData(response : any): Observable<any> {  
    return this.http.get(this.apiURL + response.lat + ',' + response.lon);
  }

  getTemperature(location: string): Observable<any> {  
    return this.http.get(this.apiURL + location);
  }

  getWeatherHistory(location: string){
    return this.http.get(this.apiURL + location + '&mca=yes' + '&fx=no' + '&cc=no');
  }

  getWeatherStats(location: string){
    const year = new Date().getFullYear() - 1;
    const month = new Date().getMonth() + 1;
    const day = new Date(year, month, 0).getDate();
    const lastYearEndDate =  year + '-0' + month + '-' + day;
    const lastYearStartDate =  year + '-0' + month + '-' + '01';
    return this.http.get(this.apiSatsURL + location + '&tp=24' + `&date=${lastYearStartDate}` + `&enddate=${lastYearEndDate}`);
  }
}
