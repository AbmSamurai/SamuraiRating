import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { TeamViewComponent } from './components/team-view/team-view.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    TeamViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
