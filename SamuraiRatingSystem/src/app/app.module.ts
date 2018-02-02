import { DatabaseService } from './service/database.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireDatabaseModule } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';


import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

export const config  = {
  apiKey: "AIzaSyADdYbrD14h7lBjRckwdUh5PoTwflXeVWk",
  authDomain: "team-samurai.firebaseapp.com",
  databaseURL: "https://team-samurai.firebaseio.com",
  projectId: "team-samurai",
  storageBucket: "team-samurai.appspot.com",
  messagingSenderId: "384709575367"

};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
