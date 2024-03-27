import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | undefined;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor(private httpClient: HttpClient) {}

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string
  ) {
    return this.httpClient.post('/api/auth/register', {
      username,
      email,
      password,
      rePassword,
    }).pipe(
      tap((response: any) => {
        this.user = response.data.createdUser
      })
    )
  }

  login(email: string, password: string) {
    return this.httpClient.post('/api/auth/login', { email, password }).pipe(
      tap((response: any) => {
        console.log(response);
        this.user = response.data.user;
      })
    );
  }

  logout() {}
}
