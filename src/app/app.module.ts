import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { VoiceoverComponent } from './voiceover/voiceover.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { RequestInterceptor } from './request.interceptor';
import { API_BASE_URL } from './services/api.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomepageComponent,
    PagenotfoundComponent,
    VoiceoverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: API_BASE_URL, useValue: environment.base_api_url,
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
