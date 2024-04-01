import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: User | undefined;

  userSubscription: Subscription;

  constructor(private httpClient: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });

    this.getCurrentAdmin();
  }

  get isAdminLoggedIn() {
    return !!this.user && this.user?.isAdmin;
  }

  getCurrentAdmin() {
    this.httpClient.get('/api/auth/admin').subscribe({
      next: (response: any) => {
        this.user$$.next(response.data.user);
      },
      error: () => {
        return;
      }
    });
  }

  login(email: string, password: string) {
    return this.httpClient
      .post('/api/auth/admin-login', { email, password })
      .pipe(tap((response: any) => {
        this.user$$.next(response.data.user);
      }));
  }

  logout() {
    this.user = undefined;
    return this.httpClient.get("/api/auth/admin-logout").subscribe();
  }

  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
  }
}
