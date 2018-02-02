import { Injectable } from '@angular/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as Firebase from 'firebase/app';

@Injectable()
export class DatabaseService {

  constructor(private afAuth: AngularFireAuth) { }
  
  googlePopup() {
    const prov = new Firebase.auth.GoogleAuthProvider();

    this.afAuth.auth.signInWithPopup(prov).then(
        (success) => {

            alert('User added')

        }).catch(
        (err) => {
            console.log(err.message);
        });
}

}
