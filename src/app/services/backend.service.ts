// src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../enivroments/enviroment'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl =environment.api_url
   accessToken :any;
  constructor(private http: HttpClient) {
    this.accessToken = localStorage.getItem('token')
  }

  getData(limit: number, offest: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken  // Replace with your token
    });
    return this.http.get( this.apiUrl + `contacts/${limit}/${offest}`, { headers });
  }

  createContact(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken  // Replace with your token  // Replace with your token
    });
    return this.http.post( this.apiUrl + 'contacts', data, { headers });
  }

  deleteContact(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken  // Replace with your token // Replace with your token
    });

    return this.http.delete(`${this.apiUrl + 'contacts/'}${id}`, { headers });
  }

  editContact(id: any, data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken  // Replace with your token
    });

    return this.http.put(`${this.apiUrl + 'contacts'}/${id}`,data, { headers });
  }

  login(data: any): Observable<any> {

    return this.http.post( this.apiUrl + 'users/login', data);
  }

  register(data: any): Observable<any> {

    return this.http.post( this.apiUrl + 'users/register', data);
  }
}
