import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  // Couldn't set it to null
  error?: string;
  obsAuth?: Observable<AuthResponseData>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.obsAuth = this.authService.login(email, password);
    } else {
      this.isLoading = true;
      this.obsAuth = this.authService.signup(email, password);
    }

    this.obsAuth.subscribe({
      next: (respData) => {
        console.log(respData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
      },
    });

    form.reset();
  }
}
