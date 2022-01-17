import { Component, OnInit, ViewChild } from '@angular/core';
import { SttService } from '../services/stt.service';

@Component({
  selector: 'app-computer-input',
  templateUrl: './computer-input.component.html',
  styleUrls: ['./computer-input.component.css']
})
export class ComputerInputComponent {

  @ViewChild('inputAudio') public audioInput!: HTMLInputElement;

  public name !: string;
  public transcription !: string; 

  public constructor(
    private _sttService: SttService,
  ) { }

  ngOnInit(): void {
    this.name = "Choisir un fichier";
  }

  public getName(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.name = files[0].name; 
  }

  public callApiSTT(files: FileList | null): void {
    if (!files || files.length === 0)
      return
    const file = files[0];
    this._sttService.transcribeWithProvider(file, 'ibm')
      .then(result => {
        this.audioInput.files = null;
        console.log(result);
      })
      .catch(err => console.error(err));
  }

  public callApiSTTAll(files: FileList | null): void {
    if (!files || files.length === 0)
      return
    const file = files[0];
    this._sttService.transcribeWithAll(file)
      .then(result => {
        this.audioInput.files = null;

        if (result[0].confidence > result[1].confidence
          && (result[0].provider == 'rev' || result[0].provider == 'assembly')
          && (result[1].provider == 'rev' || result[1].provider == 'assembly')) {
          this.transcription = result[0].result;
        }
        else {
          this.transcription = result[1].result;
        }
      })
      .catch(err => console.error(err));
  }
}
