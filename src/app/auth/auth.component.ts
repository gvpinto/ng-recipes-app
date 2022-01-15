import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
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
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost?: PlaceholderDirective;
  obsAuth?: Observable<AuthResponseData>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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
        this.showErrorAlert(error.message);
        this.isLoading = false;
      },
    });

    form.reset();
  }

  onHandleError() {
    this.error = undefined;
  }

  showErrorAlert(message: string) {
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    // Access to the location in the DOM
    const hostViewContainerRef = this.alertHost?.viewContainerRef;

    //Clear everything before rendering
    hostViewContainerRef?.clear();

    hostViewContainerRef?.createComponent(alertComponentFactory);
  }
}
