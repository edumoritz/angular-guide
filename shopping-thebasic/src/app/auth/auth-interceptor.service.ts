import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';

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
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
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
