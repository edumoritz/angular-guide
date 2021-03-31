import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const endpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_1yEjRbImYj2Zs6Xs4k3FK_zQu_xfY64';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post(endpoint, { email, password, returnSecureToken: true })
  }
}
