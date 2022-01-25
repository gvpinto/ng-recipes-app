import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthKeyService } from '../auth-key.service';
import * as AuthActions from '../store/auth.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string; //A Firebase Auth ID token for the newly created user.
  email: string; //The email for the newly created user.
  refreshToken: string; //A Firebase Auth refresh token for the newly created user.
  expiresIn: string; //The number of seconds in which the ID token expires.
  localId: string; //The uid of the newly created user.
  registered?: boolean; //Whether the email is for an existing account.
}
@Injectable()
export class AuthEffects {
  // This effect observable should never die
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    // Creates a new Observable
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.authKeyService.getWebAPIKey()}`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          // map automatically returns an observable
          map((resData) => {
            // + sign to convert to nummeric
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );

            return new AuthActions.Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate: expirationDate,
            });
          }),
          catchError((errorResp) => {
            // Should return a non error Observable so the action$.pop Observable does not die.
            let errorMessage = 'An Unknown Error Occurred';
            if (!errorResp.error || !errorResp.error.error) {
              return of(new AuthActions.LoginFail(errorMessage));
            }
            switch (errorResp.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists';
                break;
              case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exists';
                break;
              case 'INVALID_PASSWORD':
                errorMessage = 'Password is invalid';
                break;
              case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'Too many attempts';
                break;
              default:
                break;
            }
            return of(new AuthActions.LoginFail(errorMessage));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    // After successful login
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/']);
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authKeyService: AuthKeyService,
    private router: Router
  ) {}
}
