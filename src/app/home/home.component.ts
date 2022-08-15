import { Component, OnInit } from '@angular/core';
import {User} from "../entity/user";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {StoreService} from "../service/store.service";
import {LoginComponent} from "../login/login.component";
import {ChangePasswordComponent} from "../change-password/change-password.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public storeService:StoreService, public router:Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /* Dialog zum holen der Dtaen aus dem Backend wird geöffnet. */
  getAllData(): void{
    this.dialog.open(LoginComponent);
  }

  /* Dialog zum ändern von Passwörtern wird geöffnet */
  changePassword(): void{
    this.dialog.open(ChangePasswordComponent)
  }

}
