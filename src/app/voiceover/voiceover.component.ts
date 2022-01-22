import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SttService } from '../services/stt.service';
import { TtsService } from '../services/tts.service';

@Component({
  selector: 'app-voiceover',
  templateUrl: './voiceover.component.html',
  styleUrls: ['./voiceover.component.css']
})
export class VoiceoverComponent implements OnInit {

  @Output() public onSelectAudio: EventEmitter<File> = new EventEmitter<File>()

  @ViewChild('inputAudio') public audioInput!: ElementRef<HTMLInputElement>;
  @ViewChild('inputAudioPlayer') inputAudioPlayer?: ElementRef<HTMLAudioElement>;
  @ViewChild('outputAudioPlayer') outputAudioPlayer?: ElementRef<HTMLAudioElement>;

  public name: string = "Choisir un fichier (WAV uniquement)";
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

    if (!this.audioInput
      || !this.audioInput.nativeElement.files
      || this.audioInput.nativeElement.files.length === 0)
      return

    const file: File = this.audioInput.nativeElement.files[0]
    this.onSelectAudio.emit(file)

    const fileReader: FileReader = new FileReader()
    fileReader.onload = this.updateInputAudioPlayer.bind(this)
    fileReader.readAsDataURL(file)
  }

  public callApiSTTAll(files: FileList | null): void {
    if (!files || files.length === 0)
      return
    const file = files[0];
    this._sttService.transcribeWithAll(file)
      .then(result => {
        this.audioInput.nativeElement.files = null;

        if (result[0].confidence > result[1].confidence
          && (result[0].provider == 'rev' || result[0].provider == 'assembly')
          && (result[1].provider == 'rev' || result[1].provider == 'assembly')) {
          this.transcription = result[0].result;
        }

        else {
          this.transcription = result[1].result;
        }
      })
      .then(x => this.generateAudio())
      .catch(err => console.error(err));
  }

  private updateInputAudioPlayer(e: any): void {
    if (!this.inputAudioPlayer)
      return

    this.inputAudioPlayer.nativeElement.src = e.target.result
    this.inputAudioPlayer.nativeElement.load()
  }

  private updateOutputAudioPlayer(e: any): void {
    if (!this.outputAudioPlayer)
      return

    this.outputAudioPlayer.nativeElement.src = e.target.result
    this.outputAudioPlayer.nativeElement.load()
  }

  public generateAudio(): void {
    if (!this.transcription || this.transcription.length === 0)
      return

    this._ttsService.tts(this.transcription)
      .then((result) => {
        const fileReader: FileReader = new FileReader()
        fileReader.onload = this.updateOutputAudioPlayer.bind(this)
        fileReader.readAsDataURL(result)
      })
  }
}
