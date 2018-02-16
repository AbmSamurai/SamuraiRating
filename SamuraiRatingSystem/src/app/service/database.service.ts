import { Router, ActivatedRoute } from "@angular/router";
import { Criteria, Question } from "./../model/Criteria";
import { Team } from "./../model/Teams";
import { Member } from "./../model/Member";
import { element } from "protractor";
import { Injectable } from "@angular/core";
import { AngularWaitBarrier } from "blocking-proxy/built/lib/angular_wait_barrier";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import * as Firebase from "firebase/app";
import { AngularFirestore } from "angularfire2/firestore";
import { User } from "@firebase/auth-types";
import { AngularFireStorage } from "angularfire2/storage";
// import { Criteria } from '../model/Criteria';
// import from 'rxjs/operators/map'

@Injectable()
export class DatabaseService {
  public user$: Observable<Firebase.User>;

  allTeams;
  public SneakedTeam;

  userList;
  teamList;
  criteriaList;
  criteria: Criteria[] = [];
  haveAccount: Boolean;
  teamKey;
  teams: Team[] = [];
  members: Member[] = [];
  displayName: string;
  photoURL: string;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  filePath: string;

  teams_collectionRef = this.afs.collection<Team>("Teams");
  criteria_collectionRef = this.afs.collection<Criteria>("criteria");
  user_collectionRef = this.afs.collection<User>("users");
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.user$ = afAuth.authState;
  }

  getTeams(): Observable<Team[]> {
    return this.teams_collectionRef.valueChanges();
  }

  getUsers() {
    return this.user_collectionRef.valueChanges();
  }

  getCriteria() {
    return this.criteria_collectionRef.valueChanges();
  }

  uploadProfilePicture(event, name) {
    const file = event.target.files[0];
    this.filePath = "" + name + "-logo";
    const task = this.storage.upload(this.filePath, file);

    this.uploadPercent = task.percentageChanges();
    this.downloadURL = task.downloadURL();
  }

  getFilePath() {
    return this.filePath;
  }

  getUploadPercentage() {
    return this.uploadPercent;
  }

  getDownloadUrl() {
    return this.downloadURL;
  }

  getData(collection: string, variable: string, operator: any, value: any) {
    return this.afs
      .collection(collection, ref => ref.where(variable, operator, value))
      .valueChanges()
      .map(response => {
        // console.log(response);
        return response;
      });
  }

  googlePopup() {
    const prov = new Firebase.auth.GoogleAuthProvider();
    this.afAuth.auth
      .signInWithPopup(prov)
      .then(success => {
        // alert('User added');
        let flag: Boolean;
        // tslint:disable-next-line:no-shadowed-variable
        this.userList.forEach(element => {
          for (let i = 0; i < element.length; i++) {
            console.log(element[i].User + "here");
            if (element[i].User === this.getCurrentUsersID()) {
              flag = false;
              break;
            }
          }

          if (flag === undefined) {
            alert("User added");
            this.createUser(this.getCurrentUsersID());
          } else {
            alert("Welcome Back Bro");
            this.router.navigate(["/dashboard"]);
          }
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  // Must add the name and pictureURL
  createUser(id) {}

  createTeam(team: Team) {
    this.teams_collectionRef
      .doc("" + team.Name)
      .set(Object.assign({}, team))
      .then(success => {
        console.log("success!");
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  // Focus on this

  getTeamMembers(key) {
    for (let i = 0; i < this.teams.length; i++) {
      console.log(this.teams[i].Members[i].UserID);
    }

    // tslint:disable-next-line:no-shadowed-variable
    this.teamList.forEach(element => {
      for (let i = 0; i < element.length; i++) {
        if (element[i].key === key) {
          for (const z = 0; i < element[i].Members.length; i++) {
            this.members.push(new Member(element[i].Members[z].UserID));
          }
        }
      }
    });
  }
  // }

  // Don't run this again
  createCriteria(question) {}

  deleteCriteria(key) {}

  getCurrentUsersID() {
    return this.afAuth.auth.currentUser.uid;
  }

  getUserName() {
    return this.afAuth.auth.currentUser.displayName;
  }

  // This is the URL ne broes, just saying you know
  getUserPicture() {
    return this.afAuth.auth.currentUser.photoURL;
  }

  setTeamKey(key) {
    this.teamKey = key;
  }

  getTeamKey() {
    return this.teamKey;
  }

  updateRating(val :number, TeamName :string){

    const ref = this.afs.doc(`Teams/${TeamName}`);
    console.log(ref.valueChanges);
    ref.update({"Rating": val})
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/login"]);
    });
  }
}
