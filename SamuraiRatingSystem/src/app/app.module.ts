import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireDatabaseModule } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { TeamViewComponent } from './components/team-view/team-view.component';
import { AngularFireModule } from 'angularfire2';
import { DatabaseService } from './service/database.service';
import { AuthGuard } from './service/auth-guard.service';

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
    TeamViewComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ], 
  providers: [
    DatabaseService,
    AuthGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
