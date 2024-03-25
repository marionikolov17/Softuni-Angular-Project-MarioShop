import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordsMatch } from 'src/app/shared/validators/passwords-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    passGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      rePassword: ['', [Validators.required]]
    }, {
      validators: [passwordsMatch()]
    })
  });

  get passwords() {
    return this.registerForm.get('passGroup');
  }

  constructor(private fb: FormBuilder) {}

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    // Register logic here
  }
}
