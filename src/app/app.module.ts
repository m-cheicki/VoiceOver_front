import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconsModule } from '@ng-icons/core';
import { AkarMicrophone, AkarDesktopDevice, AkarVideo, AkarSquareFill, AkarPlay, AkarCloudUpload, AkarSoundOn, AkarHeadphone, AkarSearch, AkarPlus } from '@ng-icons/akar-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({ AkarMicrophone, AkarDesktopDevice, AkarVideo, AkarSquareFill, AkarPlay, AkarCloudUpload, AkarSoundOn, AkarHeadphone, AkarSearch, AkarPlus })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
