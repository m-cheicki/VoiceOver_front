import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from './services.config';

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  private readonly _ttsBaseUrl: string;

  public constructor(
    private _http: HttpClient,
    @Inject(API_BASE_URL) private _baseUrl: string
  ) {
    this._ttsBaseUrl = this._baseUrl + '/tts/';
  }

  public tts(text: string): Promise<Blob> {
    const text_encoded = encodeURIComponent(text);

    let url: string = `${this._ttsBaseUrl}`;
    url += `?text=${text_encoded}`;

    let response =  this._http.get(url, { responseType: 'blob' });
    return firstValueFrom(response)
  }
}
