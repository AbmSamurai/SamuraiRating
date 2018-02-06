import { Team } from './../model/Teams';
import { Member } from './../model/Member';
import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as Firebase from 'firebase/app';
// import from 'rxjs/operators/map'

@Injectable()
export class DatabaseService {
    userList;
    teamList;
    haveAccount: Boolean;
    teamKey;
    teams: Team[] = [];
  public user$: Observable<Firebase.User>;

    constructor(
        private afDB: AngularFireDatabase, 
        private afAuth: AngularFireAuth
        ) {
    this.user$ = afAuth.authState;

    // Lists all the users in the DB
    this.userList = this.afDB.list('Users').snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    // Lists all the teams in the DB
    this.teamList = this.afDB.list('Teams').snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });


    }

    loginWithGoogle() {

        const prov = new Firebase.auth.GoogleAuthProvider();

        this.afAuth.auth.signInWithPopup(prov).then(
            (success) => {

                // alert('User added');
                let flag: Boolean;
                // tslint:disable-next-line:no-shadowed-variable
                this.userList.forEach(element => {
                    for (let i = 0; i < element.length; i++) {
                        console.log(element[i].User + 'here');
                        if (element[i].User === this.getCurrentUsersID()) {
                            flag = false;
                            break;
                        }
                    }

                    if (flag === undefined) {
                        alert('User added');

                        // If this is the first time, the team chosen by the user is added to his account
                        // The name will be the chosen team
                        this.createUser(this.getCurrentUsersID());

                    } else {
                        alert('Welcome Back Bro');

                    }
                });

                // this.checkUser();
                this.getTeams();

                // this.afDB.list('Users').set({ Teams: { Name: '-dskvlkjnsjvnseuvnsnjdnv' }, User: 'Lihle' });

        }).catch(
            (err) => {
                console.log(err.message);
        });
    }

    // Must add the name and pictureURL
    createUser(id) {
        this.afDB.list('/Users/').push({
            Teams: { Name: this.getTeamKey() },
            User: id,
        });

        this.afDB.list('/Teams/' + this.getTeamKey() + '/')
        .push({
            Members: { Name: id },
        });
    }

    createTeam(name: string, pictureURL: string, pin: string) {

        let flag: Boolean;
        // tslint:disable-next-line:no-shadowed-variable
        this.teamList.forEach(element => {
            for (let i = 0; i < element.length; i++) {

                console.log(element[i].Name + 'Name of team from DB');

                if (element[i].Name === name) {
                    flag = false;
                    break;
                }
            }

            if (flag === undefined) {
                alert('Team created');

                // Adds the new team to the database if it's not there already
                this.afDB.list('/Teams/').push({
                    Members: [],
                    Name: name,
                    Picture: pictureURL,
                    Pin: pin,
                    Rating: 0
                });

            } else {
                alert('Team already exists');

            }
        });

    }

    getTeams() {
        // tslint:disable-next-line:no-shadowed-variable
        this.teamList.forEach( element => {
            for (let i = 0; i < element.length; i++) {

                console.log(element[i].key + 'key');
                console.log(element[i].Members);
                console.log(element[i].Name);
                console.log(element[i].Picture);
                console.log(element[i].Pin);
                console.log(element[i].Rating);

               this.teams.push(
                    new Team(element[i].key, element[i].Members, element[i].Name, element[i].Picture, element[i].Pin, element[i].Rating)
                );

                // console.log(element[i].User + "here")
                // if(element[i].User == this.getCurrentUsersID()){
                //     this.haveAccount = true;
                // }
            }
        });

    }

    // Focus on this
    getTeamMembers() {

        for (let i = 0; i < this.teams.length; i++)  {
            console.log(this.teams[i].Members[i].UserID);
        }

    }

    getCurrentUsersID() {
        return this.afAuth.auth.currentUser.uid;
    }

    getUserName()  {
        return this.afAuth.auth.currentUser.displayName;
    }

    // This is the URL ne broes, just saying you know
    getUserPicture()  {
        return this.afAuth.auth.currentUser.photoURL;
    }

    setTeamKey(key)  {
        this.teamKey = key;
    }

    getTeamKey()  {
        return this.teamKey;
    }




    // getmyteam() {
      // this.afDB.list('/Teams/' + this.getTeamKey() + '/')

    //   return this.http.get(this.url)
    //   .map(response => response.json())
    //   .catch(this.handleError);
    // }
}

