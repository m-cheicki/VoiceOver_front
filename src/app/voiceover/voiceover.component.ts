import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FileParameter, STTService, TranscriptionResult, TTSService } from '../services/api.service';

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
  public stt!: TranscriptionResult[];
  public load: boolean = false;

  public constructor(
    private _sttService: STTService,
    private _ttsService: TTSService
  ) { }

  ngOnInit(): void { }

  public initFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.name = files[0].name;
    this.transcription = '';
    this.stt = [];
    this.load = false;

    if (!this.audioInput
      || !this.audioInput.nativeElement.files
      || this.audioInput.nativeElement.files.length === 0)
      return

    const file: File = this.audioInput.nativeElement.files[0];
    this.onSelectAudio.emit(file);

    const fileReader: FileReader = new FileReader();
    fileReader.onload = this.updateInputAudioPlayer.bind(this);
    fileReader.readAsDataURL(file);
  }

  public callApiSTTAll(files: FileList | null): void {
    this.load = true;
    if (!files || files.length === 0)
      return

    const file = files[0];

    var fileParam !: FileParameter;
    fileParam.fileName = file.name;
    fileParam.data = file;

    this._sttService.withAll(fileParam, null)
      .subscribe(
        result => {
          this.load = false;
          this.stt = result;
          this.audioInput.nativeElement.files = null;
        }
      );
  }

  public generateAudio(text: string): void {
    if (!text || text.length === 0)
    return
    
    this.transcription = text;
    
    this._ttsService.synthesize(this.transcription, 'google', 'en')
    .subscribe(
      result => {
        const fileReader: FileReader = new FileReader();
        fileReader.onload = this.updateOutputAudioPlayer.bind(this);
          fileReader.readAsDataURL(result.data);
        }
        );
      }

  private updateInputAudioPlayer(e: any): void {
    if (!this.inputAudioPlayer)
      return

    this.inputAudioPlayer.nativeElement.src = e.target.result;
    this.inputAudioPlayer.nativeElement.load();
  }

  private updateOutputAudioPlayer(e: any): void {
    if (!this.outputAudioPlayer)
      return

    this.outputAudioPlayer.nativeElement.src = e.target.result;
    this.outputAudioPlayer.nativeElement.load();
  }
}