import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconsModule } from '@ng-icons/core';
import { AkarMicrophone, AkarDesktopDevice, AkarVideo, AkarSquare, AkarPlay, AkarCloudUpload, AkarSoundOn, AkarHeadphone, AkarSearch, AkarPlus, AkarTriangleFill } from '@ng-icons/akar-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InputChoiceComponent } from './input-choice/input-choice.component';
import { RecordInputComponent } from './record-input/record-input.component';
import { ComputerInputComponent } from './computer-input/computer-input.component';
import { YoutubeURLInputComponent } from './youtube-url-input/youtube-url-input.component';
import { TranscriptionComponent } from './transcription/transcription.component';
import { TranslationComponent } from './translation/translation.component';
import { ReadComponent } from './read/read.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    TopBarComponent,
    NavbarComponent,
    HomepageComponent,
    InputChoiceComponent,
    RecordInputComponent,
    ComputerInputComponent,
    YoutubeURLInputComponent,
    TranscriptionComponent,
    TranslationComponent,
    ReadComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({ AkarMicrophone, AkarDesktopDevice, AkarVideo, AkarSquare, AkarPlay, AkarCloudUpload, AkarSoundOn, AkarHeadphone, AkarSearch, AkarPlus, AkarTriangleFill })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
