import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoiceoverComponent } from './voiceover/voiceover.component';
import { VoicecloningComponent } from './voicecloning/voicecloning.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomepageComponent },
  { path: 'voiceover', component: VoiceoverComponent },
  { path: 'voicecloning', component: VoicecloningComponent },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
