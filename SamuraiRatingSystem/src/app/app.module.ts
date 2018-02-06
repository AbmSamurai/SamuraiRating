import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent } from './components/nav/nav.component';
import { CardComponent } from './components/card/card.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TeamRegistrationComponent } from './components/registration/team-registration/team-registration.component';
import { PersonRegistrationComponent } from './components/registration/person-registration/person-registration.component';
import { AdminRegistrationComponent } from './components/registration/admin-registration/admin-registration.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    DashboardComponent,
    NavComponent,
    CardComponent,
    RegistrationComponent,
    TeamRegistrationComponent,
    PersonRegistrationComponent,
    AdminRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
