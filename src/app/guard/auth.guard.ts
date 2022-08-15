import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    /* Der AuthGuard kann bei Komponenten hinzugefügt werden, für die nur nach Login zugriff gewährt werden soll.*/
    if (!this.authService.isLoggedIn) {
      /* Falls kein Access Token vorhanden ist, wird wieder auf die Anmeldeseite redirected.*/
      this.router.navigate(['login'])
    }
    return true;
  }
}
