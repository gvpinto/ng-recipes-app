import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
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
  @Effect()
  // This effect observable should never die
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
          map((resData) => {
            // + sign to convert to nummeric
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            return of(
              new AuthActions.Login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: expirationDate,
              })
            );
          }),
          catchError((error) => {
            // Should return a non error Observable so the action$.pop Observable does not die.
            return of();
          })
        );
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authKeyService: AuthKeyService
  ) {}
}
