import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';
import * as AuthActions from './store/auth.actions';
import * as fromApp from '../store//app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  // Couldn't set it to null
  error?: string;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost?: PlaceholderDirective;
  obsAuth?: Observable<AuthResponseData>;
  private closeSub?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
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
      // Using NgRx Effects and Store
      // this.obsAuth = this.authService.login(email, password);
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      this.isLoading = true;
      this.obsAuth = this.authService.signup(email, password);
    }

    this.obsAuth?.subscribe({
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
    const componentRef = hostViewContainerRef?.createComponent(
      alertComponentFactory
    );

    // Interacting with the component
    componentRef!.instance.message = message;
    this.closeSub = componentRef!.instance.close.subscribe(() => {
      this.closeSub?.unsubscribe();
      hostViewContainerRef?.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub?.unsubscribe();
    }
  }
}
