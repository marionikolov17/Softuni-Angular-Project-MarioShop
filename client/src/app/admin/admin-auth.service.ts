import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  user: User | undefined

  constructor(private httpClient: HttpClient) { }

  get isAdminLoggedIn() {
    return !!this.user && this.user?.isAdmin;
  }
}
