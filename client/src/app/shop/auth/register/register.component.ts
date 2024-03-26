import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordsMatch } from 'src/app/shared/validators/passwords-match';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(4)]],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: [passwordsMatch()],
      }
    ),
  });

  get passwords() {
    return this.registerForm.get('passGroup');
  }

  isRegisterError: boolean = false;
  registerErrMsg: string | undefined = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    // Register logic here
    this.userService
      .register(
        this.registerForm.value.username || '',
        this.registerForm.value.email || '',
        this.registerForm.value.passGroup?.password || '',
        this.registerForm.value.passGroup?.rePassword || ''
      )
      .subscribe({
        next: () => {
          this.isRegisterError = false;
          this.registerErrMsg = '';
          this.router.navigate(['/shop']);
        },
        error: (err) => {
          this.isRegisterError = true;
          this.registerErrMsg = err.error.data.errorMessage;
          console.log(err);
        },
      });
  }
}
