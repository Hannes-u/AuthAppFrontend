import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  isError = false;
  isSucess = false;
  message = "";

  constructor(public userService: UserService, public router: Router, public dialogRef: MatDialogRef<ChangePasswordComponent>) {
  }

  ngOnInit(): void {
    this.isError = false;
    this.isSucess = false;
  }

  form: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.max(255)]),
    newPassword: new FormControl('', [Validators.required, Validators.max(255)]),
  });



  submit() {
    if (this.form.valid) {
      this.changePassword(this.form.value.oldPassword,this.form.value.newPassword);
      this.form.reset();
    }

  }

  changePassword(oldPassword: string, newPassword :string): void {
    this.userService.changePassword(oldPassword,newPassword)
      .subscribe({
        next: value => {
          this.message = "Password Change was successful!";
          this.isError = false;
          this.isSucess = true;
        },
        error: err => {
          this.isSucess = false;
          this.isError = true;
          console.log(err)
          if (err.status == 400){
            this.message = "New Password dosent match the Password Policy! \n" + err.error;
          }else {
            this.message = "Wrong Old Password!"
          }
        }
      })
  }

}
