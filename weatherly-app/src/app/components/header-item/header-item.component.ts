import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.css']
})
export class HeaderItemComponent implements OnInit {
  @Input() text!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
