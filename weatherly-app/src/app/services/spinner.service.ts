import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private count: number = 0;
  private minWaitOver = false;
  private spinner: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { 
    setTimeout(() => {
      this.minWaitOver = true;
      this.requestEnded();
    },5000)
  }

  getSpinnerObserver(): Observable<string> {
    return this.spinner.asObservable();
  }

  requestStarted(): void {
    if (++this.count === 1) {
      this.spinner.next('start');
    }
  }

  requestEnded(): void {
    if ((this.count === 0 || --this.count === 0) && this.minWaitOver) {
      this.minWaitOver = false;
      this.spinner.next('stop');
    }
  }

  resetSpinner(): void {
    this.count = 0;
    this.minWaitOver = false;
    this.spinner.next('stop');
  }
}
