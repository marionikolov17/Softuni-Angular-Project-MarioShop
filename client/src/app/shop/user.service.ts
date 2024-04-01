import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { User } from '../types/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: User | undefined;

  userSubscription: Subscription;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor(private httpClient: HttpClient, private router: Router) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });

    this.getCurrentUser();
  }

  getCurrentUser() {
    this.httpClient.get('/api/auth/user').subscribe({
      next: (response: any) => {
        this.user$$.next(response.data.user);
      },
      error: () => {
        return;
      }
    });
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string
  ) {
    return this.httpClient
      .post('/api/auth/register', {
        username,
        email,
        password,
        rePassword,
      })
      .pipe(
        tap((response: any) => {
          this.user$$.next(response.data.createdUser);
        })
      );
  }

  login(email: string, password: string) {
    return this.httpClient.post('/api/auth/login', { email, password }).pipe(
      tap((response: any) => {
        console.log(response);
        this.user$$.next(response.data.user);
      })
    );
  }

  logout() {
    this.user = undefined;
    return this.httpClient.get('/api/auth/logout').subscribe();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
