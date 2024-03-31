import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  user: User | undefined;

  constructor(private httpClient: HttpClient) {}

  get isAdminLoggedIn() {
    return !!this.user && this.user?.isAdmin;
  }

  login(email: string, password: string) {
    return this.httpClient
      .post('/api/auth/admin-login', { email, password })
      .pipe(tap((response: any) => {
        this.user = response.data.user;
      }));
  }

  logout() {
    this.user = undefined;
    return this.httpClient.get("/api/auth/admin-logout");
  }
}
