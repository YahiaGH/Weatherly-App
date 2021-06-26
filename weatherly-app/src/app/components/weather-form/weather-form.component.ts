import { Component, Input, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { State }  from 'country-state-city';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})
export class WeatherFormComponent implements OnInit {
  city!: string;
  items!: any;
  isError: boolean = false;
  validForm: boolean = true;
  errorMessage!: string;

  title: string = "Historical Information";
  dropDownName: string = "City";
  buttonName: string = "Search";

  constructor(private locationService : LocationService, private uiService: UiService) { }

  ngOnInit(): void {
    this.locationService.getPosition().subscribe((location) => {
      this.city = location.regionName.split(' ');
      this.items = State.getStatesOfCountry(location.countryCode);
      console.log(this.items);
    }, (error) => {
      this.isError = true;
    })
  }

  onSubmit(): void{
    if(!this.city){
      this.validForm = false;
      this.errorMessage = "Please Choose a City";
    }else{
      this.validForm = true;
      this.uiService.submitCity(this.city);
    }
  }
}