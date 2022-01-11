import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { AuthKeyService } from './auth-key.service';
import { User } from './user.model';

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
  user = new Subject<User>();

  constructor(
    private http: HttpClient,
    // Create a auth-key.service.ts file under auth and return getWebAPIKey from it
    // API Key is copied from Firebase console > Project Overview > ProjectSettings
    private authKeyService: AuthKeyService
  ) {}

  login(email: string, password: string) {
    // Return subscribable
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.authKeyService.getWebAPIKey()}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((respData) => {})
      );
  }

  private handleAuthentication(
    email: string,
    token: string,
    expiresIn: number
  ) {}

  signup(email: string, password: string) {
    // Return subscribable
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.authKeyService.getWebAPIKey()}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResp: HttpErrorResponse) {
    let errorMessage = 'An Unknown Error Occurred';
    if (!errorResp.error || !errorResp.error.error) {
      return throwError(() => new Error(errorMessage));
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
      default:
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
