import { Component, OnInit } from '@angular/core';
import {User} from "../entity/user";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {Dialog} from "@angular/cdk/dialog";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordComponent} from "../change-password/change-password.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users!: User[];
  currentUser!: User;

  constructor(public userService:UserService, public router:Router, public authService:AuthService, public dialog: MatDialog) { }

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
          /* Falls der Access Token ungültig ist, wird wieder auf die Anmeldeseite redirected und der akktuelle Acess Token gelöscht.*/
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
        },
        error: err => {
          /* Falls der Access Token ungültig ist, wird wieder auf die Anmeldeseite redirected und der akktuelle Acess Token gelöscht.*/
            this.router.navigate(["/login"]);
            this.authService.doLogout();
        }
      })
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }
}
