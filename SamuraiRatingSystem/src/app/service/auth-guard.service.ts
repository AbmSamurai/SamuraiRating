import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router/src/router_state';
import { DatabaseService } from './database.service';

@Injectable()
export class AuthGuard {

  constructor(
    private router: Router,
    private data: DatabaseService
  ) { }

  canActivate(router, state: RouterStateSnapshot) {
return this.data.user$.map(user => {
if (user) {return true;
} else {
  // , {queryParams: {returnUrl: state.url}  }
  this.router.navigate(['/login'] ) ;
  return false; }
});
 }



}
