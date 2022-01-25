import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgIconsModule } from '@ng-icons/core';
import { AkarGithubFill } from '@ng-icons/akar-icons';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { VoiceoverComponent } from './voiceover/voiceover.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { RequestInterceptor } from './request.interceptor';
import { API_BASE_URL } from './services/api.service';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { VoicecloningComponent } from './voicecloning/voicecloning.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomepageComponent,
    PagenotfoundComponent,
    VoiceoverComponent,
    VoicecloningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgIconsModule.withIcons({ AkarGithubFill })
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
