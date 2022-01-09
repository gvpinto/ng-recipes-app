import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (this.isLoginMode) {
      // ...
    } else {
      if (!form.valid) {
        return;
      }
      const email = form.value.email;
      const password = form.value.password;
      this.authService.signup(email, password).subscribe({
        next: (respData) => {
          console.log(respData);
        },
        error: (error) => {
          console.log(error);
        },
      });
      form.reset();
    }
  }
}
