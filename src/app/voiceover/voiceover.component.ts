import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FileParameter, STTService, TranscriptionResult, TTSService } from '../services/api.service';

import { ToastrService } from 'ngx-toastr';
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
  public stt: TranscriptionResult[] = [];
  public loadSTT: boolean = false;
  public loadTTS: boolean = false;
  public autoplay: boolean = false;
  public waiting_audio = new Audio();

  public constructor(
    private _sttService: STTService,
    private _ttsService: TTSService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.waiting_audio.src = 'assets/audios/waiting_1.wav';
  }

  private reset(): void {
    this.transcription = '';
    this.loadSTT = false;
    this.loadTTS = false;
    this.stt = [];
  }

  public initFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.name = files[0].name;
    this.reset();

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
    this.loadSTT = true;
    this.waiting_audio.play();

    if (!files || files.length === 0)
      return

    const file = files[0];

    let fileParam: FileParameter = {
      fileName: file.name,
      data: file
    };

    const observation = this._sttService.withAll(fileParam, undefined);
    lastValueFrom(observation).then(
      result => {
        this.loadSTT = false;
        this.waiting_audio.pause();
        this.stt = result;
        this.audioInput.nativeElement.files = null;
      }
    ).catch(err => {
      this.loadSTT = false;
      this.waiting_audio.pause();
      this.toastr.error(err);
    });
  }

  public generateAudio(text: string, provider: string, language: string): void {
    if (!text || text.length === 0)
      return

    this.loadTTS = true;
    this.transcription = text;

    const observation = this._ttsService.synthesize(this.transcription, provider, language);
    lastValueFrom(observation).then(
      result => {
        const fileReader: FileReader = new FileReader();
        fileReader.onload = this.updateOutputAudioPlayer.bind(this);
        fileReader.readAsDataURL(result.data);
        this.loadTTS = false;
      }
    ).catch(err => {
      this.loadTTS = false;
      this.toastr.error(err);
    });
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

  public rankConfidence(value: (number | undefined)): string {
    let allConfidence: number[] = [];

    this.stt.forEach(transcript => {
      if (transcript.confidence !== undefined) {
        allConfidence.push(transcript.confidence)
      }
    });

    allConfidence.sort(function (a, b) { return b - a });

    if (value !== undefined)
      return this.ranking(allConfidence, value);

    return '';
  }

  public rankTime(value: (number | undefined)): string {
    let allTime: number[] = [];

    this.stt.forEach(transcript => {
      if (transcript.time !== undefined) {
        allTime.push(transcript.time)
      }
    });

    allTime.sort(function (a, b) { return a - b });

    if (value !== undefined)
      return this.ranking(allTime, value);

    return '';
  }

  private ranking(list: number[], value: number): string {
    let cssClass = '';

    if (list == undefined)
      return ''

    switch (list.indexOf(value)) {
      case 0:
        cssClass = 'top-1';
        break;
      case 1:
        cssClass = 'top-2';
        break;
      case 2:
        cssClass = 'top-3';
        break;
      default:
        cssClass = '';
        break;
    }

    return cssClass;
  }
}