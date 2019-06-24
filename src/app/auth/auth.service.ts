import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private storage: Storage) { }
  AUTH_SERVER_ADDRESS: string = 'http://localhost:3000';
  AUTH_TOKEN: any;
  EXPIRES_IN: any;
  
  authSubject = new BehaviorSubject(false);
  hasValidAuthToken() {
    if (this.AUTH_TOKEN){
      return true;
    } else{
      return false;
    }
    // return this.storage.get('ACCESS_TOKEN').then((token) => {
    //   if (token) {
    //     this.storage.get('EXPIRES_IN').then((expiry) => {
    //       if (expiry > Date.now()) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     });
    //   }
    // });
  }
  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res: AuthResponse) => {

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.AUTH_TOKEN = res.user.access_token;
          this.EXPIRES_IN = res.user.expires_in;
          this.authSubject.next(true);
        }
      })
    );
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res: AuthResponse) => {
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.AUTH_TOKEN = res.user.access_token;
          this.EXPIRES_IN = res.user.expires_in;
          this.authSubject.next(true);
        }
      })
    );
  }
}
