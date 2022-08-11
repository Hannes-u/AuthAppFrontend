import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {StoreService} from "../service/store.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isError = false;
  isSucess = false;
  message = "";

  constructor(public userService: UserService, public router: Router, public storeService: StoreService, public dialogRef: MatDialogRef<LoginComponent>) {
  }

  ngOnInit(): void {
    this.isError = false;
    this.isSucess = false;
  }

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.max(255)]),
    password: new FormControl('', [Validators.required, Validators.max(255)]),
  });



  submit() {
    if (this.form.valid) {
      this.getCurrentUserData(this.form.value.username,this.form.value.password);
      this.getAllUserData(this.form.value.username,this.form.value.password);
      this.form.reset()
    }

  }

  getCurrentUserData(username: string, password: string): void {
    this.userService.getUserInformation(username, password)
      .subscribe({
        next: value => {
          this.storeService.setUserInformation(value);
        },
        error: err => {
          this.isError = true;
          this.message= "Wrong Credentials!"
          }
      })
}

  getAllUserData(username: string, password: string): void {
    this.userService.getAllUserInformation(username, password)
      .subscribe({
        next: value => {
          this.storeService.setAllUserInformation(value);
          this.storeService.setIsAdmin(true);
          this.isSucess = true;
          this.isError = false;
          this.message= "Request was successful! You can close the Dialog now :)";
        },
        error: err => {
            this.isError = true;
            this.message= "Wrong Credentials!";
          }
      })
  }
}
