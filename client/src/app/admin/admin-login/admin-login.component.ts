import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminAuthService } from '../admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  adminLoginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  isLoginError: boolean = false;

  constructor(private fb: FormBuilder, private adminAuthService: AdminAuthService, private router: Router) {}

  login() {
    if (this.adminLoginForm.invalid) {
      return
    }

    // Login logic here
    this.adminAuthService.login(this.adminLoginForm.value.email || "", this.adminLoginForm.value.password || "").subscribe({
      next: (response: any) => {
        if (!response.data.user.isAdmin) {
          this.isLoginError = true;
          return;
        }
        this.isLoginError = false;
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.isLoginError = true;
      }
    })
  }
}
