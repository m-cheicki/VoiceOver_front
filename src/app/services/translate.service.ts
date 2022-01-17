import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from './services.config';

export type TranslateLang = 'en' | 'fr'
export type TranslateProvider = 'google' | 'ibm'

export interface ITranslateResponse {
  source: string;
  translation: string;
  lang: string;
  provider: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private readonly _translateBaseUrl: string;

  public constructor(
    private _http: HttpClient,
    @Inject(API_BASE_URL) private _baseUrl: string
  ) {
    this._translateBaseUrl = this._baseUrl + '/translate/';
  }

  public translate(
      text: string, 
      lang: TranslateLang = 'en', 
      provider: TranslateProvider = 'ibm'): Promise<ITranslateResponse> {
    const text_encoded = encodeURIComponent(text);
    const lang_encoded = encodeURIComponent(lang);
    const provider_encoded = encodeURIComponent(provider);

    let url: string = `${this._translateBaseUrl}`;
    url += `?text=${text_encoded}`;
    url += `&lang=${lang_encoded}`;
    url += `&provider=${provider_encoded}`;

    let response =  this._http.get<ITranslateResponse>(url);
    return firstValueFrom(response)
  }
}
