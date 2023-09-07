import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const host = 'http://'+window.location.host;
const API_URL = host + '/api/camera/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private http: HttpClient) { }

  getAllCameras(): Observable<any> {
    return this.http.get(API_URL + 'all-camera');
  }

}
