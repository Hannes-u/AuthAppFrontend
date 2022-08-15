import {Inject, Injectable} from "@angular/core";
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
      const authToken = this.oktaAuth.getAccessToken();
    /* Jedem Request wird, der akktuelle Access Token angehängt. */
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
    return next.handle(req);
  }
}
