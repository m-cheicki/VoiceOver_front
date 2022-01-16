import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputerInputComponent } from './computer-input/computer-input.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ReadComponent } from './read/read.component';
import { TranscriptionComponent } from './transcription/transcription.component';
import { TranslationComponent } from './translation/translation.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomepageComponent },
  { path: 'upload', component: ComputerInputComponent },
  { path: 'transcription', component: TranscriptionComponent },
  { path: 'translation', component: TranslationComponent },
  { path: 'read', component: ReadComponent },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
