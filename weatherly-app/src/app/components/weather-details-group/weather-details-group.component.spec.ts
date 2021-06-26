import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDetailsGroupComponent } from './weather-details-group.component';

describe('WeatherDetailsGroupComponent', () => {
  let component: WeatherDetailsGroupComponent;
  let fixture: ComponentFixture<WeatherDetailsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherDetailsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDetailsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
