import { CriteriaReviewComponent } from './components/criteria-review/criteria-review.component';
import { TeamReviewComponent } from './components/team-review/team-review.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { LogInComponent } from "./components/log-in/log-in.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { TeamViewComponent } from "./components/team-view/team-view.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LogInComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "registration",
    component: RegistrationComponent
  },{
    path: 'teamView',
    component: TeamViewComponent,
        // canActivate: [AuthGuard]
  },
  {
    path: "admin",
    component: CriteriaReviewComponent

  },{
    path:'review/:teamname',
    component:TeamReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
