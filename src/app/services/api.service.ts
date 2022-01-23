/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.15.5.0 (NJsonSchema v10.6.6.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class STTService {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "/api";
  }

  /**
   * Transcribe audio file
   * @param x_Fields (optional) An optional fields mask
   * @return Success
   */
  withAll(audio_wav: FileParameter, x_Fields: string | null | undefined): Observable<TranscriptionResult[]> {
    let url_ = this.baseUrl + "/recognize/withAll";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = new FormData();
    if (audio_wav === null || audio_wav === undefined)
      throw new Error("The parameter 'audio_wav' cannot be null.");
    else
      content_.append("audio/wav", audio_wav.data, audio_wav.fileName ? audio_wav.fileName : "audio/wav");

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "X-Fields": x_Fields !== undefined && x_Fields !== null ? "" + x_Fields : "",
        "Accept": "application/json"
      })
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processWithAll(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processWithAll(<any>response_);
        } catch (e) {
          return <Observable<TranscriptionResult[]>><any>_observableThrow(e);
        }
      } else
        return <Observable<TranscriptionResult[]>><any>_observableThrow(response_);
    }));
  }

  protected processWithAll(response: HttpResponseBase): Observable<TranscriptionResult[]> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [] as any;
          for (let item of resultData200)
            result200!.push(TranscriptionResult.fromJS(item));
        }
        else {
          result200 = <any>null;
        }
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf(<any>null);
  }

  /**
   * Transcribe audio file
   * @param provider (optional) The provider to perform of the transcription.
   * @param language (optional) The language of the audio file.
   * @param x_Fields (optional) An optional fields mask
   * @return Success
   */
  withOne(audio_wav: FileParameter, provider: string | null | undefined, language: string | null | undefined, x_Fields: string | null | undefined): Observable<TranscriptionResult> {
    let url_ = this.baseUrl + "/recognize/withOne?";
    if (provider !== undefined && provider !== null)
      url_ += "provider=" + encodeURIComponent("" + provider) + "&";
    if (language !== undefined && language !== null)
      url_ += "language=" + encodeURIComponent("" + language) + "&";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = new FormData();
    if (audio_wav === null || audio_wav === undefined)
      throw new Error("The parameter 'audio_wav' cannot be null.");
    else
      content_.append("audio/wav", audio_wav.data, audio_wav.fileName ? audio_wav.fileName : "audio/wav");

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "X-Fields": x_Fields !== undefined && x_Fields !== null ? "" + x_Fields : "",
        "Accept": "application/json"
      })
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processWithOne(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processWithOne(<any>response_);
        } catch (e) {
          return <Observable<TranscriptionResult>><any>_observableThrow(e);
        }
      } else
        return <Observable<TranscriptionResult>><any>_observableThrow(response_);
    }));
  }

  protected processWithOne(response: HttpResponseBase): Observable<TranscriptionResult> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TranscriptionResult.fromJS(resultData200);
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf(<any>null);
  }
}

@Injectable({
  providedIn: 'root'
})
export class TTSService {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "/api";
  }

  /**
   * @param text The text to synthesize.
   * @param provider The provider to perform of the synthesis.
   * @param language (optional) The language of the text.
   * @return Success
   */
  synthesize(text: string, provider: string, language: string | null | undefined): Observable<FileResponse> {
    let url_ = this.baseUrl + "/synthesize/";
    url_ = url_.replace(/[?&]$/, "");

    let content_ = "";
    if (text === undefined || text === null)
      throw new Error("The parameter 'text' must be defined and cannot be null.");
    else
      content_ += encodeURIComponent("text") + "=" + encodeURIComponent("" + text) + "&";
    if (provider === undefined || provider === null)
      throw new Error("The parameter 'provider' must be defined and cannot be null.");
    else
      content_ += encodeURIComponent("provider") + "=" + encodeURIComponent("" + provider) + "&";
    if (language !== undefined)
      content_ += encodeURIComponent("language") + "=" + encodeURIComponent("" + language) + "&";
    content_ = content_.replace(/&$/, "");

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/octet-stream"
      })
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processSynthesize(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processSynthesize(<any>response_);
        } catch (e) {
          return <Observable<FileResponse>><any>_observableThrow(e);
        }
      } else
        return <Observable<FileResponse>><any>_observableThrow(response_);
    }));
  }

  protected processSynthesize(response: HttpResponseBase): Observable<FileResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200 || status === 206) {
      const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
      const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
      const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
      return _observableOf({ fileName: fileName, data: <any>responseBlob, status: status, headers: _headers });
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf(<any>null);
  }
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "/api";
  }

  /**
   * @param text The text to translate.
   * @param provider The provider to perform of the translation.
   * @param language (optional) The language of the text.
   * @param x_Fields (optional) An optional fields mask
   * @return The translation result.
   */
  translate(text: string, provider: string, language: string | null | undefined, x_Fields: string | null | undefined): Observable<TranslationResult> {
    let url_ = this.baseUrl + "/translate/";
    url_ = url_.replace(/[?&]$/, "");

    let content_ = "";
    if (text === undefined || text === null)
      throw new Error("The parameter 'text' must be defined and cannot be null.");
    else
      content_ += encodeURIComponent("text") + "=" + encodeURIComponent("" + text) + "&";
    if (provider === undefined || provider === null)
      throw new Error("The parameter 'provider' must be defined and cannot be null.");
    else
      content_ += encodeURIComponent("provider") + "=" + encodeURIComponent("" + provider) + "&";
    if (language !== undefined)
      content_ += encodeURIComponent("language") + "=" + encodeURIComponent("" + language) + "&";
    content_ = content_.replace(/&$/, "");

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "X-Fields": x_Fields !== undefined && x_Fields !== null ? "" + x_Fields : "",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      })
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processTranslate(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processTranslate(<any>response_);
        } catch (e) {
          return <Observable<TranslationResult>><any>_observableThrow(e);
        }
      } else
        return <Observable<TranslationResult>><any>_observableThrow(response_);
    }));
  }

  protected processTranslate(response: HttpResponseBase): Observable<TranslationResult> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TranslationResult.fromJS(resultData200);
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf(<any>null);
  }
}

export class TranslationResult implements ITranslationResult {
  /** The source text. */
  source?: string | undefined;
  /** The translated text. */
  translation?: string | undefined;
  /** The provider of the translated text. */
  provider?: string | undefined;
  /** The language of the translated text. */
  language?: string | undefined;

  constructor(data?: ITranslationResult) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.source = _data["source"];
      this.translation = _data["translation"];
      this.provider = _data["provider"];
      this.language = _data["language"];
    }
  }

  static fromJS(data: any): TranslationResult {
    data = typeof data === 'object' ? data : {};
    let result = new TranslationResult();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["source"] = this.source;
    data["translation"] = this.translation;
    data["provider"] = this.provider;
    data["language"] = this.language;
    return data;
  }
}

export interface ITranslationResult {
  /** The source text. */
  source?: string | undefined;
  /** The translated text. */
  translation?: string | undefined;
  /** The provider of the translated text. */
  provider?: string | undefined;
  /** The language of the translated text. */
  language?: string | undefined;
}

export class TranscriptionResult implements ITranscriptionResult {
  /** The transcription of the audio. */
  transcription?: string | undefined;
  /** The provider of the transcription. */
  provider?: string | undefined;
  /** The confidence of the transcription. */
  confidence?: number | undefined;
  /** Execution time of the transcription. */
  time?: number | undefined;

  constructor(data?: ITranscriptionResult) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.transcription = _data["transcription"];
      this.provider = _data["provider"];
      this.confidence = _data["confidence"];
      this.time = _data["time"];
    }
  }

  static fromJS(data: any): TranscriptionResult {
    data = typeof data === 'object' ? data : {};
    let result = new TranscriptionResult();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["transcription"] = this.transcription;
    data["provider"] = this.provider;
    data["confidence"] = this.confidence;
    data["time"] = this.time;
    return data;
  }
}

export interface ITranscriptionResult {
  /** The transcription of the audio. */
  transcription?: string | undefined;
  /** The provider of the transcription. */
  provider?: string | undefined;
  /** The confidence of the transcription. */
  confidence?: number | undefined;
  /** Execution time of the transcription. */
  time?: number | undefined;
}

export interface FileParameter {
  data: any;
  fileName: string;
}

export interface FileResponse {
  data: Blob;
  status: number;
  fileName?: string;
  headers?: { [name: string]: any };
}

export class ApiException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any; };
  result: any;

  constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
    return _observableThrow(result);
  else
    return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next("");
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = event => {
        observer.next((<any>event.target).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}