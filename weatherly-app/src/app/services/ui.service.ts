import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root',
})

export class UiService {
  private isCelsius: boolean = true;
  private subjectTempType = new Subject<any>();
  private subjectChangeCity = new Subject<any>();
  private subjectSubmitCity = new Subject<any>();

  constructor() {}

  toggleTempType(): void {
    this.isCelsius = !this.isCelsius;
    this.subjectTempType.next(this.isCelsius);
  }

  onToggle(): Observable<any> {
    return this.subjectTempType.asObservable();
  }

  cityChange(city: string, spinner: SpinnerService, isCelsius: boolean): void {
    this.subjectChangeCity.next([city,spinner,isCelsius]);
  }

  submitCity(city: string): void{
     this.subjectSubmitCity.next(city);
  }

  onSubmitCity(){
    return this.subjectSubmitCity.asObservable();
  }

  onCityChange(): Observable<any> {
    return this.subjectChangeCity.asObservable();
  }
}