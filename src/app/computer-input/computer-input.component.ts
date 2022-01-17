import { Component, OnInit, ViewChild } from '@angular/core';
import { SttService } from '../services/stt.service';

@Component({
  selector: 'app-computer-input',
  templateUrl: './computer-input.component.html',
  styleUrls: ['./computer-input.component.css']
})
export class ComputerInputComponent {

  @ViewChild('inputAudio') public audioInput!: HTMLInputElement;

  public constructor(
    private _sttService: SttService,
  ) { }

  ngOnInit(): void {
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
        console.log(result);
      })
      .catch(err => console.error(err));
  }
}
