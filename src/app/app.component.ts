import {Component, Inject, OnInit} from '@angular/core';
import {OKTA_AUTH} from "@okta/okta-angular";
import {OktaAuth} from "@okta/okta-auth-js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'AuthAppFrontend';

  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth) {
  }

  async logout() {
    await this.oktaAuth.signOut();
  }



}
