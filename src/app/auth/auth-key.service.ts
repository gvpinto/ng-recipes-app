import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthKeyService {
  getWebAPIKey(): string {
    return environment.firebaseAPIKey;
  }
}
