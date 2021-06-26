import { Component, OnInit, Input } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() text!: string;
  @Input() icon!: string;
  @Input() pageTitle!: string;

  constructor(private uiService: UiService) {
   }

  ngOnInit(): void {
  }

  toggleTempType() {
    this.uiService.toggleTempType();
  }
}
