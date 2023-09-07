import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

const host = 'http://'+window.location.host;
const ADMIN_API_URL = host + '/api/admin/';
const SI_API_URL = host + '/api/si/';
const USER_API_URL = host + '/api/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  getAdminDashboardData(): Observable<any> {
    return this.http.get(ADMIN_API_URL + 'dashboard-data');
  }

  getAllSubadmin(): Observable<any> {
    return this.http.get(host + '/api/all-subadmin');
  }

  addSubadmin(data: any): Observable<any> {
    return this.http.post(ADMIN_API_URL + 'add-subadmin', data);
  }

  getAllSI(): Observable<any> {
    return this.http.get(host + '/api/all-si');
  }

  addSI(data: any): Observable<any> {
    return this.http.post(ADMIN_API_URL + 'add-si', data);
  }

  getSIDashboardData(): Observable<any> {
    return this.http.get(SI_API_URL + 'dashboard-data');
  }

  editUser(data: any): Observable<any> {
    return this.http.post('/api/edit-user', data);
  }

  getUserDashboardData(): Observable<any> {
    return this.http.get(USER_API_URL + 'dashboard-data');
  }

  getUserData(): Observable<any> {
    return this.http.get(USER_API_URL + 'get-user-details');
  }

  setUserSI(contact: any): Observable<any> {
    return this.http.post(USER_API_URL + 'set-si', {contact: contact});
  }

  setUserPI(data: any): Observable<any> {
    return this.http.post(USER_API_URL + 'set-pi', data);
  }

  setUserCamera(data: any): Observable<any> {
    return this.http.post(USER_API_URL + 'set-camera', data);
  }

  setUserPlan(plan: any): Observable<any> {
    return this.http.post(USER_API_URL + 'set-plan', plan);
  }

  getUserCases(status: string): Observable<any> {
    return this.http.get(USER_API_URL + status+'-cases');
  }

  getSICases(status: string): Observable<any> {
    return this.http.get(SI_API_URL + status+'-cases');
  }

  setCaseOpen(caseId: number): Observable<any> {
    console.log('caseId', caseId);
    return this.http.post(SI_API_URL + 'set-case-open', {caseId: caseId});
  }

  setCaseClose(caseId: number): Observable<any> {
    return this.http.post(SI_API_URL + 'set-case-close', {caseId: caseId});
  }

  getSiUsers(): Observable<any> {
    return this.http.get(SI_API_URL + 'all-customers');
  }

  updateProfile(formData: any): Observable<any> {
    return this.http.post('/api/update-profile', formData);
  }

  sendOTPForContactUpdate(contact: number): Observable<any> {
    return this.http.post('/api/send-otp-for-contact-update', {contact: contact});
  }

  updateContact(contact: number, otp: number): Observable<any> {
    return this.http.post('/api/update-contact', {contact: contact, otp: otp});
  }

  checkCurrPassword(password: string): Observable<any> {
    return this.http.post('/api/check-curr-password', {password: password});
  }

  updatePassword(password: string): Observable<any> {
    return this.http.post('/api/update-password', {password: password});
  }

  checkEmailExists(email: string): Observable<any> {
    return this.http.post('/api/check-email-exists', {email: email});
  }

  checkContactExists(contact: string): Observable<any> {
    return this.http.post('/api/check-contact-exists', {contact: contact});
  }

  getImagePath(id: number): Observable<any> {
    return this.http.post('/api/get-image-path', {id: id});
  }

  // setUserSI(contact, )
}
