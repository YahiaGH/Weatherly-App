import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMessage: string = "An Error has Occurred ☹ Please try again later ...";

  constructor() { }

  ngOnInit(): void {
  }

}
