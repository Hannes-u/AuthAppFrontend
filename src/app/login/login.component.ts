import {Input, Component, Output, EventEmitter, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {OKTA_AUTH, OktaAuthStateService} from "@okta/okta-angular";
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth, public router: Router) {
  }

  async ngOnInit(){
    /* Falls der Nutzer schon authenthifiziert ist, wird er direkt auf die Hompage weitergeleitet */
    let isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (isAuthenticated){
      this.router.navigate(['home']);
    }
  }

  /* Methode um den User zum Authorization Server zu schicken.*/
  login() {
    this.oktaAuth.signInWithRedirect()
  }
}
