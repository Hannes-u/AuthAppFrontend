import { Injectable } from '@angular/core';
import {User} from "../entity/user";
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public router: Router) {}
  signUp(user: User): Observable<any> {
    let api = `${environment.apiUrl}/auth/signup`;
    return this.http.post(api, user);
  }
  signIn(username: string,password: string): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/login`, {username: username, password: password})
  }
  getToken() {
    return sessionStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = sessionStorage.getItem('access_token');
    return authToken !== null;
  }
  doLogout() {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => msg);
  }
}
