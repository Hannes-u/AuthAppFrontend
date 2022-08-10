import { Component, OnInit } from '@angular/core';
import {User} from "../entity/user";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {StoreService} from "../service/store.service";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public storeService:StoreService, public router:Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getAllData(): void{
    this.dialog.open(LoginComponent);
  }


}
