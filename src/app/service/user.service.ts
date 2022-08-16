import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private http: HttpClient, public router: Router) {}

  getUserInformation(username: string, password: string): Observable<any> {
    /* Setzen von Basic Auth Header*/
    let usernamePassword = username+':'+password
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(usernamePassword)
      })
    };
    let api = `${environment.apiUrl}/user/getMyInformation`;
    return this.http.get(api,httpOptions);
    }

  getAllUserInformation(username: string, password: string): Observable<any> {
    /* Setzen von Basic Auth Header*/
    let usernamePassword = username+':'+password
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(usernamePassword)
      })
    };
    let api = `${environment.apiUrl}/user/all`;
    return this.http.get(api,httpOptions);
  }

  changePassword(username: string, oldPassword: string, newPassword:string): Observable<any> {
    /* Setzen von Basic Auth Header*/
    let usernamePassword = username+':'+oldPassword
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(usernamePassword)
      })
    };
    let api = `${environment.apiUrl}/user/changePassword`;
    return this.http.put(api,{"password":newPassword},httpOptions);
  }
}
