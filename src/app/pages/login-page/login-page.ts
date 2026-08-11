import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import {LoginModel} from '../../core/models/login-model';

@Component({
  selector: 'app-login-page',
  imports: [FormField, FormRoot],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  loginData = signal<LoginModel>({
    email: '',
    password: '',
  });
  loginForm = form(this.loginData,(schema) => {
    required(schema.email, { message: 'Email OR username is required' });
    required(schema.password, { message: 'Password is required' });
  });

  onSubmit() {
    if (this.loginForm().valid()) {
      console.log('Form submitted:', this.loginData());
    } else {
      console.log('Form is invalid');
    }
  }
}
