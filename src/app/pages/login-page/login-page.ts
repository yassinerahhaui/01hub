import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import {LoginModel} from '../../core/models/login-model';
import { AuthService } from '../../core/services/auth-service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [FormField, FormRoot],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  serverError = signal<string | null>(null);

  loginData = signal<LoginModel>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginData,(schema) => {
    required(schema.email, { message: '(Email OR username) is required!' });
    required(schema.password, { message: 'Password is required!' });
  });

  onSubmit() {
    if (this.loginForm().valid()) {
      this.serverError.set(null);
      this.authService.login(this.loginData()).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => this.serverError.set('Invalid email or password. Please try again.')
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
