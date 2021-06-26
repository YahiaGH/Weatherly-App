import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule,NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { HeaderItemComponent } from './components/header-item/header-item.component';
import { WeatherLocationComponent } from './components/weather-location/weather-location.component';
import { WeatherSummaryComponent } from './components/weather-summary/weather-summary.component';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { WeatherDetailComponent } from './components/weather-detail/weather-detail.component';
import { WeatherDetailsGroupComponent } from './components/weather-details-group/weather-details-group.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { HamMenuComponent } from './components/ham-menu/ham-menu.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { WeatherFormComponent } from './components/weather-form/weather-form.component';
import { WeatherScreenComponent } from './components/weather-screen/weather-screen.component';
import { RouterModule, Routes } from '@angular/router';
import { WeatherHistoryComponent } from './components/weather-history/weather-history.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {path: '', component: WeatherFormComponent},
  {
    path: 'dashboard/:city', 
    component: WeatherHistoryComponent
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WeatherCardComponent,
    HeaderItemComponent,
    WeatherLocationComponent,
    WeatherSummaryComponent,
    WeatherDetailComponent,
    WeatherDetailsGroupComponent,
    ToggleButtonComponent,
    HamMenuComponent,
    LoadingSpinnerComponent,
    WeatherFormComponent,
    WeatherScreenComponent,
    WeatherHistoryComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatCardModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatInputModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
