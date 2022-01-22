import { Component, OnInit, ViewChild } from '@angular/core';
import { SttService } from '../services/stt.service';
import { TranslateService } from '../services/translate.service';
import { TtsService } from '../services/tts.service';

@Component({
  selector: 'app-voiceover',
  templateUrl: './voiceover.component.html',
  styleUrls: ['./voiceover.component.css']
})
export class VoiceoverComponent implements OnInit {

  @ViewChild('inputAudio') public audioInput!: HTMLInputElement;

  public name: string = "Choisir un fichier";
  public transcription: string = '';
  public translation: string = '';


  public constructor(
    private _translateService: TranslateService,
    private _sttService: SttService,
    private _ttsService: TtsService
  ) { }

  ngOnInit(): void { }

  public initFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.name = files[0].name;
    this.transcription = '';
    this.translation = '';
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

        this.callApiTranslation(this.transcription);
        this.callApiTTS();

      })
      .catch(err => console.error(err));
  }

  public callApiTranslation(text: string | null): void {
    this.translation = '';

    if (!text)
      return

    this._translateService.translate(text, 'en', 'google')
      .then(result => {
        this.translation = result.translation
      })
      .catch(err => console.error(err));
  }

  public callApiTTS(): void {
    if (!this.translation || this.translation.length === 0)
      return

    this._ttsService.tts(this.translation)
      .then(result => {
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = window.URL.createObjectURL(result);
        link.download = 'result.mp3';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(err => console.error(err));
  }
}
