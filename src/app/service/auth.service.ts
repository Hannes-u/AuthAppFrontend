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
}
