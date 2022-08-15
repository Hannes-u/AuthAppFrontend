import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.authService.isLoggedIn){
      /* zu jedem Request wird wenn der Nutzer eingeloggt ist, wird der access token in den header hinzugefügt*/
      const authToken = this.authService.getToken();
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
    }
    return next.handle(req);
  }
}
