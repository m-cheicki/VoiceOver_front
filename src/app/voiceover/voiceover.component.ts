import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SttService } from '../services/stt.service';
import { TtsService } from '../services/tts.service';

@Component({
  selector: 'app-voiceover',
  templateUrl: './voiceover.component.html',
  styleUrls: ['./voiceover.component.css']
})
export class VoiceoverComponent implements OnInit {

  @ViewChild('inputAudio') public audioInput!: HTMLInputElement;
  @ViewChild('audioPlayer') audioPlayer?: ElementRef<HTMLAudioElement>

  public name: string = "Choisir un fichier";
  public transcription: string = '';

  public constructor(
    private _sttService: SttService,
    private _ttsService: TtsService
  ) { }

  ngOnInit(): void { }

  public initFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.name = files[0].name;
    this.transcription = '';
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

  private updateAudioPlayer(e: any): void {
    if (!this.audioPlayer)
      return

    this.audioPlayer.nativeElement.src = e.target.result
    this.audioPlayer.nativeElement.load()
  }

  public generateAudio(): void {
    if (!this.transcription || this.transcription.length === 0)
      return

    this._ttsService.tts(this.transcription)
      .then((result) => {
        const fileReader: FileReader = new FileReader()
        fileReader.onload = this.updateAudioPlayer.bind(this)
        fileReader.readAsDataURL(result)
      })
  }
}
