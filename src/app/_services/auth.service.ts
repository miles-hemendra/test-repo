import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const host = 'http://'+window.location.host;
const AUTH_API = host + '/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(contact: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      contact,
      password
    }, httpOptions);
  }

  loginUsingOTP(contact: string, otp: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      contact,
      otp
    }, httpOptions);
  }

  sendOTP(contact: string): Observable<any> {
    return this.http.post(AUTH_API + 'send-otp', {
      contact
    }, httpOptions);
  }
}