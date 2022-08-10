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
    let isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (isAuthenticated){
      this.router.navigate(['home']);
    }
  }


  login() {
    this.oktaAuth.signInWithRedirect()
  }
}
