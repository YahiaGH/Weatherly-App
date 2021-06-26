import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  showSpinner: boolean = false;

  constructor(private spinnerService: SpinnerService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = (status === 'start');
      this.cdRef.detectChanges();
    });
  }
}