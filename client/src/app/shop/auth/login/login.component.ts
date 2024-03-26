import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder, private userService: UserService) {}

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    /* Login logic here */
    this.userService.login(this.loginForm.value.email || "", this.loginForm.value.password || "").subscribe(() => {

    });
  }
}
