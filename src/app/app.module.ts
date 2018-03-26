import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { LocationService } from './location.service'; 

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyAWQiQMTi807VmHfsK2GgZ_hwfgQ4ld49A'
    })
  ],
  providers: [
    LocationService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
