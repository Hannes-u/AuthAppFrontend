import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isError = false;
  errorMessage = "";

  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit(): void {
    this.isError = false;
  }

  form: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.max(255)]),
    password: new FormControl('',[Validators.required,Validators.max(255)]),
  });


  submit() {
    if (this.form.valid) {
      this.authService.signIn(this.form.value.username,this.form.value.password)
        .subscribe({
            next: value => {
              this.isError = false;
              sessionStorage.setItem('access_token', value.access_token);
              this.router.navigate(['home']);
              this.form.reset();
            },
          error: err => {
              console.log(err.status)
              this.isError = true;
              this.errorMessage = "Wrong Credentials";
              this.form.reset();
          },
          }
        )

    }
  }
}
