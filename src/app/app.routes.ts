import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';
import { authGuard } from './core/guards/auth/auth-guard';
import { guestGuard } from './core/guards/guest/guest-guard';

export const routes: Routes = [
  { path: '', component: HomePage, canActivate: [authGuard] },
  { path: 'login', component: LoginPage, canActivate: [guestGuard] }
];
