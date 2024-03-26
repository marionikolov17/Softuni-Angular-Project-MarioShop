import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: User | undefined;

  //userSubscription: Subscription;

  constructor(private httpClient: HttpClient) {}

  register(username: string, email: string, password: string, rePassword: string) {
    return this.httpClient.post('/api/auth/register', { username, email, password, rePassword });
  }

  login(email: string, password: string) {
    return this.httpClient.post('/api/auth/login', { email, password }).pipe(
      tap((response) => console.log(response)),
    );
  }

  logout() {}
}
