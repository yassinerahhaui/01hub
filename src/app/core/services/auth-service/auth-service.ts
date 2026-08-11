import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginModel } from '../../models/login-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'https://learn.zone01oujda.ma/api/auth/signin';
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  login(loginData: LoginModel) {
    // Implement login logic here
    const logData = `Basic ${btoa(`${loginData.email}:${loginData.password}`)}`;
    const headers = new HttpHeaders({ Authorization: logData });
    return this.http.post(this.loginUrl,{}, {headers, responseType: 'text'}).pipe(
      tap((token: string) => {
        if (token && isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', token);
        }

      }),
      catchError((error)=> {
        console.error('Login failed:', error);
        return throwError(() => new Error('Login failed. Please check your credentials.'));
      })
    )

  }

  logout() {
    // Implement logout logic here
  }
}
