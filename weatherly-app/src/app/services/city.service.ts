import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Geonames from 'geonames.js';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiURL = 'http://ip-api.com/json/';

  constructor(private http : HttpClient) {
   }

  getCities(country: string): Promise<any>{
    const geonames = Geonames({
      username: 'yahia909096',
      lan: 'en',
      encoding: 'JSON'
    });
    return geonames.search({"q": country});
  }
}
