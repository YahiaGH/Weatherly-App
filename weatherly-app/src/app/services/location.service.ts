import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiURL = 'http://ip-api.com/json/';

  constructor(private http : HttpClient) { }

  getPosition(): Observable<any>{
    return this.http.get(this.apiURL);
  }
}
