import { Component, OnInit } from '@angular/core';
import {User} from "../entity/user";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users!: User[];
  currentUser!: User;
  isAdmin = false;

  constructor(public userService:UserService, public router:Router, public authService:AuthService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void{
    this.getCurrentUserData();
    this.getAllUserData();
  }

  getCurrentUserData(): void{
    this.userService.getUserInformation()
      .subscribe({
        next: value => {
          this.currentUser = value;
        },
        error: err => {

          this.router.navigate(["/login"]);
          this.authService.doLogout();
        }
      })
  }

  getAllUserData(): void{
    this.userService.getAllUserInformation()
      .subscribe({
        next: value => {
          this.users = value;
          this.isAdmin = true;
        },
        error: err => {
          if (err.status === 403){
            this.isAdmin = false;
          }else {
            this.router.navigate(["/login"]);
            this.authService.doLogout();
          }
        }
      })
  }

}
