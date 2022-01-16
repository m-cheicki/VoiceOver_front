import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconsModule } from '@ng-icons/core';
import { AkarSquare, AkarPlay, AkarCloudUpload } from '@ng-icons/akar-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ComputerInputComponent } from './computer-input/computer-input.component';
import { TranscriptionComponent } from './transcription/transcription.component';
import { TranslationComponent } from './translation/translation.component';
import { ReadComponent } from './read/read.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    NavbarComponent,
    HomepageComponent,
    ComputerInputComponent,
    TranscriptionComponent,
    TranslationComponent,
    ReadComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({ AkarSquare, AkarPlay, AkarCloudUpload })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
