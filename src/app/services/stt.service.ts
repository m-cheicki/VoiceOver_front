import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from './services.config';

export type SttProvider = 'ibm' | 'assembly' | 'rev';

export interface ISttResponse {
  provider: SttProvider;
  result: string;
  confidence: number;
  time: number;
}

@Injectable({
  providedIn: 'root'
})
export class SttService {

  private readonly _sttBaseUrl: string;

  public constructor(
    private _http: HttpClient,
    @Inject(API_BASE_URL) private _baseUrl: string
  ) {
    this._sttBaseUrl = this._baseUrl + '/stt/';
  }

  public transcribeWithProvider(file: File, provider:  SttProvider): Promise<ISttResponse> {
    const provider_encoded = encodeURIComponent(provider);

    let url: string = `${this._sttBaseUrl}`;
    url += `?provider=${provider_encoded}`;

    let formData: FormData = new FormData();
    formData.append('audio', file, file.name);

    let response =  this._http.post<ISttResponse>(url, formData);
    return firstValueFrom(response)
  }

  public transcribeWithAll(file: File): Promise<ISttResponse[]> {
    let url: string = `${this._sttBaseUrl}all`;

    let formData: FormData = new FormData();
    formData.append('audio', file, file.name);

    let response =  this._http.post<ISttResponse[]>(url, formData);
    return firstValueFrom(response)
  }
}
