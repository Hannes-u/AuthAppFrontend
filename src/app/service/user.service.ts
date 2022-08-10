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
    let usernamePassword = username+':'+password
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(usernamePassword)
      })
    };
    console.log(password)
    let api = `${environment.apiUrl}/user/getMyInformation`;
    console.log(httpOptions)
    return this.http.get(api,httpOptions);
    }

  getAllUserInformation(username: string, password: string): Observable<any> {
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
}
