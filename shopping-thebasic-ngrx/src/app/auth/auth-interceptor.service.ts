import { AppState } from './../store/app.reducer';
import { Store } from '@ngrx/store';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import * as fromApp from '../store/app.reducer';

/**
 * operator take: recebe um parametro numerico
 * take(1): capturar apenas 1 valor do observable e depois realizar unsubscribe
 *
 * operator exhaustMap: Map de observable, Aguarda o primeiro observable completar,
 * recebe os dados desse observable anterior e podemos retornar um novo observable
 * substituindo o anterior.
 *
 * isso foi feito apenas para passar o user.token como parametro para rota autenticada.
 */
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)})
        return next.handle(modifiedReq)

      })
    )
  }
}
