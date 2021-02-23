import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ProfileComponent } from './profile/profile.component';
import { AmisComponent } from './amis/amis.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard} from './auth.guard';

const appRoutes: Routes = [
  { path: 'inscription', component: InscriptionComponent},
  { path: 'connexion', component: ConnexionComponent},
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    ConnexionComponent,
    ProfileComponent,
    AmisComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
