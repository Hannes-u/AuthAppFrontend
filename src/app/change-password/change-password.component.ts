import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {StoreService} from "../service/store.service";
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  isError = false;
  isSucess = false;
  message = "";

  constructor(public userService: UserService, public router: Router, public storeService: StoreService, public dialogRef: MatDialogRef<ChangePasswordComponent>) {
  }

  ngOnInit(): void {
    this.isError = false;
    this.isSucess = false;
  }

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.max(255)]),
    oldPassword: new FormControl('', [Validators.required, Validators.max(255)]),
    newPassword: new FormControl('', [Validators.required, Validators.max(255)]),
  });



  submit() {
    if (this.form.valid) {
      this.changePassword(this.form.value.username,this.form.value.oldPassword,this.form.value.newPassword);
      this.form.reset();
    }

  }

  changePassword(username: string, oldPassword: string, newPassword :string): void {
    this.userService.changePassword(username,oldPassword,newPassword)
      .subscribe({
        next: value => {
          this.message = "Password Change was successful!";
          this.isError = false;
          this.isSucess = true;
        },
        error: err => {
          this.isSucess = false;
          this.isError = true;
          if (err.status == 400){
            this.message = "New Passord dosent match the Passoword Policy! \n" + err.error;
          }else {
            this.message = "Wrong Old Password!"
          }
        }
      })
  }

}
