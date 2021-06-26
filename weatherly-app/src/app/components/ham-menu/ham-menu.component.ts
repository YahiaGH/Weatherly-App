import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ham-menu',
  templateUrl: './ham-menu.component.html',
  styleUrls: ['./ham-menu.component.css']
})
export class HamMenuComponent implements OnInit {

  @Input() items: {name: string, val: string}[] = [];
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(): void{
    this.router.navigate(['/']);
  }
}
