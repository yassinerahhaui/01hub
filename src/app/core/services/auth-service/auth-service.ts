import { inject, Injectable } from '@angular/core';
import { LoginModel } from '../../models/login-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'https://learn.zone01oujda.ma/api/auth/signin';
  private http = inject(HttpClient); 
  login(loginData: LoginModel) {
    // Implement login logic here
    const logData = `Basic ${btoa(`${loginData.email}:${loginData.password}`)}`;
    const headers = { Authorization: logData };
    try {
      return this.http.post(this.loginUrl, {}, { headers });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
  
  logout() {
    // Implement logout logic here
  }
}
