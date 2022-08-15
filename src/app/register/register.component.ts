import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../entity/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isError = false;
  errorMessage = "";

  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit(): void {
    this.isError = false;
  }

  form: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.max(255)]),
    email: new FormControl('',[Validators.required,Validators.email,Validators.max(255)]),
    password: new FormControl('',[Validators.required,Validators.max(255)])
  });


  submit() {
    if (this.form.valid) {
      let user = new User();
      user.email = this.form.value.email;
      user.username = this.form.value.username;
      user.password = this.form.value.password;
      this.authService.signUp(user)
        .subscribe({
            next: value => {
              this.isError = false;
              this.router.navigate(['home']);
              this.form.reset();
            },
            error: err => {
              this.isError = true;
              this.errorMessage = err.error;
              this.form.reset();
            },
          }
        )

    }
  }

}
