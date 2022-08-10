import {Injector, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {OKTA_CONFIG, OktaAuthGuard, OktaAuthModule, OktaCallbackComponent} from "@okta/okta-angular";
import {OktaAuth} from "@okta/okta-auth-js";

const oktaConfig = {
  issuer: 'https://dev-68978854.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/login/callback',
  clientId: '0oa64ei6qxeUUDuuv5d7',
  testing: {
    disableHttpsCheck: true
  }
};

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [OktaAuthGuard] },
  {
    path: 'login/callback',
    component: OktaCallbackComponent
  }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    OktaAuthModule
  ],
  exports: [RouterModule],
  providers: [
    {provide: OKTA_CONFIG,
      useFactory: () => {
        const oktaAuth = new OktaAuth(oktaConfig);
        return {
          oktaAuth,
          onAuthRequired: (oktaAuth: OktaAuth, injector: Injector) => {
            const triggerLogin = async () => {
              await oktaAuth.signInWithRedirect();
            };
            if (!oktaAuth.authStateManager.getPreviousAuthState()?.isAuthenticated) {
              // App initialization stage
              triggerLogin();
            }
          }
        }
      }}
  ]
})
export class AppRoutingModule { }
