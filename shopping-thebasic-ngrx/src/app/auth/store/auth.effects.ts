import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { of } from 'rxjs';

const endpointSignUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`;
const endpointSignIn = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`;


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export class AuthEffects {
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(endpointSignIn, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      }).pipe(catchError(error => {
        of()
      }), map(resData => {
        of()
      }))
    })
  )

  constructor(private actions$: Actions, private http: HttpClient) {}
}
