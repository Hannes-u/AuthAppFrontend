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



  /* Mithilfe der im Dialog eingeben Anmeldedaten werden 2 Requests um die Nutzerdaten, aus dem Backend zu bekommen geschickt*/
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
          /* Falls, dass holen der Daten erfolgreich war, werden diese in einem Store gespeichert.
          * die Hauptkomponente kann sich die Daten anschließend aus dem Store ziehen*/
          this.storeService.setUserInformation(value);
        },
        error: err => {
          // Falls die Anfrage einen Fehler als Antwort bekommt, wird ausgegebn dass die Credentials falsch waren.
          this.isError = true;
          this.message= "Wrong Credentials!"
          }
      })
}

  getAllUserData(username: string, password: string): void {
    this.userService.getAllUserInformation(username, password)
      .subscribe({
        next: value => {
          /* Falls, dass holen der Daten erfolgreich war, werden diese in einem Store gespeichert.
          * die Hauptkomponente kann sich die Daten anschließend aus dem Store ziehen*/
          this.storeService.setAllUserInformation(value);
          this.isSucess = true;
          this.isError = false;
          this.message= "Request was successful! You can close the Dialog now :)";
        },
        error: err => {
          // Falls die Anfrage einen Fehler als Antwort bekommt, wird ausgegebn dass die Credentials falsch waren.
            this.isError = true;
            this.message= "Wrong Credentials!";
          }
      })
  }
}
