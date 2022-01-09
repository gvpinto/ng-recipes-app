import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthKeyService } from './auth-key.service';

interface AuthResponseData {
  kind: string;
  idToken: string; //A Firebase Auth ID token for the newly created user.
  email: string; //The email for the newly created user.
  refreshToken: string; //A Firebase Auth refresh token for the newly created user.
  expiresIn: string; //The number of seconds in which the ID token expires.
  localId: string; //The uid of the newly created user.
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    // Create a auth-key.service.ts file under auth and return getWebAPIKey from it
    // API Key is copied from Firebase console > Project Overview > ProjectSettings
    private authKeyService: AuthKeyService
  ) {}
  signup(email: string, password: string) {
    // Return subscribable
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.authKeyService.getWebAPIKey()}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
