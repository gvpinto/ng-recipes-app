import * as AuthActions from './store/auth.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AuthKeyService } from './auth-key.service';
import { User } from './user.model';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

export interface AuthResponseData {
  kind: string;
  idToken: string; //A Firebase Auth ID token for the newly created user.
  email: string; //The email for the newly created user.
  refreshToken: string; //A Firebase Auth refresh token for the newly created user.
  expiresIn: string; //The number of seconds in which the ID token expires.
  localId: string; //The uid of the newly created user.
  registered?: boolean; //Whether the email is for an existing account.
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  // Replacing with NgRx
  //   user = new Subject<User>();
  // user = new BehaviorSubject<User>(null!);
  private tokenExpirationTimer: any;

  constructor(
    // Create a auth-key.service.ts file under auth and return getWebAPIKey from it
    // API Key is copied from Firebase console > Project Overview > ProjectSettings
    private authKeyService: AuthKeyService,
    private store: Store<fromApp.AppState>
  ) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
