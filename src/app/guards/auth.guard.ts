import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  token: any
  constructor(private router: Router) {
    this.token= localStorage.getItem('token');
  }
  canActivate(): boolean {
     this.token= localStorage.getItem('token');
    if (this.token) {
      return true
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
