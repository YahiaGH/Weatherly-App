import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css']
})
export class ToggleButtonComponent implements OnInit {

  @Input() values: {name: string, val: string}[] = [];
  @Output() btnToggle = new EventEmitter();

  currentValue: string = 'Celsius';
  
  constructor() { }

  ngOnInit(): void {
  }

  onValChange(value : any): void{
    if(value !== this.currentValue){
      this.btnToggle.emit();
      this.currentValue = value;
    }
  }
}
