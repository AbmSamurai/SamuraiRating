import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabase, AngularFireList, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireModule } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TeamViewComponent } from './components/team-view/team-view.component';
import { NavComponent } from './components/nav/nav.component';
import { CardComponent } from './components/card/card.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TeamRegistrationComponent } from './components/registration/team-registration/team-registration.component';
import { PersonRegistrationComponent } from './components/registration/person-registration/person-registration.component';
import { AdminRegistrationComponent } from './components/registration/admin-registration/admin-registration.component';
import { DatabaseService } from './service/database.service';
import { AuthGuard } from './service/auth-guard.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SafePipe } from './pipe/safe.pipe';
import { TeamReviewComponent } from './components/team-review/team-review.component';


export const config  = {
  apiKey: 'AIzaSyADdYbrD14h7lBjRckwdUh5PoTwflXeVWk',
  authDomain: 'team-samurai.firebaseapp.com',
  databaseURL: 'https://team-samurai.firebaseio.com',
  projectId: 'team-samurai',
  storageBucket: 'team-samurai.appspot.com',
  messagingSenderId: '384709575367'

};

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
    AdminRegistrationComponent,TeamReviewComponent,
    TeamViewComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
  ], 
  providers: [
    DatabaseService,
    AuthGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
