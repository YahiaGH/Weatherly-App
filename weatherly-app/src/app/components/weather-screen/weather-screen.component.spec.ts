import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherScreenComponent } from './weather-screen.component';

describe('WeatherScreenComponent', () => {
  let component: WeatherScreenComponent;
  let fixture: ComponentFixture<WeatherScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
