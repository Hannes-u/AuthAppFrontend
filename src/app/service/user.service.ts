import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../entity/user";
import {catchError, Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public router: Router) {}

  getUserInformation(): Observable<any> {
    let api = `${environment.apiUrl}/user/getMyInformation`;
    return this.http.get(api);
  }

  getAllUserInformation(): Observable<any> {
    let api = `${environment.apiUrl}/user/all`;
    return this.http.get(api);
  }
}
