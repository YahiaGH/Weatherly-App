import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';
import { NavigationEnd, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-screen',
  templateUrl: './weather-screen.component.html',
  styleUrls: ['./weather-screen.component.css']
})

export class WeatherScreenComponent implements OnInit {

  location: any = {};
  temperature: any = {};
  isCelsius: boolean = false;
  isError: boolean = false;
  isDayTime: boolean = false;
  tempSym: string = '°C';
  errorMessage: string = "An Error has Occurred ☹ Please try again later ...";
  subscription!: Subscription;
  city!: string;
  title!: string;
  sectionRows: number = 1;

   constructor(private router: Router, private route: ActivatedRoute, private spinnerService: SpinnerService, private locationService : LocationService, private uiService: UiService) {
      this.uiService.onSubmitCity().subscribe((city) => {
        this.router.navigate(['/dashboard',city]);
        setTimeout(() => {
          this.cityChange(city + ',' + this.location.country,this.spinnerService);
        }, 1);
      });
   }

  cityChange(city: string, spinner: SpinnerService):void {
    this.uiService.cityChange(city, spinner);
  }

  ngOnInit(): void {
    this.spinnerService.requestStarted();
    
    this.locationService.getPosition().subscribe((location) => {
      this.location.country = location.country;
      this.location.city = location.regionName.split(' ')[0];

      this.router.events.subscribe((event) => {
          if(event instanceof NavigationEnd && event.url) {
            let city = this.location.city;
            this.sectionRows = 1;
            this.title = "Weather";
            if(event.url.includes('dashboard')){
              this.title = "Dashboard";
              this.sectionRows = 3;
              city = event.url.split('/')[2];
              if(!city){
                city = this.location.city;
              }
            }
            this.cityChange(city + ',' + this.location.country,this.spinnerService);
          }
      });
      
      let city = this.router.url.split('/')[2];
      this.title = "Dashboard";
      this.sectionRows = 3;
      if(this.router.url == '/'){
        this.sectionRows = 1;
        this.title = "Weather"
        city = this.location.city;
      }

      this.cityChange(city + ',' + this.location.country, this.spinnerService);
    }, (error) => {
      this.isError = true;
    });
  }
}
