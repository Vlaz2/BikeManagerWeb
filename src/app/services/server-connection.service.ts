import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {

  private BASE_URL: string = "https://localhost:5001/api";

  constructor(private http: HttpClient) { }

  public getQuery(url: string, params?: URLSearchParams) {
    let queryURL: string = `${this.BASE_URL}${url}`;
    let headers = this.bindHeadersToRequestModel();
    return this.http.get(queryURL, { headers: headers })
  }

  public postQuery(url: string, object: any, params?: URLSearchParams) {
    let queryURL: string = `${this.BASE_URL}${url}`;
    let headers = this.bindHeadersToRequestModel();
    return this.http.post(queryURL, object, { headers: headers })
  }

  public putQuery(url: string, object: any, params?: URLSearchParams) {
    let queryURL: string = `${this.BASE_URL}${url}`;
    let headers = this.bindHeadersToRequestModel();
    return this.http.put(queryURL, object, { headers: headers })
  }

  public deleteQuery(url: string,data?:any) {
    let queryURL: string = `${this.BASE_URL}${url}`;
    let headers = this.bindHeadersToRequestModel();
    return this.http.delete(queryURL,{ headers: headers });
  }


  private bindHeadersToRequestModel(): HttpHeaders {
    let _headers = new HttpHeaders();
    _headers = _headers.set('Accept', 'application/json');
    _headers = _headers.append("Access-Control-Allow-Origin", "*");
    _headers = _headers.append("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    _headers = _headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    _headers = _headers.append('Content-Type', 'application/json');
    return _headers;
  }
}